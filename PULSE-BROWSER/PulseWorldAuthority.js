
async function changeToOffline(videoElement) {
  let source = videoElement.src;
  if (!source.includes("pw=offline")) {
    const separator = source.includes("?") ? "&" : "?";
    source = source + separator + "pw=offline";
  }
  videoElement.src = source;
}
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

    // Extract videos
    const videos = Array.from(container.querySelectorAll("video"));

    // Save each video to extension memory
    videos.forEach(v => changeToOffline(v));
    
    // // Return list to parent
    // window.parent.postMessage({
    //   type: "PulseWorldAuthorityVideos",
    //   videos: videos.map(v => ({
    //     src: v.src,
    //     width: v.width,
    //     height: v.height
    //   }))
    // }, "*");

  } catch (err) {
    document.getElementById("pulseworld").innerHTML =
      "<p style='color:red;'>PulseWorld could not load.</p>";
    console.error("PulseWorldAuthority error:", err);
  }
})();
