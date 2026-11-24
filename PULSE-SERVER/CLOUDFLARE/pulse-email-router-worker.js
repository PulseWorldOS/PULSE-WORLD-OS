// PULSE-SERVER/CLOUDFLARE/pulse-email-router-worker.js
// Deploy ONCE in Cloudflare Dashboard → Workers & Pages → Create Worker,
// then bind it to the Catch-All Email Route on each of your 9 PulseWorld domains
// (Cloudflare Email Routing → Routing rules → Catch-all address → Send to a Worker).
//
// Worker Environment Variables (Settings → Variables and Secrets):
//   PULSE_INBOUND_URL    = https://www.pulseworld.net/.netlify/functions/PULSE-SERVER-EMAIL-INBOUND
//   INBOUND_EMAIL_SECRET = <exact same secret set in Netlify INBOUND_EMAIL_SECRET>
//   ADMIN_FALLBACK_EMAIL = <verified destination email in Cloudflare Email Routing, e.g. Aldwyn's main email>

export default {
  async email(message, env, ctx) {
    const endpoint =
      env.PULSE_INBOUND_URL ||
      "https://www.pulseworld.net/.netlify/functions/PULSE-SERVER-EMAIL-INBOUND";

    try {
      // Read raw MIME body (capped safely at 256 KB for fast Netlify processing)
      const rawText = await new Response(message.raw).text();
      const bodyStart = rawText.indexOf("\r\n\r\n");
      const rawBody =
        bodyStart >= 0 ? rawText.slice(bodyStart + 4).slice(0, 262144) : rawText.slice(0, 262144);

      const subject = message.headers.get("subject") || "(No Subject)";
      const fromHeader = message.headers.get("from") || message.from;
      const fromNameMatch = fromHeader.match(/^\s*"?([^"<]+?)"?\s*</);
      const fromName = fromNameMatch ? fromNameMatch[1].trim() : "";

      const payload = {
        to: message.to,
        from: message.from,
        fromName,
        subject,
        text: rawBody,
        messageId: message.headers.get("message-id") || null
      };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-pulse-inbound-secret": env.INBOUND_EMAIL_SECRET || ""
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json().catch(() => ({}));
      const routed = res.ok && data?.results?.[0]?.routed === true;

      if (!routed && env.ADMIN_FALLBACK_EMAIL) {
        await message.forward(env.ADMIN_FALLBACK_EMAIL);
      }
    } catch (err) {
      console.error("[PulseWorld Email Worker] Error:", err);
      if (env.ADMIN_FALLBACK_EMAIL) {
        await message.forward(env.ADMIN_FALLBACK_EMAIL);
      } else {
        message.setReject("Temporary routing error — please retry shortly.");
      }
    }
  }
};
