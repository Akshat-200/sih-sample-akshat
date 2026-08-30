/**
 * Content QA for the doubt bank: every curated explanation must be a
 * 40–50 word answer (the promise the AI Doubt Solver makes to students).
 *
 *   npm run doubt:check
 */
import { SCIENCE_7 } from "../src/lib/doubt/science7";
import { SCIENCE_8 } from "../src/lib/doubt/science8";
import { MATH_7 } from "../src/lib/doubt/math7";
import { MATH_8 } from "../src/lib/doubt/math8";
import { GENERAL_FAQS } from "../src/lib/doubt/general";
import { fitWords, countWords, FALLBACKS } from "../src/lib/doubt/engine";

const banks = [
  ["science7", SCIENCE_7],
  ["science8", SCIENCE_8],
  ["math7", MATH_7],
  ["math8", MATH_8],
  ["general", GENERAL_FAQS],
] as const;

let bad = 0;

for (const [name, entries] of banks) {
  for (const e of entries) {
    const n = countWords(e.a);
    if (n < 40 || n > 50) {
      bad++;
      console.log(`✗ ${name} :: "${e.q}" → ${n} words`);
    }
  }
}

// Fallback templates must land inside the window for short AND long chapter
// titles (titles range from 1 word to ~8 words).
const TITLES = ["Light", "Weather, Climate and Adaptations of Animals to Climate"];
for (const [subject, text] of Object.entries(FALLBACKS)) {
  for (const title of TITLES) {
    const fitted = fitWords(text.replace("{t}", title));
    const n = countWords(fitted);
    if (n < 40 || n > 50) {
      bad++;
      console.log(`✗ fallback:${subject} [${title.length > 12 ? "long" : "short"}] → ${n} words after fit`);
    }
  }
}

if (bad) {
  console.error(`\n${bad} entr${bad === 1 ? "y" : "ies"} outside the 40–50 word window.`);
  process.exit(1);
}
console.log(
  `✓ All ${banks.reduce((n, [, e]) => n + e.length, 0)} bank answers within 40–50 words.`,
);
