const chatbox = document.getElementById('chatbox');
const form = document.getElementById('chatForm');
const input = document.getElementById('userInput');
const voiceBtn = document.getElementById('voiceBtn');

function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    
    if (userInput.trim() !== "") {
        // Display user's message
        displayMessage(userInput, 'user');
        
        // Bot response based on user input
        const botResponse = getBotResponse(userInput);
        displayMessage(botResponse, 'bot');
    }
    
    // Clear input field after sending message
    document.getElementById('user-input').value = '';
}

// Function to display messages in the chat window
function displayMessage(message, sender) {
    const messagesContainer = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');
    messageElement.textContent = message;
    messagesContainer.appendChild(messageElement);
    
    // Auto scroll to the bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Function to generate a bot response based on input
function getBotResponse(input) {
    input = input.toLowerCase();
    
    // Simple sentiment-based responses (in a real-world app, this should be AI-based)
    if (input.includes("sad") || input.includes("depressed") || input.includes("down")) {
        return "I'm really sorry you're feeling this way. Would you like to hear some coping strategies?";
    } else if (input.includes("stressed") || input.includes("anxious")) {
        return "It sounds like you're feeling overwhelmed. Have you considered mindfulness or deep breathing exercises?";
    } else if (input.includes("happy") || input.includes("good") || input.includes("great")) {
        return "I'm glad you're feeling good! Keep it up, and remember to stay balanced.";
    } else if (input.includes("help") || input.includes("support")) {
        return "It's okay to ask for help. I can suggest some therapists or wellness routines if you'd like!";
    } else if (input.includes("bye")) {
        return "Take care, and remember, you're not alone!";
    } else {
        return "I'm here for you. Would you like some suggestions on coping strategies or wellness routines?";
    }
}

function addMessage(message, sender = "bot") {
  const msgDiv = document.createElement('div');
  msgDiv.className = sender === "bot" ? "bot-message" : "user-message";
  msgDiv.textContent = message;
  chatbox.appendChild(msgDiv);
  chatbox.scrollTop = chatbox.scrollHeight;
}

function detectMood(text) {
  const lower = text.toLowerCase();
  if (lower.includes("sad") || lower.includes("down")) return "sad";
  if (lower.includes("anxious") || lower.includes("nervous") || lower.includes("worried")) return "anxious";
  if (lower.includes("angry") || lower.includes("mad") || lower.includes("frustrated")) return "angry";
  if (lower.includes("happy") || lower.includes("joy") || lower.includes("excited")) return "happy";
  return "neutral";
}

function respond(text) {
  const mood = detectMood(text);
  const suggestions = responses[mood];
  const reply = suggestions[Math.floor(Math.random() * suggestions.length)];
  setTimeout(() => addMessage(reply), 600);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  addMessage(text, "user");
  respond(text);
  input.value = "";
});

voiceBtn.addEventListener("click", () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert("Your browser does not support speech input.");
    return;
  }
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.start();

  recognition.onresult = (event) => {
    const spokenText = event.results[0][0].transcript;
    input.value = spokenText;
    form.dispatchEvent(new Event('submit'));
  };
});
