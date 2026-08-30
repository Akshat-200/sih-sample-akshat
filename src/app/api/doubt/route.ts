import { answerQuestion, aiConfigured } from "@/lib/doubt/engine";

export const dynamic = "force-dynamic";

// Generous sanity cap — the chat UI itself has no length restriction.
const MAX_QUESTION_LENGTH = 10_000;

/**
 * POST /api/doubt  { question: string }
 * Answers any question with the configured Gemini model.
 */
export async function POST(req: Request) {
  let body: { question?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const question = String(body.question ?? "").trim();
  if (!question)
    return Response.json({ error: "Please type a question." }, { status: 400 });
  if (question.length > MAX_QUESTION_LENGTH)
    return Response.json(
      { error: "That question is too long — please shorten it." },
      { status: 400 },
    );

  if (!aiConfigured())
    return Response.json(
      {
        error:
          "Gemini is not configured yet — add DOUBT_AI_API_KEY (or GEMINI_API_KEY) to .env and restart the server.",
      },
      { status: 503 },
    );

  try {
    const { reply, model } = await answerQuestion(question);
    return Response.json({ reply, model });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "unknown error";
    console.error("[Pragyan Gemini] /api/doubt failed:", msg);
    return Response.json({ error: msg }, { status: 502 });
  }
}
