document.addEventListener("DOMContentLoaded", function () {
    function create_client(username, password, broker_address, clientId = "client", port = 8884) {
        const options = {
            clientId: clientId,
            username: username,
            password: password,
            port: port,
            protocol: "wss"
        }
        const client = mqtt.connect("wss://" + broker_address, options)
        return client
    }

    function sub(client, topic) {
        client.subscribe(topic, (err) => {
            if (err) {
                console.error("Failed to subscribe: " + err.message)
            }
        })
        client.on('message', on_message)
    }

    function pub(client, topic, message) {
        client.publish(topic, message, (err) => {
            if (err) {
                console.error("Failed to publish: " + err.message)
            }
        })
    }

    // ~~~   your code starts here   ~~~

    // Function to display messages on the web page
    function displayMessage(topic, message) {
        const messagesDiv = document.getElementById('messages')
        const messageElement = document.createElement('p')
        messageElement.textContent = "Topic: " + topic + " Message: " + message
        messagesDiv.appendChild(messageElement)
    }

    // Message handler
    function on_message(topic, message) {
        console.log("Received message " + message.toString() + " on topic " + topic)
        displayMessage(topic, message.toString())
    }

    // Create client
    const client = create_client("testSubscriber2", "Htil2024ExamplePassword", "ac468314de194d56906aa94b21f74655.s1.eu.hivemq.cloud:8884/mqtt", clientId="675302150390267201089567342", port = 8884)

    // Publish button
    const pubButton = document.getElementById("pubButton")
    pubButton.addEventListener("click", function () {
        pub(client, "htil/test/topic2", "Hello World!")
    })

    // Subscribe to a topic
    sub(client, "htil/test/topic")

    // Keep the client connection alive
    client.on('connect', () => {
        console.log("Connected to broker")
    })

    client.on('error', (err) => {
        console.error("Connection error: " + err.message)
    })

    client.on('close', () => {
        console.log("Connection closed")
    })

    // ~~~   your code ends here   ~~~
})