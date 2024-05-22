const eventSource = new EventSource('http://localhost:8080/api/messages');

// Listen for messages
eventSource.onmessage = function(event) {
    const data = JSON.parse(event.data);
    console.log("Received message:", data);
    // Update the frontend UI with the received data
    displayMessage(data);
};

// Handle errors
eventSource.onerror = function(err) {
    console.error("EventSource failed:", err);
    eventSource.close();
};

function displayMessage(message) {
    const messageContainer = document.getElementById('messageContainer');
    const messageElement = document.createElement('div');
    messageElement.textContent = `Type: ${message.type}, Fruit ID: ${message.fruitId}, New Price: ${message.newPrice}`;
    messageContainer.appendChild(messageElement);
}