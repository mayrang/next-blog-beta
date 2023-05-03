import AvatarCard from "@/components/AvatarCard";
import React from "react";
import { FaReact } from "react-icons/fa";
import { SiNextdotjs } from "react-icons/si";

export const metadata: { title: string } = {
  title: "About Mayrang",
};

export default function AboutPage() {
  return (
    <main>
      <AvatarCard />
      <section className="w-auto m-8 bg-gray-100 text-center py-6">
        <h3 className="font-bold text-lg mt-3">Who am I?</h3>
        <p className="flex flex-col items-center leading-5">
          <span>얼떨결에 프론트엔드 공부를 시작해서</span>
          <span>얼떨결에 프론트엔드 개발자를 지망하게 된 대학생입니다.</span>
        </p>
        <h3 className="font-bold text-lg mt-3">Career</h3>
        <p className="flex flex-col items-center">
          <span>Import Side Project FE developer(2022.06~08)</span>
          <span>Import Web Project FE Developer(2022~)</span>
          <span>Import 임원진(2023~)</span>
        </p>
        <h3 className="font-bold text-lg mt-3">Skills</h3>
        <p className="flex flex-col items-center">
          <span>
            <FaReact className="inline-block mr-1 text-lg" />
            React
          </span>
          <span>
            <SiNextdotjs className="inline-block mr-1 text-lg" />
            Next.js
          </span>
        </p>
      </section>
    </main>
  );
}
