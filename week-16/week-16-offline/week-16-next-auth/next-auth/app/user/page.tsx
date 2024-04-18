// we can't use useSession() in a server component, Because React context is unavailable in Server Component

import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "../lib/auth";
import { Appbar } from "@/components/Appbar";

export default async function () {
  const session = await getServerSession(NEXT_AUTH);
  return (
    <div>
      <Appbar />
      User Component
      <div>{JSON.stringify(session)}</div>
    </div>
  );
}
