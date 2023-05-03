import MailForm from "@/components/MailForm";
import Link from "next/link";
import React from "react";
import { SiTistory, SiVelog, SiGithub, SiV } from "react-icons/si";
export default function ContactPage() {
  return (
    <main className="flex flex-col items-center py-28">
      <h2 className="text-2xl font-bold">Contact me!</h2>
      <span className="text-sm mt-2 mb-6">궁금한게 있으면 질문해주세요!</span>
      <section className="flex items-center justify-between   gap-7">
        <Link
          href="https://github.com/mayrang"
          className="w-14 h-14 bg-zinc-100 rounded-full flex items-center justify-center"
        >
          <SiGithub className="text-3xl" />
        </Link>
        <Link
          href="https://mayrang.tistory.com/"
          className="w-14 h-14 bg-zinc-100 rounded-full flex items-center justify-center"
        >
          <SiTistory className="text-3xl" />
        </Link>
        <Link
          href="https://velog.io/@mayrang"
          className="w-14 h-14 bg-zinc-100 rounded-full flex items-center justify-center"
        >
          <SiVelog className="text-3xl" />
        </Link>
      </section>
      <section className="mt-8">
        <MailForm />
      </section>
    </main>
  );
}
