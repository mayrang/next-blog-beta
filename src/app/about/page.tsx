import AvatarCard from "@/components/AvatarCard";
import React from "react";

export default function AboutPage() {
  return (
    <main>
      <AvatarCard />
      <section className="w-auto m-8 bg-gray-100 text-center py-6">
        <h3 className="font-bold text-lg">Who am I?</h3>
        <p className="flex flex-col items-center leading-5">
          <span>얼떨결에 프론트엔드 공부를 시작해서</span>
          <span>얼떨결에 프론트엔드 개발자를 지망하게 된 대학생입니다.</span>
        </p>
        <h3 className="font-bold text-lg">Career</h3>
        <p className="flex flex-col items-center">
          <span>Import Side Project FE developer(2022.06~08)</span>
          <span>Import Web Project FE Developer(2022~)</span>
          <span>Import 임원진(2023~)</span>
        </p>
      </section>
    </main>
  );
}
