// Function to create a client
function create_client(username, password, broker_address, clientId = "client", port = 8884) {
    const options = {
        clientId: clientId,
        username: username,
        password: password,
        port: port,
        protocol: "wss"
    };
    const client = mqtt.connect("wss://" + broker_address, options);
    return client;
}

// Function to subscribe to a topic
function sub(client, topic) {
    client.subscribe(topic, (err) => {
        if (err) {
            console.error("Failed to subscribe: " + err.message);
        }
    });
    client.on('message', on_message)
}

// ~~~   your code starts here   ~~~

// Function to display messages on the web page
function displayMessage(topic, message) {
    const messagesDiv = document.getElementById('messages');
    const messageElement = document.createElement('p');
    messageElement.textContent = `Topic: ${topic}, Message: ${message}`;
    messagesDiv.appendChild(messageElement);
}

// Message handler
function on_message(topic, message) {
    console.log("Received message " + message.toString() + " on topic " + topic)
}

// Create client
const client = create_client("testSubscriber1", "Htil2024ExamplePassword", "ac468314de194d56906aa94b21f74655.s1.eu.hivemq.cloud:8884/mqtt", port=8884);

// Subscribe to a topic
sub(client, "htil/test/topic");

// Keep the client connection alive
client.on('connect', () => {
    console.log("Connected to broker");
});

client.on('error', (err) => {
    console.error("Connection error: " + err.message);
});

client.on('close', () => {
    console.log("Connection closed");
});
