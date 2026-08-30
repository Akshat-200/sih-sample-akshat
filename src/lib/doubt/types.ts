/** Shared types for the Pragyan AI Doubt Solver (offline NCERT engine). */

/**
 * One curated FAQ entry.
 * `ch` is the 1-based chapter number within the class + subject, matching the
 * ordering in `src/lib/curriculum.ts`. `a` must be a 40–50 word explanation
 * (enforced by `scripts/check-doubt-bank.ts`).
 */
export type Faq = {
  ch: number;
  q: string;
  a: string;
  /** Extra keyword hints used by the matching engine (lowercase). */
  k?: string[];
};

/**
 * Chapter-agnostic FAQ (grammar, civics concepts, study help …).
 * `subject` scopes the entry; "any" matches every subject.
 */
export type GeneralFaq = {
  subject: string;
  q: string;
  a: string;
  k?: string[];
};

export type DoubtContext = {
  classNo: 7 | 8;
  subject: string;
  /** 1-based chapter number within class+subject, or null. */
  chapterNum: number | null;
};

export type DoubtSource = "curated" | "offline" | "ai" | "smalltalk";

export type DoubtReply = {
  answer: string;
  words: number;
  source: DoubtSource;
  related: string[];
};
