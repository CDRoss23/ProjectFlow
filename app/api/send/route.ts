import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { destinatario, asunto, mensaje } = await req.json();
    
    const data = await resend.emails.send({
      from: process.env.SENDER_EMAIL || 'onboarding@resend.dev',
      to: destinatario,
      subject: asunto,
      html: `
        <div>
          <h1>${asunto}</h1>
          <p>${mensaje}</p>
        </div>
      `
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message });
  }
}