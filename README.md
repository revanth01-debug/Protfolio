# Personal Portfolio Website

This project is a React frontend portfolio built with Vite, Tailwind CSS, and AOS animation.

## What’s included

- Landing hero section with social links and strong branding
- About, tools, skills, projects, certificate preview, and contact sections
- Clickable project cards with demo links for real work samples
- Professional credentials preview when a certificate card is selected
- Interactive contact form with validation and success feedback

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file from `.env.example` and set your SMTP credentials.

3. Start the Vite frontend server:

```bash
npm run dev
```

4. Start the contact API backend server in another terminal:

```bash
npm run server
```

5. Open the local URL shown in the terminal.

## Build

```bash
npm run build
```

## Notes

- This repository is primarily a frontend portfolio application with a backend contact API added.
- The contact form now posts to `/api/contact` and sends email via SMTP using `server.js`.
- If the backend is not available, the form will fall back to opening the visitor's default email client with your email address prefilled.
- Use `.env.example` to set up `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, and `CONTACT_RECEIVER`.
- For Gmail, use `smtp.gmail.com`, port `587` with `SMTP_SECURE=false` or port `465` with `SMTP_SECURE=true`.
- If you prefer Gmail service mode, set `SMTP_SERVICE=gmail` and omit SMTP_HOST/SMTP_PORT.
- Gmail requires an app password if your account has 2-step verification enabled.
- To create an app password:
  1. Sign in to your Google account and go to Security.
  2. Enable 2-Step Verification if not already enabled.
  3. Create an App Password for Mail.
  4. Use that generated password as `SMTP_PASS`.
- The portfolio can be deployed to Vercel, Netlify, or any static hosting provider with a separate backend service.
