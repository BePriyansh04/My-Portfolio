// server/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors({ origin: 'http://localhost:5173' })); // Vite dev
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) return res.status(400).json({ error: 'Missing fields' });

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // 1) Thank-you mail to the client
    await transporter.sendMail({
      from: `"Priyansh Burman" <${process.env.MAIL_USER}>`,
      to: email,                       // client’s address from the form
      subject: 'Thanks for reaching out!',
      html: `
        <p>Hi ${name},</p>
        <p>Thanks for contacting Priyansh Burman. We’ve received your message and will get back to you within 24 hours.</p>
        <p>Best regards,<br>Priyansh Burman</p>
      `,
    });

    // 2) Lead mail to yourself
    // 1) Thank-you mail to the client
await transporter.sendMail({
  from: `"Priyansh Burman" <${process.env.MAIL_USER}>`,
  to: email,
  subject: 'Thanks for reaching out!',
  html: `
    <div style="max-width:600px;margin:auto;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:#ffffff;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden">
      <div style="background:#2563eb;color:#ffffff;padding:24px 32px;text-align:center;font-size:20px;font-weight:600">
        Priyansh Burman
      </div>
      <div style="padding:32px;color:#111827">
        <p style="margin:0 0 12px;font-size:18px">Hi ${name},</p>
        <p style="margin:0 0 12px">Thanks for contacting me — I’ve received your message and will get back to you within <strong>24 hours</strong>.</p>
        <p style="margin:0">Looking forward to continuing the conversation!</p>
      </div>
      <div style="background:#f9fafb;padding:24px 32px;font-size:14px;color:#6b7280;text-align:center;border-top:1px solid #e5e7eb">
        © 2025 Priyansh Burman. All rights reserved.<br/>
        <a href="mailto:${process.env.MAIL_USER}" style="color:#2563eb;text-decoration:none">${process.env.MAIL_USER}</a>
      </div>
    </div>
  `,
});

// 2) Lead mail to yourself
await transporter.sendMail({
  from: `"Portfolio Bot" <${process.env.MAIL_USER}>`,
  to: process.env.MAIL_TO,
  subject: `New portfolio lead – ${name}`,
  html: `
    <div style="max-width:600px;margin:auto;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:#ffffff;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden">
      <div style="background:#10b981;color:#ffffff;padding:24px 32px;text-align:center;font-size:20px;font-weight:600">
        New Lead Alert
      </div>
      <div style="padding:32px;color:#111827">
        <table style="width:100%;border-collapse:collapse">
          <tr>
            <td style="padding:8px 0;font-weight:600;width:100px">Name</td>
            <td style="padding:8px 0">${name}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;font-weight:600">Email</td>
            <td style="padding:8px 0"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding:8px 0;font-weight:600;vertical-align:top">Message</td>
            <td style="padding:8px 0;white-space:pre-wrap">${message}</td>
          </tr>
        </table>
      </div>
      <div style="background:#f9fafb;padding:24px 32px;font-size:14px;color:#6b7280;text-align:center;border-top:1px solid #e5e7eb">
        Sent from your portfolio contact form
      </div>
    </div>
  `,
});

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`SMTP server on http://localhost:${PORT}`));