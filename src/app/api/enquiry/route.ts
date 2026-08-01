import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";

// ----- Validation schema -----
const enquirySchema = z.object({
  name: z.string().min(2, "Please enter your full name").max(100),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number").max(15),
  destination: z.string().min(2, "Please select a destination").max(100),
  travelDate: z.string().optional(),
  travelers: z.string().optional(),
  message: z
    .string()
    .min(10, "Please enter tour details")
    .max(2000),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = enquirySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid form data" },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // ----- Dev mode: log if SMTP not configured -----
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log("📧 ENQUIRY (no SMTP configured — set up .env.local to enable email):");
      console.log(JSON.stringify(data, null, 2));
      return NextResponse.json({ ok: true, note: "logged-only" });
    }

    // ----- Create Nodemailer transporter -----
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // ----- Email subject -----
    const subject = ` New Enquiry: ${data.destination} — ${data.name}`;

    // ----- HTML body (admin email) -----
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #F7FBF6; padding: 24px; border-radius: 12px;">
        <div style="background: #175548; color: #F7FBF6; padding: 20px 24px; border-radius: 12px 12px 0 0; margin: -24px -24px 20px;">
          <h2 style="margin: 0; font-size: 22px;"> New Tour Enquiry</h2>
          <p style="margin: 6px 0 0; opacity: 0.85; font-size: 13px;">AiS Holidays — aisholidays.com</p>
        </div>
        
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #2a3331;">
          <tr><td style="padding: 10px 0; font-weight: bold; width: 130px;">Name:</td><td>${escapeHtml(data.name)}</td></tr>
          <tr><td style="padding: 10px 0; font-weight: bold;">Email:</td><td><a href="mailto:${escapeHtml(data.email)}" style="color: #175548;">${escapeHtml(data.email)}</a></td></tr>
          <tr><td style="padding: 10px 0; font-weight: bold;">Phone:</td><td><a href="tel:${escapeHtml(data.phone)}" style="color: #175548;">${escapeHtml(data.phone)}</a></td></tr>
          <tr><td style="padding: 10px 0; font-weight: bold;">Destination:</td><td>${escapeHtml(data.destination)}</td></tr>
          ${data.travelDate ? `<tr><td style="padding: 10px 0; font-weight: bold;">Travel Date:</td><td>${escapeHtml(data.travelDate)}</td></tr>` : ""}
          ${data.travelers ? `<tr><td style="padding: 10px 0; font-weight: bold;">Travelers:</td><td>${escapeHtml(data.travelers)}</td></tr>` : ""}
        </table>

        <div style="margin-top: 20px; padding: 16px; background: #fff; border-radius: 8px; border-left: 4px solid #7CC242;">
          <p style="margin: 0 0 6px; font-weight: bold; color: #175548; font-size: 13px;">MESSAGE:</p>
          <p style="margin: 0; color: #2a3331; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(data.message)}</p>
        </div>

        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px dashed #ccc; font-size: 12px; color: #6b7280;">
          Received: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}<br/>
          Reply directly to this email to contact the customer.
        </div>
      </div>
    `;

    // ----- Send email to admin -----
    await transporter.sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to: process.env.MAIL_TO || process.env.SMTP_USER,
      cc: process.env.MAIL_CC || undefined,
      replyTo: data.email,
      subject,
      html,
    });

    // ----- Optional: Auto-reply to customer -----
    await transporter.sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to: data.email,
      subject: "✈️ We've received your enquiry — AiS Holidays",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #F7FBF6; padding: 24px; border-radius: 12px;">
          <div style="background: #175548; color: #F7FBF6; padding: 20px 24px; border-radius: 12px 12px 0 0; margin: -24px -24px 20px; text-align: center;">
            <h2 style="margin: 0;">Thank you, ${escapeHtml(data.name.split(" ")[0])}!</h2>
            <p style="margin: 6px 0 0; opacity: 0.85; font-size: 13px;">Your journey begins here</p>
          </div>
          
          <p style="color: #2a3331; line-height: 1.7;">We've received your enquiry for <strong>${escapeHtml(data.destination)}</strong> and one of our travel planners will get in touch within <strong>2 working hours</strong>.</p>
          
          <p style="color: #2a3331; line-height: 1.7;">In the meantime, feel free to reach us directly:</p>
          
          <div style="background: #fff; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <p style="margin: 0 0 8px;">📞 <strong>Call:</strong> <a href="tel:+917838602000" style="color: #175548;">+91-78386 02000</a></p>
            <p style="margin: 0 0 8px;">💬 <strong>WhatsApp:</strong> <a href="https://wa.me/917838602000" style="color: #175548;">+91-78386 02000</a></p>
            <p style="margin: 0;">📧 <strong>Email:</strong> info@aisholidays.com</p>
          </div>
          
          <p style="color: #6b7280; font-size: 13px; margin-top: 24px;">
            Warm regards,<br/>
            <strong style="color: #175548;">Team AiS Holidays</strong><br/>
            <em>Holidays · Events · Weddings</em>
          </p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    console.error("Enquiry error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again or call us directly." },
      { status: 500 }
    );
  }
}

// ----- Helper: HTML escape (prevent injection) -----
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
