"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

// Now we have created a session provider here.
// Now we need to wrap layout with Providers
