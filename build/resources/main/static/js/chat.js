let ws;

class Message {
    from;
    text;
    type;
    constructor(from, message, type) {
        this.from = from;
        this.text = message;
        this.type = type;
    }
}

function connect() {
    ws = new WebSocket('ws://localhost:8080/name');
    ws.onmessage = function(data){
        showGreeting(data.data);
    }
    joinGame();
}

function disconnect() {
    if (ws != null) {
        ws.close();
    }
    console.log("Disconnected");
}

function joinGame() {
    ws.send(JSON.stringify(new Message(
        "new",
        "#join",
        "command"
    )));
}

function sendMessage() {
    ws.send(JSON.stringify(new Message(
        document.getElementById("from").value,
        document.getElementById("text").value,
        "chat")));
}

function showGreeting(message) {
    document.getElementById("response").append(" " + message + " ");
}