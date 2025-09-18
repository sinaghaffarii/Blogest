import nodemailer from 'nodemailer';

export const sendEmail = async (to: string, subject: string, text: string) => {
  // تنظیمات SMTP خودتان را اینجا قرار دهید
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, // true اگر TLS استفاده می‌کنید
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Sina Ghaffari" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
  });
};
