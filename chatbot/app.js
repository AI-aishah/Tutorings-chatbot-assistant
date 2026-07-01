// Shared glue code — connects the form, the chat window, and askGemini().
// You shouldn't need to touch this, but feel free to if you want to add
// features (timestamps, clear button, etc).

const chatWindow = document.getElementById('chat-window');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const sendButton = chatForm.querySelector('button');

function addMessage(text, sender) {
  const bubble = document.createElement('div');
  bubble.className = `message ${sender}`;
  bubble.textContent = text;
  chatWindow.appendChild(bubble);
  chatWindow.scrollTop = chatWindow.scrollHeight;
  return bubble;
}

chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const question = chatInput.value.trim();
  if (!question) return;

  addMessage(question, 'user');
  chatInput.value = '';

  // Disable input while we wait for Gemini, and show a "thinking" bubble.
  sendButton.disabled = true;
  const thinkingBubble = addMessage('Thinking...', 'bot');

  const answer = await askGemini(question);

  thinkingBubble.textContent = answer;
  chatWindow.scrollTop = chatWindow.scrollHeight;
  sendButton.disabled = false;
  chatInput.focus();
});

// Greet on load
addMessage('Hi! Ask me anything about the document.', 'bot');

