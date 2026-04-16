import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { isAuthError } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const key = process.env.CRON_WAKE_SECRET || "";
  const error = isAuthError(request, key);
  if (error) {
    return error;
  }

  try {
    await prisma.post.findFirst({ select: { id: true } });
    return NextResponse.json({
      ok: true,
      message: "success",
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: String(error) },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
