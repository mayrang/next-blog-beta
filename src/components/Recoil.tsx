"use client";
import React from "react";
import { RecoilRoot } from "recoil";

export default function Recoil({ children }: { children: React.ReactNode }) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
