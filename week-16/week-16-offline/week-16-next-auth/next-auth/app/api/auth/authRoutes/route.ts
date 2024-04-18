import { NextRequest, NextResponse } from "next/server";

export function GET(
  req: NextRequest,
  { params }: { params: { authRoutes: string[] } }
) {
  console.log(params.authRoutes); // to access
  return NextResponse.json({
    message: "Hola Amigo",
  });
}

export function POST() {
  return NextResponse.json({
    message: "Bhola Amigo",
  });
}

// /api/auth/<anything>/ --- will be caught here
// api/auth/[...nextauth]/route.ts --- naming like this means it is a catch all handler.
