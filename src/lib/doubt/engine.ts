// ---------------------------------------------------------------------------
// Pragyan Sahayak — powered by Google Gemini.
// The chatbot answers ANY question through the Gemini API. There is no
// curated question bank, no word limits and no topic restrictions — the
// model responds naturally in the language the student writes in.
//
// Endpoint (official Google AI Studio format):
//   https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent?key={API_KEY}
// The key travels in the `key` query parameter — never in the path.
// ---------------------------------------------------------------------------

import {
  DEFAULT_GEMINI_MODEL,
  GEMINI_MODEL_FALLBACKS,
  SYSTEM_PROMPT,
  extractGeminiError,
} from "./prompt";

/** Accepted env vars: DOUBT_AI_API_KEY (primary) or GEMINI_API_KEY (alias). */
export function getApiKey(): string | undefined {
  return process.env.DOUBT_AI_API_KEY ?? process.env.GEMINI_API_KEY;
}

export function aiConfigured(): boolean {
  return Boolean(getApiKey());
}

export type GemAnswer = { reply: string; model: string };

/** Models to try, in order: configured one first, then verified fallbacks. */
function modelChain(): string[] {
  const configured = (process.env.DOUBT_AI_MODEL ?? process.env.GEMINI_MODEL ?? "").trim();
  return [
    ...new Set(
      [configured, ...GEMINI_MODEL_FALLBACKS].filter((m): m is string => Boolean(m)),
    ),
  ];
}

/**
 * One attempt against one Gemini model. Logs the full request URL (key masked)
 * and the raw response body so API errors are visible in the server console.
 */
async function postGemini(
  model: string,
  key: string,
  question: string,
): Promise<{ ok: boolean; text: string; status: number | null }> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(key)}`;
  const maskedUrl = url.replace(/key=[^&]*/, "key=***");
  console.log(`[Pragyan Gemini] POST ${maskedUrl}`);
  console.log(`[Pragyan Gemini] request body: systemInstruction + contents (question: ${question.slice(0, 120)})`);

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 30_000);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: [{ role: "user", parts: [{ text: question }] }],
        generationConfig: { temperature: 0.7 },
      }),
      signal: ctrl.signal,
    });
    const body = await res.text();
    console.log(`[Pragyan Gemini] ${model} -> HTTP ${res.status}`);
    console.log(`[Pragyan Gemini] response body: ${body.slice(0, 2000)}`);
    if (!res.ok) return { ok: false, text: body, status: res.status };

    let text = "";
    try {
      const data = JSON.parse(body) as {
        candidates?: { content?: { parts?: { text?: string }[] } }[];
      };
      text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? "";
    } catch {
      /* non-JSON success body */
    }
    return { ok: Boolean(text), text: text || body, status: res.status };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error(`[Pragyan Gemini] ${model} -> network error: ${msg}`);
    return { ok: false, text: msg, status: null };
  } finally {
    clearTimeout(timer);
  }
}

export async function answerQuestion(question: string): Promise<GemAnswer> {
  const provider = process.env.DOUBT_AI_PROVIDER ?? "gemini";
  const key = getApiKey();
  if (!key) {
    throw new Error(
      "Gemini is not configured — set DOUBT_AI_API_KEY (or GEMINI_API_KEY) in .env and restart.",
    );
  }

  // Optional alternative: any OpenAI-compatible chat completions endpoint.
  if (provider === "openai") {
    const model = process.env.DOUBT_AI_MODEL ?? "gpt-4o-mini";
    const base = process.env.DOUBT_AI_BASE_URL ?? "https://api.openai.com/v1";
    const res = await fetch(`${base}/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: question },
        ],
      }),
      signal: AbortSignal.timeout(30_000),
    });
    if (!res.ok) throw new Error(`${model} request failed (HTTP ${res.status}).`);
    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const reply = data.choices?.[0]?.message?.content?.trim();
    if (!reply) throw new Error("The model returned an empty answer.");
    return { reply, model };
  }

  // Default: Google Gemini, with an automatic model fallback chain so a stale
  // DOUBT_AI_MODEL / NEXT_PUBLIC_GEMINI_MODEL value (e.g. "gemini-pro", which
  // now returns 404) never breaks the chatbot.
  const failures: string[] = [];
  for (const model of modelChain()) {
    const attempt = await postGemini(model, key, question);
    if (attempt.ok) {
      console.log(`[Pragyan Gemini] success with model ${model}`);
      return { reply: attempt.text, model };
    }
    failures.push(
      `${model} -> ${
        attempt.status ? `HTTP ${attempt.status}` : "network error"
      }: ${extractGeminiError(attempt.text)}`,
    );
  }

  const hint = failures.some((f) => f.includes("HTTP 404"))
    ? " Hint: the model name in DOUBT_AI_MODEL / NEXT_PUBLIC_GEMINI_MODEL may be outdated (e.g. gemini-pro no longer exists) — use gemini-2.5-flash."
    : "";
  throw new Error(`All Gemini model attempts failed: ${failures.join(" | ")}.${hint}`);
}
