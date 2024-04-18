"use client";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react"; // provided by next/auth out of the box

export const Appbar = () => {
  const router = useRouter();
  // useSession method we can use to get data of user in a client side component
  const session = useSession();
  return (
    <div className="flex items-center justify-center">
      <button
        className="p-2 m-2 border-2"
        onClick={() => {
          //   router.push("/api/auth/signin"); // we can skip the router way and use it instead
          signIn();
        }}
      >
        Sign In
      </button>
      <button
        className="p-2 m-2 border-2"
        onClick={() => {
          //   router.push("/api/auth/signin"); // we can skip the router way and use it instead
          signOut();
        }}
      >
        Sign Out
      </button>
      <button
        className="p-2 m-2 border-2"
        onClick={() => {
          router.push("/signup");
        }}
      >
        Sign Up
      </button>
      <p>{JSON.stringify(session)}</p>
    </div>
  );
};
