const WEB_CLIENT_ID = "YOUR_WEB_OAUTH_CLIENT_://googleusercontent.com";

window.onload = () => {
  // 1. Grab the desktop ID passed from the Chrome Extension via the URL
  const urlParams = new URLSearchParams(window.location.search);
  const expectedDesktopId = urlParams.get("desktop_id");

  if (!expectedDesktopId) {
    document.getElementById("status").textContent = "No desktop ID found in URL.";
    return;
  }

  // 2. Initialize Google Auth (openid only — no email or name exposed)
  google.accounts.id.initialize({
    client_id: WEB_CLIENT_ID,
    auto_select: true, // Attempts automatic silent sign-in on returning devices
    callback: (response) => {
      const webSubId = extractOpaqueSubId(response.credential);

      // 3. Compare Extension ID vs. Webpage OAuth 'sub' ID
      if (areIdentitiesEqual(expectedDesktopId, webSubId)) {
        document.getElementById("status").textContent = "MATCH: Same Google account!";
      } else {
        document.getElementById("status").textContent = "MISMATCH: Different Google accounts.";
      }
    }
  });

  // 4. Trigger One Tap immediately; render fallback button if interaction is required
  google.accounts.id.prompt((notification) => {
    if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
      google.accounts.id.renderButton(
        document.getElementById("google-signin-button"),
        { theme: "outline", size: "large" }
      );
    }
  });
};

// Extracts ONLY the permanent, opaque 'sub' ID from the Google JWT
function extractOpaqueSubId(jwtToken) {
  try {
    const base64Url = jwtToken.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(window.atob(base64));
    return payload.sub || null;
  } catch (error) {
    console.error("Token parse error:", error);
    return null;
  }
}

// Strict string comparison between the two opaque IDs
function areIdentitiesEqual(idA, idB) {
  if (typeof idA !== 'string' || typeof idB !== 'string') return false;
  if (idA.trim() === '' || idB.trim() === '') return false;
  return idA === idB;
}
