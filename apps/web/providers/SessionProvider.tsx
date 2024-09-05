"use client";
import React from "react";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { Session } from "next-auth";

interface Props {
  children?: React.ReactNode;
  session?: Session | null;
}

export default function SessionProvider({ children, session }: Props) {
  return (
    <NextAuthSessionProvider session={session}>
      {children}
    </NextAuthSessionProvider>
  );
}
