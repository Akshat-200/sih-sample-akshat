"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Bot, LoaderCircle, Send, Sparkles, X } from "lucide-react";
import {
  DEFAULT_GEMINI_MODEL,
  GEMINI_MODEL_FALLBACKS,
  SYSTEM_PROMPT,
  extractGeminiError,
} from "@/lib/doubt/prompt";

type Msg = { id: number; role: "user" | "bot"; text: string };

const WELCOME =
  "Hi! I'm Pragyan Sahayak, powered by Google Gemini. Ask me anything — school doubts, homework, general knowledge, or just chat!";

/**
 * Browser-side Gemini fallback. Used when the server route is unreachable
 * (e.g. a hosted preview whose server cannot reach Google) — the student's
 * own browser talks to the Gemini API directly. Tries the configured model
 * first, then walks a verified fallback chain, and logs every attempt
 * (URL with masked key + response body) to the browser console.
 */
async function askGeminiInBrowser(question: string): Promise<string> {
  const key = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!key)
    throw new Error("Gemini is not configured — NEXT_PUBLIC_GEMINI_API_KEY is missing in .env.");

  const configured = process.env.NEXT_PUBLIC_GEMINI_MODEL ?? "";
  const models: string[] = [
    ...new Set(
      [configured, DEFAULT_GEMINI_MODEL, ...GEMINI_MODEL_FALLBACKS].filter(
        (m): m is string => Boolean(m),
      ),
    ),
  ];

  const failures: string[] = [];
  for (const model of models) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(key)}`;
    console.log(`[Pragyan Gemini][browser] POST ${url.replace(/key=[^&]*/, "key=***")}`);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: [{ role: "user", parts: [{ text: question }] }],
          generationConfig: { temperature: 0.7 },
        }),
      });
      const body = await res.text();
      console.log(`[Pragyan Gemini][browser] ${model} -> HTTP ${res.status}`);
      console.log(`[Pragyan Gemini][browser] response body: ${body.slice(0, 2000)}`);
      if (!res.ok) {
        failures.push(`${model} (HTTP ${res.status}: ${extractGeminiError(body)})`);
        continue;
      }
      const data = JSON.parse(body) as {
        candidates?: { content?: { parts?: { text?: string }[] } }[];
      };
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      if (!text) {
        failures.push(`${model} (empty answer)`);
        continue;
      }
      return text;
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error(`[Pragyan Gemini][browser] ${model} -> error: ${msg}`);
      failures.push(`${model} (error: ${msg})`);
    }
  }

  throw new Error(`Gemini error — tried ${models.join(", ")}: ${failures.join(" | ")}`);
}

export function DoubtSolver() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const idRef = useRef(0);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const pushMsg = useCallback((m: Omit<Msg, "id">) => {
    idRef.current += 1;
    setMessages((prev) => [...prev, { ...m, id: idRef.current }]);
  }, []);

  const toggleOpen = () => {
    const next = !open;
    setOpen(next);
    if (next && messages.length === 0) pushMsg({ role: "bot", text: WELCOME });
    setTimeout(() => inputRef.current?.focus(), 80);
  };

  // Esc closes the panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Auto-scroll the conversation.
  useEffect(() => {
    const el = logRef.current;
    if (!el) return;
    const smooth = document.documentElement.dataset.saver !== "1";
    el.scrollTo({ top: el.scrollHeight, behavior: smooth ? "smooth" : "auto" });
  }, [messages, loading]);

  const ask = useCallback(
    async (question: string) => {
      const q = question.trim();
      if (!q || loading) return;
      setInput("");
      setError(null);
      pushMsg({ role: "user", text: q });
      setLoading(true);
      try {
        // 1) Secure server-side path first (key stays on the server).
        const res = await fetch("/api/doubt", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: q }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error ?? "Something went wrong.");
        pushMsg({ role: "bot", text: data.reply });
      } catch {
        // 2) Server unreachable (e.g. preview host blocks Google) → ask
        //    Gemini straight from the browser.
        try {
          const reply = await askGeminiInBrowser(q);
          pushMsg({ role: "bot", text: reply });
        } catch (e2) {
          setError(
            e2 instanceof Error
              ? e2.message
              : "Could not reach Gemini. Please check your internet connection and try again.",
          );
        }
      } finally {
        setLoading(false);
        setTimeout(() => inputRef.current?.focus(), 60);
      }
    },
    [loading, pushMsg],
  );

  return (
    <>
      {/* Hovering circular launcher, bottom-right on every page */}
      <div className="group/btn fixed bottom-5 right-5 z-50 flex items-center gap-2 print:hidden">
        <span
          aria-hidden="true"
          className="pointer-events-none hidden translate-x-1 rounded-md border border-line bg-white px-2.5 py-1 text-[12px] font-bold text-navy-800 opacity-0 shadow-md transition-all duration-200 group-hover/btn:translate-x-0 group-hover/btn:opacity-100 sm:block"
        >
          <Sparkles className="mr-1 inline h-3.5 w-3.5 text-saffron-600" />
          AI Chat Assistant
        </span>
        <button
          type="button"
          onClick={toggleOpen}
          aria-expanded={open}
          aria-controls="doubt-solver-panel"
          aria-label={open ? "Close AI chat assistant" : "Open Pragyan AI chat assistant"}
          className="group/btn vs-pulse relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-navy-700 via-navy-800 to-navy-950 text-white shadow-lg shadow-navy-900/30 ring-2 ring-saffron-400/80 transition-transform duration-200 hover:scale-105 focus-visible:scale-105"
        >
          <span aria-hidden="true" className="absolute inset-1 rounded-full border border-white/25" />
          {open ? <X className="h-6 w-6" /> : <Bot className="h-7 w-7 drop-shadow" />}
          {!open && (
            <span
              aria-hidden="true"
              className="absolute -right-0.5 -top-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-saffron-500 text-[9px] font-black text-navy-950"
            >
              AI
            </span>
          )}
        </button>
      </div>

      {/* Chat panel */}
      {open && (
        <section
          id="doubt-solver-panel"
          aria-label="Pragyan AI chat assistant"
          className="vsv-enter fixed bottom-[5.75rem] right-3 z-50 flex max-h-[min(34rem,calc(100vh-8rem))] min-h-[26rem] w-[min(24.5rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-xl border-2 border-navy-200 bg-white shadow-2xl shadow-navy-900/25 sm:right-5 print:hidden"
        >
          {/* Header */}
          <header className="flex items-center gap-2.5 bg-gradient-to-r from-navy-800 to-navy-600 px-3.5 py-2.5 text-white">
            <span className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15">
              <Bot className="h-5 w-5" />
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-navy-800 bg-leaf-500" />
            </span>
            <div className="min-w-0 flex-1 leading-tight">
              <h2 className="text-[15px] font-extrabold tracking-tight">Pragyan Sahayak</h2>
              <p className="flex items-center gap-1 text-[11px] font-semibold text-navy-100">
                <Sparkles className="h-3 w-3 text-saffron-300" />
                Powered by Google Gemini
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat assistant"
              className="rounded-md p-1.5 transition hover:bg-white/15 focus-visible:bg-white/15"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </header>

          {/* Chat log */}
          <div
            ref={logRef}
            className="note-scroll flex-1 space-y-3 overflow-y-auto px-3 py-3"
            aria-live="polite"
            aria-label="Conversation"
          >
            {messages.map((m) =>
              m.role === "user" ? (
                <div key={m.id} className="flex justify-end">
                  <p className="max-w-[85%] whitespace-pre-wrap rounded-lg rounded-br-sm bg-navy-800 px-3 py-2 text-[13.5px] font-semibold leading-snug text-white">
                    {m.text}
                  </p>
                </div>
              ) : (
                <div key={m.id} className="flex justify-start">
                  <div className="max-w-[92%] whitespace-pre-wrap rounded-lg rounded-bl-sm border border-navy-100 bg-navy-50 px-3 py-2 text-[13.5px] leading-relaxed text-navy-900">
                    {m.text}
                  </div>
                </div>
              ),
            )}

            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-lg border border-navy-100 bg-navy-50 px-3 py-2.5 text-[13px] font-semibold text-navy-600">
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  Thinking…
                </div>
              </div>
            )}

            {error && (
              <p
                role="alert"
                className="rounded-md border border-saffron-300 bg-saffron-50 px-3 py-2 text-[12.5px] font-semibold text-saffron-700"
              >
                {error}
              </p>
            )}
          </div>

          {/* Composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void ask(input);
            }}
            className="flex items-center gap-2 border-t-2 border-saffron-500/70 bg-white px-3 py-2.5"
          >
            <label className="sr-only" htmlFor="doubt-input">
              Type your question
            </label>
            <input
              id="doubt-input"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything…"
              autoComplete="off"
              className="min-w-0 flex-1 rounded-full border border-line bg-paper px-3.5 py-2 text-[13px] font-medium text-navy-900 placeholder:text-slate-400 focus:border-navy-400"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send question"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-800 text-white transition hover:bg-navy-700 disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </section>
      )}
    </>
  );
}
