"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
export const Session = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
