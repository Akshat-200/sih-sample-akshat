import { getChapters, subjectName } from "../curriculum";
import { chapterFaqs, generalFaqs, suggestQuestions } from "./index";
import type { DoubtContext, DoubtReply, Faq, GeneralFaq } from "./types";

// ---------------------------------------------------------------------------
// Word budget helpers — every bot answer must be a 40–50 word explanation.
// ---------------------------------------------------------------------------

export const countWords = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

const isHindi = (s: string) => /[ऀ-ॿ]/.test(s);

const EN_TAILS = [
  "Revise this point once more before your test so it stays fresh.",
  "Try writing the answer in your own words to check understanding.",
  "Solve the related NCERT exercise questions to make this idea firm.",
];

const HI_TAILS = [
  "इसे अपनी कॉपी में लिखकर एक बार दोहराइए, याद रहेगा।",
  "एनसीईआरटी के अभ्यास प्रश्न भी हल कीजिए ताकि बिंदु पक्का हो जाए।",
];

/** Force any answer text into the 40–50 word window. */
export function fitWords(text: string): string {
  let words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length >= 40 && words.length <= 50) return words.join(" ");

  // Too long: cut at the last sentence end inside the window, but only if the
  // cut still leaves a 40+ word answer; otherwise trim cleanly at word 50.
  if (words.length > 50) {
    const window = words.slice(0, 50).join(" ");
    const cut = Math.max(
      window.lastIndexOf(". "),
      window.lastIndexOf("! "),
      window.lastIndexOf("? "),
      window.lastIndexOf("। "),
    );
    if (cut > 120 && countWords(window.slice(0, cut + 1)) >= 40)
      return window.slice(0, cut + 1).trim();
    const hindi = isHindi(window);
    return window.replace(/[,;:\s]+$/, "") + (hindi ? "।" : ".");
  }

  // Too short: append revision tails until we cross 40 words.
  const hindi = isHindi(text);
  const tails = hindi ? HI_TAILS : EN_TAILS;
  let out = text.trim();
  for (const t of tails) {
    if (countWords(out) >= 40) break;
    out += " " + t;
  }
  words = out.split(/\s+/);
  if (words.length > 50) words = words.slice(0, 50);
  return words.join(" ");
}

// ---------------------------------------------------------------------------
// Optional LLM provider (set DOUBT_AI_PROVIDER / DOUBT_AI_API_KEY in .env).
// When unset or unreachable, the offline NCERT engine below answers instead.
// ---------------------------------------------------------------------------

export function aiConfigured(): boolean {
  return Boolean(
    process.env.DOUBT_AI_PROVIDER &&
      process.env.DOUBT_AI_API_KEY &&
      process.env.DOUBT_AI_PROVIDER !== "none",
  );
}

