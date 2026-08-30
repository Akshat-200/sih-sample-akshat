import { answerDoubt, aiConfigured } from "@/lib/doubt/engine";
import { suggestQuestions } from "@/lib/doubt";
import { validSubject } from "@/lib/curriculum";
import type { DoubtContext } from "@/lib/doubt/types";

export const dynamic = "force-dynamic";

// ---------------------------------------------------------------------------
// Tiny in-memory rate limit (per IP, per minute) — enough for a school demo.
// ---------------------------------------------------------------------------
const LIMIT = 30;
const hits = new Map<string, { n: number; reset: number }>();

function allow(ip: string): boolean {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || rec.reset < now) {
    hits.set(ip, { n: 1, reset: now + 60_000 });
    return true;
  }
  rec.n += 1;
  return rec.n <= LIMIT;
}

function parseContext(url: URL): DoubtContext | null {
  const cls = url.searchParams.get("class");
  const subject = url.searchParams.get("subject") ?? "";
  const ch = url.searchParams.get("chapter");
  if (cls !== "7" && cls !== "8") return null;
  if (!validSubject(subject)) return null;
  const n = ch != null && ch !== "" ? Number(ch) : NaN;
  return {
    classNo: cls === "7" ? 7 : 8,
    subject,
    chapterNum: Number.isInteger(n) && n >= 1 && n <= 60 ? n : null,
  };
}

/** GET → pre-built questions for the selected class / subject / chapter. */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const ctx = parseContext(url);
  if (!ctx)
    return Response.json(
      { error: "Invalid class or subject." },
      { status: 400 },
    );
  return Response.json({
    questions: suggestQuestions(ctx.classNo, ctx.subject, ctx.chapterNum),
    engine: aiConfigured() ? "ai" : "offline",
  });
}

/** POST → answer a doubt with a 40–50 word explanation. */
export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "local";

  let body: { question?: unknown; classNo?: unknown; subject?: unknown; chapterNum?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const question = String(body.question ?? "").trim();
  if (question.length < 3 || question.length > 500)
    return Response.json(
      { error: "Please type a doubt between 3 and 500 characters." },
      { status: 400 },
    );

  const cls = Number(body.classNo);
  const subject = String(body.subject ?? "");
  const ch = Number(body.chapterNum);
  if ((cls !== 7 && cls !== 8) || !validSubject(subject))
    return Response.json({ error: "Invalid class or subject." }, { status: 400 });

  const ctx: DoubtContext = {
    classNo: cls,
    subject,
    chapterNum: Number.isInteger(ch) && ch >= 1 && ch <= 60 ? ch : null,
  };

  if (!allow(ip))
    return Response.json(
      { error: "You are asking too fast — please wait a moment." },
      { status: 429 },
    );

  const reply = await answerDoubt(question, ctx);
  return Response.json(reply);
}
