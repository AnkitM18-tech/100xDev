"use server"; // whenwver we are creating a server action we have to specify this.

import client from "@/db";

export async function signup(username: string, password: string) {
  // should add zod validation here
  const user = await client.user.create({
    data: {
      username: username,
      password: password,
    },
  });

  console.log(user.id);

  return "Signed up!";
}

// it is server function and needs to be called on the server and not send it to the client. Irrespective of it is called in a client component it is still a server function.
