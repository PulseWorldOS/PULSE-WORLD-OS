
const params = new URLSearchParams(location.search);
const origin = params.get("from");
let authorityRealm = null;

// async function latestSnapshot(realm, container, html) {
//   const snapshotKey = `pulse_snapshot_${realm}`;
//   chrome.storage.local.get(snapshotKey, (items) => {
//     const snap = items[snapshotKey];
//     if (snap && snap.htmlSummary && !authorityRealm) {
//       container.innerHTML = snap.htmlSummary;
//       console.log("Pulse Ghost Echo Used for your Local Environment!");
//       setTimeout(pullall(container), 1000);
//     } else {
//       container.innerHTML = html;
//       authorityRealm = null;
//       setTimeout(pullall(container), 1000);
//     }
//   });
// }

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


function AttemptPulseSteam(videoElement) {
  try {
    if (videoElement) {
      videoElement.requestPictureInPicture()
        .then(() => saveVideoToMemory(videoElement))
        .catch(err => {
          console.warn("PIP Error:", err);
          fallbackPIP();
        });
      return;
    }

    fallbackPIP();

  } catch (e) {
    console.warn("PulseStream Error:", e);
    fallbackPIP();
  }
}

function getPrimaryVideo() {
  const videos = [...document.querySelectorAll("video")];
  console.log(videos);
  // Filter to only videos that are actually loaded/playing
  const candidates = videos.filter(v =>
    v.videoWidth > 0 &&
    v.videoHeight > 0 &&
    v.readyState >= 2
  );

  // If no real videos, fallback to first <video>
  if (candidates.length === 0) {
    return videos[0] || null;
  }

  // If exactly one real video → use it
  if (candidates.length === 1) {
    return candidates[0];
  }

  // If multiple real videos → use the second one
  if (candidates.length >= 2) {
    return candidates[candidates.length - 2];
  }

  return null;
}



function fallbackPIP() {
  getLastMemoryVideo(memVideo => {
    if (memVideo) {
      memVideo.requestPictureInPicture()
        .catch(err => console.warn("Memory PIP Error:", err));
      return;
    }

    const realStory = getPrimaryVideo();

    if (realStory) {
      realStory.requestPictureInPicture()
        .then(() => saveVideoToMemory(realStory))
        .catch(err => console.warn("Fresh PIP Error:", err));
    }

    console.log("Primary video:", realStory);
  });
}



function getLastMemoryVideo(callback) {
  loadVideoMemory(list => {
    if (!list.length) {
      callback(null);
      return;
    }

    const last = list[list.length - 1];
    const videos = [...document.querySelectorAll("video")];

    const match = videos.find(v => v.src === last.src);

    if (match) {
      try { match.currentTime = last.currentTime; } catch (_) {}
      callback(match);
    } else {
      callback(null);
    }
  });
}

function loadVideoMemory(callback) {
  chrome.storage.local.get(["pipMemory"], data => {
    callback(data.pipMemory || []);
  });
}