async function askAI(question: string, ctx: DoubtContext): Promise<string | null> {
  if (!aiConfigured()) return null;
  const provider = process.env.DOUBT_AI_PROVIDER!;
  const key = process.env.DOUBT_AI_API_KEY!;
  const model = process.env.DOUBT_AI_MODEL ?? (provider === "gemini" ? "gemini-2.0-flash" : "gpt-4o-mini");
  const chapter =
    ctx.chapterNum != null
      ? getChapters(ctx.classNo, ctx.subject)[ctx.chapterNum - 1]?.title
      : undefined;

  const system =
    `You are "Pragyan Sahayak", a warm NCERT doubt-solving tutor for Class ${ctx.classNo} ` +
    `(${subjectName(ctx.subject)}${chapter ? `, chapter: ${chapter}` : ""}). ` +
    `Answer in exactly 40 to 50 words — never fewer, never more. Use very simple English suited to ` +
    `a ${ctx.classNo === 7 ? "12" : "13"}-year-old Indian student. Answer in Hindi if the question is in Hindi. ` +
    `No markdown, no lists, no headings — one plain paragraph.`;
  const user = question.slice(0, 500);

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 12_000);
  try {
    if (provider === "gemini") {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: system }] },
            contents: [{ role: "user", parts: [{ text: user }] }],
            generationConfig: { maxOutputTokens: 220, temperature: 0.4 },
          }),
          signal: ctrl.signal,
        },
      );
      if (!res.ok) return null;
      const data = (await res.json()) as {
        candidates?: { content?: { parts?: { text?: string }[] } }[];
      };
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      return text || null;
    }
    // Default: any OpenAI-compatible chat completions endpoint.
    const base = process.env.DOUBT_AI_BASE_URL ?? "https://api.openai.com/v1";
    const res = await fetch(`${base}/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model,
        temperature: 0.4,
        max_tokens: 220,
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
      }),
      signal: ctrl.signal,
    });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    return data.choices?.[0]?.message?.content?.trim() || null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

// ---------------------------------------------------------------------------
// Offline keyword matcher
// ---------------------------------------------------------------------------

const STOPWORDS = new Set([
  "a", "an", "the", "is", "are", "was", "were", "be", "been", "being", "am", "do", "does",
  "did", "of", "on", "in", "at", "to", "for", "with", "and", "or", "but", "not", "no",
  "it", "its", "this", "that", "these", "those", "as", "by", "from", "into", "about",
  "what", "which", "who", "whom", "whose", "when", "where", "why", "how", "can", "could",
  "will", "would", "shall", "should", "may", "might", "must", "give", "explain", "tell",
  "me", "please", "define", "difference", "between", "state", "briefly", "short", "kya",
  "hai", "ka", "ki", "ke", "ko", "se", "mein", "kaise", "kyun", "batao", "samjhao", "i",
  "you", "we", "my", "your", "our", "class", "chapter",
  // Devanagari function words
  "क्या", "है", "हैं", "का", "की", "के", "को", "से", "में", "किसे", "कौन", "कैसे", "क्यों",
  "बताइए", "समझाइए", "दीजिए", "लिखिए", "और", "यह", "वह", "इसके", "उसके", "प्रमुख", "जैसे",
  "एक", "कर", "नहीं", "होता", "हो", "पर", "वाले", "साथ",
]);

const TOKEN_RE = /[^a-z0-9ऀ-ॿ]+/;

/** Light stemming so "formed" matches "form", "colours" matches "colour". */
function stem(t: string): string {
  if (t.length > 4 && t.endsWith("ing")) return t.slice(0, -3);
  if (t.length > 4 && t.endsWith("ed")) return t.slice(0, -2);
  if (t.length > 4 && t.endsWith("es")) return t.slice(0, -2);
  if (t.length > 3 && t.endsWith("s")) return t.slice(0, -1);
  return t;
}

function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .split(TOKEN_RE)
    .filter((t) => t.length >= 3 && !STOPWORDS.has(t))
    .map(stem);
}

type Candidate = { q: string; a: string; keywords: Set<string>; qTokens: Set<string> };

function toCandidate(entry: Faq | GeneralFaq): Candidate {
  return {
    q: entry.q,
    a: entry.a,
    keywords: new Set((entry.k ?? []).flatMap(tokenize)),
    qTokens: new Set(tokenize(entry.q)),
  };
}

function scoreCandidate(tokens: string[], c: Candidate): { score: number; longest: number } {
  let score = 0;
  let longest = 0;
  for (const t of new Set(tokens)) {
    if (c.keywords.has(t)) {
      score += 3;
      longest = Math.max(longest, t.length);
    } else if (c.qTokens.has(t)) {
      score += 2;
      longest = Math.max(longest, t.length);
    }
  }
  return { score, longest };
}

function bestCuratedMatch(question: string, ctx: DoubtContext): Candidate | null {
  const tokens = tokenize(question);
  if (!tokens.length) return null;

  const pool = [
    ...chapterFaqs(ctx.classNo, ctx.subject).map(toCandidate),
    ...generalFaqs(ctx.subject).map(toCandidate),
    // Same subject in the sibling class also matches (concepts repeat).
    ...chapterFaqs(ctx.classNo === 7 ? 8 : 7, ctx.subject).map(toCandidate),
  ];

  let best: Candidate | null = null;
  let bestScore = 0;
  for (const c of pool) {
    const { score, longest } = scoreCandidate(tokens, c);
    // Multi-word matches pass at 4+; a single strong token (like
    // "photosynthesis" or "friction") passes on its own when distinctive.
    const passes = score >= 4 || (score >= 2 && longest >= 5);
    if (passes && score > bestScore) {
      bestScore = score;
      best = c;
    }
  }
  return best;
}

// ---------------------------------------------------------------------------
// Study-guidance fallbacks (used when no curated answer matches)
// ---------------------------------------------------------------------------

export const FALLBACKS: Record<string, string> = {
  science:
    'This doubt belongs to "{t}". Start from the NCERT definition, then trace the process or example the chapter gives, and finally connect it to something you see around you. Saying the idea aloud in your own words makes the concept clear and memorable.',
  mathematics:
    'This question is from "{t}". Write what is given and what is asked, pick the matching formula from your NCERT solved examples, and substitute step by step keeping units uniform. Solve one worked example first, then attempt the exercise sum, checking every step.',
  "social-science":
    '"{t}" becomes easy when broken into points. Note the causes, the main events or concepts, and the results in three short columns. Link each point to a date, place or example from your NCERT chapter, then revise by writing the points from memory.',
  english:
    'For "{t}", first identify who the characters or voices are and what happens in each part. Then find the central idea the writer shares. Note new words with meanings and one short quotation. Summarising in five own lines prepares theme and character questions.',
  hindi:
    '"{t}" पाठ पहले धीरे-धीरे पढ़िए और कठिन शब्दों के अर्थ लिखिए। फिर पाठ के मुख्य पात्र, घटनाओं का क्रम और अंत में लेखक का संदेश तीन बिंदुओं में निकालिए। अपने शब्दों में सारांश लिखने से भावार्थ अच्छा याद रहता है।',
  "arts-vocational":
    '"{t}" improves fastest with steady practice. Gather the materials your NCERT chapter lists, follow one demonstration step by step, and repeat the exercise three times. Notice proportions, colours or rhythm in every round, and keep a small portfolio to track progress.',
};

const SMALLTALK: { re: RegExp; a: string }[] = [
  {
    re: /^(hi+|hello+|hey+|namaste|namaskar|नमस्ते|नमस्कार|good\s+(morning|afternoon|evening))[\s!.?]*$/i,
    a: "Hello! I am Pragyan Sahayak, always ready to solve your doubts. Choose your class, subject and chapter above for instant questions, or simply type whatever is troubling you. Every answer comes as a short 40 to 50 word explanation that you can revise quickly before tests.",
  },
  {
    re: /(thank|thanks|dhanyawad|dhanyavad|धन्यवाद|shukriya|शुक्रिया)/i,
    a: "Most welcome! Keep asking whenever a doubt pops up while studying. You can switch the class, subject or chapter anytime above to get fresh questions. Revising these short 40 to 50 word explanations regularly is an easy way to stay ahead in every class test.",
  },
  {
    re: /(what can you do|who are you|how do you work|your name|kya kar sakte|तुम कौन)/i,
    a: "I am Pragyan Sahayak, the NCERT doubt solver for Classes 7 and 8. Select your class, subject and chapter to see ready-made questions, or type any doubt of your own. I answer everything in a crisp 40 to 50 word explanation, and I work offline without internet.",
  },
];

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export type AskResult = { question: string } & DoubtReply;

export async function answerDoubt(question: string, ctx: DoubtContext): Promise<AskResult> {
  const q = question.trim().slice(0, 500);
  const related = suggestQuestions(ctx.classNo, ctx.subject, ctx.chapterNum)
    .filter((s) => s !== q)
    .slice(0, 3);

  for (const s of SMALLTALK) {
    if (s.re.test(q)) {
      const answer = fitWords(s.a);
      return { question: q, answer, words: countWords(answer), source: "smalltalk", related };
    }
  }

  // 1. Real AI provider, if configured and reachable.
  const ai = await askAI(q, ctx);
  if (ai) {
    const answer = fitWords(ai);
    return { question: q, answer, words: countWords(answer), source: "ai", related };
  }

  // 2. Curated NCERT knowledge bank.
  const match = bestCuratedMatch(q, ctx);
  if (match) {
    const answer = fitWords(match.a);
    return { question: q, answer, words: countWords(answer), source: "curated", related };
  }

  // 3. Chapter-aware study guidance fallback.
  const chapterTitle =
    ctx.chapterNum != null
      ? getChapters(ctx.classNo, ctx.subject)[ctx.chapterNum - 1]?.title
      : undefined;
  const template = FALLBACKS[ctx.subject] ?? FALLBACKS.science;
  const answer = fitWords(template.replace("{t}", chapterTitle ?? subjectName(ctx.subject)));
  return { question: q, answer, words: countWords(answer), source: "offline", related };
}
