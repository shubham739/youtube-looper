function parseTimeString(timeStr) {
  const parts = timeStr.split(':').map(Number).reverse();

  let seconds = 0;
  if (parts.length >= 1) seconds += parts[0];           // seconds
  if (parts.length >= 2) seconds += parts[1] * 60;       // minutes
  if (parts.length >= 3) seconds += parts[2] * 3600;     // hours

  return seconds;
}

document.getElementById('setLoop').addEventListener('click', () => {
  const startStr = document.getElementById('start').value.trim();
  const endStr = document.getElementById('end').value.trim();

  if (!startStr || !endStr) {
    alert("Please enter both start and end times.");
    return;
  }

  const start = parseTimeString(startStr);
  const end = parseTimeString(endStr);

  if (isNaN(start) || isNaN(end) || start >= end) {
    alert("Invalid time range. Ensure start < end.");
    return;
  }

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      type: "SET_LOOP",
      start,
      end
    });
  });
});
