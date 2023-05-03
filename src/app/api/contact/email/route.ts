import { NextRequest, NextResponse } from "next/server";
import nodeMailer from "nodemailer";
import { object, string } from "yup";

let emailSchema = object({
  emailAdress: string().email("이메일 형식으로 작성하셔야 합니다.").required("이메일 주소는 필수 입력 항목입니다."),
  subject: string().max(70, "제목은 최대 70자까지 입력 가능합니다.").required("이메일 제목은 필수 입력 항목입니다."),
  message: string(),
});

export async function POST(req: Request) {
  const emailData = await req.json();
  console.log("emailData", emailData);
  const tranporter = nodeMailer.createTransport({
    service: "gmail",
    auth: { user: process.env.EMAIL_ADRESS, pass: process.env.EMAIL_PASSWORD },
    secure: false,
    host: "smtp.gmail.com",
    port: 465,
  });

  try {
    await emailSchema.validate(emailData);
  } catch (err: any) {
    console.log("yup", err.errors[0]);
    return new Response(JSON.stringify({ error: err.errors[0] }), {
      status: 403,
    });
  }

  try {
    const mailoptions = {
      to: process.env.EMAIL_ADRESS,
      from: emailData.emailAdress,
      subject: emailData.subject,
      text: emailData.message,
    };
    const info = await tranporter.sendMail(mailoptions);
    console.log("info", info);
  } catch (err: any) {
    console.log("email", process.env.EMAIL_ADRESS, "password", process.env.EMAIL_PASSWORD);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify({ message: "메일을 전송했습니다." }), {
    status: 200,
  });
}
