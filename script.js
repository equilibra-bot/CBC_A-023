document.addEventListener("DOMContentLoaded", () => {
  const chatForm = document.getElementById("chatForm");
  const chatbox = document.getElementById("chatbox");
  const userInput = document.getElementById("userInput");
  const voiceBtn = document.getElementById('voiceBtn');

  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    appendMessage("user", userMessage);
    getBotResponse(userMessage);
    userInput.value = "";
  });

  function appendMessage(sender, message) {
    const msgDiv = document.createElement("div");
    msgDiv.className = sender === "bot" ? "bot-message" : "user-message";
    msgDiv.textContent = message;
    chatbox.appendChild(msgDiv);
    chatbox.scrollTop = chatbox.scrollHeight;
  }

  function getBotResponse(message) {
    const lower = message.toLowerCase();

    // Basic response logic
    let response = "I'm here for you. Could you tell me more?";

    if (lower.includes("sad") || lower.includes("depressed")) {
      response = "I'm really sorry you're feeling that way. You're not alone. Would you like to talk about it or take a short breathing break?";
    } else if (lower.includes("happy") || lower.includes("good")) {
      response = "That's wonderful to hear! Keep holding onto those good feelings. 😊";
    } else if (lower.includes("anxious") || lower.includes("panic")) {
      response = "It sounds like you're going through a lot. Deep breathing might help. Would you like a guided exercise?";
    } else if (lower.includes("suicid") || lower.includes("end my life")) {
      response = "I'm really concerned about your safety. Please consider speaking with a mental health professional or calling a crisis line immediately. You matter. ❤️";
    }else if (lower.includes("nausea") || lower.includes("vomitting")) {
     response = "sip some ginger tea or peppermint tea. It can help soothe your stomach. If it persists, please consult a healthcare professional.";
   }else if (lower.includes("headache") || lower.includes("migraine")) {
    response = "Try to rest in a dark, quiet room. Drinking water and taking over-the-counter pain relief can also help. If it continues, please see a doctor.";
    }else if (lower.includes("stress") || lower.includes("overwhelmed")) {
    response = "It sounds like you have a lot on your plate. Taking breaks and practicing mindfulness can be beneficial. Would you like some tips?";
    }else if (lower.includes("hungry") || lower.includes("thirsty")) {
    response = "Make sure to stay hydrated and eat something nutritious. Your body needs fuel to function well.";   
    }else if (lower.includes("tired") || lower.includes("sleepy")) {     
    response = "It sounds like you need some rest. A short nap or a good night's sleep can do wonders. Would you like tips on improving sleep quality?";
    }else if (lower.includes("bored") || lower.includes("unmotivated")) {
    response = "Sometimes a change of scenery or a new activity can help. Would you like suggestions for things to do?";
    }else if (lower.includes("angry") || lower.includes("frustrated")) {
    response = "It's okay to feel angry sometimes. Talking it out or writing down your feelings can help. Would you like to share more?";
    }
    setTimeout(() => appendMessage("bot", response), 600);
  }
});

    // Voice button functionality (using Web Speech API)
    voiceBtn.addEventListener('click', function () {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.start();

        recognition.onresult = function (event) {
            const speechToText = event.results[0][0].transcript;
            userInput.value = speechToText;
            chatForm.submit();
        };
    });
function calculateResults() {
    // Collect all answers from the form
    let answers = {
        depression: [
            document.getElementById('d1').value,
            document.getElementById('d2').value,
            document.getElementById('d3').value,
            document.getElementById('d4').value,
            document.getElementById('d5').value,
        ],
        anxiety: [
            document.getElementById('a1').value,
            document.getElementById('a2').value,
            document.getElementById('a3').value,
            document.getElementById('a4').value,
            document.getElementById('a5').value,
        ],
        stress: [
            document.getElementById('s1').value,
            document.getElementById('s2').value,
            document.getElementById('s3').value,
            document.getElementById('s4').value,
            document.getElementById('s5').value,
        ]
    };

    // Calculate the total score for each category
    let depressionScore = answers.depression.reduce((acc, value) => acc + parseInt(value), 0);
    let anxietyScore = answers.anxiety.reduce((acc, value) => acc + parseInt(value), 0);
    let stressScore = answers.stress.reduce((acc, value) => acc + parseInt(value), 0);

    // Determine the severity for each category based on scores
    let depressionSeverity = getSeverity(depressionScore);
    let anxietySeverity = getSeverity(anxietyScore);
    let stressSeverity = getSeverity(stressScore);

    // Display the results
    let resultText = `
        Depression Severity: ${depressionSeverity}<br>
        Anxiety Severity: ${anxietySeverity}<br>
        Stress Severity: ${stressSeverity}
    `;
    document.getElementById('resultText').innerHTML = resultText;
    document.getElementById('results').style.display = 'block';
}

function getSeverity(score) {
    if (score <= 9) return 'Normal';
    if (score <= 13) return 'Mild';
    if (score <= 20) return 'Moderate';
    if (score <= 27) return 'Severe';
    return 'Extremely Severe';
}
