"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Bot, CircleHelp, LoaderCircle, Send, Sparkles, WifiOff, X } from "lucide-react";
import { SUBJECTS, getChapters, slugify } from "@/lib/curriculum";

type Msg = {
  id: number;
  role: "user" | "bot";
  text: string;
  words?: number;
  source?: "curated" | "offline" | "ai" | "smalltalk";
  related?: string[];
};

type Selection = { classNo: 7 | 8; subject: string; chapterNum: number };

const SOURCE_LABELS: Record<string, string> = {
  curated: "NCERT answer bank",
  offline: "Study guidance",
  ai: "AI model",
  smalltalk: "Sahayak",
};

const WELCOME =
  "Namaste! I am Pragyan Sahayak, your doubt-solving companion. Pick your class, subject and chapter above for ready questions, or type any doubt below — every answer comes as a crisp 40–50 word explanation.";

const STORE_KEY = "vs_doubt_ctx";

function defaultSelection(): Selection {
  return { classNo: 8, subject: "science", chapterNum: 1 };
}

export function DoubtSolver() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [sel, setSel] = useState<Selection>(defaultSelection);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [engine, setEngine] = useState<"ai" | "offline">("offline");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const idRef = useRef(0);
  const initializedRef = useRef(false);
  const lastPathCtxRef = useRef<string | null>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const chapters = useMemo(
    () => getChapters(sel.classNo, sel.subject),
    [sel.classNo, sel.subject],
  );

  const pushMsg = useCallback((m: Omit<Msg, "id">) => {
    idRef.current += 1;
    const id = idRef.current;
    setMessages((prev) => [...prev, { ...m, id }]);
  }, []);

  /** Parse `/class/8/science/some-chapter` into a widget selection. */
  const chapterSelectionFromPath = (): Selection | null => {
    const m = pathname?.match(/^\/class\/(7|8)\/([a-z-]+)\/([^/?#]+)/);
    if (!m || !SUBJECTS.some((s) => s.slug === m[2])) return null;
    const list = getChapters(Number(m[1]) as 7 | 8, m[2]);
    const idx = list.findIndex((c) => slugify(c.title) === m[3]);
    return {
      classNo: Number(m[1]) as 7 | 8,
      subject: m[2],
      chapterNum: idx >= 0 ? idx + 1 : 1,
    };
  };

  /** Selection for a fresh open: last used context, refined by the current
   *  chapter page so the bot always talks about what the student is reading. */
  const resolveInitialSelection = (): Selection => {
    let init = defaultSelection();
    try {
      const raw = window.localStorage.getItem(STORE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<Selection>;
        if (saved.classNo === 7 || saved.classNo === 8)
          init = {
            classNo: saved.classNo,
            subject: saved.subject ?? init.subject,
            chapterNum: 1,
          };
      }
    } catch {
      /* ignore corrupt state */
    }
    return init;
  };

  const persist = (next: Selection) => {
    try {
      window.localStorage.setItem(STORE_KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable — keep working */
    }
  };

  const toggleOpen = () => {
    const next = !open;
    setOpen(next);
    if (!next) return;

    const pathSel = chapterSelectionFromPath();
    if (!initializedRef.current) {
      initializedRef.current = true;
      setSel(pathSel ?? resolveInitialSelection());
      setMessages([{ id: ++idRef.current, role: "bot", text: WELCOME, source: "smalltalk" }]);
    } else if (pathSel && pathname !== lastPathCtxRef.current) {
      // The student moved to a different chapter page — follow it.
      setSel(pathSel);
    }
    lastPathCtxRef.current = pathSel ? (pathname ?? "") : lastPathCtxRef.current;
    setTimeout(() => inputRef.current?.focus(), 80);
  };

  // ---- fetch pre-built questions while the panel is open -----------------
  useEffect(() => {
    if (!open || !initializedRef.current) return;
    const ctrl = new AbortController();
    fetch(
      `/api/doubt?class=${sel.classNo}&subject=${sel.subject}&chapter=${sel.chapterNum}`,
      { signal: ctrl.signal },
    )
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("failed"))))
      .then((data: { questions?: string[]; engine?: "ai" | "offline" }) => {
        setSuggestions(data.questions ?? []);
        if (data.engine) setEngine(data.engine);
      })
      .catch((e: unknown) => {
        if (e instanceof Error && e.name !== "AbortError")
          setError("Could not load chapter questions.");
      });
    return () => ctrl.abort();
  }, [sel, open]);

  // ---- behaviours --------------------------------------------------------
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

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
        const res = await fetch("/api/doubt", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...sel, question: q }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error ?? "Something went wrong.");
        pushMsg({
          role: "bot",
          text: data.answer,
          words: data.words,
          source: data.source,
          related: data.related,
        });
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong.");
      } finally {
        setLoading(false);
        setTimeout(() => inputRef.current?.focus(), 60);
      }
    },
    [sel, loading, pushMsg],
  );

  const changeClass = (classNo: 7 | 8) => {
    const list = getChapters(classNo, sel.subject);
    const next: Selection = {
      classNo,
      subject: list.length ? sel.subject : "science",
      chapterNum: 1,
    };
    setSel(next);
    persist(next);
  };

  const changeSubject = (subject: string) => {
    const next: Selection = { ...sel, subject, chapterNum: 1 };
    setSel(next);
    persist(next);
  };

  const changeChapter = (chapterNum: number) => {
    const next: Selection = { ...sel, chapterNum };
    setSel(next);
    persist(next);
  };

  const chapterLabel = (n: number) => {
    const row = chapters[n - 1];
    const title = row?.title ?? "";
    return `Ch ${n}: ${title.length > 26 ? title.slice(0, 26) + "…" : title}`;
  };

  // ---- render ------------------------------------------------------------
  return (
    <>
      {/* Hovering circular launcher, bottom-right on every page */}
      <div className="group/btn fixed bottom-5 right-5 z-50 flex items-center gap-2 print:hidden">
        <span
          aria-hidden="true"
          className="pointer-events-none hidden translate-x-1 rounded-md border border-line bg-white px-2.5 py-1 text-[12px] font-bold text-navy-800 opacity-0 shadow-md transition-all duration-200 group-hover/btn:translate-x-0 group-hover/btn:opacity-100 sm:block"
        >
          <Sparkles className="mr-1 inline h-3.5 w-3.5 text-saffron-600" />
          AI Doubt Solver
        </span>
        <button
          type="button"
          onClick={toggleOpen}
          aria-expanded={open}
          aria-controls="doubt-solver-panel"
          aria-label={open ? "Close AI doubt solver" : "Open Pragyan AI doubt solver"}
          className="group/btn vs-pulse relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-navy-700 via-navy-800 to-navy-950 text-white shadow-lg shadow-navy-900/30 ring-2 ring-saffron-400/80 transition-transform duration-200 hover:scale-105 focus-visible:scale-105"
        >
          <span
            aria-hidden="true"
            className="absolute inset-1 rounded-full border border-white/25"
          />
          {open ? (
            <X className="h-6 w-6" />
          ) : (
            <Bot className="h-7 w-7 drop-shadow" />
          )}
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
          aria-label="Pragyan AI doubt solver"
          className="vsv-enter fixed bottom-[5.75rem] right-3 z-50 flex max-h-[min(34rem,calc(100vh-8rem))] min-h-[26rem] w-[min(24.5rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-xl border-2 border-navy-200 bg-white shadow-2xl shadow-navy-900/25 sm:right-5 print:hidden"
        >
          {/* Header */}
          <header className="flex items-center gap-2.5 bg-gradient-to-r from-navy-800 to-navy-600 px-3.5 py-2.5 text-white">
            <span className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15">
              <Bot className="h-5 w-5" />
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-navy-800 bg-leaf-500" />
            </span>
            <div className="min-w-0 flex-1 leading-tight">
              <h2 className="text-[15px] font-extrabold tracking-tight">
                Pragyan Sahayak
              </h2>
              <p className="flex items-center gap-1 text-[11px] font-semibold text-navy-100">
                {engine === "ai" ? (
                  <>
                    <Sparkles className="h-3 w-3 text-saffron-300" /> AI engine ·
                    40–50 word answers
                  </>
                ) : (
                  <>
                    <WifiOff className="h-3 w-3 text-saffron-300" /> Offline NCERT
                    engine · 40–50 word answers
                  </>
                )}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close doubt solver"
              className="rounded-md p-1.5 transition hover:bg-white/15 focus-visible:bg-white/15"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </header>

          {/* Context selectors: class · subject · chapter */}
          <div className="grid grid-cols-[4.5rem_1fr] gap-1.5 border-b border-line bg-navy-50 px-3 py-2 sm:grid-cols-[4.5rem_1fr_1fr]">
            <label className="sr-only" htmlFor="doubt-class">Class</label>
            <select
              id="doubt-class"
              value={sel.classNo}
              onChange={(e) => changeClass(Number(e.target.value) as 7 | 8)}
              className="rounded-md border border-navy-200 bg-white px-1.5 py-1.5 text-[12px] font-bold text-navy-800 focus:border-navy-400"
            >
              <option value={7}>Class 7</option>
              <option value={8}>Class 8</option>
            </select>
            <label className="sr-only" htmlFor="doubt-subject">Subject</label>
            <select
              id="doubt-subject"
              value={sel.subject}
              onChange={(e) => changeSubject(e.target.value)}
              className="col-span-1 rounded-md border border-navy-200 bg-white px-1.5 py-1.5 text-[12px] font-bold text-navy-800 focus:border-navy-400 sm:col-span-1"
            >
              {SUBJECTS.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.name}
                </option>
              ))}
            </select>
            <label className="sr-only" htmlFor="doubt-chapter">Chapter</label>
            <select
              id="doubt-chapter"
              value={sel.chapterNum}
              onChange={(e) => changeChapter(Number(e.target.value))}
              className="col-span-2 rounded-md border border-navy-200 bg-white px-1.5 py-1.5 text-[12px] font-bold text-navy-800 focus:border-navy-400 sm:col-span-1"
            >
              {chapters.map((c, i) => (
                <option key={c.title} value={i + 1}>
                  {chapterLabel(i + 1)}
                </option>
              ))}
            </select>
          </div>

          {/* Chat log */}
          <div
            ref={logRef}
            className="note-scroll flex-1 space-y-3 overflow-y-auto px-3 py-3"
            aria-live="polite"
            aria-label="Doubt solver conversation"
          >
            {messages.map((m) =>
              m.role === "user" ? (
                <div key={m.id} className="flex justify-end">
                  <p className="max-w-[85%] rounded-lg rounded-br-sm bg-navy-800 px-3 py-2 text-[13.5px] font-semibold leading-snug text-white">
                    {m.text}
                  </p>
                </div>
              ) : (
                <div key={m.id} className="flex justify-start">
                  <div className="max-w-[92%]">
                    <div className="rounded-lg rounded-bl-sm border border-navy-100 bg-navy-50 px-3 py-2 text-[13.5px] leading-relaxed text-navy-900">
                      {m.text}
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-1.5">
                      {m.words != null && (
                        <span className="rounded-sm bg-leaf-50 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-leaf-700">
                          {m.words} words
                        </span>
                      )}
                      {m.source && m.source !== "smalltalk" && (
                        <span className="rounded-sm bg-navy-100 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-navy-600">
                          {SOURCE_LABELS[m.source]}
                        </span>
                      )}
                    </div>
                    {m.related && m.related.length > 0 && (
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {m.related.map((r) => (
                          <button
                            key={r}
                            type="button"
                            onClick={() => ask(r)}
                            className="max-w-full truncate rounded-full border border-saffron-200 bg-saffron-50 px-2.5 py-1 text-left text-[11px] font-bold text-saffron-700 transition hover:border-saffron-400 hover:bg-saffron-100"
                          >
                            <CircleHelp className="mr-1 inline h-3 w-3" />
                            {r}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ),
            )}

            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-lg border border-navy-100 bg-navy-50 px-3 py-2.5 text-[13px] font-semibold text-navy-600">
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  Solving your doubt…
                </div>
              </div>
            )}

            {error && (
              <p
                role="alert"
                className="rounded-md border border-saffron-300 bg-saffron-50 px-3 py-2 text-[12.5px] font-semibold text-saffron-700"
              >
                {error} Please try again.
              </p>
            )}
          </div>

          {/* Pre-built questions for the selected chapter */}
          {suggestions.length > 0 && (
            <div className="border-t border-line bg-white px-3 py-2">
              <p className="mb-1.5 text-[10.5px] font-bold uppercase tracking-wider text-slate-500">
                Try a question from this chapter
              </p>
              <div className="note-scroll flex max-h-24 flex-wrap gap-1.5 overflow-y-auto">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    disabled={loading}
                    onClick={() => ask(s)}
                    className="rounded-full border border-navy-200 bg-navy-50 px-2.5 py-1 text-left text-[11.5px] font-semibold text-navy-700 transition hover:border-navy-400 hover:bg-navy-100 disabled:opacity-50"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void ask(input);
            }}
            className="flex items-center gap-2 border-t-2 border-saffron-500/70 bg-white px-3 py-2.5"
          >
            <label className="sr-only" htmlFor="doubt-input">
              Type your doubt
            </label>
            <input
              id="doubt-input"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask any doubt… e.g. What is photosynthesis?"
              maxLength={500}
              autoComplete="off"
              className="min-w-0 flex-1 rounded-full border border-line bg-paper px-3.5 py-2 text-[13px] font-medium text-navy-900 placeholder:text-slate-400 focus:border-navy-400"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send doubt"
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
