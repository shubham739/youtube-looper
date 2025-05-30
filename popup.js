document.getElementById('setLoop').addEventListener('click', () => {
  const start = parseFloat(document.getElementById('start').value);
  const end = parseFloat(document.getElementById('end').value);

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      type: "SET_LOOP",
      start,
      end
    });
  });
});
