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
}

function disconnect() {
    if (ws != null) {
        ws.close();
    }
    console.log("Disconnected");
}

// Make the function wait until the connection is made...
function waitForSocketConnection(socket, callback){
    setTimeout(
        function () {
            if (socket.readyState === 1) {
                console.log("Connection is made")
                if (callback != null){
                    callback();
                }
            } else {
                console.log("wait for connection...")
                waitForSocketConnection(socket, callback);
            }

        }, 5); // wait 5 milisecond for the connection...
}

function joinGame() {
    waitForSocketConnection(ws, function(){
        ws.send(JSON.stringify(new Message(
            "new",
            "#join",
            "command"
        )));
    });
}

function sendMessage() {
    waitForSocketConnection(ws, function(){
        ws.send(JSON.stringify(new Message(
            document.getElementById("from").value,
            document.getElementById("text").value,
            "chat"
        )));
    });

}

function showGreeting(message) {
    document.getElementById("response").append(" " + message + " ");
}