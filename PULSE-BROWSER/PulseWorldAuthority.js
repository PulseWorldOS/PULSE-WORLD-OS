
async function changeToOffline(videoElement) {
  let originalSrc = videoElement.src;
  let offlineSrc = originalSrc;

  if (!originalSrc.includes("pw=offline")) {
    const separator = originalSrc.includes("?") ? "&" : "?";
    offlineSrc = originalSrc + separator + "pw=offline";
  }

  // First try the offline version
  videoElement.src = offlineSrc;

  // If offline version fails, fall back to the original online URL
  videoElement.addEventListener("error", function onError() {
    // Prevent infinite loop
    videoElement.removeEventListener("error", onError);

    if (videoElement.src.includes("pw=offline")) {
      console.warn("Offline video failed, falling back to online:", originalSrc);
      videoElement.src = originalSrc;
    }
  }, { once: true });
}

const params = new URLSearchParams(location.search);
const origin = params.get("from");

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
    container.innerHTML = html;

    // Extract videos and prefer offline cache, with online fallback
    const videos = Array.from(container.querySelectorAll("video"));
    videos.forEach(v => changeToOffline(v));

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