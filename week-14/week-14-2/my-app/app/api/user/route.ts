import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
// const client = new PrismaClient();
import client from "@/db";

export async function GET() {
  const user = await client.user.findFirst({});
  return Response.json({ name: user?.username, email: user?.username });
}

export async function POST(req: NextRequest) {
  // Extract Body
  const body = await req.json();
  // Store the body in the database
  try {
    await client.user.create({
      data: {
        username: body.username,
        password: body.password,
      },
    });
    // Response Message
    return NextResponse.json({
      message: "You are logged in!",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error creating user",
      },
      {
        status: 411,
      }
    );
  }
}
