import React from "react";
import avatar from "../../public/images/avatar.jpg";
import Image from "next/image";
export default function AvatarCard() {
  return (
    <article className="w-full flex flex-col items-center justify-center relative py-10">
      <div className="w-[200px] h-[200px]  relative">
        <Image src={avatar} alt="avatar_image" fill className="rounded-full" />
      </div>
      <h2 className="font-semibold text-xl mt-2 ">Hi! I&apos;m GeonSang Park</h2>
      <span className="mt-1 text-lg">Frontend Developer</span>
      <span className="mt-1 text-center">
        프론트엔드 개발 공부를 하고 있습니다.
        <br /> 노트북을 뭐 살지 고민중..
      </span>
    </article>
  );
}
