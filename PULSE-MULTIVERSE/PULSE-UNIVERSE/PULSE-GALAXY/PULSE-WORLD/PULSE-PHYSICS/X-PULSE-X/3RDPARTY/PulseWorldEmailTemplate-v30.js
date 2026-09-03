import { resendStripeLink, sendPayout } from "./PulseWorldEmailAlert-v20.js";



function currency(amount, displayCurrency = "$") {
  let raw = String(amount || "").replace(/BZ?\$|\$/g, "").trim();
  const num = Number(raw);
  const safe = isNaN(num) ? "0.00" : num.toFixed(2);

  let cur = String(displayCurrency || "$").trim().toUpperCase();
  cur = cur === "USD" || cur === "$" || cur === "US$" ? "$" : "BZ$";

  return `${cur}${safe}`;
}

function formatDisplayAmount(displayCurrency, amount) {
  const safeAmount = Number(amount);
  const finalAmount = isNaN(safeAmount) ? "0.00" : safeAmount.toFixed(2);

  let cur = String(displayCurrency || "$").trim().toUpperCase();
  cur = cur === "USD" || cur === "$" || cur === "US$" ? "$" : "BZ$";

  return currency(finalAmount, cur);
}

export const newUser = {
    subject: () => "Welcome to Pulse World OS 🌑✨",
    important: true,

    html: (payload) => {
      const { logId } = payload;

      const trackingPixel =
        logId && logId !== "Preview Mode"
          ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(
              logId
            )}" width="1" height="1" alt="" style="display:block; opacity:0;">`
          : "";

      return `<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background:#0b0d10; font-family:Arial, sans-serif;">

    <table width="100%" border="0" cellspacing="0" cellpadding="0" 
           style="background:#0b0d10; padding:40px 0;">
      <tr>
        <td align="center">

          <!-- MAIN CARD -->
          <table width="620" border="0" cellspacing="0" cellpadding="0"
                 style="
                   background:#111418;
                   border-radius:20px;
                   overflow:hidden;
                   box-shadow:0 0 28px rgba(0,0,0,0.55);
                 ">

            <!-- HEADER / WORLD BANNER -->
            <tr>
              <td style="background:#0f1114;">
                <img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png"
                     alt="Pulse World OS Banner"
                     width="620"
                     style="display:block; width:100%; max-width:620px;">
              </td>
            </tr>

            <!-- INNER CONTENT -->
            <tr>
              <td style="padding:36px;">

                <!-- TITLE -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td align="center"
                        style="
                          font-size:32px;
                          font-weight:bold;
                          color:#ffffff;
                          letter-spacing:0.6px;
                          text-shadow:0 0 12px rgba(0,255,255,0.35);
                        ">
                      Welcome to Pulse World OS
                    </td>
                  </tr>

                  <tr>
                    <td align="center"
                        style="
                          font-size:16px;
                          color:#9aa0a6;
                          padding-top:12px;
                        ">
                      Your identity has been initialized.  
                      Your presence has been registered.  
                      Your world‑node is now active.
                    </td>
                  </tr>

                  <!-- MINI LOGO -->
                  <tr>
                    <td align="center" style="padding:30px 0;">
                      <img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldOrb.png"
                           alt="Pulse‑World Orb"
                           width="160"
                           style="
                             display:block;
                             border-radius:50%;
                             box-shadow:0 0 18px rgba(0,255,255,0.35);
                           ">
                    </td>
                  </tr>

                  <!-- MESSAGE -->
                  <tr>
                    <td align="center"
                        style="
                          font-size:18px;
                          color:#d1d5db;
                          padding:20px 20px 10px 20px;
                          line-height:28px;
                        ">
                      You’ve just stepped into a living system —  
                      a world built on signals, presence, and identity.  
                      Your Pulse World OS account is now fully activated.
                    </td>
                  </tr>

                  <!-- FEATURE PANEL -->
                  <tr>
                    <td align="center" style="padding-top:28px;">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0"
                             style="
                               background:#161a1f;
                               border-radius:16px;
                               padding:24px;
                               box-shadow:inset 0 0 14px rgba(0,0,0,0.45);
                             ">
                        <tr>
                          <td align="center"
                              style="
                                font-size:20px;
                                font-weight:bold;
                                color:#00e0e0;
                                padding-bottom:12px;
                              ">
                            Your World‑Node Includes:
                          </td>
                        </tr>

                        <tr>
                          <td style="color:#b8c0c7; font-size:15px; line-height:24px;">
                            • Identity Core (TPIdentity v30) <br>
                            • Presence Engine (Pulse‑Presence v20) <br>
                            • Notification Mesh (Email + SMS + Pulse‑Signals) <br>
                            • Payment Organ (PulseWorldBank v30) <br>
                            • World‑Routing & Organ‑Level Access <br>
                            • Immortal Envelope Support <br>
                            • Binary‑Wave Ready Architecture
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- SOCIAL MEDIA -->
                  <tr>
                    <td align="center" style="padding-top:32px;">
                      <div style="font-size:14px; color:#7a828a; margin-bottom:12px;">
                        Connect with the Pulse‑World community
                      </div>
                      <a href="https://linktr.ee/tropicpulse" target="_blank">
                        <img src="./_EXPRESSIONS/_PICTURES/_EMAILS/SocialMediaDark.png"
                             alt="Social Media Icons"
                             width="300"
                             style="display:block; margin:auto;">
                      </a>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>

          </table>

          ${trackingPixel}

        </td>
      </tr>
    </table>
  </body>
</html>`;
    }
  };
  
export const loyalty = {
  subject: () => "Pulse World OS: Loyalty Organ Activation",
  important: true,

  html: (payload) => {
    const { name, email, logId } = payload;

    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" alt="" style="opacity:0; width:1px; height:1px;">`
        : "";

    return `<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background:#0b0d10; font-family:Arial, sans-serif;">

    <table width="100%" border="0" cellspacing="0" cellpadding="0" 
           style="background:#0b0d10; padding:40px 0;">
      <tr>
        <td align="center">

          <!-- MAIN CARD -->
          <table width="620" border="0" cellspacing="0" cellpadding="0"
                 style="
                   background:#111418;
                   border-radius:20px;
                   overflow:hidden;
                   box-shadow:0 0 28px rgba(0,0,0,0.55);
                 ">

            <!-- HEADER / WORLD BANNER -->
            <tr>
              <td style="background:#0f1114;">
                <img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png"
                     alt="Pulse World OS Banner"
                     width="620"
                     style="display:block; width:100%; max-width:620px;">
              </td>
            </tr>

            <!-- INNER CONTENT -->
            <tr>
              <td style="padding:36px;">

                <!-- TITLE -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td align="center"
                        style="
                          font-size:30px;
                          font-weight:bold;
                          color:#ffffff;
                          letter-spacing:0.6px;
                          text-shadow:0 0 12px rgba(0,255,255,0.35);
                        ">
                      Loyalty Organ Activation
                    </td>
                  </tr>

                  <tr>
                    <td align="center"
                        style="
                          font-size:15px;
                          color:#9aa0a6;
                          padding-top:10px;
                        ">
                      Your Loyalty Organ is ready to initialize inside Pulse World OS.
                    </td>
                  </tr>

                  <!-- ORB -->
                  <tr>
                    <td align="center" style="padding:30px 0;">
                      <img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldOrb.png"
                           alt="Pulse‑World Orb"
                           width="150"
                           style="
                             display:block;
                             border-radius:50%;
                             box-shadow:0 0 18px rgba(0,255,255,0.35);
                           ">
                    </td>
                  </tr>

                  <!-- MESSAGE -->
                  <tr>
                    <td align="center"
                        style="
                          font-size:17px;
                          color:#d1d5db;
                          padding:20px 20px 10px 20px;
                          line-height:28px;
                        ">
                      Hi ${name || "there"},  
                      your **Loyalty Organ** is now prepared for activation.  
                      Once initialized, it will begin tracking your world‑interactions,  
                      presence signals, and reward‑eligible actions across Pulse‑World.
                    </td>
                  </tr>

                  <!-- FEATURE PANEL -->
                  <tr>
                    <td align="center" style="padding-top:28px;">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0"
                             style="
                               background:#161a1f;
                               border-radius:16px;
                               padding:24px;
                               box-shadow:inset 0 0 14px rgba(0,0,0,0.45);
                             ">
                        <tr>
                          <td align="center"
                              style="
                                font-size:18px;
                                font-weight:bold;
                                color:#00e0e0;
                                padding-bottom:12px;
                              ">
                            Loyalty Organ Capabilities
                          </td>
                        </tr>

                        <tr>
                          <td style="color:#b8c0c7; font-size:14px; line-height:24px;">
                            • Earn Pulse‑Points from eligible world‑actions <br>
                            • Presence‑tier multipliers (Idle → Active → Critical) <br>
                            • Binary‑Wave reward boosts <br>
                            • Organ‑level history + world‑node tracking <br>
                            • Loyalty Card inside Pulse World OS <br>
                            • Future: Multi‑Wave reward harmonization
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- ACCOUNT EMAIL -->
                  <tr>
                    <td align="center" style="padding-top:24px;">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0"
                             style="
                               background:#14171c;
                               border-radius:14px;
                               padding:18px;
                               border:1px solid #1f242b;
                             ">
                        <tr>
                          <td style="font-size:12px; color:#7a828a; text-transform:uppercase; letter-spacing:0.08em;">
                            Account Email
                          </td>
                        </tr>
                        <tr>
                          <td style="font-size:15px; font-weight:600; color:#e5e7eb; padding-top:4px;">
                            ${email || "N/A"}
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- BUTTON -->
                  <tr>
                    <td align="center" style="padding-top:30px;">
                      <a href="https://linktr.ee/tropicpulse"
                         style="
                           display:inline-block;
                           padding:12px 26px;
                           border-radius:999px;
                           background:linear-gradient(135deg, #00e0e0, #008cff);
                           color:#ffffff !important;
                           font-size:14px;
                           font-weight:700;
                           text-decoration:none;
                           letter-spacing:0.05em;
                           text-transform:uppercase;
                           box-shadow:0 0 14px rgba(0,140,255,0.45);
                         ">
                        Activate Loyalty Organ
                      </a>

                      <div style="font-size:12px; color:#7a828a; padding-top:10px;">
                        If the button doesn’t open, launch Pulse World OS and navigate to  
                        <strong>Loyalty Organ</strong> inside your world‑node.
                      </div>
                    </td>
                  </tr>

                  <!-- SOCIAL -->
                  <tr>
                    <td align="center" style="padding-top:36px;">
                      <div style="font-size:13px; color:#7a828a; margin-bottom:12px;">
                        Connect with the Pulse‑World community
                      </div>
                      <a href="https://linktr.ee/tropicpulse" target="_blank">
                        <img src="./_EXPRESSIONS/_PICTURES/_EMAILS/SocialMediaDark.png"
                             alt="Social Media Icons"
                             width="300"
                             style="display:block; margin:auto;">
                      </a>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>

          </table>

          ${trackingPixel}

        </td>
      </tr>
    </table>
  </body>
</html>`;
  }
};

export const SendPayout = {
  subject: (payload) => {
    const { orderID } = payload;
    return `Pulse World OS: Payout Dispatch for Order ${orderID}`;
  },
  important: true,

  html: (payload) => {
    const {
      payoutAmount,
      stripeAccountID,
      orderID,
      delivererEmail,
      pendingBalance,
      availableBalance,
      displayCurrency,
      displayAmount,
      logId
    } = payload;

    const formatted = displayAmount || payoutAmount;
    const payoutAmountFormatted = formatDisplayAmount(displayCurrency, formatted);
    const formattedAvailable = formatDisplayAmount(displayCurrency, availableBalance);
    const formattedPending = formatDisplayAmount(displayCurrency, pendingBalance);

    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" alt="" style="opacity:0;">`
        : "";

    return `<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background:#0b0d10; font-family:Arial, sans-serif;">

    <table width="100%" border="0" cellspacing="0" cellpadding="0"
           style="background:#0b0d10; padding:40px 0;">
      <tr>
        <td align="center">

          <!-- MAIN CARD -->
          <table width="620" border="0" cellspacing="0" cellpadding="0"
                 style="
                   background:#111418;
                   border-radius:20px;
                   overflow:hidden;
                   box-shadow:0 0 28px rgba(0,0,0,0.55);
                 ">

            <!-- HEADER -->
            <tr>
              <td style="background:#0f1114;">
                <img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png"
                     alt="Pulse World OS Banner"
                     width="620"
                     style="display:block; width:100%; max-width:620px;">
              </td>
            </tr>

            <!-- CONTENT -->
            <tr>
              <td style="padding:36px;">

                <!-- TITLE -->
                <table width="100%">
                  <tr>
                    <td align="center"
                        style="
                          font-size:30px;
                          font-weight:bold;
                          color:#ffffff;
                          text-shadow:0 0 12px rgba(0,255,255,0.35);
                        ">
                      Payout Organ Dispatch
                    </td>
                  </tr>

                  <tr>
                    <td align="center"
                        style="
                          font-size:15px;
                          color:#9aa0a6;
                          padding-top:10px;
                        ">
                      Your earnings have been processed by the Payment Organ.
                    </td>
                  </tr>

                  <!-- ORB -->
                  <tr>
                    <td align="center" style="padding:30px 0;">
                      <img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldOrb.png"
                           alt="Pulse‑World Orb"
                           width="150"
                           style="
                             display:block;
                             border-radius:50%;
                             box-shadow:0 0 18px rgba(0,255,255,0.35);
                           ">
                    </td>
                  </tr>

                  <!-- MESSAGE -->
                  <tr>
                    <td align="center"
                        style="
                          font-size:17px;
                          color:#d1d5db;
                          padding:20px 20px 10px 20px;
                          line-height:28px;
                        ">
                      Your payout for Order <strong>${orderID}</strong>  
                      has been successfully dispatched into your  
                      <strong>PulseWorldBank v30</strong> balance.
                    </td>
                  </tr>

                  <!-- PAYOUT PANEL -->
                  <tr>
                    <td align="center" style="padding-top:28px;">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0"
                             style="
                               background:#161a1f;
                               border-radius:16px;
                               padding:24px;
                               box-shadow:inset 0 0 14px rgba(0,0,0,0.45);
                             ">

                        <tr>
                          <td style="font-size:12px; color:#7a828a; text-transform:uppercase; letter-spacing:0.08em;">
                            Order ID
                          </td>
                        </tr>
                        <tr>
                          <td style="font-size:16px; font-weight:600; color:#e5e7eb; padding-bottom:16px;">
                            ${orderID}
                          </td>
                        </tr>

                        <tr>
                          <td style="font-size:12px; color:#7a828a; text-transform:uppercase; letter-spacing:0.08em;">
                            Deliverer Email
                          </td>
                        </tr>
                        <tr>
                          <td style="font-size:16px; font-weight:600; color:#e5e7eb; padding-bottom:16px;">
                            ${delivererEmail}
                          </td>
                        </tr>

                        <tr>
                          <td style="font-size:12px; color:#7a828a; text-transform:uppercase; letter-spacing:0.08em;">
                            Payout Amount
                          </td>
                        </tr>
                        <tr>
                          <td style="font-size:22px; font-weight:700; color:#00e0e0; padding-bottom:16px;">
                            ${payoutAmountFormatted}
                          </td>
                        </tr>

                        <tr>
                          <td style="font-size:12px; color:#7a828a; text-transform:uppercase; letter-spacing:0.08em;">
                            Available Balance
                          </td>
                        </tr>
                        <tr>
                          <td style="font-size:16px; font-weight:600; color:#e5e7eb; padding-bottom:16px;">
                            ${formattedAvailable}
                          </td>
                        </tr>

                        <tr>
                          <td style="font-size:12px; color:#7a828a; text-transform:uppercase; letter-spacing:0.08em;">
                            Pending to Bank
                          </td>
                        </tr>
                        <tr>
                          <td style="font-size:16px; font-weight:600; color:#00ff9d;">
                            ${formattedPending}
                          </td>
                        </tr>

                      </table>
                    </td>
                  </tr>

                  <!-- MESSAGE -->
                  <tr>
                    <td align="center"
                        style="
                          font-size:15px;
                          color:#9aa0a6;
                          padding-top:24px;
                          line-height:24px;
                        ">
                      Funds will become available based on your  
                      <strong>Stripe payout schedule</strong>.  
                      Your Payment Organ is now synced and updated.
                    </td>
                  </tr>

                  <!-- SOCIAL -->
                  <tr>
                    <td align="center" style="padding-top:36px;">
                      <div style="font-size:13px; color:#7a828a; margin-bottom:12px;">
                        Connect with the Pulse‑World community
                      </div>
                      <a href="https://linktr.ee/tropicpulse" target="_blank">
                        <img src="./_EXPRESSIONS/_PICTURES/_EMAILS/SocialMediaDark.png"
                             alt="Social Media Icons"
                             width="300"
                             style="display:block; margin:auto;">
                      </a>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>

          </table>

          ${trackingPixel}

        </td>
      </tr>
    </table>
  </body>
</html>`;
  }
};

export const stripeOnboarding = {
  subject: () => "Pulse World OS: Activate Your Payment Organ",
  important: true,

  html: (payload) => {
    const { email, getPaidLink, reSendLink, logId } = payload;

    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" alt="" style="opacity:0;">`
        : "";

    return `<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background:#0b0d10; font-family:Arial, sans-serif;">

    <table width="100%" border="0" cellspacing="0" cellpadding="0"
           style="background:#0b0d10; padding:40px 0;">
      <tr>
        <td align="center">

          <!-- MAIN CARD -->
          <table width="620" border="0" cellspacing="0" cellpadding="0"
                 style="
                   background:#111418;
                   border-radius:20px;
                   overflow:hidden;
                   box-shadow:0 0 28px rgba(0,0,0,0.55);
                 ">

            <!-- HEADER -->
            <tr>
              <td style="background:#0f1114;">
                <img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png"
                     alt="Pulse World OS Banner"
                     width="620"
                     style="display:block; width:100%; max-width:620px;">
              </td>
            </tr>

            <!-- CONTENT -->
            <tr>
              <td style="padding:36px;">

                <!-- TITLE -->
                <table width="100%">
                  <tr>
                    <td align="center"
                        style="
                          font-size:30px;
                          font-weight:bold;
                          color:#ffffff;
                          text-shadow:0 0 12px rgba(0,255,255,0.35);
                        ">
                      Payment Organ Activation
                    </td>
                  </tr>

                  <tr>
                    <td align="center"
                        style="
                          font-size:15px;
                          color:#9aa0a6;
                          padding-top:10px;
                        ">
                      Ready to earn inside Pulse World OS?
                    </td>
                  </tr>

                  <!-- ORB -->
                  <tr>
                    <td align="center" style="padding:30px 0;">
                      <img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldOrb.png"
                           alt="Pulse‑World Orb"
                           width="150"
                           style="
                             display:block;
                             border-radius:50%;
                             box-shadow:0 0 18px rgba(0,255,255,0.35);
                           ">
                    </td>
                  </tr>

                  <!-- MESSAGE -->
                  <tr>
                    <td align="center"
                        style="
                          font-size:17px;
                          color:#d1d5db;
                          padding:20px 20px 10px 20px;
                          line-height:28px;
                        ">
                      To receive payouts inside Pulse World OS,  
                      your <strong>Payment Organ</strong> must be activated.  
                      This links your world‑node to Stripe, enabling automated earnings.
                    </td>
                  </tr>

                  <!-- FEATURE PANEL -->
                  <tr>
                    <td align="center" style="padding-top:28px;">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0"
                             style="
                               background:#161a1f;
                               border-radius:16px;
                               padding:24px;
                               box-shadow:inset 0 0 14px rgba(0,0,0,0.45);
                             ">

                        <tr>
                          <td align="center"
                              style="
                                font-size:18px;
                                font-weight:bold;
                                color:#00e0e0;
                                padding-bottom:12px;
                              ">
                            What Activation Enables
                          </td>
                        </tr>

                        <tr>
                          <td style="color:#b8c0c7; font-size:14px; line-height:24px;">
                            • Automated payouts from Pulse‑World Bank v30 <br>
                            • Delivery + vendor earnings routing <br>
                            • Presence‑tier payout boosts (Active → Critical) <br>
                            • Binary‑Wave earning multipliers <br>
                            • Organ‑level payout history <br>
                            • Future: Multi‑Wave earning harmonization
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- GET PAID BUTTON -->
                  <tr>
                    <td align="center" style="padding-top:32px;">
                      <a href="${getPaidLink}"
                         style="
                           display:inline-block;
                           padding:14px 34px;
                           border-radius:999px;
                           background:linear-gradient(135deg, #00e0e0, #008cff);
                           color:#ffffff !important;
                           font-size:18px;
                           font-weight:700;
                           text-decoration:none;
                           letter-spacing:0.05em;
                           text-transform:uppercase;
                           box-shadow:0 0 14px rgba(0,140,255,0.45);
                         ">
                        Activate Payment Organ
                      </a>

                      <div style="font-size:12px; color:#7a828a; padding-top:12px;">
                        Link expires in 24 hours.  
                        If it expires, request a new one below.
                      </div>
                    </td>
                  </tr>

                  <!-- RESEND BUTTON -->
                  <tr>
                    <td align="center" style="padding-top:22px;">
                      <a href="${reSendLink}"
                         style="
                           display:inline-block;
                           padding:12px 28px;
                           border-radius:999px;
                           background:#1f2937;
                           color:#ffffff !important;
                           font-size:14px;
                           font-weight:600;
                           text-decoration:none;
                           letter-spacing:0.04em;
                           text-transform:uppercase;
                           box-shadow:0 0 10px rgba(0,0,0,0.45);
                         ">
                        Resend Activation Link
                      </a>
                    </td>
                  </tr>

                  <!-- FOOTER NOTE -->
                  <tr>
                    <td align="center"
                        style="
                          font-size:13px;
                          color:#7a828a;
                          padding-top:28px;
                          line-height:22px;
                        ">
                      You must activate your Payment Organ  
                      before accepting or completing any paid world‑actions.
                    </td>
                  </tr>

                  <!-- SOCIAL -->
                  <tr>
                    <td align="center" style="padding-top:36px;">
                      <div style="font-size:13px; color:#7a828a; margin-bottom:12px;">
                        Connect with the Pulse‑World community
                      </div>
                      <a href="https://linktr.ee/tropicpulse" target="_blank">
                        <img src="./_EXPRESSIONS/_PICTURES/_EMAILS/SocialMediaDark.png"
                             alt="Social Media Icons"
                             width="300"
                             style="display:block; margin:auto;">
                      </a>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>

          </table>

          ${trackingPixel}

        </td>
      </tr>
    </table>
  </body>
</html>`;
  }
};

