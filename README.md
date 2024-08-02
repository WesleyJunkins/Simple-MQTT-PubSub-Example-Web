A simple example of a publisher/subscriber system using MQTT messages in a web environment.

---

To start using this code, save everything into a directory.

Run the publisher and subscriber using live reload.

Before the code will actually work, you'll have to go through a broker.

---

To get started, choose a broker.

I used HiveMQ because they offer a free tier for research purposes. To use them, go to https://console.hivemq.cloud/. You'll have to create an account, but it is free!

Choose a serverless cluster.

Once created, you will be given a Cluster URL. The Cluster URL is the broker_address.
NOTE: since we are hosting this website over HTTPS (That is, HTTP over TLS), we will have to use the WebSockets over HTTPS protocol (WSS). This means we need to use the TLS WebSocket URL provided by HiveMQ. We also have to use the WebSocket port instead of the default port. This allows an HTTPS website to communicate with our MQTT topic securely.

In the HiveMQ console, go to Access Management.

There, create a few usernames and passwords. You can create as many as you want. These are used to connect the webpage to the broker securely. In my example, I created two usernames, testPublisher1 and testSubscriber1. I gave them both the same password, Htil2024ExamplePassword. I also gave them full permissions.

---

Next, in the code, you'll create a topic. In my example, I called it htil/test/topic. I also created a topic to publish to, called htil/test/topic2.

For the publisher, you will PUB to this topic, and with the subscriber, you will SUB to this topic. When the publisher publishes anything, the subscriber will get it.

For more complex applications, you can create a client to be a publisher AND a subscriber. You can also SUB the subscriber to multiple topics and PUB to multiple topics.
