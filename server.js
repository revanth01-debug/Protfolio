import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    let transportOptions;

    if (process.env.SMTP_SERVICE) {
      transportOptions = {
        service: process.env.SMTP_SERVICE,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      };
    } else {
      transportOptions = {
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      };
    }

    const transporter = nodemailer.createTransport(transportOptions);

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECEIVER || "radharapurevanth10@gmail.com",
      replyTo: email,
      subject: `New message from ${name} — Portfolio`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:auto;background:#0b1321;color:#e2e8f0;border-radius:16px;overflow:hidden;">
          <div style="background:#0e7490;padding:28px 32px;">
            <h2 style="margin:0;color:#fff;">New Portfolio Message</h2>
          </div>
          <div style="padding:32px;">
            <p><strong style="color:#94a3b8;">Name:</strong> ${name}</p>
            <p><strong style="color:#94a3b8;">Email:</strong> <a href="mailto:${email}" style="color:#22d3ee;">${email}</a></p>
            <p><strong style="color:#94a3b8;">Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>
          </div>
        </div>
      `,
    });

    await transporter.sendMail({
      from: `"Revanth Radharapu" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Thanks for reaching out!",
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:auto;background:#0b1321;color:#e2e8f0;border-radius:16px;overflow:hidden;">
          <div style="background:#6d28d9;padding:28px 32px;">
            <h2 style="margin:0;color:#fff;">Got your message!</h2>
          </div>
          <div style="padding:32px;">
            <p>Hi <strong>${name}</strong>,</p>
            <p style="color:#cbd5e1;">Thanks for reaching out! I've received your message and will get back to you soon.</p>
            <p style="color:#94a3b8;">— Revanth Radharapu</p>
          </div>
        </div>
      `,
    });

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error("Mail error:", err);
    return res.status(500).json({ error: "Failed to send email." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});