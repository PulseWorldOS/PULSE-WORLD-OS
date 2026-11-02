
const params = new URLSearchParams(location.search);
const origin = params.get("from");

function latestSnapshot(realm, container, html) {
  const snapshotKey = `pulse_snapshot_${realm}`;
  chrome.storage.local.get(snapshotKey, (items) => {
    const snap = items[snapshotKey];
    if (snap && snap.htmlSummary) {
      container.innerHTML = snap.htmlSummary;
      console.log("Pulse Ghost Echo Used for your Local Environment!");
      // Extract videos and prefer offline cache, with online fallback
      const videos = Array.from(container.querySelectorAll("video"));
      videos.forEach(v => changeToOffline(v));
    } else {
      container.innerHTML = html;
      // Extract videos and prefer offline cache, with online fallback
      const videos = Array.from(container.querySelectorAll("video"));
      videos.forEach(v => changeToOffline(v));
    }
  });
}

async function changeToOffline(videoElement) {
  let originalSrc = videoElement.src;

  // Build the offline version
  let offlineSrc = originalSrc;
  if (!originalSrc.includes("pw=offline")) {
    const separator = originalSrc.includes("?") ? "&" : "?";
    offlineSrc = originalSrc + separator + "pw=offline";
  }

  // Clean online version (remove pw=offline if present)
  let onlineSrc = originalSrc.replace(/([?&])pw=offline(&)?/, (match, p1, p2) => {
    if (p1 === "?" && !p2) return "";
    if (p1 === "?" && p2) return "?";
    return p2 ? p1 : "";
  }).replace(/[?&]$/, "");

  let triedOffline = false;
  let triedOnline = false;

  function trySource(src, isOffline) {
    videoElement.src = src;
    if (isOffline) triedOffline = true;
    else triedOnline = true;
  }

  // Start with offline version
  trySource(offlineSrc, true);

  videoElement.addEventListener("error", function onError() {
    if (!triedOnline) {
      // Offline failed → try online
      console.warn("Offline video failed, trying online:", onlineSrc);
      trySource(onlineSrc, false);
    } else if (!triedOffline) {
      // Online failed → try offline
      console.warn("Online video failed, trying offline:", offlineSrc);
      trySource(offlineSrc, true);
    } else {
      // Both failed
      console.error("Both offline and online versions failed for:", originalSrc);
      videoElement.removeEventListener("error", onError);
    }
  });
}

// ---------------------------------------------------------
// Minimal Authority Gateway + Video Extraction + Saving
// ---------------------------------------------------------
(async () => {
  try {
    let url = "https://www.pulseworld.net/PULSEConfig/PulseWorldTeam.txt";
    if (origin) url = origin;

    if (!url.includes("pw=offline")) {
      const separator = url.includes("?") ? "&" : "?";
      url = url + separator + "pw=offline";
    }

    const response = await fetch(url, { mode: "cors" });
    let html = await response.text();

    const container = document.getElementById("pulseworld");
    // let u;
    // try {
    //   u = new URL(url);
    // } catch {
    //   return null;
    // }

    let host = url.hostname;
    latestSnapshot(host, container, html);
    //container.innerHTML = html;

  } catch (err) {
    document.getElementById("pulseworld").innerHTML =
      "<p style='color:red;'>PulseWorld could not load.</p>";
    console.error("PulseWorldAuthority error:", err);
  }
})();

// // ---------------------------------------------------------
// // Save video bytes into extension memory
// // ---------------------------------------------------------
// async function saveVideoToMemory(videoElement) {
//   try {
//     let newsource = videoElement.src;
    
//     const response = await fetch(newsource);
//     const blob = await response.blob();
//     const blobUrl = URL.createObjectURL(blob);

//     const entry = {
//       source: videoElement.src,
//       blobUrl,
//       width: videoElement.videoWidth,
//       height: videoElement.videoHeight,
//       currentTime: videoElement.currentTime || 0,
//       timestamp: Date.now()
//     };

//     chrome.storage.local.get(["pipMemory"], data => {
//       const list = data.pipMemory || [];
//       list.push(entry);
//       chrome.storage.local.set({ pipMemory: list });
//     });

//   } catch (e) {
//     console.warn("Cannot save video bytes:", e);
//   }
// }