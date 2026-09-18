// Shared glue code — connects the form, the chat window, and askGemini().
// You shouldn't need to touch this, but feel free to if you want to add
// features (timestamps, clear button, etc).

const chatWindow = document.getElementById('chat-window');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const sendButton = chatForm.querySelector('button');
const questionChips = document.querySelectorAll('[data-question]');

let isWaitingForReply = false;

function addMessage(text, sender) {
  const bubble = document.createElement('div');
  bubble.className = `message ${sender}`;
  bubble.textContent = text;
  chatWindow.appendChild(bubble);
  chatWindow.scrollTop = chatWindow.scrollHeight;
  return bubble;
}

function updateSendButton() {
  sendButton.disabled = isWaitingForReply || !chatInput.value.trim();
}

async function submitQuestion(question) {
  if (!question || isWaitingForReply) return;

  isWaitingForReply = true;
  updateSendButton();

  addMessage(question, 'user');
  chatInput.value = '';

  const thinkingBubble = addMessage('Thinking...', 'bot');

  try {
    const answer = await askAssistant(question);
    thinkingBubble.textContent = answer;
  } catch (error) {
    console.error('Unable to answer chat question:', error);
    thinkingBubble.textContent = 'Sorry, I could not answer that right now. Please try again.';
  } finally {
    chatWindow.scrollTop = chatWindow.scrollHeight;
    isWaitingForReply = false;
    updateSendButton();
    chatInput.focus();
  }
}

chatForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  await submitQuestion(chatInput.value.trim());
});

chatInput.addEventListener('input', updateSendButton);

questionChips.forEach((chip) => {
  chip.addEventListener('click', async () => {
    await submitQuestion(chip.dataset.question);
  });
});

// Greet on load
addMessage(
  'Hi! I can help with IELTS test formats, sections, timings, and band scores. What would you like to know?',
  'bot'
);
updateSendButton();
