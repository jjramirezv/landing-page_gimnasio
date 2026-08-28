import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";

export function gmailConfigured() {
  return Boolean(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);
}

function getTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
}

export async function sendMail({ to, subject, body }: { to: string; subject: string; body: string }) {
  if (!gmailConfigured()) {
    await prisma.emailLog.create({
      data: { to, subject, status: "fallido", error: "Gmail no está conectado todavía." },
    });
    return { ok: false as const, error: "Gmail no está conectado todavía." };
  }

  try {
    const transporter = getTransporter();
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to,
      subject,
      html: body,
    });
    await prisma.emailLog.create({ data: { to, subject, status: "enviado" } });
    return { ok: true as const };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error desconocido";
    await prisma.emailLog.create({ data: { to, subject, status: "fallido", error: message } });
    return { ok: false as const, error: message };
  }
}
