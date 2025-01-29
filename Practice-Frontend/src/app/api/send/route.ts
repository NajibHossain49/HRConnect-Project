// app/api/send/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
// RESEND_API_KEY=re_8u1bMErY_3p8TnavzBH4DEhrykZE752XM
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const { to, subject, html } = await request.json();

        const data = await resend.emails.send({
            from: 'Hi, Im Najib <onboarding@resend.dev>',
            to: [to], // Allow sending to the email provided in the form
            subject: subject,
            html: html,
        });

        return NextResponse.json({ data });
    } catch (error) {
        return NextResponse.json({ error });
    }
}