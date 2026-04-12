import { timingSafeEqual } from "node:crypto";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

function isCorrectSecret(a: string, b: string): boolean {
  const bufA = Buffer.from(a, "utf8");
  const bufB = Buffer.from(b, "utf8");
  if (bufA.length !== bufB.length) {
    return false;
  }

  return timingSafeEqual(bufA, bufB);
}

function getProvidedSecret(request: NextRequest): string | null {
  const auth = request.headers.get("authorization");
  if (auth?.startsWith("Bearer ")) {
    return auth.slice("Bearer ".length).trim() || null;
  }
  return request.headers.get("x-revalidate-secret");
}

export async function POST(request: NextRequest) {
  const expected = process.env.REVALIDATE_SECRET;
  if (!expected) {
    return NextResponse.json(
      { ok: false, error: "REVALIDATE_SECRET is not set." },
      { status: 500 },
    );
  }

  const provided = getProvidedSecret(request);
  if (!provided || !isCorrectSecret(provided, expected)) {
    return NextResponse.json(
      { ok: false, error: "secret is incorrect." },
      { status: 401 },
    );
  }

  revalidatePath("/", "layout");

  return NextResponse.json({ ok: true, revalidated: true });
}
