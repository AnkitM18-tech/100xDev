import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();

export async function GET() {
  const user = await client.user.findFirst({});
  return Response.json({ name: user?.username, email: user?.username });
}

export async function POST(req: NextRequest) {
  // Extract Body
  const body = await req.json();
  // Store the body in the database
  client.user.create({
    data: {
      username: body.username,
      password: body.password,
    },
  });
  // Response Message
  return Response.json({
    message: "You are logged in!",
  });
}