function collectAndWarmAssetsContent() {
  const assets = [];

  // -------------------------------------------------------
  // 1. Scripts
  // -------------------------------------------------------
  document.querySelectorAll("script[src]").forEach(el => {
    assets.push(el.src);
  });

  // -------------------------------------------------------
  // 2. Stylesheets
  // -------------------------------------------------------
  document.querySelectorAll("link[rel='stylesheet'][href]").forEach(el => {
    assets.push(el.href);
  });

  // -------------------------------------------------------
  // 3. HTML Images
  // -------------------------------------------------------
  const htmlImgs = [...document.querySelectorAll("img[src]")];
  htmlImgs.forEach(el => assets.push(el.src));

  // -------------------------------------------------------
  // 4. CSS Background Images
  // -------------------------------------------------------
  const bgImgs = [...document.querySelectorAll("*")]
    .map(el => getComputedStyle(el).backgroundImage)
    .filter(bg => bg && bg !== "none")
    .map(bg => {
      const match = bg.match(/url\(["']?(.*?)["']?\)/);
      return match ? match[1] : null;
    })
    .filter(Boolean);

  bgImgs.forEach(src => assets.push(src));

  // -------------------------------------------------------
  // 5. Decode Warm (HTML + CSS synthetic)
  // -------------------------------------------------------
  const syntheticImgs = bgImgs.map(src => {
    const img = new Image();
    img.src = src;
    return img;
  });

  const allImgs = [...htmlImgs, ...syntheticImgs];
  const decodeCount = allImgs.length;

  allImgs.forEach(img => {
    try { img.decode?.().catch(() => {}); } catch (_) {}
  });

  // -------------------------------------------------------
  // 6. Send unified front‑page report
  // -------------------------------------------------------
  chrome.runtime.sendMessage({
    type: "PB_ASSET_LIST_CONTENT",
    pageUrl: origin,
    assets,
    decodeCount
  });
}

setTimeout(collectAndWarmAssetsContent, 600);

async function saveVideoToMemory(videoElement) {
  try {
    if (!videoElement.src) return;
    // if (videoElement.src.startsWith("chrome-extension://")) return;
    const source = videoElement.src;
    const response = await fetch(source);
    let blob = null;
    let blobUrl = source;
    if (!videoElement.src.startsWith("chrome-extension://")) {
      blob = await response.blob();
      blobUrl = URL.createObjectURL(blob);
    }
    const width = videoElement.videoWidth;
    const height = videoElement.videoHeight;
    const currentTime = videoElement.currentTime;

    const entry = {
      source,
      blobUrl,
      width,
      height,
      currentTime: currentTime || 0,
      timestamp: Date.now()
    };

    chrome.storage.local.get(["pipMemory"], data => {
      const list = data.pipMemory || [];
      list.push(entry);
      chrome.storage.local.set({ pipMemory: list });
    });

  } catch (e) {
    console.warn("Cannot save video bytes:", e);
  }
}

async function pullall(container) {
  // Extract videos and prefer offline cache, with online fallback
  const videos = Array.from(container.querySelectorAll("video"));
  videos.forEach(v => changeToOffline(v));
}

document.addEventListener("click", e => {
  const vid = e.target.closest("video");
  if (!vid) return;

  // ⭐ Calculate aspect ratio
  const ratio = vid.videoWidth / vid.videoHeight;
  const isIdentityVideo = ratio < 1.4;

  // ⭐ Exclude PulseStatus and PulseStatus2 videos
  const src = vid.src || "";
  const isPulseStatus =
    src.includes("PulseStatus") ||
    src.includes("PulseStatus2");

  // ⭐ Trigger ONLY if identity video AND NOT PulseStatus
  if (isIdentityVideo && !isPulseStatus) {
    setTimeout(() => AttemptPulseSteam(vid), 1500);
  }
});

// ---------------------------------------------------------
// Minimal Authority Gateway + Video Extraction + Saving
// ---------------------------------------------------------
(async () => {
  try {
    let url = "https://www.pulseworld.net/PULSEConfig/PulseWorldFounders.txt";
    if (origin) url = "https://" + origin;
    chrome.runtime.sendMessage({ type: "PBAUTHORITY_REALM_CLAIM"  }, (response) => {
      if (chrome.runtime.lastError) return;
      
      if (response.realm) {
          authorityRealm = response.realm;
      }
    });
    
    // if (url !== "https://www.pulseworld.net/PULSEConfig/PulseWorldTeam.txt") {
    //   const separator = url.includes("?") ? "&" : "?";
    //   url = url + separator + "pw=offline";
    // }

    const response = await fetch(url, { mode: "cors" });
    let html = await response.text();
    if (authorityRealm) html = authorityRealm;
    html = html.replace(/\.\/_EXPRESSIONS/g, "https://www.pulseworld.net/_EXPRESSIONS");
    const container = document.getElementById("pulseworld");
    let u;
    try {
      u = new URL(url);
    } catch {
      return null;
    }

    let host = u.hostname;
    
    // latestSnapshot(host, container, html);
    container.innerHTML = html;
    
    setTimeout(pullall(container), 1000);

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