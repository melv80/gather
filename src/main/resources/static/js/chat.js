let ws;

class Message {
    from;
    text;
    constructor(from, message) {
        this.from = from;
        this.text = message;
    }
}

function connect() {
    ws = new WebSocket('ws://localhost:8080/name');
    ws.onmessage = function(data){
        showGreeting(data.data);
    }
}

function disconnect() {
    if (ws != null) {
        ws.close();
    }
    console.log("Disconnected");
}

function sendMessage() {
    ws.send(JSON.stringify(new Message(
        document.getElementById("from").value,
        document.getElementById("text").value)));
}

function showGreeting(message) {
    document.getElementById("response").append(" " + message + " ");
}