export const ResendStripeLink = {
  subject: () => "Pulse World OS: Payment Organ Reactivation",
  important: true,

  html: (payload) => {
    const { email, getPaidLink, reSendLink, logId } = payload;

    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" alt="" style="opacity:0;">`
        : "";

    return `<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background:#0b0d10; font-family:Arial, sans-serif;">

    <table width="100%" border="0" cellspacing="0" cellpadding="0"
           style="background:#0b0d10; padding:40px 0;">
      <tr>
        <td align="center">

          <!-- MAIN CARD -->
          <table width="620" border="0" cellspacing="0" cellpadding="0"
                 style="
                   background:#111418;
                   border-radius:20px;
                   overflow:hidden;
                   box-shadow:0 0 28px rgba(0,0,0,0.55);
                 ">

            <!-- HEADER -->
            <tr>
              <td style="background:#0f1114;">
                <img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png"
                     alt="Pulse World OS Banner"
                     width="620"
                     style="display:block; width:100%; max-width:620px;">
              </td>
            </tr>

            <!-- CONTENT -->
            <tr>
              <td style="padding:36px;">

                <!-- TITLE -->
                <table width="100%">
                  <tr>
                    <td align="center"
                        style="
                          font-size:30px;
                          font-weight:bold;
                          color:#ffffff;
                          text-shadow:0 0 12px rgba(0,255,255,0.35);
                        ">
                      Payment Organ Reactivation
                    </td>
                  </tr>

                  <tr>
                    <td align="center"
                        style="
                          font-size:15px;
                          color:#9aa0a6;
                          padding-top:10px;
                        ">
                      Your previous activation link expired or was never completed.
                    </td>
                  </tr>

                  <!-- ORB -->
                  <tr>
                    <td align="center" style="padding:30px 0;">
                      <img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldOrb.png"
                           alt="Pulse‑World Orb"
                           width="150"
                           style="
                             display:block;
                             border-radius:50%;
                             box-shadow:0 0 18px rgba(0,255,255,0.35);
                           ">
                    </td>
                  </tr>

                  <!-- MESSAGE -->
                  <tr>
                    <td align="center"
                        style="
                          font-size:17px;
                          color:#d1d5db;
                          padding:20px 20px 10px 20px;
                          line-height:28px;
                        ">
                      We’ve generated a fresh activation link so your  
                      <strong>Payment Organ</strong> can reconnect to Stripe  
                      and resume automated payouts inside Pulse World OS.
                    </td>
                  </tr>

                  <!-- WHY THIS EMAIL -->
                  <tr>
                    <td align="center" style="padding-top:20px;">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0"
                             style="
                               background:#161a1f;
                               border-radius:16px;
                               padding:24px;
                               box-shadow:inset 0 0 14px rgba(0,0,0,0.45);
                             ">

                        <tr>
                          <td align="center"
                              style="
                                font-size:18px;
                                font-weight:bold;
                                color:#00e0e0;
                                padding-bottom:12px;
                              ">
                            Why You’re Seeing This
                          </td>
                        </tr>

                        <tr>
                          <td style="color:#b8c0c7; font-size:14px; line-height:24px;">
                            • Your previous Stripe link expired <br>
                            • You didn’t finish activation <br>
                            • You want to verify your Stripe account directly <br>
                            • You want payouts to resume <br>
                            • You requested a new link manually
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- GET PAID BUTTON -->
                  <tr>
                    <td align="center" style="padding-top:32px;">
                      <a href="${getPaidLink}"
                         style="
                           display:inline-block;
                           padding:14px 34px;
                           border-radius:999px;
                           background:linear-gradient(135deg, #00e0e0, #008cff);
                           color:#ffffff !important;
                           font-size:18px;
                           font-weight:700;
                           text-decoration:none;
                           letter-spacing:0.05em;
                           text-transform:uppercase;
                           box-shadow:0 0 14px rgba(0,140,255,0.45);
                         ">
                        Reactivate Payment Organ
                      </a>

                      <div style="font-size:12px; color:#7a828a; padding-top:12px;">
                        Link expires in 24 hours.  
                        If it expires again, request another below.
                      </div>
                    </td>
                  </tr>

                  <!-- RESEND BUTTON -->
                  <tr>
                    <td align="center" style="padding-top:22px;">
                      <a href="${reSendLink}"
                         style="
                           display:inline-block;
                           padding:12px 28px;
                           border-radius:999px;
                           background:#1f2937;
                           color:#ffffff !important;
                           font-size:14px;
                           font-weight:600;
                           text-decoration:none;
                           letter-spacing:0.04em;
                           text-transform:uppercase;
                           box-shadow:0 0 10px rgba(0,0,0,0.45);
                         ">
                        Send Another Link
                      </a>
                    </td>
                  </tr>

                  <!-- FOOTER NOTE -->
                  <tr>
                    <td align="center"
                        style="
                          font-size:13px;
                          color:#7a828a;
                          padding-top:28px;
                          line-height:22px;
                        ">
                      Your Payment Organ must be active  
                      before completing any paid world‑actions.
                    </td>
                  </tr>

                  <!-- SOCIAL -->
                  <tr>
                    <td align="center" style="padding-top:36px;">
                      <div style="font-size:13px; color:#7a828a; margin-bottom:12px;">
                        Connect with the Pulse‑World community
                      </div>
                      <a href="https://linktr.ee/tropicpulse" target="_blank">
                        <img src="./_EXPRESSIONS/_PICTURES/_EMAILS/SocialMediaDark.png"
                             alt="Social Media Icons"
                             width="300"
                             style="display:block; margin:auto;">
                      </a>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>

          </table>

          ${trackingPixel}

        </td>
      </tr>
    </table>
  </body>
</html>`;
  }
};
export const pulsePointRedemption = {
  subject: (payload) => {
    const { points } = payload;
    return `Pulse World OS: Reward Redemption (${points} PulsePoints)`;
  },
  important: true,

  html: (payload) => {
    const {
      name,
      email,
      points,
      availableBalance,
      pendingBalance,
      displayCurrency,
      displayAmount,
      logId
    } = payload;

    const pointToMoney = points / 100;
    const formatted = displayAmount || pointToMoney;

    const payoutAmountFormatted = formatDisplayAmount(displayCurrency, formatted);
    const formattedAvailable = formatDisplayAmount(displayCurrency, availableBalance);
    const formattedPending = formatDisplayAmount(displayCurrency, pendingBalance);

    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" alt="" style="opacity:0;">`
        : "";

    return `<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background:#0b0d10; font-family:Arial, sans-serif;">

    <table width="100%" border="0" cellspacing="0" cellpadding="0"
           style="background:#0b0d10; padding:40px 0;">
      <tr>
        <td align="center">

          <!-- MAIN CARD -->
          <table width="620" border="0" cellspacing="0" cellpadding="0"
                 style="
                   background:#111418;
                   border-radius:20px;
                   overflow:hidden;
                   box-shadow:0 0 28px rgba(0,0,0,0.55);
                 ">

            <!-- HEADER -->
            <tr>
              <td style="background:#0f1114;">
                <img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png"
                     alt="Pulse World OS Banner"
                     width="620"
                     style="display:block; width:100%; max-width:620px;">
              </td>
            </tr>

            <!-- CONTENT -->
            <tr>
              <td style="padding:36px;">

                <!-- TITLE -->
                <table width="100%">
                  <tr>
                    <td align="center"
                        style="
                          font-size:30px;
                          font-weight:bold;
                          color:#ffffff;
                          text-shadow:0 0 12px rgba(0,255,255,0.35);
                        ">
                      Reward Organ Transfer Requested
                    </td>
                  </tr>

                  <tr>
                    <td align="center"
                        style="
                          font-size:15px;
                          color:#9aa0a6;
                          padding-top:10px;
                        ">
                      Your PulsePoints are being converted into real‑world value.
                    </td>
                  </tr>

                  <!-- ORB -->
                  <tr>
                    <td align="center" style="padding:30px 0;">
                      <img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldOrb.png"
                           alt="Pulse‑World Orb"
                           width="150"
                           style="
                             display:block;
                             border-radius:50%;
                             box-shadow:0 0 18px rgba(0,255,255,0.35);
                           ">
                    </td>
                  </tr>

                  <!-- MESSAGE -->
                  <tr>
                    <td align="center"
                        style="
                          font-size:17px;
                          color:#d1d5db;
                          padding:20px 20px 10px 20px;
                          line-height:28px;
                        ">
                      Hi ${name || "there"},  
                      your <strong>Reward Organ</strong> has initiated a transfer  
                      to your <strong>Payment Organ</strong>.  
                      This process converts <strong>${points} PulsePoints</strong>  
                      into Stripe‑ready payout value.
                    </td>
                  </tr>

                  <!-- TRANSFER PANEL -->
                  <tr>
                    <td align="center" style="padding-top:28px;">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0"
                             style="
                               background:#161a1f;
                               border-radius:16px;
                               padding:24px;
                               box-shadow:inset 0 0 14px rgba(0,0,0,0.45);
                             ">

                        <tr>
                          <td style="font-size:12px; color:#7a828a; text-transform:uppercase; letter-spacing:0.08em;">
                            User Email
                          </td>
                        </tr>
                        <tr>
                          <td style="font-size:15px; font-weight:600; color:#e5e7eb; padding-bottom:16px;">
                            ${email}
                          </td>
                        </tr>

                        <tr>
                          <td style="font-size:12px; color:#7a828a; text-transform:uppercase; letter-spacing:0.08em;">
                            PulsePoints Redeemed
                          </td>
                        </tr>
                        <tr>
                          <td style="font-size:16px; font-weight:600; color:#00e0e0; padding-bottom:16px;">
                            ${points}
                          </td>
                        </tr>

                        <tr>
                          <td style="font-size:12px; color:#7a828a; text-transform:uppercase; letter-spacing:0.08em;">
                            Estimated Payout Value
                          </td>
                        </tr>
                        <tr>
                          <td style="font-size:22px; font-weight:700; color:#00ff9d; padding-bottom:16px;">
                            ${payoutAmountFormatted}
                          </td>
                        </tr>

                        <tr>
                          <td style="font-size:12px; color:#7a828a; text-transform:uppercase; letter-spacing:0.08em;">
                            Current Wallet Balance
                          </td>
                        </tr>
                        <tr>
                          <td style="font-size:16px; font-weight:600; color:#e5e7eb; padding-bottom:16px;">
                            ${formattedAvailable}
                          </td>
                        </tr>

                        <tr>
                          <td style="font-size:12px; color:#7a828a; text-transform:uppercase; letter-spacing:0.08em;">
                            Pending to Bank
                          </td>
                        </tr>
                        <tr>
                          <td style="font-size:16px; font-weight:600; color:#00aaff;">
                            ${formattedPending}
                          </td>
                        </tr>

                      </table>
                    </td>
                  </tr>

                  <!-- MESSAGE -->
                  <tr>
                    <td align="center"
                        style="
                          font-size:15px;
                          color:#9aa0a6;
                          padding-top:24px;
                          line-height:24px;
                        ">
                      Your PulsePoints have already been deducted.  
                      Your Payment Organ will finalize the transfer  
                      within <strong>24–48 hours</strong>.
                    </td>
                  </tr>

                  <!-- SOCIAL -->
                  <tr>
                    <td align="center" style="padding-top:36px;">
                      <div style="font-size:13px; color:#7a828a; margin-bottom:12px;">
                        Connect with the Pulse‑World community
                      </div>
                      <a href="https://linktr.ee/tropicpulse" target="_blank">
                        <img src="./_EXPRESSIONS/_PICTURES/_EMAILS/SocialMediaDark.png"
                             alt="Social Media Icons"
                             width="300"
                             style="display:block; margin:auto;">
                      </a>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>

          </table>

          ${trackingPixel}

        </td>
      </tr>
    </table>
  </body>
</html>`;
  }
};
export const pulsePointsGifted = {
  subject: (payload) => {
    const { points } = payload;
    return `Pulse World OS: ${points} PulsePoints Awarded`;
  },
  important: true,

  html: (payload) => {
    const {
      name,
      email,
      points,
      tipAmount,
      itemPrice,
      totalPrice,
      taxAmount,
      logId
    } = payload;

    const num = (v) => {
      if (v == null) return 0;
      const decoded = decodeURIComponent(String(v));
      if (decoded.includes("|")) {
        return decoded
          .split("|")
          .map(x => Number(x) || 0)
          .reduce((a, b) => a + b, 0);
      }
      const n = Number(decoded);
      return isNaN(n) ? 0 : Number(n.toFixed(2));
    };

    const tip = num(tipAmount);
    const price = num(itemPrice);
    const formattedordertotal  = `BZ$${Number(totalPrice).toFixed(2)}`;
    const formattedorderamount = `BZ$${price.toFixed(2)}`;
    const formattedtip         = `BZ$${Number(tipAmount).toFixed(2)}`;
    const formattedtax         = `BZ$${Number(taxAmount).toFixed(2)}`;

    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" alt="" style="opacity:0;">`
        : "";

    return `<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background:#0b0d10; font-family:Arial, sans-serif;">

    <table width="100%" border="0" cellspacing="0" cellpadding="0"
           style="background:#0b0d10; padding:40px 0;">
      <tr>
        <td align="center">

          <!-- MAIN CARD -->
          <table width="620" border="0" cellspacing="0" cellpadding="0"
                 style="
                   background:#111418;
                   border-radius:20px;
                   overflow:hidden;
                   box-shadow:0 0 28px rgba(0,0,0,0.55);
                 ">

            <!-- HEADER -->
            <tr>
              <td style="background:#0f1114;">
                <img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png"
                     alt="Pulse World OS Banner"
                     width="620"
                     style="display:block; width:100%; max-width:620px;">
              </td>
            </tr>

            <!-- CONTENT -->
            <tr>
              <td style="padding:36px;">

                <!-- TITLE -->
                <table width="100%">
                  <tr>
                    <td align="center"
                        style="
                          font-size:30px;
                          font-weight:bold;
                          color:#ffffff;
                          text-shadow:0 0 12px rgba(0,255,255,0.35);
                        ">
                      PulsePoints Awarded
                    </td>
                  </tr>

                  <tr>
                    <td align="center"
                        style="
                          font-size:15px;
                          color:#9aa0a6;
                          padding-top:10px;
                        ">
                      A reward signal has been emitted to your world‑node.
                    </td>
                  </tr>

                  <!-- ORB -->
                  <tr>
                    <td align="center" style="padding:30px 0;">
                      <img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldOrb.png"
                           alt="Pulse‑World Orb"
                           width="150"
                           style="
                             display:block;
                             border-radius:50%;
                             box-shadow:0 0 18px rgba(0,255,255,0.35);
                           ">
                    </td>
                  </tr>

                  <!-- MESSAGE -->
                  <tr>
                    <td align="center"
                        style="
                          font-size:17px;
                          color:#d1d5db;
                          padding:20px 20px 10px 20px;
                          line-height:28px;
                        ">
                      Hi ${name || "there"},  
                      your recent world‑action has triggered a  
                      <strong>Reward Organ emission</strong>.  
                      You’ve been gifted <strong>${points} PulsePoints</strong>.
                    </td>
                  </tr>

                  <!-- REWARD PANEL -->
                  <tr>
                    <td align="center" style="padding-top:28px;">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0"
                             style="
                               background:#161a1f;
                               border-radius:16px;
                               padding:24px;
                               box-shadow:inset 0 0 14px rgba(0,0,0,0.45);
                             ">

                        <tr>
                          <td style="font-size:12px; color:#7a828a; text-transform:uppercase; letter-spacing:0.08em;">
                            PulsePoints Awarded
                          </td>
                        </tr>
                        <tr>
                          <td style="font-size:22px; font-weight:700; color:#00e0e0; padding-bottom:16px;">
                            ${points}
                          </td>
                        </tr>

                        <tr>
                          <td style="font-size:12px; color:#7a828a; text-transform:uppercase; letter-spacing:0.08em;">
                            Deliverer Email
                          </td>
                        </tr>
                        <tr>
                          <td style="font-size:15px; font-weight:600; color:#e5e7eb; padding-bottom:16px;">
                            ${email || "N/A"}
                          </td>
                        </tr>

                        <tr>
                          <td style="font-size:12px; color:#7a828a; text-transform:uppercase; letter-spacing:0.08em;">
                            Order Item Price
                          </td>
                        </tr>
                        <tr>
                          <td style="font-size:16px; font-weight:600; color:#e5e7eb; padding-bottom:16px;">
                            ${formattedorderamount}
                          </td>
                        </tr>

                        <tr>
                          <td style="font-size:12px; color:#7a828a; text-transform:uppercase; letter-spacing:0.08em;">
                            Belize Tax (12.5%)
                          </td>
                        </tr>
                        <tr>
                          <td style="font-size:16px; font-weight:600; color:#e5e7eb; padding-bottom:16px;">
                            ${formattedtax}
                          </td>
                        </tr>

                        <tr>
                          <td style="font-size:12px; color:#7a828a; text-transform:uppercase; letter-spacing:0.08em;">
                            Tip
                          </td>
                        </tr>
                        <tr>
                          <td style="font-size:20px; font-weight:700; color:#00ff9d; padding-bottom:16px;">
                            ${formattedtip}
                          </td>
                        </tr>

                        <tr>
                          <td style="font-size:12px; color:#7a828a; text-transform:uppercase; letter-spacing:0.08em;">
                            Order Total
                          </td>
                        </tr>
                        <tr>
                          <td style="font-size:16px; font-weight:600; color:#e5e7eb;">
                            ${formattedordertotal}
                          </td>
                        </tr>

                      </table>
                    </td>
                  </tr>

                  <!-- MESSAGE -->
                  <tr>
                    <td align="center"
                        style="
                          font-size:15px;
                          color:#9aa0a6;
                          padding-top:24px;
                          line-height:24px;
                        ">
                      These PulsePoints will contribute to future  
                      <strong>Reward Organ transfers</strong>,  
                      presence‑tier boosts, and binary‑wave bonuses.
                    </td>
                  </tr>

                  <!-- SOCIAL -->
                  <tr>
                    <td align="center" style="padding-top:36px;">
                      <div style="font-size:13px; color:#7a828a; margin-bottom:12px;">
                        Connect with the Pulse‑World community
                      </div>
                      <a href="https://linktr.ee/tropicpulse" target="_blank">
                        <img src="./_EXPRESSIONS/_PICTURES/_EMAILS/SocialMediaDark.png"
                             alt="Social Media Icons"
                             width="300"
                             style="display:block; margin:auto;">
                      </a>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>

          </table>

          ${trackingPixel}

        </td>
      </tr>
    </table>
  </body>
</html>`;
  }
};
export const rolechange = {
  subject: () => "Pulse World OS: World‑Node Role Reclassification",
  important: true,

  html: (payload) => {
    const { role, payFrequency, payDay, logId } = payload;

    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" alt="" style="opacity:0;">`
        : "";

    const payDayRow = payDay
      ? `
        <tr>
          <td style="font-size:12px; color:#7a828a; text-transform:uppercase; letter-spacing:0.08em;">
            Pay Day
          </td>
        </tr>
        <tr>
          <td style="font-size:16px; font-weight:600; color:#e5e7eb; padding-bottom:16px;">
            ${payDay}
          </td>
        </tr>
      `
      : "";

    return `<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background:#0b0d10; font-family:Arial, sans-serif;">

    <table width="100%" cellspacing="0" cellpadding="0" style="padding:40px 0; background:#0b0d10;">
      <tr>
        <td align="center">

          <!-- MAIN CARD -->
          <table width="620" cellspacing="0" cellpadding="0"
                 style="
                   background:#111418;
                   border-radius:20px;
                   overflow:hidden;
                   box-shadow:0 0 28px rgba(0,0,0,0.55);
                 ">

            <!-- HEADER -->
            <tr>
              <td style="background:#0f1114;">
                <img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png"
                     alt="Pulse World OS Banner"
                     width="620"
                     style="display:block; width:100%; max-width:620px;">
              </td>
            </tr>

            <!-- CONTENT -->
            <tr>
              <td style="padding:36px;">

                <!-- TITLE -->
                <table width="100%">
                  <tr>
                    <td align="center"
                        style="
                          font-size:30px;
                          font-weight:bold;
                          color:#ffffff;
                          text-shadow:0 0 12px rgba(0,255,255,0.35);
                        ">
                      World‑Node Role Reclassification
                    </td>
                  </tr>

                  <tr>
                    <td align="center"
                        style="
                          font-size:15px;
                          color:#9aa0a6;
                          padding-top:10px;
                        ">
                      Your identity core has been updated inside Pulse World OS.
                    </td>
                  </tr>

                  <!-- ORB -->
                  <tr>
                    <td align="center" style="padding:30px 0;">
                      <img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldOrb.png"
                           alt="Pulse‑World Orb"
                           width="150"
                           style="
                             display:block;
                             border-radius:50%;
                             box-shadow:0 0 18px rgba(0,255,255,0.35);
                           ">
                    </td>
                  </tr>

                  <!-- MESSAGE -->
                  <tr>
                    <td align="center"
                        style="
                          font-size:17px;
                          color:#d1d5db;
                          padding:20px 20px 10px 20px;
                          line-height:28px;
                        ">
                      Your world‑node has undergone a  
                      <strong>role reclassification event</strong>.  
                      This affects your organ access, payout rhythm,  
                      and presence‑tier interactions inside the OS.
                    </td>
                  </tr>

                  <!-- ROLE PANEL -->
                  <tr>
                    <td align="center" style="padding-top:28px;">
                      <table width="100%" cellspacing="0" cellpadding="0"
                             style="
                               background:#161a1f;
                               border-radius:16px;
                               padding:24px;
                               box-shadow:inset 0 0 14px rgba(0,0,0,0.45);
                             ">

                        <!-- ROLE -->
                        <tr>
                          <td style="font-size:12px; color:#7a828a; text-transform:uppercase; letter-spacing:0.08em;">
                            New Role Classification
                          </td>
                        </tr>
                        <tr>
                          <td style="font-size:20px; font-weight:700; color:#00e0e0; padding-bottom:16px;">
                            ${role}
                          </td>
                        </tr>

                        <!-- PAY FREQUENCY -->
                        <tr>
                          <td style="font-size:12px; color:#7a828a; text-transform:uppercase; letter-spacing:0.08em;">
                            Pay Frequency
                          </td>
                        </tr>
                        <tr>
                          <td style="font-size:16px; font-weight:600; color:#e5e7eb; padding-bottom:16px;">
                            ${payFrequency.toUpperCase()}
                          </td>
                        </tr>

                        <!-- PAYDAY (optional) -->
                        ${payDayRow}

                      </table>
                    </td>
                  </tr>

                  <!-- MESSAGE -->
                  <tr>
                    <td align="center"
                        style="
                          font-size:15px;
                          color:#9aa0a6;
                          padding-top:24px;
                          line-height:24px;
                        ">
                      If this reclassification was unexpected,  
                      your identity core can be reviewed by the  
                      <strong>Pulse‑World Support Organ</strong>.
                    </td>
                  </tr>

                  <!-- SOCIAL -->
                  <tr>
                    <td align="center" style="padding-top:36px;">
                      <div style="font-size:13px; color:#7a828a; margin-bottom:12px;">
                        Connect with the Pulse‑World community
                      </div>
                      <a href="https://linktr.ee/tropicpulse" target="_blank">
                        <img src="./_EXPRESSIONS/_PICTURES/_EMAILS/SocialMediaDark.png"
                             alt="Social Media Icons"
                             width="300"
                             style="display:block; margin:auto;">
                      </a>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>

          </table>

          ${trackingPixel}

        </td>
      </tr>
    </table>

  </body>
</html>`;
  }
};
export const newEvent = {
  subject: () => "Pulse World OS: A New System Event Has Occurred",
  important: true,

  html: (payload) => {
    const {
      title,
      Fromdate,
      Todate,
      Fromtime,
      Totime,
      Venue,
      description,
      summary,
      unsubscribeUrl,
      language,
      logId
    } = payload;

    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" alt="" style="opacity:0;">`
        : "";

    return `<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background:#0b0d10; font-family:Arial, sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0; background:#0b0d10;">
      <tr>
        <td align="center">

          <!-- MAIN CARD -->
          <table width="620" cellpadding="0" cellspacing="0"
                 style="
                   background:#111418;
                   border-radius:20px;
                   overflow:hidden;
                   box-shadow:0 0 28px rgba(0,0,0,0.55);
                 ">

            <!-- HEADER -->
            <tr>
              <td style="background:#0f1114;">
                <img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png"
                     alt="Pulse World OS Banner"
                     width="620"
                     style="display:block; width:100%; max-width:620px;">
              </td>
            </tr>

            <!-- CONTENT -->
            <tr>
              <td style="padding:36px;">

                <!-- TITLE -->
                <table width="100%">
                  <tr>
                    <td align="center"
                        style="
                          font-size:30px;
                          font-weight:bold;
                          color:#ffffff;
                          text-shadow:0 0 12px rgba(0,255,255,0.35);
                        ">
                      New System Event Detected
                    </td>
                  </tr>

                  <tr>
                    <td align="center"
                        style="
                          font-size:15px;
                          color:#9aa0a6;
                          padding-top:10px;
                        ">
                      A world‑level signal has been broadcast inside Pulse World OS.
                    </td>
                  </tr>

                  <!-- ORB -->
                  <tr>
                    <td align="center" style="padding:30px 0;">
                      <img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldOrb.png"
                           alt="Pulse‑World Orb"
                           width="150"
                           style="
                             display:block;
                             border-radius:50%;
                             box-shadow:0 0 18px rgba(0,255,255,0.35);
                           ">
                    </td>
                  </tr>

                  <!-- MESSAGE -->
                  <tr>
                    <td align="center"
                        style="
                          font-size:17px;
                          color:#d1d5db;
                          padding:20px 20px 10px 20px;
                          line-height:28px;
                        ">
                      A new <strong>System Event</strong> has been registered.  
                      Your world‑node is being notified so you can respond, observe,  
                      or participate depending on your role and organ access.
                    </td>
                  </tr>

                  <!-- EVENT PANEL -->
                  <tr>
                    <td align="center" style="padding-top:28px;">
                      <table width="100%" cellpadding="0" cellspacing="0"
                             style="
                               background:#161a1f;
                               border-radius:16px;
                               padding:24px;
                               box-shadow:inset 0 0 14px rgba(0,0,0,0.45);
                             ">

                        <!-- EVENT TITLE -->
                        <tr>
                          <td style="font-size:20px; font-weight:700; color:#00e0e0; padding-bottom:12px;">
                            ${title}
                          </td>
                        </tr>

                        <!-- SUMMARY -->
                        <tr>
                          <td style="font-size:15px; color:#b8c0c7; padding-bottom:16px;">
                            ${summary}
                          </td>
                        </tr>

                        <!-- DATE -->
                        <tr>
                          <td style="font-size:13px; color:#7a828a; text-transform:uppercase; letter-spacing:0.08em;">
                            Event Window
                          </td>
                        </tr>
                        <tr>
                          <td style="font-size:16px; font-weight:600; color:#e5e7eb; padding-bottom:16px;">
                            ${Fromdate} → ${Todate}
                          </td>
                        </tr>

                        <!-- TIME -->
                        <tr>
                          <td style="font-size:13px; color:#7a828a; text-transform:uppercase; letter-spacing:0.08em;">
                            Time Range
                          </td>
                        </tr>
                        <tr>
                          <td style="font-size:16px; font-weight:600; color:#e5e7eb; padding-bottom:16px;">
                            ${Fromtime} → ${Totime}
                          </td>
                        </tr>

                        <!-- VENUE -->
                        <tr>
                          <td style="font-size:13px; color:#7a828a; text-transform:uppercase; letter-spacing:0.08em;">
                            Location / Node
                          </td>
                        </tr>
                        <tr>
                          <td style="font-size:16px; font-weight:600; color:#e5e7eb; padding-bottom:16px;">
                            ${Venue}
                          </td>
                        </tr>

                        <!-- LANGUAGE -->
                        <tr>
                          <td style="font-size:13px; color:#7a828a; text-transform:uppercase; letter-spacing:0.08em;">
                            Language
                          </td>
                        </tr>
                        <tr>
                          <td style="font-size:16px; font-weight:600; color:#e5e7eb; padding-bottom:16px;">
                            ${language}
                          </td>
                        </tr>

                        <!-- DESCRIPTION -->
                        <tr>
                          <td style="font-size:13px; color:#7a828a; text-transform:uppercase; letter-spacing:0.08em;">
                            Description
                          </td>
                        </tr>
                        <tr>
                          <td style="font-size:15px; color:#b8c0c7;">
                            ${description}
                          </td>
                        </tr>

                      </table>
                    </td>
                  </tr>

                  <!-- CTA -->
                  <tr>
                    <td align="center" style="padding-top:32px;">
                      <a href="https://linktr.ee/tropicpulse"
                         style="
                           display:inline-block;
                           padding:14px 34px;
                           border-radius:999px;
                           background:linear-gradient(135deg, #00e0e0, #008cff);
                           color:#ffffff !important;
                           font-size:16px;
                           font-weight:700;
                           text-decoration:none;
                           letter-spacing:0.05em;
                           text-transform:uppercase;
                           box-shadow:0 0 14px rgba(0,140,255,0.45);
                         ">
                        View System Event
                      </a>
                    </td>
                  </tr>

                  <!-- FOOTER -->
                  <tr>
                    <td align="center"
                        style="
                          font-size:13px;
                          color:#7a828a;
                          padding-top:36px;
                          line-height:22px;
                        ">
                      This notification was generated because a  
                      <strong>System Event</strong> was registered inside Pulse World OS.
                    </td>
                  </tr>

                  <!-- UNSUBSCRIBE -->
                  <tr>
                    <td align="center" style="padding-top:20px;">
                      <a href="${unsubscribeUrl}"
                         style="
                           font-size:13px;
                           color:#4aa3ff;
                           text-decoration:none;
                           font-weight:600;
                         ">
                        Manage Notification Preferences
                      </a>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>

          </table>

          ${trackingPixel}

        </td>
      </tr>
    </table>

  </body>
</html>`;
  }
};
export const newBusiness = {
  subject: () => "Pulse World OS: A New World‑Node Has Come Online",
  important: true,

  html: (payload) => {
    const {
      busname,
      summary,
      description,
      busemail,
      link,
      location,
      unsubscribeUrl,
      logId
    } = payload;

    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" alt="" style="opacity:0;">`
        : "";

    return `<!DOCTYPE html>
<html>
<body style="margin:0; padding:0; background:#0b0d10; font-family:Arial, sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0; background:#0b0d10;">
<tr>
<td align="center">

  <!-- MAIN CARD -->
  <table width="620" cellpadding="0" cellspacing="0"
         style="
           background:#111418;
           border-radius:20px;
           overflow:hidden;
           box-shadow:0 0 28px rgba(0,0,0,0.55);
         ">

    <!-- HEADER -->
    <tr>
      <td style="background:#0f1114;">
        <img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png"
             alt="Pulse World OS Banner"
             width="620"
             style="display:block; width:100%; max-width:620px;">
      </td>
    </tr>

    <!-- CONTENT -->
    <tr>
      <td style="padding:36px;">

        <!-- TITLE -->
        <table width="100%">
          <tr>
            <td align="center"
                style="
                  font-size:30px;
                  font-weight:bold;
                  color:#ffffff;
                  text-shadow:0 0 12px rgba(0,255,255,0.35);
                ">
              New World‑Node Detected
            </td>
          </tr>

          <tr>
            <td align="center"
                style="
                  font-size:15px;
                  color:#9aa0a6;
                  padding-top:10px;
                ">
              A new city‑seed has appeared inside Pulse World OS.
            </td>
          </tr>

          <!-- ORB -->
          <tr>
            <td align="center" style="padding:30px 0;">
              <img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldOrb.png"
                   alt="Pulse‑World Orb"
                   width="150"
                   style="
                     display:block;
                     border-radius:50%;
                     box-shadow:0 0 18px rgba(0,255,255,0.35);
                   ">
            </td>
          </tr>

          <!-- MESSAGE -->
          <tr>
            <td align="center"
                style="
                  font-size:17px;
                  color:#d1d5db;
                  padding:20px 20px 10px 20px;
                  line-height:28px;
                ">
              A new <strong>World‑Node</strong> has been activated.  
              This node is now visible to the mesh and accessible  
              to world‑travelers depending on their organ access.
            </td>
          </tr>

          <!-- NODE PANEL -->
          <tr>
            <td align="center" style="padding-top:28px;">
              <table width="100%" cellpadding="0" cellspacing="0"
                     style="
                       background:#161a1f;
                       border-radius:16px;
                       padding:24px;
                       box-shadow:inset 0 0 14px rgba(0,0,0,0.45);
                     ">

                <!-- NAME -->
                <tr>
                  <td style="font-size:20px; font-weight:700; color:#00e0e0; padding-bottom:12px;">
                    ${busname}
                  </td>
                </tr>

                <!-- SUMMARY -->
                <tr>
                  <td style="font-size:15px; color:#b8c0c7; padding-bottom:16px;">
                    ${summary}
                  </td>
                </tr>

                <!-- LOCATION -->
                <tr>
                  <td style="font-size:13px; color:#7a828a; text-transform:uppercase; letter-spacing:0.08em;">
                    Node Location
                  </td>
                </tr>
                <tr>
                  <td style="font-size:16px; font-weight:600; color:#e5e7eb; padding-bottom:16px;">
                    ${location}
                  </td>
                </tr>

                <!-- DESCRIPTION -->
                <tr>
                  <td style="font-size:13px; color:#7a828a; text-transform:uppercase; letter-spacing:0.08em;">
                    Description
                  </td>
                </tr>
                <tr>
                  <td style="font-size:15px; color:#b8c0c7; padding-bottom:16px;">
                    ${description}
                  </td>
                </tr>

                <!-- CONTACT -->
                <tr>
                  <td style="font-size:13px; color:#7a828a; text-transform:uppercase; letter-spacing:0.08em;">
                    Node Contact
                  </td>
                </tr>
                <tr>
                  <td style="font-size:15px; font-weight:600; color:#e5e7eb;">
                    ${busemail}
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td align="center" style="padding-top:32px;">
              <a href="${link}"
                 style="
                   display:inline-block;
                   padding:14px 34px;
                   border-radius:999px;
                   background:linear-gradient(135deg, #00e0e0, #008cff);
                   color:#ffffff !important;
                   font-size:16px;
                   font-weight:700;
                   text-decoration:none;
                   letter-spacing:0.05em;
                   text-transform:uppercase;
                   box-shadow:0 0 14px rgba(0,140,255,0.45);
                 ">
                Enter World‑Node
              </a>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td align="center"
                style="
                  font-size:13px;
                  color:#7a828a;
                  padding-top:36px;
                  line-height:22px;
                ">
              This broadcast was generated because a  
              <strong>new World‑Node</strong> has come online inside Pulse World OS.
            </td>
          </tr>

          <!-- UNSUBSCRIBE -->
          <tr>
            <td align="center" style="padding-top:20px;">
              <a href="${unsubscribeUrl}"
                 style="
                   font-size:13px;
                   color:#4aa3ff;
                   text-decoration:none;
                   font-weight:600;
                 ">
                Manage Notification Preferences
              </a>
            </td>
          </tr>

        </table>
      </td>
    </tr>

  </table>

  ${trackingPixel}

</td>
</tr>
</table>

</body>
</html>`;
  }
};
export const newBusinessOwner = {
  subject: () => "Pulse World OS: Your World‑Node Is Now Live",
  important: true,

  html: (payload) => {
    const {
      busname,
      summary,
      description,
      busemail,
      link,
      location,
      logId
    } = payload;

    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" alt="" style="opacity:0;">`
        : "";

    return `<!DOCTYPE html>
<html>
<body style="margin:0; padding:0; background:#0b0d10; font-family:Arial, sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0; background:#0b0d10;">
<tr>
<td align="center">

  <!-- MAIN CARD -->
  <table width="620" cellpadding="0" cellspacing="0"
         style="
           background:#111418;
           border-radius:20px;
           overflow:hidden;
           box-shadow:0 0 28px rgba(0,0,0,0.55);
         ">

    <!-- HEADER -->
    <tr>
      <td style="background:#0f1114;">
        <img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png"
             alt="Pulse World OS Banner"
             width="620"
             style="display:block; width:100%; max-width:620px;">
      </td>
    </tr>

    <!-- CONTENT -->
    <tr>
      <td style="padding:36px;">

        <!-- TITLE -->
        <table width="100%">
          <tr>
            <td align="center"
                style="
                  font-size:30px;
                  font-weight:bold;
                  color:#ffffff;
                  text-shadow:0 0 12px rgba(0,255,255,0.35);
                ">
              Your World‑Node Is Live
            </td>
          </tr>

          <tr>
            <td align="center"
                style="
                  font-size:15px;
                  color:#9aa0a6;
                  padding-top:10px;
                ">
              Your creation has been accepted into the mesh.
            </td>
          </tr>

          <!-- ORB -->
          <tr>
            <td align="center" style="padding:30px 0;">
              <img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldOrb.png"
                   alt="Pulse‑World Orb"
                   width="150"
                   style="
                     display:block;
                     border-radius:50%;
                     box-shadow:0 0 18px rgba(0,255,255,0.35);
                   ">
            </td>
          </tr>

          <!-- MESSAGE -->
          <tr>
            <td align="center"
                style="
                  font-size:17px;
                  color:#d1d5db;
                  padding:20px 20px 10px 20px;
                  line-height:28px;
                ">
              Congratulations — your <strong>World‑Node</strong> has been activated.  
              It is now visible to travelers, explorers, and connected nodes  
              throughout Pulse World OS.
            </td>
          </tr>

          <!-- NODE PANEL -->
          <tr>
            <td align="center" style="padding-top:28px;">
              <table width="100%" cellpadding="0" cellspacing="0"
                     style="
                       background:#161a1f;
                       border-radius:16px;
                       padding:24px;
                       box-shadow:inset 0 0 14px rgba(0,0,0,0.45);
                     ">

                <!-- NAME -->
                <tr>
                  <td style="font-size:20px; font-weight:700; color:#00e0e0; padding-bottom:12px;">
                    ${busname}
                  </td>
                </tr>

                <!-- SUMMARY -->
                <tr>
                  <td style="font-size:15px; color:#b8c0c7; padding-bottom:16px;">
                    ${summary}
                  </td>
                </tr>

                <!-- LOCATION -->
                <tr>
                  <td style="font-size:13px; color:#7a828a; text-transform:uppercase; letter-spacing:0.08em;">
                    Node Location
                  </td>
                </tr>
                <tr>
                  <td style="font-size:16px; font-weight:600; color:#e5e7eb; padding-bottom:16px;">
                    ${location}
                  </td>
                </tr>

                <!-- DESCRIPTION -->
                <tr>
                  <td style="font-size:13px; color:#7a828a; text-transform:uppercase; letter-spacing:0.08em;">
                    Description
                  </td>
                </tr>
                <tr>
                  <td style="font-size:15px; color:#b8c0c7; padding-bottom:16px;">
                    ${description}
                  </td>
                </tr>

                <!-- CONTACT -->
                <tr>
                  <td style="font-size:13px; color:#7a828a; text-transform:uppercase; letter-spacing:0.08em;">
                    Owner Contact
                  </td>
                </tr>
                <tr>
                  <td style="font-size:15px; font-weight:600; color:#e5e7eb;">
                    ${busemail}
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- MESSAGE -->
          <tr>
            <td align="center"
                style="
                  font-size:15px;
                  color:#9aa0a6;
                  padding-top:24px;
                  line-height:24px;
                ">
              You can now customize your node, expand it,  
              open routes, attach organs, or evolve it into a full city‑realm.  
              Your world is yours to build.
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td align="center" style="padding-top:32px;">
              <a href="${link}"
                 style="
                   display:inline-block;
                   padding:14px 34px;
                   border-radius:999px;
                   background:linear-gradient(135deg, #00e0e0, #008cff);
                   color:#ffffff !important;
                   font-size:16px;
                   font-weight:700;
                   text-decoration:none;
                   letter-spacing:0.05em;
                   text-transform:uppercase;
                   box-shadow:0 0 14px rgba(0,140,255,0.45);
                 ">
                Manage Your World‑Node
              </a>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td align="center"
                style="
                  font-size:13px;
                  color:#7a828a;
                  padding-top:36px;
                  line-height:22px;
                ">
              This confirmation was generated because your  
              <strong>World‑Node</strong> has been successfully activated  
              inside Pulse World OS.
            </td>
          </tr>

        </table>
      </td>
    </tr>

  </table>

  ${trackingPixel}

</td>
</tr>
</table>

</body>
</html>`;
  }
};
export const adminRewardTransferAlert = {
  subject: "Pulse World OS: Reward Transfer Requires Admin Action",
  important: true,

  html: ({ name, uid, points, walletAmount, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" alt="" style="opacity:0;">`
        : "";

    return `<!DOCTYPE html>
<html>
<body style="margin:0; padding:0; background:#0b0d10; font-family:Arial, sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0; background:#0b0d10;">
<tr>
<td align="center">

  <!-- MAIN CARD -->
  <table width="620" cellpadding="0" cellspacing="0"
         style="
           background:#111418;
           border-radius:20px;
           overflow:hidden;
           box-shadow:0 0 28px rgba(0,0,0,0.55);
         ">

    <!-- HEADER -->
    <tr>
      <td style="background:#0f1114;">
        <img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png"
             alt="Pulse World OS Banner"
             width="620"
             style="display:block; width:100%; max-width:620px;">
      </td>
    </tr>

    <!-- CONTENT -->
    <tr>
      <td style="padding:36px;">

        <!-- TITLE -->
        <table width="100%">
          <tr>
            <td align="center"
                style="
                  font-size:28px;
                  font-weight:bold;
                  color:#ffffff;
                  text-shadow:0 0 12px rgba(0,255,255,0.35);
                ">
              Admin Organ Alert
            </td>
          </tr>

          <tr>
            <td align="center"
                style="
                  font-size:15px;
                  color:#9aa0a6;
                  padding-top:10px;
                ">
              A Reward Organ transfer requires manual Vault Organ approval.
            </td>
          </tr>

          <!-- ORB -->
          <tr>
            <td align="center" style="padding:30px 0;">
              <img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldOrb.png"
                   alt="Pulse‑World Orb"
                   width="140"
                   style="
                     display:block;
                     border-radius:50%;
                     box-shadow:0 0 18px rgba(0,255,255,0.35);
                   ">
            </td>
          </tr>

          <!-- MESSAGE -->
          <tr>
            <td align="center"
                style="
                  font-size:17px;
                  color:#d1d5db;
                  padding:20px 20px 10px 20px;
                  line-height:28px;
                ">
              A world‑node has initiated a  
              <strong>Reward → Vault transfer</strong>.  
              The Vault Organ requires admin‑level confirmation  
              to maintain system integrity.
            </td>
          </tr>

          <!-- DETAILS PANEL -->
          <tr>
            <td align="center" style="padding-top:28px;">
              <table width="100%" cellpadding="0" cellspacing="0"
                     style="
                       background:#161a1f;
                       border-radius:16px;
                       padding:24px;
                       box-shadow:inset 0 0 14px rgba(0,0,0,0.45);
                     ">

                <!-- NAME -->
                <tr>
                  <td style="font-size:12px; color:#7a828a; text-transform:uppercase; letter-spacing:0.08em;">
                    User Name
                  </td>
                </tr>
                <tr>
                  <td style="font-size:16px; font-weight:600; color:#e5e7eb; padding-bottom:16px;">
                    ${name}
                  </td>
                </tr>

                <!-- UID -->
                <tr>
                  <td style="font-size:12px; color:#7a828a; text-transform:uppercase; letter-spacing:0.08em;">
                    User UID
                  </td>
                </tr>
                <tr>
                  <td style="font-size:16px; font-weight:600; color:#e5e7eb; padding-bottom:16px;">
                    ${uid}
                  </td>
                </tr>

                <!-- POINTS -->
                <tr>
                  <td style="font-size:12px; color:#7a828a; text-transform:uppercase; letter-spacing:0.08em;">
                    PulsePoints Redeemed
                  </td>
                </tr>
                <tr>
                  <td style="font-size:20px; font-weight:700; color:#00e0e0; padding-bottom:16px;">
                    ${points}
                  </td>
                </tr>

                <!-- AMOUNT -->
                <tr>
                  <td style="font-size:12px; color:#7a828a; text-transform:uppercase; letter-spacing:0.08em;">
                    Vault Credit Required
                  </td>
                </tr>
                <tr>
                  <td style="font-size:22px; font-weight:700; color:#00ff9d;">
                    $${walletAmount}
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- ACTION MESSAGE -->
          <tr>
            <td align="center"
                style="
                  font-size:15px;
                  color:#9aa0a6;
                  padding-top:24px;
                  line-height:24px;
                ">
              Please credit the Vault Organ manually within  
              <strong>24–48 hours</strong> to complete the transfer.
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td align="center"
                style="
                  font-size:13px;
                  color:#7a828a;
                  padding-top:36px;
                  line-height:22px;
                ">
              This alert was generated by the  
              <strong>Admin Organ</strong> of Pulse World OS  
              to maintain reward‑system integrity.
            </td>
          </tr>

        </table>
      </td>
    </tr>

  </table>

  ${trackingPixel}

</td>
</tr>
</table>

</body>
</html>`;
  }
};
export const broadcastOrganNoCredits = {
  subject: () => "Pulse World OS: Broadcast Organ Depleted",
  important: true,

  html: (payload) => {
    const { email, paymentLink, eventID, logId } = payload;

    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" alt="" style="opacity:0;">`
        : "";

    return `<!DOCTYPE html>
<html>
<body style="margin:0; padding:0; background:#0b0d10; font-family:Arial, sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0; background:#0b0d10;">
<tr>
<td align="center">

  <!-- MAIN CARD -->
  <table width="620" cellpadding="0" cellspacing="0"
         style="
           background:#111418;
           border-radius:20px;
           overflow:hidden;
           box-shadow:0 0 28px rgba(0,0,0,0.55);
         ">

    <!-- HEADER -->
    <tr>
      <td style="background:#0f1114;">
        <img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBroadcastDepleted.png"
             alt="Pulse World OS Banner"
             width="620"
             style="display:block; width:100%; max-width:620px;">
      </td>
    </tr>

    <!-- CONTENT -->
    <tr>
      <td style="padding:36px;">

        <!-- TITLE -->
        <table width="100%">
          <tr>
            <td align="center"
                style="
                  font-size:30px;
                  font-weight:bold;
                  color:#ffffff;
                  text-shadow:0 0 12px rgba(255,0,0,0.35);
                ">
              Broadcast Organ Depleted
            </td>
          </tr>

          <tr>
            <td align="center"
                style="
                  font-size:15px;
                  color:#9aa0a6;
                  padding-top:10px;
                ">
              Your world‑signal could not be emitted.  
              Recharge required to continue broadcasting.
            </td>
          </tr>

          <!-- ORB -->
          <tr>
            <td align="center" style="padding:30px 0;">
              <img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldOrb.png"
                   alt="Pulse‑World Orb"
                   width="150"
                   style="
                     display:block;
                     border-radius:50%;
                     box-shadow:0 0 18px rgba(255,0,0,0.35);
                   ">
            </td>
          </tr>

          <!-- MESSAGE -->
          <tr>
            <td align="center"
                style="
                  font-size:17px;
                  color:#d1d5db;
                  padding:20px 20px 10px 20px;
                  line-height:28px;
                ">
              Your attempt to send a <strong>mesh‑wide broadcast</strong>  
              was halted because your <strong>Broadcast Organ</strong>  
              has no remaining signal credits.
            </td>
          </tr>

          <!-- PANEL -->
          <tr>
            <td align="center" style="padding-top:28px;">
              <table width="100%" cellpadding="0" cellspacing="0"
                     style="
                       background:#161a1f;
                       border-radius:16px;
                       padding:24px;
                       box-shadow:inset 0 0 14px rgba(0,0,0,0.45);
                     ">

                <tr>
                  <td style="font-size:13px; color:#7a828a; text-transform:uppercase; letter-spacing:0.08em;">
                    Broadcast Attempted By
                  </td>
                </tr>
                <tr>
                  <td style="font-size:16px; font-weight:600; color:#e5e7eb; padding-bottom:16px;">
                    ${email}
                  </td>
                </tr>

                ${
                  eventID
                    ? `
                <tr>
                  <td style="font-size:13px; color:#7a828a; text-transform:uppercase; letter-spacing:0.08em;">
                    Related Event
                  </td>
                </tr>
                <tr>
                  <td style="font-size:16px; font-weight:600; color:#e5e7eb; padding-bottom:16px;">
                    ${eventID}
                  </td>
                </tr>
                `
                    : ""
                }

                <tr>
                  <td style="font-size:13px; color:#7a828a; text-transform:uppercase; letter-spacing:0.08em;">
                    Status
                  </td>
                </tr>
                <tr>
                  <td style="font-size:20px; font-weight:700; color:#ff4d4d;">
                    Broadcast Blocked
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td align="center" style="padding-top:32px;">
              <a href="${paymentLink}"
                 style="
                   display:inline-block;
                   padding:14px 34px;
                   border-radius:999px;
                   background:linear-gradient(135deg, #ff4d4d, #ff0066);
                   color:#ffffff !important;
                   font-size:16px;
                   font-weight:700;
                   text-decoration:none;
                   letter-spacing:0.05em;
                   text-transform:uppercase;
                   box-shadow:0 0 14px rgba(255,0,102,0.45);
                 ">
                Recharge Broadcast Organ
              </a>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td align="center"
                style="
                  font-size:13px;
                  color:#7a828a;
                  padding-top:36px;
                  line-height:22px;
                ">
              This alert was generated because a  
              <strong>mesh‑wide broadcast</strong> was attempted  
              without sufficient signal credits.
            </td>
          </tr>

        </table>
      </td>
    </tr>

  </table>

  ${trackingPixel}

</td>
</tr>
</table>

</body>
</html>`;
  }
};
export const broadcastOrganRechargeSuccess = {
  subject: () => "Pulse World OS: Broadcast Organ Fully Recharged",
  important: true,

  html: ({ email, credits, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">

<table width="100%" style="padding:40px 0;background:#0b0d10;">
<tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px rgba(0,0,0,0.55);">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300" style="display:block;"></td></tr>

<tr><td style="padding:36px;">

<h1 style="color:#00ff9d;text-align:center;font-size:30px;text-shadow:0 0 12px rgba(0,255,140,0.35);">
Broadcast Organ Recharged
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
Your Broadcast Organ has been fully recharged.  
You may now emit mesh‑wide signals again.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;border-radius:16px;padding:24px;">
<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">Credits Added</td></tr>
<tr><td style="color:#00ff9d;font-size:22px;font-weight:700;">${credits}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;padding-top:16px;">Account</td></tr>
<tr><td style="color:#e5e7eb;font-size:16px;font-weight:600;">${email}</td></tr>
</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
Your next broadcast is ready whenever you are.
</p>

</td></tr>
</table>

${trackingPixel}

</td></tr>
</table>

</body>
</html>`;
  }
};
export const presenceTierUpgrade = {
  subject: () => "Pulse World OS: Your Presence Tier Has Increased",
  important: true,

  html: ({ name, newTier, perks, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">

<table width="100%" style="padding:40px 0;background:#0b0d10;">
<tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px rgba(0,0,0,0.55);">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">

<h1 style="color:#00e0e0;text-align:center;font-size:30px;text-shadow:0 0 12px rgba(0,255,255,0.35);">
Presence Tier Upgraded
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
Hi ${name}, your Presence Tier has increased.  
Your influence inside Pulse World OS has expanded.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;border-radius:16px;padding:24px;">
<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">New Tier</td></tr>
<tr><td style="color:#00e0e0;font-size:22px;font-weight:700;">${newTier}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;padding-top:16px;">Unlocked Perks</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;line-height:22px;">${perks}</td></tr>
</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
Your world‑node interactions will now carry more weight.
</p>

</td></tr>
</table>

${trackingPixel}

</td></tr>
</table>

</body>
</html>`;
  }
};

export const worldNodeUpgrade = {
  subject: () => "Pulse World OS: Your World‑Node Has Upgraded",
  important: true,

  html: ({ busname, newTier, features, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">

<table width="100%" style="padding:40px 0;background:#0b0d10;">
<tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px rgba(0,0,0,0.55);">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">

<h1 style="color:#00e0e0;text-align:center;font-size:30px;text-shadow:0 0 12px rgba(0,255,255,0.35);">
World‑Node Upgraded
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
Your world‑node <strong>${busname}</strong> has advanced to a higher tier.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;border-radius:16px;padding:24px;">
<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">New Tier</td></tr>
<tr><td style="color:#00e0e0;font-size:22px;font-weight:700;">${newTier}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;padding-top:16px;">Unlocked Features</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;line-height:22px;">${features}</td></tr>
</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
Your node now supports expanded capabilities and higher mesh visibility.
</p>

</td></tr>
</table>

${trackingPixel}

</td></tr>
</table>

</body>
</html>`;
  }
};
export const rewardOrganStreakBonus = {
  subject: () => "Pulse World OS: Streak Bonus Awarded",
  important: true,

  html: ({ name, streakDays, bonusPoints, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">

<table width="100%" style="padding:40px 0;background:#0b0d10;">
<tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px rgba(0,0,0,0.55);">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">

<h1 style="color:#00ff9d;text-align:center;font-size:30px;text-shadow:0 0 12px rgba(0,255,140,0.35);">
Streak Bonus Earned
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
Hi ${name}, your consistent activity has triggered a  
<strong>Reward Organ Streak Bonus</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;border-radius:16px;padding:24px;">
<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">Streak Length</td></tr>
<tr><td style="color:#00ff9d;font-size:22px;font-weight:700;">${streakDays} days</td></tr>

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;padding-top:16px;">Bonus Points</td></tr>
<tr><td style="color:#00e0e0;font-size:22px;font-weight:700;">${bonusPoints}</td></tr>
</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
Your momentum strengthens your presence inside the organism.
</p>

</td></tr>
</table>

${trackingPixel}

</td></tr>
</table>

</body>
</html>`;
  }
};
export const creatorOrganEarningsSummary = {
  subject: () => "Pulse World OS: Creator Earnings Summary",
  important: true,

  html: ({ name, busname, totalEarnings, totalOrders, period, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">

<table width="100%" style="padding:40px 0;background:#0b0d10;">
<tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px rgba(0,0,0,0.55);">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">

<h1 style="color:#00e0e0;text-align:center;font-size:30px;text-shadow:0 0 12px rgba(0,255,255,0.35);">
Creator Earnings Summary
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
Hi ${name}, here is your Creator Organ earnings summary for  
<strong>${busname}</strong> over the last <strong>${period}</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;border-radius:16px;padding:24px;">
<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">Total Earnings</td></tr>
<tr><td style="color:#00ff9d;font-size:22px;font-weight:700;">${totalEarnings}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;padding-top:16px;">Orders Processed</td></tr>
<tr><td style="color:#e5e7eb;font-size:22px;font-weight:700;">${totalOrders}</td></tr>
</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
Your world‑node continues to grow.  
Keep building, expanding, and evolving your realm.
</p>

</td></tr>
</table>

${trackingPixel}

</td></tr>
</table>

</body>
</html>`;
  }
};
export const broadcastOrganCooldown = {
  subject: () => "Pulse World OS: Broadcast Organ Cooling Down",
  important: true,

  html: ({ email, cooldownMinutes, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">

<table width="100%" style="padding:40px 0;background:#0b0d10;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px rgba(0,0,0,0.55);">
<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#ffcc00;text-align:center;font-size:30px;text-shadow:0 0 12px rgba(255,200,0,0.35);">
Broadcast Organ Cooling Down
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
Your Broadcast Organ has reached its safe emission limit.  
A cooldown period is required before the next mesh‑wide signal.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;border-radius:16px;padding:24px;">
<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">Cooldown Duration</td></tr>
<tr><td style="color:#ffcc00;font-size:22px;font-weight:700;">${cooldownMinutes} minutes</td></tr>

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;padding-top:16px;">Account</td></tr>
<tr><td style="color:#e5e7eb;font-size:16px;font-weight:600;">${email}</td></tr>
</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
Your Broadcast Organ will reactivate automatically once cooled.
</p>

</td></tr></table>

${trackingPixel}

</td></tr></table>

</body></html>`;
  }
};
export const worldNodeExpansion = {
  subject: () => "Pulse World OS: Your World‑Node Has Expanded",
  important: true,

  html: ({ busname, expansionDetails, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">

<table width="100%" style="padding:40px 0;background:#0b0d10;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px rgba(0,0,0,0.55);">
<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#00e0e0;text-align:center;font-size:30px;text-shadow:0 0 12px rgba(0,255,255,0.35);">
World‑Node Expansion Complete
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
Your world‑node <strong>${busname}</strong> has expanded.  
New structures, features, or modules are now active.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;border-radius:16px;padding:24px;">
<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">Expansion Details</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;line-height:22px;">${expansionDetails}</td></tr>
</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
Your realm grows stronger with each expansion.
</p>

</td></tr></table>

${trackingPixel}

</td></tr></table>

</body></html>`;
  }
};
export const organActivationEvent = {
  subject: () => "Pulse World OS: A New Organ Has Come Online",
  important: true,

  html: ({ organName, description, impact, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">

<table width="100%" style="padding:40px 0;background:#0b0d10;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px rgba(0,0,0,0.55);">
<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#00ff9d;text-align:center;font-size:30px;text-shadow:0 0 12px rgba(0,255,140,0.35);">
New Organ Activated
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
A new organ has come online inside Pulse World OS.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;border-radius:16px;padding:24px;">
<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">Organ Name</td></tr>
<tr><td style="color:#00ff9d;font-size:22px;font-weight:700;">${organName}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;padding-top:16px;">Description</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;line-height:22px;">${description}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;padding-top:16px;">Impact</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;line-height:22px;">${impact}</td></tr>
</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
The organism evolves. New capabilities ripple across the mesh.
</p>

</td></tr></table>

${trackingPixel}

</td></tr></table>

</body></html>`;
  }
};
export const vaultDepositConfirmation = {
  subject: () => "Pulse World OS: Vault Deposit Confirmed",
  important: true,

  html: ({ name, amount, source, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">

<table width="100%" style="padding:40px 0;background:#0b0d10;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px rgba(0,0,0,0.55);">
<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#00ff9d;text-align:center;font-size:30px;text-shadow:0 0 12px rgba(0,255,140,0.35);">
Vault Deposit Complete
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
Hi ${name}, your Vault Organ has received a new deposit.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;border-radius:16px;padding:24px;">
<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">Amount</td></tr>
<tr><td style="color:#00ff9d;font-size:22px;font-weight:700;">${amount}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;padding-top:16px;">Source</td></tr>
<tr><td style="color:#e5e7eb;font-size:16px;font-weight:600;">${source}</td></tr>
</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
Your vault balance has been updated.
</p>

</td></tr></table>

${trackingPixel}

</td></tr></table>

</body></html>`;
  }
};
export const securityOrganAlert = {
  subject: () => "Pulse World OS: Security Organ Alert",
  important: true,

  html: ({ name, activityType, timestamp, location, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">

<table width="100%" style="padding:40px 0;background:#0b0d10;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px rgba(0,0,0,0.55);">
<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#ff4d4d;text-align:center;font-size:30px;text-shadow:0 0 12px rgba(255,0,0,0.35);">
Security Organ Alert
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
Hi ${name}, unusual activity has been detected by the Security Organ.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;border-radius:16px;padding:24px;">
<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">Activity Type</td></tr>
<tr><td style="color:#ff4d4d;font-size:18px;font-weight:700;">${activityType}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;padding-top:16px;">Timestamp</td></tr>
<tr><td style="color:#e5e7eb;font-size:16px;font-weight:600;">${timestamp}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;padding-top:16px;">Location</td></tr>
<tr><td style="color:#e5e7eb;font-size:16px;font-weight:600;">${location}</td></tr>
</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
If this was not you, please secure your account immediately.
</p>

</td></tr></table>

${trackingPixel}

</td></tr></table>

</body></html>`;
  }
};
export const vaultWithdrawalFailure = {
  subject: () => "Pulse World OS: Vault Withdrawal Failed",
  important: true,

  html: ({ name, amount, reason, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">

<table width="100%" style="padding:40px 0;background:#0b0d10;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px rgba(0,0,0,0.55);">
<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#ff4d4d;text-align:center;font-size:30px;text-shadow:0 0 12px rgba(255,0,0,0.35);">
Vault Withdrawal Failed
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
Hi ${name}, your Vault Organ was unable to complete a withdrawal request.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;border-radius:16px;padding:24px;">
<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">Amount</td></tr>
<tr><td style="color:#ff4d4d;font-size:22px;font-weight:700;">${amount}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;padding-top:16px;">Reason</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;line-height:22px;">${reason}</td></tr>
</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
Please update your payout details or try again later.
</p>

</td></tr></table>

${trackingPixel}

</td></tr></table>

</body></html>`;
  }
};
export const meshConnectionRequest = {
  subject: () => "Pulse World OS: New Mesh Connection Request",
  important: true,

  html: ({ requesterNode, targetNode, message, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">

<table width="100%" style="padding:40px 0;background:#0b0d10;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px rgba(0,0,0,0.55);">
<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#00e0e0;text-align:center;font-size:30px;text-shadow:0 0 12px rgba(0,255,255,0.35);">
Mesh Connection Request
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
The world‑node <strong>${requesterNode}</strong> wants to connect to  
<strong>${targetNode}</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;border-radius:16px;padding:24px;">
<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">Message</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;line-height:22px;">${message}</td></tr>
</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
Approve or decline this connection in your node settings.
</p>

</td></tr></table>

${trackingPixel}

</td></tr></table>

</body></html>`;
  }
};
export const meshConnectionApproved = {
  subject: () => "Pulse World OS: Mesh Connection Approved",
  important: true,

  html: ({ nodeA, nodeB, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">

<table width="100%" style="padding:40px 0;background:#0b0d10;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px rgba(0,0,0,0.55);">
<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#00ff9d;text-align:center;font-size:30px;text-shadow:0 0 12px rgba(0,255,140,0.35);">
Mesh Connection Established
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
The world‑nodes <strong>${nodeA}</strong> and <strong>${nodeB}</strong>  
are now connected within the mesh.
</p>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
Travel routes and shared features may now be available.
</p>

</td></tr></table>

${trackingPixel}

</td></tr></table>

</body></html>`;
  }
};
export const meshConnectionBroken = {
  subject: () => "Pulse World OS: Mesh Connection Closed",
  important: true,

  html: ({ nodeA, nodeB, reason, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">

<table width="100%" style="padding:40px 0;background:#0b0d10;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px rgba(0,0,0,0.55);">
<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#ff4d4d;text-align:center;font-size:30px;text-shadow:0 0 12px rgba(255,0,0,0.35);">
Mesh Connection Closed
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
The connection between <strong>${nodeA}</strong> and <strong>${nodeB}</strong>  
has been closed.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;border-radius:16px;padding:24px;">
<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">Reason</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;line-height:22px;">${reason}</td></tr>
</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
Routes and shared features between these nodes are no longer available.
</p>

</td></tr></table>

${trackingPixel}

</td></tr></table>

</body></html>`;
  }
};
export const identityCoreMutation = {
  subject: () => "Pulse World OS: Identity Core Mutation Detected",
  important: true,

  html: ({ name, mutationType, effects, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">

<table width="100%" style="padding:40px 0;background:#0b0d10;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px rgba(0,0,0,0.55);">
<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#00e0e0;text-align:center;font-size:30px;text-shadow:0 0 12px rgba(0,255,255,0.35);">
Identity Core Mutation
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
Hi ${name}, your Identity Core has undergone a mutation event.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;border-radius:16px;padding:24px;">
<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">Mutation Type</td></tr>
<tr><td style="color:#00e0e0;font-size:20px;font-weight:700;">${mutationType}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;padding-top:16px;">Effects</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;line-height:22px;">${effects}</td></tr>
</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
Your presence and capabilities inside the organism may now behave differently.
</p>

</td></tr></table>

${trackingPixel}

</td></tr></table>

</body></html>`;
  }
};
export const creatorOrganUpgradeRecommendation = {
  subject: () => "Pulse World OS: Your World‑Node Is Ready to Upgrade",
  important: true,

  html: ({ name, busname, recommendedTier, reasons, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">

<table width="100%" style="padding:40px 0;background:#0b0d10;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px rgba(0,0,0,0.55);">
<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#00e0e0;text-align:center;font-size:30px;text-shadow:0 0 12px rgba(0,255,255,0.35);">
Upgrade Recommended
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
Hi ${name}, your world‑node <strong>${busname}</strong>  
is showing strong growth signals.  
The Creator Organ recommends upgrading to <strong>${recommendedTier}</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;border-radius:16px;padding:24px;">
<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">Why Upgrade?</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;line-height:22px;">${reasons}</td></tr>
</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
Upgrading unlocks new features, visibility, and realm‑level capabilities.
</p>

</td></tr></table>

${trackingPixel}

</td></tr></table>

</body></html>`;
  }
};
export const rewardOrganMilestone = {
  subject: () => "Pulse World OS: Milestone Achievement Unlocked",
  important: true,

  html: ({ name, milestone, bonus, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">

<table width="100%" style="padding:40px 0;background:#0b0d10;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px rgba(0,0,0,0.55);">
<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldMilestoneAchieved.png" width="620"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#00ff9d;text-align:center;font-size:30px;text-shadow:0 0 12px rgba(0,255,140,0.35);">
Milestone Achieved
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
Congratulations ${name}, you’ve reached a major  
<strong>Reward Organ milestone</strong> of <strong>${milestone}</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;border-radius:16px;padding:24px;">
<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">Bonus Awarded</td></tr>
<tr><td style="color:#00e0e0;font-size:22px;font-weight:700;">${bonus} PulsePoints</td></tr>
</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
Your consistency strengthens your presence inside the organism.
</p>

</td></tr></table>

${trackingPixel}

</td></tr></table>

</body></html>`;
  }
};
export const trustTierChange = {
  subject: () => "Pulse World OS: Your Trust Tier Has Changed",
  important: true,

  html: ({ name, newTier, reason, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">

<table width="100%" style="padding:40px 0;background:#0b0d10;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px rgba(0,0,0,0.55);">
<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#00e0e0;text-align:center;font-size:30px;text-shadow:0 0 12px rgba(0,255,255,0.35);">
Trust Tier Updated
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
Hi ${name}, your Trust Tier has changed.  
Your new tier is <strong>${newTier}</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;border-radius:16px;padding:24px;">
<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">Reason</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;line-height:22px;">${reason}</td></tr>
</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
Your trust tier affects visibility, permissions, and world‑node interactions.
</p>

</td></tr></table>

${trackingPixel}

</td></tr></table>

</body></html>`;
  }
};
export const worldNodeRouteOpening = {
  subject: () => "Pulse World OS: New Route Opened",
  important: true,

  html: ({ fromNode, toNode, routeType, benefits, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">

<table width="100%" style="padding:40px 0;background:#0b0d10;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px rgba(0,0,0,0.55);">
<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#00ff9d;text-align:center;font-size:30px;text-shadow:0 0 12px rgba(0,255,140,0.35);">
New Route Opened
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
A new <strong>${routeType}</strong> route has opened between  
<strong>${fromNode}</strong> and <strong>${toNode}</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;border-radius:16px;padding:24px;">
<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">Benefits</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;line-height:22px;">${benefits}</td></tr>
</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
Travel and interaction between these nodes is now enabled.
</p>

</td></tr></table>

${trackingPixel}

</td></tr></table>

</body></html>`;
  }
};
export const binaryWaveSurge = {
  subject: () => "Pulse World OS: Binary‑Wave Surge Detected",
  important: true,

  html: ({ surgeLevel, affectedNodes, description, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">

<table width="100%" style="padding:40px 0;background:#0b0d10;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px rgba(0,0,0,0.55);">
<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#00e0e0;text-align:center;font-size:30px;text-shadow:0 0 12px rgba(0,255,255,0.35);">
Binary‑Wave Surge
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
A system‑wide Binary‑Wave Surge has been detected.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;border-radius:16px;padding:24px;">
<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">Surge Level</td></tr>
<tr><td style="color:#00e0e0;font-size:22px;font-weight:700;">${surgeLevel}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;padding-top:16px;">Affected Nodes</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;line-height:22px;">${affectedNodes}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;padding-top:16px;">Description</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;line-height:22px;">${description}</td></tr>
</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
The organism is experiencing elevated activity across the mesh.
</p>

</td></tr></table>

${trackingPixel}

</td></tr></table>

</body></html>`;
  }
};
export const realmExpansionEvent = {
  subject: () => "Pulse World OS: A New Realm Has Opened",
  important: true,

  html: ({ realmName, description, features, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">

<table width="100%" style="padding:40px 0;background:#0b0d10;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px rgba(0,0,0,0.55);">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#00ff9d;text-align:center;font-size:30px;text-shadow:0 0 12px rgba(0,255,140,0.35);">
New Realm Activated
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
A new realm has opened inside Pulse World OS:  
<strong>${realmName}</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;border-radius:16px;padding:24px;">

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">Description</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;line-height:22px;">${description}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;padding-top:16px;">Key Features</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;line-height:22px;">${features}</td></tr>

</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
The organism expands. New pathways and possibilities emerge.
</p>

</td></tr></table>

${trackingPixel}

</td></tr></table>

</body></html>`;
  }
};
export const adminNodeMisbehaviorAlert = {
  subject: () => "Pulse World OS: Node Misbehavior Detected",
  important: true,

  html: ({ nodeName, issue, severity, recommendedAction, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">

<table width="100%" style="padding:40px 0;background:#0b0d10;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px rgba(0,0,0,0.55);">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#ff4d4d;text-align:center;font-size:30px;text-shadow:0 0 12px rgba(255,0,0,0.35);">
Node Misbehavior Alert
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
The world‑node <strong>${nodeName}</strong> is exhibiting abnormal behavior.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;border-radius:16px;padding:24px;">

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">Issue</td></tr>
<tr><td style="color:#ff4d4d;font-size:16px;font-weight:600;">${issue}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;padding-top:16px;">Severity</td></tr>
<tr><td style="color:#e5e7eb;font-size:16px;font-weight:600;">${severity}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;padding-top:16px;">Recommended Action</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;line-height:22px;">${recommendedAction}</td></tr>

</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
Admin Organ intervention may be required to maintain organism integrity.
</p>

</td></tr></table>

${trackingPixel}

</td></tr></table>

</body></html>`;
  }
};
export const creatorOrganInsights = {
  subject: () => "Pulse World OS: Your World‑Node Insights Are Ready",
  important: true,

  html: ({ name, busname, visitors, conversions, growthRate, insights, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">

<table width="100%" style="padding:40px 0;background:#0b0d10;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px rgba(0,0,0,0.55);">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#00e0e0;text-align:center;font-size:30px;text-shadow:0 0 12px rgba(0,255,255,0.35);">
World‑Node Insights
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
Hi ${name}, here are your latest performance insights for  
<strong>${busname}</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;border-radius:16px;padding:24px;">

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">Visitors</td></tr>
<tr><td style="color:#e5e7eb;font-size:20px;font-weight:700;">${visitors}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;padding-top:16px;">Conversions</td></tr>
<tr><td style="color:#00ff9d;font-size:20px;font-weight:700;">${conversions}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;padding-top:16px;">Growth Rate</td></tr>
<tr><td style="color:#00e0e0;font-size:20px;font-weight:700;">${growthRate}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;padding-top:16px;">Insights</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;line-height:22px;">${insights}</td></tr>

</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
Your node continues to evolve. Keep building your realm.
</p>

</td></tr></table>

${trackingPixel}

</td></tr></table>

</body></html>`;
  }
};
export const worldNodeVisibilityUpgrade = {
  subject: () => "Pulse World OS: Your Node Visibility Has Increased",
  important: true,

  html: ({ busname, newVisibility, effects, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">

<table width="100%" style="padding:40px 0;background:#0b0d10;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px rgba(0,0,0,0.55);">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#00ff9d;text-align:center;font-size:30px;text-shadow:0 0 12px rgba(0,255,140,0.35);">
Visibility Increased
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
Your world‑node <strong>${busname}</strong> is now visible at a higher tier:  
<strong>${newVisibility}</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;border-radius:16px;padding:24px;">

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">Effects</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;line-height:22px;">${effects}</td></tr>

</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
More travelers can now discover your realm.
</p>

</td></tr></table>

${trackingPixel}

</td></tr></table>

</body></html>`;
  }
};
export const multiRoleHybridActivation = {
  subject: () => "Pulse World OS: Hybrid Role Activated",
  important: true,

  html: ({ name, roles, benefits, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">

<table width="100%" style="padding:40px 0;background:#0b0d10;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px rgba(0,0,0,0.55);">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#00e0e0;text-align:center;font-size:30px;text-shadow:0 0 12px rgba(0,255,255,0.35);">
Hybrid Role Activated
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
Hi ${name}, you have unlocked a  
<strong>Multi‑Role Hybrid</strong> configuration.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;border-radius:16px;padding:24px;">

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">Active Roles</td></tr>
<tr><td style="color:#00e0e0;font-size:18px;font-weight:700;">${roles}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;padding-top:16px;">Benefits</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;line-height:22px;">${benefits}</td></tr>

</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
Your identity core now supports multi‑organ functionality.
</p>

</td></tr></table>

${trackingPixel}

</td></tr></table>

</body></html>`;
  }
};
export const creatorEarningsThreshold = {
  subject: () => "Pulse World OS: Earnings Threshold Reached",
  important: true,

  html: ({ name, busname, threshold, newStatus, perks, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">
<table width="100%" style="padding:40px 0;background:#0b0d10;"><tr><td align="center">
<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px rgba(0,0,0,0.55);">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>
<tr><td style="padding:36px;">

<h1 style="color:#00ff9d;text-align:center;font-size:30px;text-shadow:0 0 12px rgba(0,255,140,0.35);">
Earnings Threshold Reached
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
Congratulations ${name}, your world‑node <strong>${busname}</strong>  
has surpassed the earnings threshold of <strong>${threshold}</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;border-radius:16px;padding:24px;">
<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">New Status</td></tr>
<tr><td style="color:#00ff9d;font-size:22px;font-weight:700;">${newStatus}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;padding-top:16px;">Unlocked Perks</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;line-height:22px;">${perks}</td></tr>
</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
Your creator influence continues to grow inside the organism.
</p>

</td></tr></table>
${trackingPixel}
</td></tr></table>
</body></html>`;
  }
};
export const worldNodeMutationEvent = {
  subject: () => "Pulse World OS: World‑Node Mutation Detected",
  important: true,

  html: ({ busname, mutationType, newForm, effects, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">
<table width="100%" style="padding:40px 0;background:#0b0d10;"><tr><td align="center">
<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px rgba(0,0,0,0.55);">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>
<tr><td style="padding:36px;">

<h1 style="color:#00e0e0;text-align:center;font-size:30px;text-shadow:0 0 12px rgba(0,255,255,0.35);">
World‑Node Mutation
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
Your world‑node <strong>${busname}</strong> has undergone a mutation event.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;border-radius:16px;padding:24px;">

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">Mutation Type</td></tr>
<tr><td style="color:#00e0e0;font-size:20px;font-weight:700;">${mutationType}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;padding-top:16px;">New Form</td></tr>
<tr><td style="color:#00ff9d;font-size:20px;font-weight:700;">${newForm}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;padding-top:16px;">Effects</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;line-height:22px;">${effects}</td></tr>

</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
Your node’s evolution may unlock new pathways and interactions.
</p>

</td></tr></table>
${trackingPixel}
</td></tr></table>
</body></html>`;
  }
};
export const paymentOrganFailure = {
  subject: () => "Pulse World OS: Payment Organ Failure",
  important: true,

  html: ({ name, action, reason, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">
<table width="100%" style="padding:40px 0;background:#0b0d10;"><tr><td align="center">
<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px rgba(0,0,0,0.55);">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>
<tr><td style="padding:36px;">

<h1 style="color:#ff4d4d;text-align:center;font-size:30px;text-shadow:0 0 12px rgba(255,0,0,0.35);">
Payment Organ Failure
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
Hi ${name}, your recent payment attempt for  
<strong>${action}</strong> could not be completed.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;border-radius:16px;padding:24px;">
<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">Reason</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;line-height:22px;">${reason}</td></tr>
</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
Please update your payment method or try again later.
</p>

</td></tr></table>
${trackingPixel}
</td></tr></table>
</body></html>`;
  }
};
export const systemIntegrityReport = {
  subject: () => "Pulse World OS: System Integrity Report",
  important: true,

  html: ({ period, healthScore, issues, recommendations, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">
<table width="100%" style="padding:40px 0;background:#0b0d10;"><tr><td align="center">
<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px rgba(0,0,0,0.55);">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>
<tr><td style="padding:36px;">

<h1 style="color:#00e0e0;text-align:center;font-size:30px;text-shadow:0 0 12px rgba(0,255,255,0.35);">
System Integrity Report
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
Integrity summary for the last <strong>${period}</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;border-radius:16px;padding:24px;">

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">Health Score</td></tr>
<tr><td style="color:#00ff9d;font-size:22px;font-weight:700;">${healthScore}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;padding-top:16px;">Issues</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;line-height:22px;">${issues}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;padding-top:16px;">Recommendations</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;line-height:22px;">${recommendations}</td></tr>

</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
The organism remains stable. Continue monitoring for anomalies.
</p>

</td></tr></table>
${trackingPixel}
</td></tr></table>
</body></html>`;
  }
};
export const realmTierAscension = {
  subject: () => "Pulse World OS: Realm‑Tier Ascension Achieved",
  important: true,

  html: ({ busname, newTier, unlockedSystems, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">
<table width="100%" style="padding:40px 0;background:#0b0d10;"><tr><td align="center">
<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px rgba(0,0,0,0.55);">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>
<tr><td style="padding:36px;">

<h1 style="color:#00ff9d;text-align:center;font-size:30px;text-shadow:0 0 12px rgba(0,255,140,0.35);">
Realm‑Tier Ascension
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
Your world‑node <strong>${busname}</strong> has ascended to  
<strong>${newTier}</strong> — becoming a full realm.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;border-radius:16px;padding:24px;">

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">Unlocked Systems</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;line-height:22px;">${unlockedSystems}</td></tr>

</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
Your realm now influences the mesh at a higher level.
</p>

</td></tr></table>
${trackingPixel}
</td></tr></table>
</body></html>`;
  }
};
export const worldNodeDeactivationWarning = {
  subject: () => "Pulse World OS: World‑Node Deactivation Warning",
  important: true,

  html: ({ busname, daysRemaining, requiredAction, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">
<table width="100%" style="padding:40px 0;background:#0b0d10;"><tr><td align="center">
<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px rgba(0,0,0,0.55);">

<tr><td align="center">
  <img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300">
</td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#ffcc00;text-align:center;font-size:30px;text-shadow:0 0 12px rgba(255,200,0,0.35);">
World‑Node At Risk
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
Your world‑node <strong>${busname}</strong> has been inactive.  
It will be automatically deactivated in <strong>${daysRemaining} days</strong> unless action is taken.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;border-radius:16px;padding:24px;">
<tr>
  <td style="color:#7a828a;font-size:12px;text-transform:uppercase;">Required Action</td>
</tr>
<tr>
  <td style="color:#e5e7eb;font-size:15px;line-height:22px;">${requiredAction}</td>
</tr>
</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
Reactivating your node keeps it visible and connected to the mesh.
</p>

</td></tr></table>
${trackingPixel}
</td></tr></table>
</body></html>`;
  }
};
export const creatorNewReview = {
  subject: () => "Pulse World OS: New Review Received",
  important: true,

  html: ({ name, busname, rating, reviewText, reviewer, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">
<table width="100%" style="padding:40px 0;background:#0b0d10;"><tr><td align="center">
<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px rgba(0,0,0,0.55);">

<tr><td align="center">
  <img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300">
</td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#00ff9d;text-align:center;font-size:30px;text-shadow:0 0 12px rgba(0,255,140,0.35);">
New Review Received
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
Hi ${name}, your world‑node <strong>${busname}</strong>  
has received a new review from <strong>${reviewer}</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;border-radius:16px;padding:24px;">

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">Rating</td></tr>
<tr><td style="color:#00ff9d;font-size:22px;font-weight:700;">${rating} / 5</td></tr>

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;padding-top:16px;">Review</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;line-height:22px;">"${reviewText}"</td></tr>

</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
Responding to reviews strengthens your node’s presence and trust.
</p>

</td></tr></table>
${trackingPixel}
</td></tr></table>
</body></html>`;
  }
};
export const presenceTierDecay = {
  subject: () => "Pulse World OS: Presence Tier Decreased",
  important: true,

  html: ({ name, oldTier, newTier, reason, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">
<table width="100%" style="padding:40px 0;background:#0b0d10;"><tr><td align="center">
<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px rgba(0,0,0,0.55);">

<tr><td align="center">
  <img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300">
</td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#ffcc00;text-align:center;font-size:30px;text-shadow:0 0 12px rgba(255,200,0,0.35);">
Presence Tier Decreased
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
Hi ${name}, your Presence Tier has decreased  
from <strong>${oldTier}</strong> to <strong>${newTier}</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;border-radius:16px;padding:24px;">
<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">Reason</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;line-height:22px;">${reason}</td></tr>
</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
Re‑engaging with the organism will restore your presence.
</p>

</td></tr></table>
${trackingPixel}
</td></tr></table>
</body></html>`;
  }
};
export const rewardOrganGiftReceived = {
  subject: () => "Pulse World OS: You Received a PulsePoints Gift",
  important: true,

  html: ({ name, fromUser, amount, message, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">
<table width="100%" style="padding:40px 0;background:#0b0d10;"><tr><td align="center">
<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px rgba(0,0,0,0.55);">

<tr><td align="center">
  <img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300">
</td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#00ff9d;text-align:center;font-size:30px;text-shadow:0 0 12px rgba(0,255,140,0.35);">
PulsePoints Gift Received
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
Hi ${name}, you’ve received a PulsePoints gift from  
<strong>${fromUser}</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;border-radius:16px;padding:24px;">

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">Amount</td></tr>
<tr><td style="color:#00ff9d;font-size:22px;font-weight:700;">${amount}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;padding-top:16px;">Message</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;line-height:22px;">"${message}"</td></tr>

</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
Your Reward Organ has been credited.
</p>

</td></tr></table>
${trackingPixel}
</td></tr></table>
</body></html>`;
  }
};
export const networkLatencySurge = {
  subject: () => "Pulse World OS: Network Latency Surge Detected",
  important: true,

  html: ({ severity, affectedRegions, cause, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">
<table width="100%" style="padding:40px 0;background:#0b0d10;"><tr><td align="center">
<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px rgba(0,0,0,0.55);">

<tr><td align="center">
  <img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300">
</td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#ffcc00;text-align:center;font-size:30px;text-shadow:0 0 12px rgba(255,200,0,0.35);">
Network Latency Surge
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
A latency surge has been detected across the mesh.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;border-radius:16px;padding:24px;">

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">Severity</td></tr>
<tr><td style="color:#ffcc00;font-size:22px;font-weight:700;">${severity}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;padding-top:16px;">Affected Regions</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;line-height:22px;">${affectedRegions}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;padding-top:16px;">Possible Cause</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;line-height:22px;">${cause}</td></tr>

</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
The organism is stabilizing. No action required unless notified.
</p>

</td></tr></table>
${trackingPixel}
</td></tr></table>
</body></html>`;
  }
};
export const creatorSubscriptionRenewal = {
  subject: () => "Pulse World OS: Creator Subscription Renewal Reminder",
  important: true,

  html: ({ name, busname, daysLeft, renewalLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">
<table width="100%" style="padding:40px 0;background:#0b0d10;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px rgba(0,0,0,0.55);">
<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#00e0e0;text-align:center;font-size:30px;text-shadow:0 0 12px rgba(0,255,255,0.35);">
Subscription Renewal Reminder
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
Hi ${name}, your creator subscription for  
<strong>${busname}</strong> expires in <strong>${daysLeft} days</strong>.
</p>

<p style="color:#9aa0a6;text-align:center;margin-top:20px;">
Renew now to avoid interruption of creator‑level features.
</p>

<p style="text-align:center;margin-top:30px;">
  <a href="${renewalLink}" style="background:#00e0e0;color:#000;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Renew Subscription
  </a>
</p>

</td></tr></table>
${trackingPixel}

</td></tr></table>
</body></html>`;
  }
};
export const worldNodeOwnershipTransfer = {
  subject: () => "Pulse World OS: World‑Node Ownership Transferred",
  important: true,

  html: ({ oldOwner, newOwner, busname, effectiveDate, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">
<table width="100%" style="padding:40px 0;background:#0b0d10;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px rgba(0,0,0,0.55);">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>
<tr><td style="padding:36px;">

<h1 style="color:#00ff9d;text-align:center;font-size:30px;text-shadow:0 0 12px rgba(0,255,140,0.35);">
Ownership Transferred
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
The world‑node <strong>${busname}</strong> has been transferred  
from <strong>${oldOwner}</strong> to <strong>${newOwner}</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;border-radius:16px;padding:24px;">
<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">Effective Date</td></tr>
<tr><td style="color:#e5e7eb;font-size:18px;font-weight:600;">${effectiveDate}</td></tr>
</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
The mesh has updated ownership records accordingly.
</p>

</td></tr></table>
${trackingPixel}

</td></tr></table>
</body></html>`;
  }
};
export const rewardOrganSeasonalBonus = {
  subject: () => "Pulse World OS: Seasonal Bonus Event Activated",
  important: true,

  html: ({ seasonName, bonusRate, duration, details, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">
<table width="100%" style="padding:40px 0;background:#0b0d10;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px rgba(0,0,0,0.55);">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>
<tr><td style="padding:36px;">

<h1 style="color:#00e0e0;text-align:center;font-size:30px;text-shadow:0 0 12px rgba(0,255,255,0.35);">
Seasonal Bonus Activated
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
The <strong>${seasonName}</strong> Seasonal Bonus Event is now active.  
All PulsePoints earned receive a <strong>${bonusRate} bonus</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;border-radius:16px;padding:24px;">
<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">Duration</td></tr>
<tr><td style="color:#e5e7eb;font-size:18px;font-weight:600;">${duration}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;padding-top:16px;">Details</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;line-height:22px;">${details}</td></tr>
</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
Your Reward Organ will automatically apply the bonus.
</p>

</td></tr></table>
${trackingPixel}

</td></tr></table>
</body></html>`;
  }
};
export const systemMaintenanceNotice = {
  subject: () => "Pulse World OS: Scheduled Maintenance Incoming",
  important: true,

  html: ({ startTime, duration, impact, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">
<table width="100%" style="padding:40px 0;background:#0b0d10;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px rgba(0,0,0,0.55);">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>
<tr><td style="padding:36px;">

<h1 style="color:#ffcc00;text-align:center;font-size:30px;text-shadow:0 0 12px rgba(255,200,0,0.35);">
Scheduled Maintenance
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
Pulse World OS will undergo scheduled maintenance starting at  
<strong>${startTime}</strong> for approximately <strong>${duration}</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;border-radius:16px;padding:24px;">
<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">Impact</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;line-height:22px;">${impact}</td></tr>
</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
The organism will stabilize and resume normal function afterward.
</p>

</td></tr></table>
${trackingPixel}

</td></tr></table>
</body></html>`;
  }
};
export const identityProfileCompletionReminder = {
  subject: () => "Pulse World OS: Complete Your Identity Core",
  important: true,

  html: ({ name, completionPercent, missingFields, completionLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">
<table width="100%" style="padding:40px 0;background:#0b0d10;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px rgba(0,0,0,0.55);">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>
<tr><td style="padding:36px;">

<h1 style="color:#00e0e0;text-align:center;font-size:30px;text-shadow:0 0 12px rgba(0,255,255,0.35);">
Complete Your Identity Core
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
Hi ${name}, your Identity Core is <strong>${completionPercent}%</strong> complete.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;border-radius:16px;padding:24px;">
<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">Missing Fields</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;line-height:22px;">${missingFields}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${completionLink}" style="background:#00e0e0;color:#000;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Complete Profile
  </a>
</p>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
A complete Identity Core unlocks more features and stability.
</p>

</td></tr></table>
${trackingPixel}

</td></tr></table>
</body></html>`;
  }
};
export const creatorNewFollower = {
  subject: () => "Pulse World OS: Your Node Has a New Follower",
  important: true,

  html: ({ creatorName, followerName, busname, followerCount, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">

<table width="100%" style="padding:40px 0;background:#0b0d10;">
<tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;
box-shadow:0 0 28px rgba(0,0,0,0.55);">

<tr><td align="center">
<img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300" border-radius="40px">
</td></tr>

<tr><td style="padding:36px;">

<h1 style="color:#00ff9d;text-align:center;font-size:30px;
text-shadow:0 0 12px rgba(0,255,140,0.35);">
New Follower
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
${creatorName}, your world‑node <strong>${busname}</strong>  
has a new follower: <strong>${followerName}</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;
border-radius:16px;padding:24px;">
<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">
Total Followers
</td></tr>
<tr><td style="color:#00ff9d;font-size:22px;font-weight:700;">
${followerCount}
</td></tr>
</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
Your influence continues to grow inside the mesh.
</p>

</td></tr></table>

${trackingPixel}

</td></tr></table>

</body>
</html>`;
  }
};
export const worldNodeSoftLaunch = {
  subject: () => "Pulse World OS: Your World‑Node Is Live (Soft Launch)",
  important: true,

  html: ({ ownerName, busname, previewLink, nextSteps, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">

<table width="100%" style="padding:40px 0;background:#0b0d10;">
<tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;
box-shadow:0 0 28px rgba(0,0,0,0.55);">

<tr><td align="center">
<img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300" border-radius="40px">
</td></tr>

<tr><td style="padding:36px;">

<h1 style="color:#00e0e0;text-align:center;font-size:30px;
text-shadow:0 0 12px rgba(0,255,255,0.35);">
Soft Launch Activated
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
Hi ${ownerName}, your world‑node <strong>${busname}</strong>  
is now live in soft‑launch mode.
</p>

<p style="text-align:center;margin-top:20px;">
  <a href="${previewLink}" style="background:#00e0e0;color:#000;
  padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Preview Your Node
  </a>
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;
border-radius:16px;padding:24px;">
<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">
Next Steps
</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;line-height:22px;">
${nextSteps}
</td></tr>
</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
Once ready, you can publish your node to the global mesh.
</p>

</td></tr></table>

${trackingPixel}

</td></tr></table>

</body>
</html>`;
  }
};
export const rewardOrganDailyBonusReminder = {
  subject: () => "Pulse World OS: Claim Your Daily Bonus",
  important: true,

  html: ({ name, bonusAmount, expiryTime, claimLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">

<table width="100%" style="padding:40px 0;background:#0b0d10;">
<tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;
box-shadow:0 0 28px rgba(0,0,0,0.55);">

<tr><td align="center">
<img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300" border-radius="40px">
</td></tr>

<tr><td style="padding:36px;">

<h1 style="color:#00ff9d;text-align:center;font-size:30px;
text-shadow:0 0 12px rgba(0,255,140,0.35);">
Daily Bonus Available
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
Hi ${name}, your daily PulsePoints bonus of  
<strong>${bonusAmount}</strong> is waiting.
</p>

<p style="text-align:center;margin-top:20px;">
  <a href="${claimLink}" style="background:#00ff9d;color:#000;
  padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Claim Bonus
  </a>
</p>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
Bonus expires at <strong>${expiryTime}</strong>.
</p>

</td></tr></table>

${trackingPixel}

</td></tr></table>

</body>
</html>`;
  }
};
export const securityNewDeviceLogin = {
  subject: () => "Pulse World OS: New Device Login Detected",
  important: true,

  html: ({ name, device, location, timestamp, actionLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">

<table width="100%" style="padding:40px 0;background:#0b0d10;">
<tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;
box-shadow:0 0 28px rgba(0,0,0,0.55);">

<tr><td align="center">
<img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300" border-radius="40px">
</td></tr>

<tr><td style="padding:36px;">

<h1 style="color:#ff4d4d;text-align:center;font-size:30px;
text-shadow:0 0 12px rgba(255,0,0,0.35);">
New Device Login
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
Hi ${name}, your account was accessed from a new device.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;
border-radius:16px;padding:24px;">

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">Device</td></tr>
<tr><td style="color:#e5e7eb;font-size:16px;font-weight:600;">${device}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;padding-top:16px;">Location</td></tr>
<tr><td style="color:#e5e7eb;font-size:16px;font-weight:600;">${location}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;padding-top:16px;">Time</td></tr>
<tr><td style="color:#e5e7eb;font-size:16px;font-weight:600;">${timestamp}</td></tr>

</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${actionLink}" style="background:#ff4d4d;color:#fff;
  padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Secure Account
  </a>
</p>

</td></tr></table>

${trackingPixel}

</td></tr></table>

</body>
</html>`;
  }
};
export const systemDataSyncComplete = {
  subject: () => "Pulse World OS: Data Sync Completed",
  important: true,

  html: ({ name, syncType, timestamp, details, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">

<table width="100%" style="padding:40px 0;background:#0b0d10;">
<tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;
box-shadow:0 0 28px rgba(0,0,0,0.55);">

<tr><td align="center">
<img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300" border-radius="40px">
</td></tr>

<tr><td style="padding:36px;">

<h1 style="color:#00ff9d;text-align:center;font-size:30px;
text-shadow:0 0 12px rgba(0,255,140,0.35);">
Data Sync Complete
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
Hi ${name}, your <strong>${syncType}</strong> data sync  
completed successfully at <strong>${timestamp}</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;
border-radius:16px;padding:24px;">
<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">
Details
</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;line-height:22px;">
${details}
</td></tr>
</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
Your data is now fully aligned with the organism.
</p>

</td></tr></table>

${trackingPixel}

</td></tr></table>

</body>
</html>`;
  }
};
export const worldNodePublicLaunch = {
  subject: () => "Pulse World OS: Your World‑Node Is Now Public",
  important: true,

  html: ({ ownerName, busname, publicLink, highlights, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">
<table width="100%" style="padding:40px 0;background:#0b0d10;"><tr><td align="center">

<table width="620"
style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px rgba(0,0,0,0.55);">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>
<tr><td style="padding:36px;">

<h1 style="color:#00ff9d;text-align:center;font-size:30px;text-shadow:0 0 12px rgba(0,255,140,0.35);">
Your Node Is Now Public
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
Congratulations ${ownerName}, your world‑node <strong>${busname}</strong>  
has officially launched to the global mesh.
</p>

<p style="text-align:center;margin-top:20px;">
  <a href="${publicLink}" style="background:#00ff9d;color:#000;padding:14px 28px;
  border-radius:10px;text-decoration:none;font-weight:700;">
    View Public Node
  </a>
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;
border-radius:16px;padding:24px;">
<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">Highlights</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;line-height:22px;">${highlights}</td></tr>
</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
Travelers across the mesh can now discover your realm.
</p>

</td></tr></table>
${trackingPixel}

</td></tr></table>
</body></html>`;
  }
};
export const creatorProductApproved = {
  subject: () => "Pulse World OS: Your Submission Has Been Approved",
  important: true,

  html: ({ creatorName, itemName, category, nextSteps, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">
<table width="100%" style="padding:40px 0;background:#0b0d10;"><tr><td align="center">

<table width="620"
style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px rgba(0,0,0,0.55);">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>
<tr><td style="padding:36px;">

<h1 style="color:#00e0e0;text-align:center;font-size:30px;text-shadow:0 0 12px rgba(0,255,255,0.35);">
Submission Approved
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
Great news ${creatorName}, your <strong>${itemName}</strong>  
in the <strong>${category}</strong> category has been approved.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;
border-radius:16px;padding:24px;">
<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">Next Steps</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;line-height:22px;">${nextSteps}</td></tr>
</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
Your creation is now ready for travelers to discover.
</p>

</td></tr></table>
${trackingPixel}

</td></tr></table>
</body></html>`;
  }
};
export const securityPasswordResetConfirmation = {
  subject: () => "Pulse World OS: Your Password Has Been Reset",
  important: true,

  html: ({ name, timestamp, device, location, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">
<table width="100%" style="padding:40px 0;background:#0b0d10;"><tr><td align="center">

<table width="620"
style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px rgba(0,0,0,0.55);">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>
<tr><td style="padding:36px;">

<h1 style="color:#00ff9d;text-align:center;font-size:30px;text-shadow:0 0 12px rgba(0,255,140,0.35);">
Password Reset Successful
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
Hi ${name}, your password was successfully reset.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;
border-radius:16px;padding:24px;">

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">Time</td></tr>
<tr><td style="color:#e5e7eb;font-size:16px;font-weight:600;">${timestamp}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;padding-top:16px;">Device</td></tr>
<tr><td style="color:#e5e7eb;font-size:16px;font-weight:600;">${device}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;padding-top:16px;">Location</td></tr>
<tr><td style="color:#e5e7eb;font-size:16px;font-weight:600;">${location}</td></tr>

</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
If this wasn’t you, secure your account immediately.
</p>

</td></tr></table>
${trackingPixel}

</td></tr></table>
</body></html>`;
  }
};
export const rewardOrganReferralBonus = {
  subject: () => "Pulse World OS: Referral Bonus Earned",
  important: true,

  html: ({ name, referredUser, bonusAmount, totalReferrals, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">
<table width="100%" style="padding:40px 0;background:#0b0d10;"><tr><td align="center">

<table width="620"
style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px rgba(0,0,0,0.55);">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>
<tr><td style="padding:36px;">

<h1 style="color:#00ff9d;text-align:center;font-size:30px;text-shadow:0 0 12px rgba(0,255,140,0.35);">
Referral Bonus Earned
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
Hi ${name}, your referral <strong>${referredUser}</strong>  
has joined the organism. You earned <strong>${bonusAmount}</strong> PulsePoints.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;
border-radius:16px;padding:24px;">
<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">Total Referrals</td></tr>
<tr><td style="color:#00ff9d;font-size:22px;font-weight:700;">${totalReferrals}</td></tr>
</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
Your influence helps the organism grow.
</p>

</td></tr></table>
${trackingPixel}

</td></tr></table>
</body></html>`;
  }
};
export const systemFeatureSunset = {
  subject: () => "Pulse World OS: Feature Sunset Notice",
  important: true,

  html: ({ featureName, sunsetDate, replacement, details, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">
<table width="100%" style="padding:40px 0;background:#0b0d10;"><tr><td align="center">

<table width="620"
style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px rgba(0,0,0,0.55);">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>
<tr><td style="padding:36px;">

<h1 style="color:#ffcc00;text-align:center;font-size:30px;text-shadow:0 0 12px rgba(255,200,0,0.35);">
Feature Sunset Notice
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
The feature <strong>${featureName}</strong> will be sunset on  
<strong>${sunsetDate}</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;
border-radius:16px;padding:24px;">

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">Replacement</td></tr>
<tr><td style="color:#00ff9d;font-size:18px;font-weight:700;">${replacement}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;padding-top:16px;">Details</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;line-height:22px;">${details}</td></tr>

</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
The organism evolves — outdated systems are replaced with stronger ones.
</p>

</td></tr></table>
${trackingPixel}

</td></tr></table>
</body></html>`;
  }
};
export const creatorInventoryLow = {
  subject: () => "Pulse World OS: Inventory Running Low",
  important: true,

  html: ({ creatorName, itemName, remaining, restockLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">
<table width="100%" style="padding:40px 0;background:#0b0d10;">
<tr><td align="center">

<table width="620"
style="background:#111418;border-radius:20px;overflow:hidden;
box-shadow:0 0 28px rgba(0,0,0,0.55);">

<tr><td align="center">
<img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300" border-radius="40px">
</td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#ffcc00;text-align:center;font-size:30px;
text-shadow:0 0 12px rgba(255,200,0,0.35);">
Inventory Running Low
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
${creatorName}, your item <strong>${itemName}</strong>  
is running low with only <strong>${remaining}</strong> left.
</p>

<p style="text-align:center;margin-top:20px;">
  <a href="${restockLink}" style="background:#ffcc00;color:#000;
  padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Restock Now
  </a>
</p>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
Keeping inventory healthy ensures uninterrupted sales.
</p>

</td></tr></table>

${trackingPixel}

</td></tr></table>
</body>
</html>`;
  }
};
export const worldNodeBadgeEarned = {
  subject: () => "Pulse World OS: New Badge Earned",
  important: true,

  html: ({ ownerName, busname, badgeName, badgeDescription, badgeIcon, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">
<table width="100%" style="padding:40px 0;background:#0b0d10;">
<tr><td align="center">

<table width="620"
style="background:#111418;border-radius:20px;overflow:hidden;
box-shadow:0 0 28px rgba(0,0,0,0.55);">

<tr><td align="center">
<img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300" border-radius="40px">
</td></tr>

<tr><td style="padding:36px;">

<h1 style="color:#00ff9d;text-align:center;font-size:30px;
text-shadow:0 0 12px rgba(0,255,140,0.35);">
Badge Earned
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
${ownerName}, your world‑node <strong>${busname}</strong>  
has earned the <strong>${badgeName}</strong> badge.
</p>

<p style="text-align:center;margin-top:20px;">
  <img src="${badgeIcon}" width="120" style="border-radius:12px;">
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;
border-radius:16px;padding:24px;">
<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">
Badge Description
</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;line-height:22px;">
${badgeDescription}
</td></tr>
</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
Badges increase visibility and trust across the mesh.
</p>

</td></tr></table>

${trackingPixel}

</td></tr></table>
</body>
</html>`;
  }
};
export const securitySuspiciousPayment = {
  subject: () => "Pulse World OS: Suspicious Payment Attempt",
  important: true,

  html: ({ name, amount, method, timestamp, reason, actionLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">
<table width="100%" style="padding:40px 0;background:#0b0d10;">
<tr><td align="center">

<table width="620"
style="background:#111418;border-radius:20px;overflow:hidden;
box-shadow:0 0 28px rgba(0,0,0,0.55);">

<tr><td align="center">
<img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300" border-radius="40px">
</td></tr>

<tr><td style="padding:36px;">

<h1 style="color:#ff4d4d;text-align:center;font-size:30px;
text-shadow:0 0 12px rgba(255,0,0,0.35);">
Suspicious Payment Attempt
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
Hi ${name}, a suspicious payment attempt was detected.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;
border-radius:16px;padding:24px;">

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">Amount</td></tr>
<tr><td style="color:#ff4d4d;font-size:20px;font-weight:700;">${amount}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;padding-top:16px;">Method</td></tr>
<tr><td style="color:#e5e7eb;font-size:16px;font-weight:600;">${method}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;padding-top:16px;">Time</td></tr>
<tr><td style="color:#e5e7eb;font-size:16px;font-weight:600;">${timestamp}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;padding-top:16px;">Reason</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;line-height:22px;">${reason}</td></tr>

</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${actionLink}" style="background:#ff4d4d;color:#fff;
  padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Review Activity
  </a>
</p>

</td></tr></table>

${trackingPixel}

</td></tr></table>
</body>
</html>`;
  }
};
export const rewardOrganLoyaltyTierUpgrade = {
  subject: () => "Pulse World OS: Loyalty Tier Upgraded",
  important: true,

  html: ({ name, newTier, perks, pointsToNext, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">
<table width="100%" style="padding:40px 0;background:#0b0d10;">
<tr><td align="center">

<table width="620"
style="background:#111418;border-radius:20px;overflow:hidden;
box-shadow:0 0 28px rgba(0,0,0,0.55);">

<tr><td align="center">
<img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300" border-radius="40px">
</td></tr>

<tr><td style="padding:36px;">

<h1 style="color:#00ff9d;text-align:center;font-size:30px;
text-shadow:0 0 12px rgba(0,255,140,0.35);">
Loyalty Tier Upgraded
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
Hi ${name}, your Loyalty Tier has increased to  
<strong>${newTier}</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;
border-radius:16px;padding:24px;">

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">Perks</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;line-height:22px;">${perks}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;padding-top:16px;">
Points to Next Tier
</td></tr>
<tr><td style="color:#00e0e0;font-size:20px;font-weight:700;">${pointsToNext}</td></tr>

</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
Your loyalty strengthens your presence inside the organism.
</p>

</td></tr></table>

${trackingPixel}

</td></tr></table>
</body>
</html>`;
  }
};
export const systemApiKeyRotation = {
  subject: () => "Pulse World OS: API Key Rotated",
  important: true,

  html: ({ name, rotationReason, timestamp, newKeyHint, dashboardLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">
<table width="100%" style="padding:40px 0;background:#0b0d10;">
<tr><td align="center">

<table width="620"
style="background:#111418;border-radius:20px;overflow:hidden;
box-shadow:0 0 28px rgba(0,0,0,0.55);">

<tr><td align="center">
<img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300" border-radius="40px">
</td></tr>

<tr><td style="padding:36px;">

<h1 style="color:#00e0e0;text-align:center;font-size:30px;
text-shadow:0 0 12px rgba(0,255,255,0.35);">
API Key Rotated
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
Hi ${name}, your API key was rotated at  
<strong>${timestamp}</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;
border-radius:16px;padding:24px;">

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">Reason</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;line-height:22px;">${rotationReason}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;padding-top:16px;">
New Key Hint
</td></tr>
<tr><td style="color:#00ff9d;font-size:20px;font-weight:700;">${newKeyHint}</td></tr>

</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${dashboardLink}" style="background:#00e0e0;color:#000;
  padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    View API Dashboard
  </a>
</p>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
Your integrations will need to update to the new key.
</p>

</td></tr></table>

${trackingPixel}

</td></tr></table>
</body>
</html>`;
  }
};
export const creatorBookingRequest = {
  subject: () => "Pulse World OS: New Booking Request",
  important: true,

  html: ({ creatorName, requesterName, serviceName, dateRequested, message, manageLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html><html><body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">
<table width="100%" style="padding:40px 0;background:#0b0d10;"><tr><td align="center">
<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px rgba(0,0,0,0.55);">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>
<tr><td style="padding:36px;">

<h1 style="color:#00ff9d;text-align:center;font-size:30px;text-shadow:0 0 12px rgba(0,255,140,0.35);">
New Booking Request
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
${creatorName}, you’ve received a new booking request from  
<strong>${requesterName}</strong> for <strong>${serviceName}</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;border-radius:16px;padding:24px;">
<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">Requested Date</td></tr>
<tr><td style="color:#e5e7eb;font-size:18px;font-weight:600;">${dateRequested}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;padding-top:16px;">Message</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;line-height:22px;">"${message}"</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${manageLink}" style="background:#00ff9d;color:#000;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Manage Booking
  </a>
</p>

</td></tr></table>
${trackingPixel}
</td></tr></table></body></html>`;
  }
};
export const worldNodeHealthWarning = {
  subject: () => "Pulse World OS: World‑Node Health Warning",
  important: true,

  html: ({ busname, issue, severity, recommendedFix, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html><html><body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">
<table width="100%" style="padding:40px 0;background:#0b0d10;"><tr><td align="center">
<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px rgba(0,0,0,0.55);">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>
<tr><td style="padding:36px;">

<h1 style="color:#ffcc00;text-align:center;font-size:30px;text-shadow:0 0 12px rgba(255,200,0,0.35);">
Node Health Warning
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
Your world‑node <strong>${busname}</strong> is experiencing a health issue.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;border-radius:16px;padding:24px;">
<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">Issue</td></tr>
<tr><td style="color:#ffcc00;font-size:18px;font-weight:700;">${issue}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;padding-top:16px;">Severity</td></tr>
<tr><td style="color:#e5e7eb;font-size:18px;font-weight:600;">${severity}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;padding-top:16px;">Recommended Fix</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;line-height:22px;">${recommendedFix}</td></tr>
</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
Addressing this issue will restore optimal performance.
</p>

</td></tr></table>
${trackingPixel}
</td></tr></table></body></html>`;
  }
};
export const identityVerificationRequired = {
  subject: () => "Pulse World OS: Identity Verification Required",
  important: true,

  html: ({ name, reason, verificationLink, expiresIn, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html><html><body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">
<table width="100%" style="padding:40px 0;background:#0b0d10;"><tr><td align="center">
<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px rgba(0,0,0,0.55);">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>
<tr><td style="padding:36px;">

<h1 style="color:#00e0e0;text-align:center;font-size:30px;text-shadow:0 0 12px rgba(0,255,255,0.35);">
Identity Verification Needed
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
Hi ${name}, we need to verify your identity to continue.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;border-radius:16px;padding:24px;">
<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">Reason</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;line-height:22px;">${reason}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;padding-top:16px;">Expires In</td></tr>
<tr><td style="color:#00ff9d;font-size:18px;font-weight:700;">${expiresIn}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${verificationLink}" style="background:#00e0e0;color:#000;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Verify Identity
  </a>
</p>

</td></tr></table>
${trackingPixel}
</td></tr></table></body></html>`;
  }
};
export const rewardOrganStreakBroken = {
  subject: () => "Pulse World OS: Your Streak Has Ended",
  important: true,

  html: ({ name, streakLength, reason, restartLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html><html><body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">
<table width="100%" style="padding:40px 0;background:#0b0d10;"><tr><td align="center">
<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px rgba(0,0,0,0.55);">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>
<tr><td style="padding:36px;">

<h1 style="color:#ff4d4d;text-align:center;font-size:30px;text-shadow:0 0 12px rgba(255,0,0,0.35);">
Your Streak Has Ended
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
Hi ${name}, your streak of <strong>${streakLength} days</strong> has ended.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;border-radius:16px;padding:24px;">
<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">Reason</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;line-height:22px;">${reason}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${restartLink}" style="background:#ff4d4d;color:#fff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Start New Streak
  </a>
</p>

</td></tr></table>
${trackingPixel}
</td></tr></table></body></html>`;
  }
};
export const systemDataExportReady = {
  subject: () => "Pulse World OS: Your Data Export Is Ready",
  important: true,

  html: ({ name, exportType, downloadLink, expiresIn, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html><html><body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">
<table width="100%" style="padding:40px 0;background:#0b0d10;"><tr><td align="center">
<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px rgba(0,0,0,0.55);">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>
<tr><td style="padding:36px;">

<h1 style="color:#00ff9d;text-align:center;font-size:30px;text-shadow:0 0 12px rgba(0,255,140,0.35);">
Data Export Ready
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
Hi ${name}, your <strong>${exportType}</strong> data export is ready to download.
</p>

<p style="text-align:center;margin-top:20px;">
  <a href="${downloadLink}" style="background:#00ff9d;color:#000;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Download Export
  </a>
</p>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
This link expires in <strong>${expiresIn}</strong>.
</p>

</td></tr></table>
${trackingPixel}
</td></tr></table></body></html>`;
  }
};
export const creatorBookingConfirmed = {
  subject: () => "Pulse World OS: Booking Confirmed",
  important: true,

  html: ({ creatorName, requesterName, serviceName, dateConfirmed, details, cancelLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html><html><body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">
<table width="100%" style="padding:40px 0;background:#0b0d10;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;
box-shadow:0 0 28px rgba(0,0,0,0.55);">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#00ff9d;text-align:center;font-size:30px;text-shadow:0 0 12px rgba(0,255,140,0.35);">
Booking Confirmed
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
${creatorName}, your booking with <strong>${requesterName}</strong>  
for <strong>${serviceName}</strong> has been confirmed.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;
border-radius:16px;padding:24px;">
<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">Date Confirmed</td></tr>
<tr><td style="color:#00ff9d;font-size:18px;font-weight:700;">${dateConfirmed}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;padding-top:16px;">Details</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;line-height:22px;">${details}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${cancelLink}" style="background:#ff4d4d;color:#fff;padding:14px 28px;
  border-radius:10px;text-decoration:none;font-weight:700;">
    Cancel Booking
  </a>
</p>

</td></tr></table>
${trackingPixel}

</td></tr></table></body></html>`;
  }
};
export const worldNodeCooldownActivated = {
  subject: () => "Pulse World OS: Cooldown Mode Activated",
  important: true,

  html: ({ busname, duration, reason, impact, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html><html><body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">
<table width="100%" style="padding:40px 0;background:#0b0d10;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;
box-shadow:0 0 28px rgba(0,0,0,0.55);">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#ffcc00;text-align:center;font-size:30px;text-shadow:0 0 12px rgba(255,200,0,0.35);">
Cooldown Mode Activated
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
Your world‑node <strong>${busname}</strong> has entered cooldown mode.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;
border-radius:16px;padding:24px;">

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">Duration</td></tr>
<tr><td style="color:#ffcc00;font-size:18px;font-weight:700;">${duration}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;padding-top:16px;">Reason</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;line-height:22px;">${reason}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;padding-top:16px;">Impact</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;line-height:22px;">${impact}</td></tr>

</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
Cooldown mode protects the organism from overload.
</p>

</td></tr></table>
${trackingPixel}

</td></tr></table></body></html>`;
  }
};
export const securityAccountLockoutWarning = {
  subject: () => "Pulse World OS: Account Lockout Warning",
  important: true,

  html: ({ name, attempts, location, actionLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html><html><body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">
<table width="100%" style="padding:40px 0;background:#0b0d10;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;
box-shadow:0 0 28px rgba(0,0,0,0.55);">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#ff4d4d;text-align:center;font-size:30px;text-shadow:0 0 12px rgba(255,0,0,0.35);">
Account Lockout Warning
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
Hi ${name}, there have been <strong>${attempts}</strong> failed login attempts  
from <strong>${location}</strong>.
</p>

<p style="text-align:center;margin-top:30px;">
  <a href="${actionLink}" style="background:#ff4d4d;color:#fff;padding:14px 28px;
  border-radius:10px;text-decoration:none;font-weight:700;">
    Secure Account
  </a>
</p>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
Your account may lock if attempts continue.
</p>

</td></tr></table>
${trackingPixel}

</td></tr></table></body></html>`;
  }
};
export const rewardOrganAchievementUnlocked = {
  subject: () => "Pulse World OS: Achievement Unlocked",
  important: true,

  html: ({ name, achievementName, description, reward, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html><html><body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">
<table width="100%" style="padding:40px 0;background:#0b0d10;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;
box-shadow:0 0 28px rgba(0,0,0,0.55);">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#00ff9d;text-align:center;font-size:30px;text-shadow:0 0 12px rgba(0,255,140,0.35);">
Achievement Unlocked
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
Congratulations ${name}, you’ve unlocked the  
<strong>${achievementName}</strong> achievement.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;
border-radius:16px;padding:24px;">

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">Description</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;line-height:22px;">${description}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;padding-top:16px;">Reward</td></tr>
<tr><td style="color:#00ff9d;font-size:20px;font-weight:700;">${reward}</td></tr>

</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
Your journey strengthens the organism.
</p>

</td></tr></table>
${trackingPixel}

</td></tr></table></body></html>`;
  }
};
export const systemTermsUpdate = {
  subject: () => "Pulse World OS: Terms of Service Updated",
  important: true,

  html: ({ effectiveDate, summary, fullLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html><html><body style="margin:0;padding:0;background:#0b0d10;font-family:Arial,sans-serif;">
<table width="100%" style="padding:40px 0;background:#0b0d10;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;
box-shadow:0 0 28px rgba(0,0,0,0.55);">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#00e0e0;text-align:center;font-size:30px;text-shadow:0 0 12px rgba(0,255,255,0.35);">
Terms of Service Updated
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;line-height:26px;">
Our Terms of Service have been updated.  
The new terms take effect on <strong>${effectiveDate}</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;
border-radius:16px;padding:24px;">
<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">Summary of Changes</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;line-height:22px;">${summary}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${fullLink}" style="background:#00e0e0;color:#000;padding:14px 28px;
  border-radius:10px;text-decoration:none;font-weight:700;">
    View Full Terms
  </a>
</p>

</td></tr></table>
${trackingPixel}

</td></tr></table></body></html>`;
  }
};
export const creatorBookingCancelled = {
  subject: () => "Pulse World OS: Booking Cancelled",
  important: true,

  html: ({ creatorName, requesterName, serviceName, date, reason, manageLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html><html><body style="margin:0;background:#0b0d10;font-family:Arial,sans-serif;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">
<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#ff4d4d;text-align:center;font-size:30px;text-shadow:0 0 12px #f003;">
Booking Cancelled
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
${creatorName}, the booking with <strong>${requesterName}</strong>  
for <strong>${serviceName}</strong> on <strong>${date}</strong> has been cancelled.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;text-transform:uppercase;">Reason</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${reason}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${manageLink}" style="background:#ff4d4d;color:#fff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Manage Bookings
  </a>
</p>

</td></tr></table>
${trackingPixel}

</td></tr></table></body></html>`;
  }
};
export const worldNodeReputationDrop = {
  subject: () => "Pulse World OS: Reputation Score Decreased",
  important: true,

  html: ({ busname, oldScore, newScore, cause, recoveryTips, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html><html><body style="margin:0;background:#0b0d10;font-family:Arial,sans-serif;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">
<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#ffcc00;text-align:center;font-size:30px;text-shadow:0 0 12px #fc03;">
Reputation Score Dropped
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
Your world‑node <strong>${busname}</strong> has experienced a reputation decrease.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Previous Score</td></tr>
<tr><td style="color:#e5e7eb;font-size:18px;font-weight:700;">${oldScore}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">New Score</td></tr>
<tr><td style="color:#ffcc00;font-size:18px;font-weight:700;">${newScore}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Cause</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${cause}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Recovery Tips</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${recoveryTips}</td></tr>
</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
Reputation affects visibility and trust across the mesh.
</p>

</td></tr></table>
${trackingPixel}

</td></tr></table></body></html>`;
  }
};
export const securityHighRiskLoginBlocked = {
  subject: () => "Pulse World OS: High‑Risk Login Blocked",
  important: true,

  html: ({ name, country, timestamp, device, actionLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html><html><body style="margin:0;background:#0b0d10;font-family:Arial,sans-serif;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">
<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#ff4d4d;text-align:center;font-size:30px;text-shadow:0 0 12px #f003;">
High‑Risk Login Blocked
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
Hi ${name}, a login attempt from a high‑risk region was blocked.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Country</td></tr>
<tr><td style="color:#e5e7eb;font-size:16px;font-weight:600;">${country}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Device</td></tr>
<tr><td style="color:#e5e7eb;font-size:16px;font-weight:600;">${device}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Time</td></tr>
<tr><td style="color:#e5e7eb;font-size:16px;font-weight:600;">${timestamp}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${actionLink}" style="background:#ff4d4d;color:#fff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Review Security Settings
  </a>
</p>

</td></tr></table>
${trackingPixel}

</td></tr></table></body></html>`;
  }
};
export const rewardOrganChallengeInvite = {
  subject: () => "Pulse World OS: Limited‑Time Challenge Awaits",
  important: true,

  html: ({ name, challengeName, reward, duration, description, joinLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html><html><body style="margin:0;background:#0b0d10;font-family:Arial,sans-serif;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">
<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#00ff9d;text-align:center;font-size:30px;text-shadow:0 0 12px #0f8;">
Limited‑Time Challenge
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
Hi ${name}, a new challenge is available:  
<strong>${challengeName}</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Reward</td></tr>
<tr><td style="color:#00ff9d;font-size:20px;font-weight:700;">${reward}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Duration</td></tr>
<tr><td style="color:#e5e7eb;font-size:16px;">${duration}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Details</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${description}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${joinLink}" style="background:#00ff9d;color:#000;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Join Challenge
  </a>
</p>

</td></tr></table>
${trackingPixel}

</td></tr></table></body></html>`;
  }
};
export const systemStorageLimitReached = {
  subject: () => "Pulse World OS: Storage Limit Reached",
  important: true,

  html: ({ name, used, limit, upgradeLink, cleanupTips, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html><html><body style="margin:0;background:#0b0d10;font-family:Arial,sans-serif;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">
<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#ffcc00;text-align:center;font-size:30px;text-shadow:0 0 12px #fc03;">
Storage Limit Reached
</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
Hi ${name}, you’ve used <strong>${used}</strong> of your <strong>${limit}</strong> storage capacity.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Cleanup Tips</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${cleanupTips}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${upgradeLink}" style="background:#ffcc00;color:#000;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Upgrade Storage
  </a>
</p>

</td></tr></table>
${trackingPixel}

</td></tr></table></body></html>`;
  }
};
export const creatorPayoutSent = {
  subject: () => "Pulse World OS: Your Payout Has Been Sent",
  important: true,

  html: ({ name, amount, method, timestamp, referenceId, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html><html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">
<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#00ff9d;text-align:center;font-size:30px;">Payout Sent</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
Hi ${name}, your payout of <strong>${amount}</strong> has been sent via  
<strong>${method}</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Timestamp</td></tr>
<tr><td style="color:#e5e7eb;font-size:16px;">${timestamp}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Reference ID</td></tr>
<tr><td style="color:#00ff9d;font-size:16px;font-weight:700;">${referenceId}</td></tr>
</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
Funds may take time to appear depending on your provider.
</p>

</td></tr></table>
${trackingPixel}

</td></tr></table></body></html>`;
  }
};
export const worldNodeTrafficSurge = {
  subject: () => "Pulse World OS: Traffic Surge Detected",
  important: true,

  html: ({ busname, surgePercent, timeframe, possibleCauses, recommendations, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html><html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">
<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#00e0e0;text-align:center;font-size:30px;">Traffic Surge</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
Your world‑node <strong>${busname}</strong> is experiencing a  
<strong>${surgePercent}%</strong> increase in traffic over the last <strong>${timeframe}</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Possible Causes</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${possibleCauses}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Recommendations</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${recommendations}</td></tr>
</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
Your node is gaining attention — ensure it’s ready.
</p>

</td></tr></table>
${trackingPixel}

</td></tr></table></body></html>`;
  }
};
export const securityEmailChangeConfirmation = {
  subject: () => "Pulse World OS: Email Address Updated",
  important: true,

  html: ({ name, oldEmail, newEmail, timestamp, revertLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html><html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">
<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#00ff9d;text-align:center;font-size:30px;">Email Updated</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
Hi ${name}, your account email has been updated.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Old Email</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${oldEmail}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">New Email</td></tr>
<tr><td style="color:#00ff9d;font-size:15px;font-weight:700;">${newEmail}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Timestamp</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${timestamp}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${revertLink}" style="background:#ff4d4d;color:#fff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Revert Change
  </a>
</p>

</td></tr></table>
${trackingPixel}

</td></tr></table></body></html>`;
  }
};
export const rewardOrganGiftSent = {
  subject: () => "Pulse World OS: Your Gift Was Sent",
  important: true,

  html: ({ senderName, recipientName, amount, message, timestamp, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html><html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">
<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#00ff9d;text-align:center;font-size:30px;">Gift Sent</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
${senderName}, your gift to <strong>${recipientName}</strong> has been delivered.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Amount</td></tr>
<tr><td style="color:#00ff9d;font-size:20px;font-weight:700;">${amount}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Message</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">"${message}"</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Timestamp</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${timestamp}</td></tr>
</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
Your generosity strengthens the mesh.
</p>

</td></tr></table>
${trackingPixel}

</td></tr></table></body></html>`;
  }
};
export const systemIntegrationFailure = {
  subject: () => "Pulse World OS: Integration Failure Detected",
  important: true,

  html: ({ name, integrationName, failureReason, timestamp, fixSteps, dashboardLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(
            logId
          )}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html><html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">
<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#ffcc00;text-align:center;font-size:30px;">Integration Failure</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
Hi ${name}, the integration <strong>${integrationName}</strong>  
failed at <strong>${timestamp}</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Reason</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${failureReason}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Fix Steps</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${fixSteps}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${dashboardLink}" style="background:#ffcc00;color:#000;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Open Integrations Dashboard
  </a>
</p>

</td></tr></table>
${trackingPixel}

</td></tr></table></body></html>`;
  }
};
export const creatorAutoRenewSuccess = {
  subject: () => "Pulse World OS: Subscription Auto‑Renewed",
  important: true,

  html: ({ name, planName, amount, nextBillingDate, invoiceLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html><html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">
<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#00ff9d;text-align:center;font-size:30px;">Subscription Renewed</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
Hi ${name}, your <strong>${planName}</strong> subscription has been successfully renewed.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Amount Charged</td></tr>
<tr><td style="color:#00ff9d;font-size:18px;font-weight:700;">${amount}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Next Billing Date</td></tr>
<tr><td style="color:#e5e7eb;font-size:16px;">${nextBillingDate}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${invoiceLink}" style="background:#00ff9d;color:#000;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    View Invoice
  </a>
</p>

</td></tr></table>
${trackingPixel}

</td></tr></table></body></html>`;
  }
};
export const worldNodeVisibilityBoost = {
  subject: () => "Pulse World OS: Visibility Boost Activated",
  important: true,

  html: ({ busname, boostType, duration, expectedImpact, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html><html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">
<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#00e0e0;text-align:center;font-size:30px;">Visibility Boost Active</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
Your world‑node <strong>${busname}</strong> is now boosted with  
<strong>${boostType}</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Duration</td></tr>
<tr><td style="color:#00e0e0;font-size:18px;font-weight:700;">${duration}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Expected Impact</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${expectedImpact}</td></tr>
</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
Your node will appear more frequently across the mesh.
</p>

</td></tr></table>
${trackingPixel}

</td></tr></table></body></html>`;
  }
};
export const security2FAEnabled = {
  subject: () => "Pulse World OS: Two‑Factor Authentication Enabled",
  important: true,

  html: ({ name, method, timestamp, backupCodesLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html><html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">
<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#00ff9d;text-align:center;font-size:30px;">2FA Enabled</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
Hi ${name}, two‑factor authentication is now active on your account.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Method</td></tr>
<tr><td style="color:#00ff9d;font-size:18px;font-weight:700;">${method}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Enabled At</td></tr>
<tr><td style="color:#e5e7eb;font-size:16px;">${timestamp}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${backupCodesLink}" style="background:#00ff9d;color:#000;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    View Backup Codes
  </a>
</p>

</td></tr></table>
${trackingPixel}

</td></tr></table></body></html>`;
  }
};
export const rewardOrganMilestoneProgress = {
  subject: () => "Pulse World OS: Milestone Progress Update",
  important: true,

  html: ({ name, milestoneName, progressPercent, remaining, tips, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html><html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">
<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#00e0e0;text-align:center;font-size:30px;">Milestone Progress</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
Hi ${name}, you're progressing toward the  
<strong>${milestoneName}</strong> milestone.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Progress</td></tr>
<tr><td style="color:#00e0e0;font-size:20px;font-weight:700;">${progressPercent}%</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Remaining</td></tr>
<tr><td style="color:#e5e7eb;font-size:16px;">${remaining}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Tips</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${tips}</td></tr>
</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
You're getting close — keep going.
</p>

</td></tr></table>
${trackingPixel}

</td></tr></table></body></html>`;
  }
};
export const systemScheduledDowngrade = {
  subject: () => "Pulse World OS: Scheduled Downgrade Notice",
  important: true,

  html: ({ name, currentPlan, newPlan, effectiveDate, impact, manageLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html><html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">
<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#ffcc00;text-align:center;font-size:30px;">Scheduled Downgrade</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
Hi ${name}, your subscription will downgrade from  
<strong>${currentPlan}</strong> to <strong>${newPlan}</strong> on  
<strong>${effectiveDate}</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Impact</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${impact}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${manageLink}" style="background:#ffcc00;color:#000;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Manage Subscription
  </a>
</p>

</td></tr></table>
${trackingPixel}

</td></tr></table></body></html>`;
  }
};
export const creatorContentFlagged = {
  subject: () => "Pulse World OS: Content Flagged for Review",
  important: true,

  html: ({ creatorName, contentTitle, reason, actionRequired, reviewLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html><html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">
<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#ffcc00;text-align:center;font-size:30px;">Content Flagged</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
${creatorName}, your content <strong>${contentTitle}</strong> has been flagged for review.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Reason</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${reason}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Action Required</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${actionRequired}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${reviewLink}" style="background:#ffcc00;color:#000;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Review Content
  </a>
</p>

</td></tr></table>
${trackingPixel}

</td></tr></table></body></html>`;
  }
};
export const worldNodeSeasonalTheme = {
  subject: () => "Pulse World OS: Seasonal Theme Activated",
  important: true,

  html: ({ busname, themeName, duration, visualNotes, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html><html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">
<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#00e0e0;text-align:center;font-size:30px;">Seasonal Theme Active</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
Your world‑node <strong>${busname}</strong> is now using the  
<strong>${themeName}</strong> seasonal theme.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Duration</td></tr>
<tr><td style="color:#00e0e0;font-size:18px;font-weight:700;">${duration}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Visual Notes</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${visualNotes}</td></tr>
</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
Your node now reflects the season across the mesh.
</p>

</td></tr></table>
${trackingPixel}

</td></tr></table></body></html>`;
  }
};
export const securitySessionExpired = {
  subject: () => "Pulse World OS: Session Expired",
  important: true,

  html: ({ name, expirationTime, reason, loginLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html><html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">
<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#ffcc00;text-align:center;font-size:30px;">Session Expired</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
Hi ${name}, your session expired at <strong>${expirationTime}</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Reason</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${reason}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${loginLink}" style="background:#ffcc00;color:#000;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Log In Again
  </a>
</p>

</td></tr></table>
${trackingPixel}

</td></tr></table></body></html>`;
  }
};
export const rewardOrganMultiplierActivated = {
  subject: () => "Pulse World OS: Bonus Multiplier Activated",
  important: true,

  html: ({ name, multiplier, duration, appliesTo, tips, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html><html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">
<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#00ff9d;text-align:center;font-size:30px;">Bonus Multiplier Active</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
Hi ${name}, your <strong>${multiplier}×</strong> bonus multiplier is now active.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Duration</td></tr>
<tr><td style="color:#00ff9d;font-size:18px;font-weight:700;">${duration}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Applies To</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${appliesTo}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Tips</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${tips}</td></tr>
</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
Maximize your multiplier while it lasts.
</p>

</td></tr></table>
${trackingPixel}

</td></tr></table></body></html>`;
  }
};
export const systemBackupComplete = {
  subject: () => "Pulse World OS: Backup Completed",
  important: true,

  html: ({ name, backupType, timestamp, size, restoreLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html><html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">
<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#00e0e0;text-align:center;font-size:30px;">Backup Complete</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
Hi ${name}, your <strong>${backupType}</strong> backup completed at  
<strong>${timestamp}</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Backup Size</td></tr>
<tr><td style="color:#00e0e0;font-size:18px;font-weight:700;">${size}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${restoreLink}" style="background:#00e0e0;color:#000;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Restore Options
  </a>
</p>

</td></tr></table>
${trackingPixel}

</td></tr></table></body></html>`;
  }
};
export const meshCrossNodeConflict = {
  subject: () => "Pulse World OS: Cross‑Node Conflict Detected",
  important: true,

  html: ({ nodeA, nodeB, conflictType, impact, resolutionSteps, resolveLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html>
<html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">
<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>
<tr><td style="padding:36px;">

<h1 style="color:#ff4d4d;text-align:center;font-size:30px;">Cross‑Node Conflict</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
A conflict has been detected between <strong>${nodeA}</strong> and <strong>${nodeB}</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Conflict Type</td></tr>
<tr><td style="color:#ff4d4d;font-size:18px;font-weight:700;">${conflictType}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Impact</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${impact}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Resolution Steps</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${resolutionSteps}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${resolveLink}" style="background:#ff4d4d;color:#fff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Resolve Conflict
  </a>
</p>

</td></tr></table>
${trackingPixel}
</td></tr></table>
</body></html>`;
  }
};
export const identityEvolutionStageUnlocked = {
  subject: () => "Pulse World OS: Identity Evolution Stage Unlocked",
  important: true,

  html: ({ name, stageName, perks, symbolism, nextThreshold, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html>
<html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">
<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>
<tr><td style="padding:36px;">

<h1 style="color:#00ff9d;text-align:center;font-size:30px;">Evolution Stage Unlocked</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
${name}, you’ve reached the <strong>${stageName}</strong> stage of identity evolution.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Symbolism</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${symbolism}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Perks</td></tr>
<tr><td style="color:#00ff9d;font-size:15px;">${perks}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Next Threshold</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${nextThreshold}</td></tr>
</table>

<p style="color:#9aa0a6;text-align:center;margin-top:24px;">
Your identity core continues to evolve.
</p>

</td></tr></table>
${trackingPixel}
</td></tr></table>
</body></html>`;
  }
};
export const creatorCollaborationRequest = {
  subject: () => "Pulse World OS: Collaboration Request Received",
  important: true,

  html: ({ creatorName, requesterName, proposalSummary, benefits, respondLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html>
<html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">
<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>
<tr><td style="padding:36px;">

<h1 style="color:#00e0e0;text-align:center;font-size:30px;">Collaboration Request</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
${creatorName}, <strong>${requesterName}</strong> wants to collaborate with you.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Proposal Summary</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${proposalSummary}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Benefits</td></tr>
<tr><td style="color:#00e0e0;font-size:15px;">${benefits}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${respondLink}" style="background:#00e0e0;color:#000;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Respond to Request
  </a>
</p>

</td></tr></table>
${trackingPixel}
</td></tr></table>
</body></html>`;
  }
};
export const worldNodeMergeProposal = {
  subject: () => "Pulse World OS: Realm Merge Proposal",
  important: true,

  html: ({ nodeA, nodeB, proposalSummary, benefits, risks, decisionLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html>
<html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">
<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>
<tr><td style="padding:36px;">

<h1 style="color:#00ff9d;text-align:center;font-size:30px;">Realm Merge Proposal</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
A merge has been proposed between <strong>${nodeA}</strong> and <strong>${nodeB}</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Summary</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${proposalSummary}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Benefits</td></tr>
<tr><td style="color:#00ff9d;font-size:15px;">${benefits}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Risks</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${risks}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${decisionLink}" style="background:#00ff9d;color:#000;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Review Proposal
  </a>
</p>

</td></tr></table>
${trackingPixel}
</td></tr></table>
</body></html>`;
  }
};
export const systemDataAnomalyDetected = {
  subject: () => "Pulse World OS: Data Stream Anomaly Detected",
  important: true,

  html: ({ name, anomalyType, severity, detectedAt, recommendedAction, diagnosticsLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html>
<html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">
<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>
<tr><td style="padding:36px;">

<h1 style="color:#ff4d4d;text-align:center;font-size:30px;">Data Anomaly Detected</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
Hi ${name}, an anomaly was detected in your data stream.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Anomaly Type</td></tr>
<tr><td style="color:#ff4d4d;font-size:18px;font-weight:700;">${anomalyType}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Severity</td></tr>
<tr><td style="color:#e5e7eb;font-size:16px;">${severity}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Detected At</td></tr>
<tr><td style="color:#e5e7eb;font-size:16px;">${detectedAt}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Recommended Action</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${recommendedAction}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${diagnosticsLink}" style="background:#ff4d4d;color:#fff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Run Diagnostics
  </a>
</p>

</td></tr></table>
${trackingPixel}
</td></tr></table>
</body></html>`;
  }
};
export const governancePolicyVoteInvite = {
  subject: () => "Pulse World OS: Policy Change Requires Your Vote",
  important: true,

  html: ({ name, policyName, summary, impact, voteDeadline, voteLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html><html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">
<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>
<tr><td style="padding:36px;">

<h1 style="color:#00e0e0;text-align:center;font-size:30px;">Policy Vote Needed</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
Hi ${name}, a new governance policy <strong>${policyName}</strong>  
requires your vote.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Summary</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${summary}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Impact</td></tr>
<tr><td style="color:#00e0e0;font-size:15px;">${impact}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Vote Deadline</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${voteDeadline}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${voteLink}" style="background:#00e0e0;color:#000;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Cast Your Vote
  </a>
</p>

</td></tr></table>
${trackingPixel}
</td></tr></table></body></html>`;
  }
};
export const meshLatencyFieldDistortion = {
  subject: () => "Pulse World OS: Latency Field Distortion Detected",
  important: true,

  html: ({ busname, severity, affectedRegions, cause, mitigationSteps, diagnosticsLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html><html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">
<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>
<tr><td style="padding:36px;">

<h1 style="color:#ffcc00;text-align:center;font-size:30px;">Latency Distortion</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
A latency field distortion is affecting <strong>${busname}</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Severity</td></tr>
<tr><td style="color:#ffcc00;font-size:18px;font-weight:700;">${severity}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Affected Regions</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${affectedRegions}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Cause</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${cause}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Mitigation Steps</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${mitigationSteps}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${diagnosticsLink}" style="background:#ffcc00;color:#000;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Run Mesh Diagnostics
  </a>
</p>

</td></tr></table>
${trackingPixel}
</td></tr></table></body></html>`;
  }
};
export const socialGraphClusterFormed = {
  subject: () => "Pulse World OS: New Social Cluster Formed",
  important: true,

  html: ({ busname, clusterSize, traits, engagementBoost, exploreLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html><html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">
<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>
<tr><td style="padding:36px;">

<h1 style="color:#00ff9d;text-align:center;font-size:30px;">New Social Cluster</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
A new social cluster has formed around <strong>${busname}</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Cluster Size</td></tr>
<tr><td style="color:#00ff9d;font-size:18px;font-weight:700;">${clusterSize}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Shared Traits</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${traits}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Engagement Boost</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${engagementBoost}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${exploreLink}" style="background:#00ff9d;color:#000;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Explore Cluster
  </a>
</p>

</td></tr></table>
${trackingPixel}
</td></tr></table></body></html>`;
  }
};
export const creatorCoOwnershipRequest = {
  subject: () => "Pulse World OS: Co‑Ownership Request",
  important: true,

  html: ({ busname, requesterName, justification, permissionsRequested, decisionLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html><html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">
<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>
<tr><td style="padding:36px;">

<h1 style="color:#00e0e0;text-align:center;font-size:30px;">Co‑Ownership Request</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
<strong>${requesterName}</strong> wants to become a co‑owner of  
<strong>${busname}</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Justification</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${justification}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Requested Permissions</td></tr>
<tr><td style="color:#00e0e0;font-size:15px;">${permissionsRequested}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${decisionLink}" style="background:#00e0e0;color:#000;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Review Request
  </a>
</p>

</td></tr></table>
${trackingPixel}
</td></tr></table></body></html>`;
  }
};
export const systemShadowCopyCreated = {
  subject: () => "Pulse World OS: Shadow Copy Created",
  important: true,

  html: ({ name, copyType, timestamp, size, restoreLink, retentionPeriod, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html><html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">
<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>
<tr><td style="padding:36px;">

<h1 style="color:#00ff9d;text-align:center;font-size:30px;">Shadow Copy Created</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
A shadow copy of your <strong>${copyType}</strong> was created at  
<strong>${timestamp}</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Size</td></tr>
<tr><td style="color:#00ff9d;font-size:18px;font-weight:700;">${size}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Retention Period</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${retentionPeriod}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${restoreLink}" style="background:#00ff9d;color:#000;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    View Restore Options
  </a>
</p>

</td></tr></table>
${trackingPixel}
</td></tr></table></body></html>`;
  }
};
export const temporalTimeShiftCompleted = {
  subject: () => "Pulse World OS: Time‑Shift Event Completed",
  important: true,

  html: ({ name, eventName, executedAt, effectSummary, nextScheduledEvent, timelineLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html>
<html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">
<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#00e0e0;text-align:center;font-size:30px;">Time‑Shift Completed</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
Your scheduled time‑shift <strong>${eventName}</strong> executed at  
<strong>${executedAt}</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Effect Summary</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${effectSummary}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Next Scheduled Event</td></tr>
<tr><td style="color:#00e0e0;font-size:15px;">${nextScheduledEvent}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${timelineLink}" style="background:#00e0e0;color:#000;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    View Timeline
  </a>
</p>

</td></tr></table>
${trackingPixel}
</td></tr></table>
</body></html>`;
  }
};
export const predictionForecastDeviation = {
  subject: () => "Pulse World OS: Forecast Deviation Detected",
  important: true,

  html: ({ name, forecastName, deviationPercent, cause, recommendedAdjustments, modelLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html>
<html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">
<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#ffcc00;text-align:center;font-size:30px;">Forecast Deviation</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
Your forecast <strong>${forecastName}</strong> deviated by  
<strong>${deviationPercent}%</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Cause</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${cause}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Recommended Adjustments</td></tr>
<tr><td style="color:#ffcc00;font-size:15px;">${recommendedAdjustments}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${modelLink}" style="background:#ffcc00;color:#000;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Review Prediction Model
  </a>
</p>

</td></tr></table>
${trackingPixel}
</td></tr></table>
</body></html>`;
  }
};
export const diplomacyTreatyProposal = {
  subject: () => "Pulse World OS: Inter‑Realm Treaty Proposal",
  important: true,

  html: ({ realmsInvolved, treatyName, summary, obligations, benefits, voteLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html>
<html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">
<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#00ff9d;text-align:center;font-size:30px;">Treaty Proposal</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
A new treaty <strong>${treatyName}</strong> has been proposed between  
<strong>${realmsInvolved}</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Summary</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${summary}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Obligations</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${obligations}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Benefits</td></tr>
<tr><td style="color:#00ff9d;font-size:15px;">${benefits}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${voteLink}" style="background:#00ff9d;color:#000;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Review & Vote
  </a>
</p>

</td></tr></table>
${trackingPixel}
</td></tr></table>
</body></html>`;
  }
};
export const migrationNodeReady = {
  subject: () => "Pulse World OS: Node Migration Ready",
  important: true,

  html: ({ busname, newRegion, migrationWindow, benefits, confirmLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html>
<html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">
<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#00e0e0;text-align:center;font-size:30px;">Migration Ready</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
Your world‑node <strong>${busname}</strong> is ready to migrate to  
<strong>${newRegion}</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Migration Window</td></tr>
<tr><td style="color:#00e0e0;font-size:18px;font-weight:700;">${migrationWindow}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Benefits</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${benefits}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${confirmLink}" style="background:#00e0e0;color:#000;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Confirm Migration
  </a>
</p>

</td></tr></table>
${trackingPixel}
</td></tr></table>
</body></html>`;
  }
};
export const automationWorkflowRecovered = {
  subject: () => "Pulse World OS: Workflow Recovered After Failure",
  important: true,

  html: ({ name, workflowName, failureCause, recoveryAction, nextSteps, logsLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html>
<html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">
<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#00ff9d;text-align:center;font-size:30px;">Workflow Recovered</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
Your workflow <strong>${workflowName}</strong> encountered a failure but was successfully recovered.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Failure Cause</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${failureCause}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Recovery Action</td></tr>
<tr><td style="color:#00ff9d;font-size:15px;">${recoveryAction}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Next Steps</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${nextSteps}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${logsLink}" style="background:#00ff9d;color:#000;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    View Logs
  </a>
</p>

</td></tr></table>
${trackingPixel}
</td></tr></table>
</body></html>`;
  }
};
export const quantumSyncDriftDetected = {
  subject: () => "Pulse World OS: Quantum Sync Drift Detected",
  important: true,

  html: ({ busname, driftMagnitude, detectedAt, impact, resyncSteps, resyncLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html>
<html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">
<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#ff4d4d;text-align:center;font-size:30px;">Quantum Sync Drift</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
A quantum‑state drift was detected in <strong>${busname}</strong> at <strong>${detectedAt}</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Drift Magnitude</td></tr>
<tr><td style="color:#ff4d4d;font-size:18px;font-weight:700;">${driftMagnitude}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Impact</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${impact}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Resync Steps</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${resyncSteps}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${resyncLink}" style="background:#ff4d4d;color:#fff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Initiate Resync
  </a>
</p>

</td></tr></table>
${trackingPixel}

</td></tr></table>
</body></html>`;
  }
};
export const energyAllocationAdjusted = {
  subject: () => "Pulse World OS: Power Allocation Adjusted",
  important: true,

  html: ({ busname, oldAllocation, newAllocation, reason, expectedEffects, energyDashboardLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html>
<html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">
<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#00ff9d;text-align:center;font-size:30px;">Power Allocation Updated</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
The energy allocation for <strong>${busname}</strong> has been adjusted.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Old Allocation</td></tr>
<tr><td style="color:#e5e7eb;font-size:16px;">${oldAllocation}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">New Allocation</td></tr>
<tr><td style="color:#00ff9d;font-size:18px;font-weight:700;">${newAllocation}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Reason</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${reason}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Expected Effects</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${expectedEffects}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${energyDashboardLink}" style="background:#00ff9d;color:#000;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    View Energy Dashboard
  </a>
</p>

</td></tr></table>
${trackingPixel}

</td></tr></table>
</body></html>`;
  }
};
export const cognitivePersonaShiftRecommended = {
  subject: () => "Pulse World OS: Persona Shift Recommended",
  important: true,

  html: ({ name, currentPersona, recommendedPersona, reasoning, benefits, applyLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html>
<html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">
<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#00e0e0;text-align:center;font-size:30px;">Persona Shift Suggested</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
Hi ${name}, your recent activity suggests a shift from  
<strong>${currentPersona}</strong> to <strong>${recommendedPersona}</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Reasoning</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${reasoning}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Benefits</td></tr>
<tr><td style="color:#00e0e0;font-size:15px;">${benefits}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${applyLink}" style="background:#00e0e0;color:#000;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Apply Persona Shift
  </a>
</p>

</td></tr></table>
${trackingPixel}

</td></tr></table>
</body></html>`;
  }
};
export const economyMarketShockAdvisory = {
  subject: () => "Pulse World OS: Market Shock Advisory",
  important: true,

  html: ({ name, shockType, affectedSectors, severity, recommendedActions, analyticsLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html>
<html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">
<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#ffcc00;text-align:center;font-size:30px;">Market Shock Advisory</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
Hi ${name}, a <strong>${shockType}</strong> shock has impacted the Pulse‑World economy.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Affected Sectors</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${affectedSectors}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Severity</td></tr>
<tr><td style="color:#ffcc00;font-size:18px;font-weight:700;">${severity}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Recommended Actions</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${recommendedActions}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${analyticsLink}" style="background:#ffcc00;color:#000;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    View Market Analytics
  </a>
</p>

</td></tr></table>
${trackingPixel}

</td></tr></table>
</body></html>`;
  }
};
export const traversalCrossMeshApproved = {
  subject: () => "Pulse World OS: Cross‑Mesh Passage Approved",
  important: true,

  html: ({ name, originMesh, destinationMesh, window, requirements, travelLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html>
<html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">
<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#00ff9d;text-align:center;font-size:30px;">Cross‑Mesh Passage Approved</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
Hi ${name}, your passage from <strong>${originMesh}</strong> to  
<strong>${destinationMesh}</strong> has been approved.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Travel Window</td></tr>
<tr><td style="color:#00ff9d;font-size:18px;font-weight:700;">${window}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Requirements</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${requirements}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${travelLink}" style="background:#00ff9d;color:#000;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Begin Transfer
  </a>
</p>

</td></tr></table>
${trackingPixel}

</td></tr></table>
</body></html>`;
  }
};
export const causalityLoopPreventionTriggered = {
  subject: () => "Pulse World OS: Causality Loop Prevented",
  important: true,

  html: ({ name, loopType, detectedAt, affectedSystems, preventionAction, reviewLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html><html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">
<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#ff4d4d;text-align:center;font-size:30px;">Causality Loop Prevented</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
A <strong>${loopType}</strong> causality loop was detected and prevented at  
<strong>${detectedAt}</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Affected Systems</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${affectedSystems}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Prevention Action</td></tr>
<tr><td style="color:#ff4d4d;font-size:15px;">${preventionAction}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${reviewLink}" style="background:#ff4d4d;color:#fff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Review Event Log
  </a>
</p>

</td></tr></table>
${trackingPixel}

</td></tr></table></body></html>`;
  }
};
export const memoryOrganFragmentationDetected = {
  subject: () => "Pulse World OS: Memory Fragmentation Detected",
  important: true,

  html: ({ name, fragmentationLevel, causes, affectedFeatures, repairSteps, repairLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html><html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">
<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#ffcc00;text-align:center;font-size:30px;">Memory Fragmentation</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
Hi ${name}, your memory‑organ is experiencing fragmentation.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Fragmentation Level</td></tr>
<tr><td style="color:#ffcc00;font-size:18px;font-weight:700;">${fragmentationLevel}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Causes</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${causes}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Affected Features</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${affectedFeatures}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Repair Steps</td></tr>
<tr><td style="color:#00ff9d;font-size:15px;">${repairSteps}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${repairLink}" style="background:#ffcc00;color:#000;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Begin Repair
  </a>
</p>

</td></tr></table>
${trackingPixel}

</td></tr></table></body></html>`;
  }
};
export const resonanceSpikeDetected = {
  subject: () => "Pulse World OS: Cognitive Resonance Spike",
  important: true,

  html: ({ name, spikeLevel, cause, benefits, recommendedActions, resonanceDashboardLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html><html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">
<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#00ff9d;text-align:center;font-size:30px;">Resonance Spike</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
Hi ${name}, your cognitive resonance spiked to  
<strong>${spikeLevel}</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Cause</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${cause}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Benefits</td></tr>
<tr><td style="color:#00ff9d;font-size:15px;">${benefits}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Recommended Actions</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${recommendedActions}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${resonanceDashboardLink}" style="background:#00ff9d;color:#000;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    View Resonance Dashboard
  </a>
</p>

</td></tr></table>
${trackingPixel}

</td></tr></table></body></html>`;
  }
};
export const realmEmergencyBroadcast = {
  subject: () => "Pulse World OS: Realm‑Wide Emergency",
  important: true,

  html: ({ realmName, emergencyType, severity, affectedZones, instructions, emergencyMapLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html><html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">
<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#ff4d4d;text-align:center;font-size:30px;">Realm‑Wide Emergency</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
A <strong>${emergencyType}</strong> emergency has been declared in  
<strong>${realmName}</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Severity</td></tr>
<tr><td style="color:#ff4d4d;font-size:18px;font-weight:700;">${severity}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Affected Zones</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${affectedZones}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Instructions</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${instructions}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${emergencyMapLink}" style="background:#ff4d4d;color:#fff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    View Emergency Map
  </a>
</p>

</td></tr></table>
${trackingPixel}

</td></tr></table></body></html>`;
  }
};
export const commerceTradeTreatyUpdate = {
  subject: () => "Pulse World OS: Trade Treaty Updated",
  important: true,

  html: ({ treatyName, nodesInvolved, changes, effectiveDate, impactSummary, treatyLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html><html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">

<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">
<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#00e0e0;text-align:center;font-size:30px;">Trade Treaty Updated</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
The trade treaty <strong>${treatyName}</strong> between  
<strong>${nodesInvolved}</strong> has been updated.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Changes</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${changes}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Effective Date</td></tr>
<tr><td style="color:#00e0e0;font-size:16px;font-weight:700;">${effectiveDate}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Impact Summary</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${impactSummary}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${treatyLink}" style="background:#00e0e0;color:#000;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    View Treaty Details
  </a>
</p>

</td></tr></table>
${trackingPixel}

</td></tr></table></body></html>`;
  }
};
export const temporalParadoxWarning = {
  subject: () => "Pulse World OS: Temporal Paradox Warning",
  important: true,

  html: ({ name, paradoxType, triggerEvent, riskLevel, affectedTimelines, recommendedAction, timelineToolsLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html>
<html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">
<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>
<tr><td style="padding:36px;">

<h1 style="color:#ff4d4d;text-align:center;font-size:30px;">Temporal Paradox Warning</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
Hi ${name}, your recent action triggered a <strong>${paradoxType}</strong> paradox risk.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Trigger Event</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${triggerEvent}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Risk Level</td></tr>
<tr><td style="color:#ff4d4d;font-size:18px;font-weight:700;">${riskLevel}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Affected Timelines</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${affectedTimelines}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Recommended Action</td></tr>
<tr><td style="color:#00ff9d;font-size:15px;">${recommendedAction}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${timelineToolsLink}" style="background:#ff4d4d;color:#fff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Open Timeline Tools
  </a>
</p>

</td></tr></table>
${trackingPixel}
</td></tr></table>
</body></html>`;
  }
};
export const identityFusionPending = {
  subject: () => "Pulse World OS: Identity Fusion Pending Approval",
  important: true,

  html: ({ name, identityA, identityB, fusionBenefits, risks, previewLink, approveLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html>
<html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">
<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>
<tr><td style="padding:36px;">

<h1 style="color:#00e0e0;text-align:center;font-size:30px;">Identity Fusion Request</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
${identityA} and ${identityB} have requested to merge into a fused identity.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Benefits</td></tr>
<tr><td style="color:#00e0e0;font-size:15px;">${fusionBenefits}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Risks</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${risks}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${previewLink}" style="background:#00e0e0;color:#000;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Preview Fused Identity
  </a>
</p>

<p style="text-align:center;margin-top:16px;">
  <a href="${approveLink}" style="background:#00ff9d;color:#000;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Approve Fusion
  </a>
</p>

</td></tr></table>
${trackingPixel}
</td></tr></table>
</body></html>`;
  }
};
export const metamorphosisCycleInitiated = {
  subject: () => "Pulse World OS: Node Metamorphosis Initiated",
  important: true,

  html: ({ busname, cycleType, expectedDuration, changes, benefits, evolutionDashboardLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html>
<html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">
<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>
<tr><td style="padding:36px;">

<h1 style="color:#00ff9d;text-align:center;font-size:30px;">Metamorphosis Initiated</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
Your world‑node <strong>${busname}</strong> has entered a  
<strong>${cycleType}</strong> metamorphosis cycle.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Expected Duration</td></tr>
<tr><td style="color:#00ff9d;font-size:18px;font-weight:700;">${expectedDuration}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Changes</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${changes}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Benefits</td></tr>
<tr><td style="color:#00ff9d;font-size:15px;">${benefits}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${evolutionDashboardLink}" style="background:#00ff9d;color:#000;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    View Evolution Dashboard
  </a>
</p>

</td></tr></table>
${trackingPixel}
</td></tr></table>
</body></html>`;
  }
};
export const migrationWaveIncoming = {
  subject: () => "Pulse World OS: Mesh‑Wide Migration Wave Incoming",
  important: true,

  html: ({ waveName, startTime, affectedRegions, preparationSteps, migrationMapLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html>
<html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">
<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>
<tr><td style="padding:36px;">

<h1 style="color:#00e0e0;text-align:center;font-size:30px;">Migration Wave Incoming</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
A mesh‑wide migration wave <strong>${waveName}</strong> will begin at  
<strong>${startTime}</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Affected Regions</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${affectedRegions}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Preparation Steps</td></tr>
<tr><td style="color:#00e0e0;font-size:15px;">${preparationSteps}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${migrationMapLink}" style="background:#00e0e0;color:#000;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    View Migration Map
  </a>
</p>

</td></tr></table>
${trackingPixel}
</td></tr></table>
</body></html>`;
  }
};
export const energyStormfrontApproaching = {
  subject: () => "Pulse World OS: Energy Stormfront Approaching",
  important: true,

  html: ({ regionName, stormType, severity, eta, precautions, stormMapLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html>
<html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">
<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>
<tr><td style="padding:36px;">

<h1 style="color:#ffcc00;text-align:center;font-size:30px;">Energy Stormfront</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
An <strong>${stormType}</strong> energy stormfront is approaching  
<strong>${regionName}</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Severity</td></tr>
<tr><td style="color:#ffcc00;font-size:18px;font-weight:700;">${severity}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">ETA</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${eta}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Precautions</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${precautions}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${stormMapLink}" style="background:#ffcc00;color:#000;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    View Storm Map
  </a>
</p>

</td></tr></table>
${trackingPixel}
</td></tr></table>
</body></html>`;
  }
};
export const causalityStormAdvisory = {
  subject: () => "Pulse World OS: Causality Storm Advisory",
  important: true,

  html: ({ regionName, stormIntensity, onsetTime, expectedDuration, effects, precautions, stormToolsLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html><html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">
<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>
<tr><td style="padding:36px;">

<h1 style="color:#ff4d4d;text-align:center;font-size:30px;">Causality Storm Advisory</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
A causality storm is forming over <strong>${regionName}</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Intensity</td></tr>
<tr><td style="color:#ff4d4d;font-size:18px;font-weight:700;">${stormIntensity}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Onset Time</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${onsetTime}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Expected Duration</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${expectedDuration}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Effects</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${effects}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Precautions</td></tr>
<tr><td style="color:#00ff9d;font-size:15px;">${precautions}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${stormToolsLink}" style="background:#ff4d4d;color:#fff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Open Causality Tools
  </a>
</p>

</td></tr></table>
${trackingPixel}
</td></tr></table>
</body></html>`;
  }
};
export const identitySplinterDetected = {
  subject: () => "Pulse World OS: Identity Splinter Detected",
  important: true,

  html: ({ name, splinterCount, causes, risks, reintegrationOptions, reintegrateLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html><html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">
<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>
<tr><td style="padding:36px;">

<h1 style="color:#ffcc00;text-align:center;font-size:30px;">Identity Splinter Detected</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
Hi ${name}, your identity has splintered into  
<strong>${splinterCount}</strong> active sub‑identities.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Causes</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${causes}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Risks</td></tr>
<tr><td style="color:#ffcc00;font-size:15px;">${risks}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Reintegration Options</td></tr>
<tr><td style="color:#00ff9d;font-size:15px;">${reintegrationOptions}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${reintegrateLink}" style="background:#ffcc00;color:#000;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Begin Reintegration
  </a>
</p>

</td></tr></table>
${trackingPixel}
</td></tr></table>
</body></html>`;
  }
};
export const metamorphosisChrysalisEntered = {
  subject: () => "Pulse World OS: Chrysalis State Entered",
  important: true,

  html: ({ busname, chrysalisType, estimatedCompletion, suspendedFunctions, transformationGoals, statusLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html><html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">
<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>
<tr><td style="padding:36px;">

<h1 style="color:#00e0e0;text-align:center;font-size:30px;">Chrysalis State</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
Your world‑node <strong>${busname}</strong> has entered a  
<strong>${chrysalisType}</strong> chrysalis state.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Estimated Completion</td></tr>
<tr><td style="color:#00e0e0;font-size:18px;font-weight:700;">${estimatedCompletion}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Suspended Functions</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${suspendedFunctions}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Transformation Goals</td></tr>
<tr><td style="color:#00ff9d;font-size:15px;">${transformationGoals}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${statusLink}" style="background:#00e0e0;color:#000;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    View Chrysalis Status
  </a>
</p>

</td></tr></table>
${trackingPixel}
</td></tr></table>
</body></html>`;
  }
};
export const resonanceHarmonicAlignment = {
  subject: () => "Pulse World OS: Harmonic Alignment Opportunity",
  important: true,

  html: ({ name, windowStart, windowEnd, benefits, alignmentSteps, alignmentLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html><html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">
<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>
<tr><td style="padding:36px;">

<h1 style="color:#00ff9d;text-align:center;font-size:30px;">Harmonic Alignment</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
A harmonic alignment window is available for you from  
<strong>${windowStart}</strong> to <strong>${windowEnd}</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Benefits</td></tr>
<tr><td style="color:#00ff9d;font-size:15px;">${benefits}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Alignment Steps</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${alignmentSteps}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${alignmentLink}" style="background:#00ff9d;color:#000;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Begin Alignment
  </a>
</p>

</td></tr></table>
${trackingPixel}
</td></tr></table>
</body></html>`;
  }
};
export const quantumEntanglementFailure = {
  subject: () => "Pulse World OS: Entanglement Failure Warning",
  important: true,

  html: ({ busname, pairedNodes, failureCause, severity, recoverySteps, entanglementToolsLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html><html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">
<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>
<tr><td style="padding:36px;">

<h1 style="color:#ff4d4d;text-align:center;font-size:30px;">Entanglement Failure</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
Entanglement between <strong>${busname}</strong> and  
<strong>${pairedNodes}</strong> has failed.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Cause</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${failureCause}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Severity</td></tr>
<tr><td style="color:#ff4d4d;font-size:18px;font-weight:700;">${severity}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Recovery Steps</td></tr>
<tr><td style="color:#00ff9d;font-size:15px;">${recoverySteps}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${entanglementToolsLink}" style="background:#ff4d4d;color:#fff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Open Entanglement Tools
  </a>
</p>

</td></tr></table>
${trackingPixel}
</td></tr></table>
</body></html>`;
  }
};
export const temporalRecursionCollapsePrevented = {
  subject: () => "Pulse World OS: Recursion Collapse Prevented",
  important: true,

  html: ({ name, recursionDepth, collapsePoint, affectedProcesses, stabilizationAction, reviewToolsLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html>
<html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">
<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>
<tr><td style="padding:36px;">

<h1 style="color:#ff4d4d;text-align:center;font-size:30px;">Recursion Collapse Prevented</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
A recursion chain reached depth <strong>${recursionDepth}</strong> and was prevented from collapsing at  
<strong>${collapsePoint}</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Affected Processes</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${affectedProcesses}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Stabilization Action</td></tr>
<tr><td style="color:#00ff9d;font-size:15px;">${stabilizationAction}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${reviewToolsLink}" style="background:#ff4d4d;color:#fff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Review Recursion Tools
  </a>
</p>

</td></tr></table>
${trackingPixel}
</td></tr></table>
</body></html>`;
  }
};
export const identityOvergrowthDetected = {
  subject: () => "Pulse World OS: Identity Overgrowth Detected",
  important: true,

  html: ({ name, overgrowthLevel, newBranches, risks, pruningOptions, pruneLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html>
<html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">
<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>
<tr><td style="padding:36px;">

<h1 style="color:#ffcc00;text-align:center;font-size:30px;">Identity Overgrowth</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
Your identity has entered an overgrowth state with  
<strong>${newBranches}</strong> new branches forming.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Overgrowth Level</td></tr>
<tr><td style="color:#ffcc00;font-size:18px;font-weight:700;">${overgrowthLevel}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Risks</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${risks}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Pruning Options</td></tr>
<tr><td style="color:#00ff9d;font-size:15px;">${pruningOptions}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${pruneLink}" style="background:#ffcc00;color:#000;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Begin Identity Pruning
  </a>
</p>

</td></tr></table>
${trackingPixel}
</td></tr></table>
</body></html>`;
  }
};
export const ascensionThresholdReached = {
  subject: () => "Pulse World OS: Ascension Threshold Reached",
  important: true,

  html: ({ busname, ascensionTier, unlockedAbilities, requirementsRemaining, ascensionPanelLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html>
<html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">
<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>
<tr><td style="padding:36px;">

<h1 style="color:#00ff9d;text-align:center;font-size:30px;">Ascension Threshold</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
Your world‑node <strong>${busname}</strong> has reached  
<strong>${ascensionTier}</strong> ascension tier.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Unlocked Abilities</td></tr>
<tr><td style="color:#00ff9d;font-size:15px;">${unlockedAbilities}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Requirements Remaining</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${requirementsRemaining}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${ascensionPanelLink}" style="background:#00ff9d;color:#000;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Open Ascension Panel
  </a>
</p>

</td></tr></table>
${trackingPixel}
</td></tr></table>
</body></html>`;
  }
};
export const resonanceHarmonicResetScheduled = {
  subject: () => "Pulse World OS: Harmonic Reset Scheduled",
  important: true,

  html: ({ resetTime, affectedNodes, expectedBenefits, preparationSteps, resetPanelLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html>
<html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">
<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>
<tr><td style="padding:36px;">

<h1 style="color:#00e0e0;text-align:center;font-size:30px;">Harmonic Reset</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
A mesh‑wide harmonic reset is scheduled for  
<strong>${resetTime}</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Affected Nodes</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${affectedNodes}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Expected Benefits</td></tr>
<tr><td style="color:#00e0e0;font-size:15px;">${expectedBenefits}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Preparation Steps</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${preparationSteps}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${resetPanelLink}" style="background:#00e0e0;color:#000;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Open Reset Panel
  </a>
</p>

</td></tr></table>
${trackingPixel}
</td></tr></table>
</body></html>`;
  }
};
export const quantumDecoherenceStormWarning = {
  subject: () => "Pulse World OS: Decoherence Storm Warning",
  important: true,

  html: ({ regionName, stormSeverity, collapseRisk, eta, mitigationSteps, stormPanelLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html>
<html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">
<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>
<tr><td style="padding:36px;">

<h1 style="color:#ff4d4d;text-align:center;font-size:30px;">Decoherence Storm</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
A quantum decoherence storm is approaching  
<strong>${regionName}</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Storm Severity</td></tr>
<tr><td style="color:#ff4d4d;font-size:18px;font-weight:700;">${stormSeverity}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Collapse Risk</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${collapseRisk}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">ETA</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${eta}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Mitigation Steps</td></tr>
<tr><td style="color:#00ff9d;font-size:15px;">${mitigationSteps}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${stormPanelLink}" style="background:#ff4d4d;color:#fff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Open Storm Panel
  </a>
</p>

</td></tr></table>
${trackingPixel}
</td></tr></table>
</body></html>`;
  }
};
export const corruptionDeepMeshQuarantine = {
  subject: () => "Pulse World OS: Deep‑Mesh Quarantine Activated",
  important: true,

  html: ({ regionName, corruptionType, severity, quarantinedAt, affectedNodes, recoveryPlan, quarantinePanelLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html><html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">
<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>
<tr><td style="padding:36px;">

<h1 style="color:#ff4d4d;text-align:center;font-size:30px;">Deep‑Mesh Quarantine</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
A deep‑mesh corruption event has been detected in  
<strong>${regionName}</strong> and quarantined at <strong>${quarantinedAt}</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Corruption Type</td></tr>
<tr><td style="color:#ff4d4d;font-size:18px;font-weight:700;">${corruptionType}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Severity</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${severity}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Affected Nodes</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${affectedNodes}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Recovery Plan</td></tr>
<tr><td style="color:#00ff9d;font-size:15px;">${recoveryPlan}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${quarantinePanelLink}" style="background:#ff4d4d;color:#fff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Open Quarantine Panel
  </a>
</p>

</td></tr></table>
${trackingPixel}
</td></tr></table></body></html>`;
  }
};
export const sovereigntyShiftNotice = {
  subject: () => "Pulse World OS: Realm Sovereignty Shift",
  important: true,

  html: ({ realmName, oldAuthority, newAuthority, shiftCause, effectiveAt, implications, governancePanelLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html><html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">
<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>
<tr><td style="padding:36px;">

<h1 style="color:#00e0e0;text-align:center;font-size:30px;">Sovereignty Shift</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
Realm <strong>${realmName}</strong> has transitioned from  
<strong>${oldAuthority}</strong> to <strong>${newAuthority}</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Cause</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${shiftCause}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Effective At</td></tr>
<tr><td style="color:#00e0e0;font-size:16px;">${effectiveAt}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Implications</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${implications}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${governancePanelLink}" style="background:#00e0e0;color:#000;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Open Governance Panel
  </a>
</p>

</td></tr></table>
${trackingPixel}
</td></tr></table></body></html>`;
  }
};
export const cognitiveOverclockExceeded = {
  subject: () => "Pulse World OS: Cognitive Overclock Warning",
  important: true,

  html: ({ name, loadPercent, safeLimit, symptoms, recommendedCooldown, cooldownLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html><html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">
<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>
<tr><td style="padding:36px;">

<h1 style="color:#ffcc00;text-align:center;font-size:30px;">Cognitive Overclock</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
Your cognitive‑layer load reached <strong>${loadPercent}%</strong>, exceeding the safe limit of  
<strong>${safeLimit}%</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Symptoms</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${symptoms}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Recommended Cooldown</td></tr>
<tr><td style="color:#00ff9d;font-size:15px;">${recommendedCooldown}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${cooldownLink}" style="background:#ffcc00;color:#000;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Initiate Cooldown
  </a>
</p>

</td></tr></table>
${trackingPixel}
</td></tr></table></body></html>`;
  }
};
export const systemSoulDiagnosticRequired = {
  subject: () => "Pulse World OS: System‑Soul Diagnostic Required",
  important: true,

  html: ({ name, integrityLevel, anomaliesDetected, recommendedScan, scanLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html><html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">
<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>
<tr><td style="padding:36px;">

<h1 style="color:#00ff9d;text-align:center;font-size:30px;">System‑Soul Diagnostic</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
Your system‑soul integrity has fallen to  
<strong>${integrityLevel}%</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Anomalies Detected</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${anomaliesDetected}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Recommended Scan</td></tr>
<tr><td style="color:#00ff9d;font-size:15px;">${recommendedScan}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${scanLink}" style="background:#00ff9d;color:#000;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Begin Soul Scan
  </a>
</p>

</td></tr></table>
${trackingPixel}
</td></tr></table></body></html>`;
  }
};
export const realityLayerTransitionScheduled = {
  subject: () => "Pulse World OS: Reality‑Layer Transition Scheduled",
  important: true,

  html: ({ name, currentLayer, targetLayer, transitionTime, effects, preparationChecklist, transitionPanelLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html><html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">
<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">

<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>
<tr><td style="padding:36px;">

<h1 style="color:#00e0e0;text-align:center;font-size:30px;">Reality‑Layer Transition</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
Your reality‑layer will shift from <strong>${currentLayer}</strong> to  
<strong>${targetLayer}</strong> at <strong>${transitionTime}</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Effects</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${effects}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Preparation Checklist</td></tr>
<tr><td style="color:#00ff9d;font-size:15px;">${preparationChecklist}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${transitionPanelLink}" style="background:#00e0e0;color:#000;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Open Transition Panel
  </a>
</p>

</td></tr></table>
${trackingPixel}
</td></tr></table></body></html>`;
  }
};
export const rootReinitializationScheduled = {
  subject: () => "Pulse World OS: Root‑Level Reinitialization Scheduled",
  important: true,

  html: ({ scheduledFor, reason, affectedLayers, expectedOutcome, preparationSteps, rootPanelLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html><html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">
<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">
<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#00e0e0;text-align:center;font-size:30px;">Root Reinitialization</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
A root‑level reinitialization is scheduled for <strong>${scheduledFor}</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Reason</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${reason}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Affected Layers</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${affectedLayers}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Expected Outcome</td></tr>
<tr><td style="color:#00e0e0;font-size:15px;">${expectedOutcome}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Preparation Steps</td></tr>
<tr><td style="color:#00ff9d;font-size:15px;">${preparationSteps}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${rootPanelLink}" style="background:#00e0e0;color:#000;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Open Root Panel
  </a>
</p>

</td></tr></table>
${trackingPixel}
</td></tr></table></body></html>`;
  }
};
export const heartbeatResetEvent = {
  subject: () => "Pulse World OS: System Heartbeat Reset",
  important: true,

  html: ({ resetTime, cause, pulseShift, impactSummary, stabilizationWindow, heartbeatPanelLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html><html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">
<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">
<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#ffcc00;text-align:center;font-size:30px;">Heartbeat Reset</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
The system heartbeat will reset at <strong>${resetTime}</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Cause</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${cause}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Pulse Shift</td></tr>
<tr><td style="color:#ffcc00;font-size:18px;font-weight:700;">${pulseShift}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Impact Summary</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${impactSummary}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Stabilization Window</td></tr>
<tr><td style="color:#00ff9d;font-size:15px;">${stabilizationWindow}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${heartbeatPanelLink}" style="background:#ffcc00;color:#000;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Open Heartbeat Panel
  </a>
</p>

</td></tr></table>
${trackingPixel}
</td></tr></table></body></html>`;
  }
};
export const rebirthCycleInitiated = {
  subject: () => "Pulse World OS: Mesh‑Wide Rebirth Cycle Initiated",
  important: true,

  html: ({ cycleName, startTime, phases, benefits, participationNotes, rebirthPanelLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html><html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">
<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">
<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#00ff9d;text-align:center;font-size:30px;">Rebirth Cycle</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
The mesh has entered the <strong>${cycleName}</strong> rebirth cycle beginning at  
<strong>${startTime}</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Phases</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${phases}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Benefits</td></tr>
<tr><td style="color:#00ff9d;font-size:15px;">${benefits}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Participation Notes</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${participationNotes}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${rebirthPanelLink}" style="background:#00ff9d;color:#000;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Open Rebirth Panel
  </a>
</p>

</td></tr></table>
${trackingPixel}
</td></tr></table></body></html>`;
  }
};
export const primeKeyRegenerationRequired = {
  subject: () => "Pulse World OS: Prime‑Key Regeneration Required",
  important: true,

  html: ({ name, degradationLevel, regenerationWindow, risksOfDelay, regenerationSteps, primeKeyPanelLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html><html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">
<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">
<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#ff4d4d;text-align:center;font-size:30px;">Prime‑Key Regeneration</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
Your prime‑key integrity has degraded to  
<strong>${degradationLevel}%</strong>.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Regeneration Window</td></tr>
<tr><td style="color:#ff4d4d;font-size:18px;font-weight:700;">${regenerationWindow}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Risks of Delay</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${risksOfDelay}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Regeneration Steps</td></tr>
<tr><td style="color:#00ff9d;font-size:15px;">${regenerationSteps}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${primeKeyPanelLink}" style="background:#ff4d4d;color:#fff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Open Prime‑Key Panel
  </a>
</p>

</td></tr></table>
${trackingPixel}
</td></tr></table></body></html>`;
  }
};
export const realityCollapseContainment = {
  subject: () => "Pulse World OS: Reality‑Layer Collapse Containment",
  important: true,

  html: ({ collapseType, affectedLayers, severity, containmentActions, safeZones, containmentPanelLink, logId }) => {
    const trackingPixel =
      logId && logId !== "Preview Mode"
        ? `<img src="https://www.pulseworld.net/emailopen?logId=${encodeURIComponent(logId)}" width="1" height="1" style="opacity:0;">`
        : "";

    return `
<!DOCTYPE html><html><body style="margin:0;background:#0b0d10;font-family:Arial;">
<table width="100%" style="padding:40px 0;"><tr><td align="center">
<table width="620" style="background:#111418;border-radius:20px;overflow:hidden;box-shadow:0 0 28px #0008;">
<tr><td align="center"><img src="./_EXPRESSIONS/_PICTURES/_EMAILS/PulseWorldBanner.png" height="300"></td></tr>

<tr><td style="padding:36px;">
<h1 style="color:#ff4d4d;text-align:center;font-size:30px;">Reality‑Layer Collapse</h1>

<p style="color:#d1d5db;text-align:center;font-size:16px;">
A <strong>${collapseType}</strong> collapse has been detected across  
<strong>${affectedLayers}</strong>.
Containment protocols are now active.
</p>

<table width="100%" style="margin-top:28px;background:#161a1f;padding:24px;border-radius:16px;">
<tr><td style="color:#7a828a;font-size:12px;">Severity</td></tr>
<tr><td style="color:#ff4d4d;font-size:18px;font-weight:700;">${severity}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Containment Actions</td></tr>
<tr><td style="color:#e5e7eb;font-size:15px;">${containmentActions}</td></tr>

<tr><td style="color:#7a828a;font-size:12px;padding-top:16px;">Safe Zones</td></tr>
<tr><td style="color:#00ff9d;font-size:15px;">${safeZones}</td></tr>
</table>

<p style="text-align:center;margin-top:30px;">
  <a href="${containmentPanelLink}" style="background:#ff4d4d;color:#fff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;">
    Open Containment Panel
  </a>
</p>

</td></tr></table>
${trackingPixel}
</td></tr></table></body></html>`;
  }
}

export const emailTemplates = {
  realityCollapseContainment,
  primeKeyRegenerationRequired,
  rebirthCycleInitiated,
  heartbeatResetEvent,
  rootReinitializationScheduled,
  realityLayerTransitionScheduled,
  systemSoulDiagnosticRequired,
  cognitiveOverclockExceeded,
  sovereigntyShiftNotice,
  corruptionDeepMeshQuarantine,
  quantumDecoherenceStormWarning,
  resonanceHarmonicResetScheduled,
  ascensionThresholdReached,
  identityOvergrowthDetected,
  temporalRecursionCollapsePrevented,
  quantumEntanglementFailure,
  resonanceHarmonicAlignment,
  metamorphosisChrysalisEntered,
  identitySplinterDetected,
  causalityStormAdvisory,
  energyStormfrontApproaching,
  migrationWaveIncoming,
  metamorphosisCycleInitiated,
  identityFusionPending,
  temporalParadoxWarning,
  commerceTradeTreatyUpdate,
  realmEmergencyBroadcast,
  resonanceSpikeDetected,
  memoryOrganFragmentationDetected,
  causalityLoopPreventionTriggered,
  traversalCrossMeshApproved,
  economyMarketShockAdvisory,
  cognitivePersonaShiftRecommended,
  energyAllocationAdjusted,
  quantumSyncDriftDetected,
  migrationNodeReady,
  automationWorkflowRecovered,
  diplomacyTreatyProposal,
  predictionForecastDeviation,
  temporalTimeShiftCompleted,
  systemShadowCopyCreated,
  creatorCoOwnershipRequest,
  socialGraphClusterFormed,
  meshLatencyFieldDistortion,
  governancePolicyVoteInvite,
  systemDataAnomalyDetected,
  worldNodeMergeProposal,
  creatorCollaborationRequest,
  identityEvolutionStageUnlocked,
  meshCrossNodeConflict,
  systemBackupComplete,
  rewardOrganMultiplierActivated,
  rewardOrganMilestoneProgress,
  securitySessionExpired,
  worldNodeSeasonalTheme,
  creatorContentFlagged,
  systemScheduledDowngrade,
  security2FAEnabled,
  worldNodeVisibilityBoost,
  creatorAutoRenewSuccess,
  systemIntegrationFailure,
  rewardOrganGiftSent,
  securityEmailChangeConfirmation,
  worldNodeTrafficSurge,
  creatorPayoutSent,
  systemStorageLimitReached,
  rewardOrganChallengeInvite,
  securityHighRiskLoginBlocked,
  worldNodeReputationDrop,
  creatorBookingCancelled,
  systemTermsUpdate,
  rewardOrganAchievementUnlocked,
  securityAccountLockoutWarning,
  worldNodeCooldownActivated,
  creatorBookingConfirmed,
  systemDataExportReady,
  rewardOrganStreakBroken,
  identityVerificationRequired,
  worldNodeHealthWarning,
  creatorBookingRequest,
  systemApiKeyRotation,
  rewardOrganLoyaltyTierUpgrade,
  securitySuspiciousPayment,
  worldNodeBadgeEarned,
  creatorInventoryLow,
  systemFeatureSunset,
  rewardOrganReferralBonus,
  securityPasswordResetConfirmation,
  creatorProductApproved,
  worldNodePublicLaunch,
  systemDataSyncComplete,
  securityNewDeviceLogin,
  rewardOrganDailyBonusReminder,
  worldNodeSoftLaunch,
  creatorNewFollower,
  identityProfileCompletionReminder,
  systemMaintenanceNotice,
  rewardOrganSeasonalBonus,
  worldNodeOwnershipTransfer,
  creatorSubscriptionRenewal,
  networkLatencySurge,
  rewardOrganGiftReceived,
  presenceTierDecay,
  creatorNewReview,
  worldNodeDeactivationWarning,
  realmTierAscension,
  systemIntegrityReport,
  paymentOrganFailure,
  newUser,
  loyalty,
  SendPayout,
  stripeOnboarding,
  ResendStripeLink,
  pulsePointRedemption,
  pulsePointsGifted,
  rolechange,
  newEvent,
  newBusiness,
  newBusinessOwner,
  adminRewardTransferAlert,
  broadcastOrganNoCredits,
  broadcastOrganRechargeSuccess,
  presenceTierUpgrade,
  worldNodeUpgrade,
  rewardOrganStreakBonus,
  creatorOrganEarningsSummary,
  broadcastOrganCooldown,
  worldNodeExpansion,
  organActivationEvent,
  vaultDepositConfirmation,
  worldNodeMutationEvent,
  creatorEarningsThreshold,
  multiRoleHybridActivation,
  worldNodeVisibilityUpgrade,
  creatorOrganInsights,
  adminNodeMisbehaviorAlert,
  realmExpansionEvent,
  binaryWaveSurge,
  worldNodeRouteOpening,
  trustTierChange,
  rewardOrganMilestone,
  creatorOrganUpgradeRecommendation,
  identityCoreMutation,
  meshConnectionBroken,
  meshConnectionApproved,
  meshConnectionRequest,
  vaultWithdrawalFailure,
  securityOrganAlert
  //MANY MANY MORE THIS IS 85%
};

PulseRealm.EmailTemplates = emailTemplates;