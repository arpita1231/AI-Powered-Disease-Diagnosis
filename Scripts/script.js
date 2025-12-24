function findDisease() {
    const inputField = document.getElementById('chatInput');
    const messageText = inputField.value.trim();

    if (messageText) {
        // Create a new message element
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'user-message');
        messageElement.textContent = messageText;

        // Append the new message to the messages container
        const messagesContainer = document.getElementById('messages');
        messagesContainer.appendChild(messageElement);

        // Clear the input field
        inputField.value = '';

        // Scroll to the bottom of the messages
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        //Call POST API for finding disese

        

        fetch('http://127.0.0.1:8000/find_disease', {
                method: 'POST', // HTTP method
                headers: {
                    'Content-Type': 'application/json', // Sending JSON
                    // 'Authorization': 'Bearer YOUR_TOKEN', // If you need auth
                },
                body: JSON.stringify({
                    symptoms: messageText
                })
                })
                .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Parse JSON response
                })
                .then(data => {
                   
                    console.log('Success:', data);

                    const botResponse = document.createElement('div');
                        botResponse.classList.add('message', 'bot-message');
                        botResponse.innerHTML = 
                            "disease_name: " + data.ai_recommendation.disease_name + "<br>" +
                            "treatments: " + data.ai_recommendation.treatments.join(", ");
                        messagesContainer.appendChild(botResponse);


                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                })
                .catch(error => {
                console.error('Error:', error);
        });

        // Simulate a bot response (optional)
        // setTimeout(() => {
        //     const botResponse = document.createElement('div');
        //     botResponse.classList.add('message', 'bot-message');
        //     botResponse.textContent = "You said: " + messageText; // Simple echo response
        //     messagesContainer.appendChild(botResponse);
        //     messagesContainer.scrollTop = messagesContainer.scrollHeight;
        // }, 1000);
    }
};

// Optional: Allow sending message with Enter key
document.getElementById('chatInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        document.getElementById('sendButton').click();
    }
});