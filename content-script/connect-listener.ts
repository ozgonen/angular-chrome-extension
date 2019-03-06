export class ConnectListener {
    constructor() {
        this.initializeMessagesListener();
    }
    initializeMessagesListener() {
        chrome.runtime.onConnect.addListener(this.onConnectHandler.bind(this));
    }
    onConnectHandler(port: chrome.runtime.Port) {
        port.onMessage.addListener(this.onConnectMessageHandler.bind(this));
    }
    onConnectMessageHandler(msg, port) {
        const response = 'Pikachu!';
        port.postMessage(response);
    }
}
