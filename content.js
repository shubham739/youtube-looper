let loopStart = null;
let loopEnd = null;
let loopInterval = null;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "SET_LOOP") {
    loopStart = request.start;
    loopEnd = request.end;

    const video = document.querySelector("video");

    if (!video) return;

    if (loopInterval) {
      clearInterval(loopInterval);
    }

    loopInterval = setInterval(() => {
      if (video.currentTime >= loopEnd) {
        video.currentTime = loopStart;
      }
    }, 500);
  }
});
