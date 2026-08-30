import { getChapters, subjectName } from "../curriculum";
import { SCIENCE_7 } from "./science7";
import { SCIENCE_8 } from "./science8";
import { MATH_7 } from "./math7";
import { MATH_8 } from "./math8";
import { GENERAL_FAQS } from "./general";
import type { Faq, GeneralFaq } from "./types";

export type { Faq, GeneralFaq, DoubtContext, DoubtReply, DoubtSource } from "./types";

/** Chapter-scoped banks keyed by `${classNo}:${subjectSlug}`. */
const CHAPTER_BANKS: Record<string, Faq[]> = {
  "7:science": SCIENCE_7,
  "8:science": SCIENCE_8,
  "7:mathematics": MATH_7,
  "8:mathematics": MATH_8,
};

export function chapterFaqs(classNo: number, subject: string): Faq[] {
  return CHAPTER_BANKS[`${classNo}:${subject}`] ?? [];
}

export function generalFaqs(subject: string): GeneralFaq[] {
  return GENERAL_FAQS.filter((g) => g.subject === subject || g.subject === "any");
}

/** Subject-specific fill-in templates used when a chapter has no curated FAQs. */
const TEMPLATES: Record<string, string[]> = {
  science: [
    'Explain the main idea of "{t}" in simple words.',
    'Give one daily-life example from "{t}".',
    'What are the important points to revise in "{t}"?',
  ],
  mathematics: [
    'What are the important concepts in "{t}"?',
    'Which common mistakes should I avoid in "{t}"?',
    'Explain one solved example idea from "{t}".',
  ],
  "social-science": [
    'What are the key points of "{t}"?',
    'What new terms should I learn in "{t}"?',
    'How does "{t}" affect us today?',
  ],
  english: [
    'What is the theme of "{t}"?',
    'Explain the central idea of "{t}" briefly.',
    'What new words should I learn from "{t}"?',
  ],
  hindi: [
    '"{t}" पाठ का मुख्य भाव क्या है?',
    '"{t}" से हमें क्या शिक्षा मिलती है?',
    '"{t}" पाठ के प्रमुख प्रश्न कौन-कौन से हैं?',
  ],
  "arts-vocational": [
    'What are the basics covered in "{t}"?',
    'Which materials do I need for "{t}"?',
    'How do I practise "{t}" step by step?',
  ],
};

export const MAX_SUGGESTIONS = 6;

/**
 * Pre-built questions for the selected class + subject (+ optional chapter).
 * Curated NCERT doubts come first, then subject-aware chapter templates.
 */
export function suggestQuestions(
  classNo: number,
  subject: string,
  chapterNum: number | null,
): string[] {
  const out: string[] = [];
  const faqs = chapterFaqs(classNo, subject);
  const chapters = getChapters(classNo, subject);

  const push = (q: string) => {
    if (out.length < MAX_SUGGESTIONS && !out.includes(q)) out.push(q);
  };

  if (chapterNum != null) {
    for (const f of faqs.filter((f) => f.ch === chapterNum)) push(f.q);
    const title = chapters[chapterNum - 1]?.title ?? subjectName(subject);
    for (const t of TEMPLATES[subject] ?? TEMPLATES.science) {
      if (out.length >= MAX_SUGGESTIONS) break;
      push(t.replace("{t}", title));
    }
  } else {
    for (const f of faqs.slice(0, MAX_SUGGESTIONS)) push(f.q);
    for (const g of generalFaqs(subject)) {
      if (out.length >= MAX_SUGGESTIONS) break;
      push(g.q);
    }
  }

  return out;
}
