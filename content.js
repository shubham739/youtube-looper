let loopStart = null;
let loopEnd = null;
let loopInterval = null;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "SET_LOOP") {
    loopStart = parseFloat(request.start);
    loopEnd = parseFloat(request.end);

    const video = document.querySelector("video");

    if (!video) {
      console.error("No video found.");
      return;
    }

    // Clear any existing loop
    if (loopInterval) clearInterval(loopInterval);

    // Validate timestamps
    if (isNaN(loopStart) || isNaN(loopEnd) || loopStart >= loopEnd) {
      console.error("Invalid start/end values.");
      return;
    }

    // Start from the loopStart position
    video.currentTime = loopStart;

    // Create a loop check every 300ms
    loopInterval = setInterval(() => {
      if (video.currentTime >= loopEnd) {
        video.currentTime = loopStart;
      }
    }, 300);

    console.log(`Looping from ${loopStart}s to ${loopEnd}s`);
  }
});
