"use client";
import { EmailFormData } from "@/utils/type";
import React, { useState } from "react";

export default function MailForm() {
  const [emailFormData, setEmailFormData] = useState<EmailFormData>({
    emailAdress: "",
    subject: "",
    message: "",
  });

  const changeEmailFormData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEmailFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await fetch("/api/contact/email", {
      method: "POST",
      body: JSON.stringify(emailFormData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await result.json();
    if (result?.ok) {
      setEmailFormData({
        emailAdress: "",
        subject: "",
        message: "",
      });
      alert(data?.message || "이메일을 전송했습니다.");
    } else {
      console.log(data);
      alert(data?.error || "서버에서 실패");
    }
  };
  return (
    <form onSubmit={submitEmail} className="p-8 rounded-md bg-green-400">
      <section className="my-4">
        <label htmlFor="adress" className="block text-sm  mb-2 font-semibold">
          Your Email
        </label>
        <input
          id="adress"
          name="emailAdress"
          value={emailFormData.emailAdress}
          onChange={changeEmailFormData}
          type="email"
          placeholder="당신의 이메일을 적어주세요.."
          className="border-none outline-none rounded p-1 text-sm w-96"
        />
      </section>
      <section className="my-4">
        <label htmlFor="subject" className="block text-sm  mb-2 font-semibold">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          value={emailFormData.subject}
          onChange={changeEmailFormData}
          placeholder="제목을 적어주세요.."
          className="border-none outline-none rounded p-1 text-sm w-96"
        />
      </section>

      <section className="my-4">
        <label htmlFor="message" className="block text-sm mb-2 font-semibold">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={emailFormData.message}
          onChange={changeEmailFormData}
          rows={20}
          className="border-none outline-none rounded p-1 text-sm w-96"
          placeholder="내용을 적어주세요.."
        />
      </section>
      <div className="flex items-center justify-center">
        <button className="px-3 font-semibold  py-2  text-lg bg-yellow-300 rounded border-none outline-none">
          Submit
        </button>
      </div>
    </form>
  );
}