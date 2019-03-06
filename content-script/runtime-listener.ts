export class RuntimeListener {
  constructor() {
    this.initializeMessagesListener();
  }

  initializeMessagesListener() {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      const command  = message['command'];
      const response = {message: document.body.innerText};
      sendResponse(response);
    });
  }
}
