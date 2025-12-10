import nodemailer from "nodemailer";

export const sendEmail = async (sendTo, subject, text, html) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: `"E-commerce App" <${process.env.SMTP_USER}>`,
      to: sendTo,
      subject,
      text,
      html,
    });

    return { success: true, info };
  } catch (error) {
    console.log("Email sending error:", error);
    return { success: false, error };
  }
};
