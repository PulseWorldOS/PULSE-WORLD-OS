// netlify/functions/pulse-server-email.js

import nodemailer from "nodemailer";

export async function handler(event, context) {
  try {
    // ------------------------------------------------------------
    // Parse incoming POST body
    // ------------------------------------------------------------
    const body = JSON.parse(event.body || "{}");

    // The client now sends:
    // {
    //   to: "...",
    //   cc: "...",
    //   email: "...",        // legacy
    //   subject: "...",
    //   html: "...",
    //   text: "...",
    //   meta: {...},
    //   templateId: "..."
    // }
    const templateId = body.templateId || "UnknownTemplate";
    const payload = body.payload || body || {};

    // Extract new fields
    const toAddress = payload.to || payload.email || "AIOvermindPrime@pulseworld.net";
    const ccAddress = payload.cc || null;

    const subject = payload.subject || `PulseWorld Alert: ${templateId}`;
    const htmlBody = payload.html || "<p>No HTML content provided.</p>";
    const textBody = payload.text || "No text content provided.";

    // ------------------------------------------------------------
    // SMTP AUTH (Office365)
    // ------------------------------------------------------------
    const EMAIL_PASSWORD_VALUE = "Bullfox86!";

    const transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: "AIOvermindPrime@PulseWorld.Net",
        pass: EMAIL_PASSWORD_VALUE
      },
      tls: {
        ciphers: "SSLv3"
      }
    });

    // ------------------------------------------------------------
    // Build the final HTML wrapper for admin alert emails
    // ------------------------------------------------------------
    const html = `
      <div style="font-family:Arial, sans-serif; padding:20px;">
        <div style="text-align:center; margin-bottom:20px;">
          <img 
            src="https://www.pulseworld.net/_EXPRESSIONS/_PICTURES/PulseWorldOSLogo.webp.pex"
            alt="Pulse World Logo" 
            style="width:80px; height:auto;"
          />
        </div>

        <h2 style="color:#0a84ff; text-align:center;">📡 Pulse World Email Dispatch</h2>

        <p><strong>Template ID:</strong> ${templateId}</p>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>

        <p><strong>To:</strong> ${toAddress}</p>
        ${ccAddress ? `<p><strong>CC:</strong> ${ccAddress}</p>` : ""}

        <hr>

        <h3>Email Content</h3>
        <div style="padding:10px; background:#f9f9f9; border-radius:6px;">
          ${htmlBody}
        </div>

        <hr>

        <h3>Payload Meta</h3>
        <pre style="background:#f4f4f4; padding:10px; border-radius:6px;">
${JSON.stringify(payload.meta || payload, null, 2)}
        </pre>

        <hr>

        <p style="color:#888; font-size:13px;">
          This is an Automated Notice from Pulse World OS.
        </p>
      </div>
    `;

    // ------------------------------------------------------------
    // SEND EMAIL
    // ------------------------------------------------------------
    await transporter.sendMail({
      from: `"Pulse World Alerts" <AIOvermindPrime@PulseWorld.Net>`,
      to: toAddress,
      cc: ccAddress || undefined,
      subject,
      html,
      text: textBody
    });

    // ------------------------------------------------------------
    // SUCCESS RESPONSE
    // ------------------------------------------------------------
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };

  } catch (err) {
    console.error("❌ Failed to send admin alert:", err);

    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: err.message })
    };
  }
}
