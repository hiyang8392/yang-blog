import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { isAuthError } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const key = process.env.REVALIDATE_SECRET || "";
  const error = isAuthError(request, key);
  if (error) {
    return error;
  }

  revalidatePath("/", "layout");

  return NextResponse.json({ ok: true, message: "success" });
}
