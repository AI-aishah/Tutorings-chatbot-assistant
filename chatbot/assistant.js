// The browser never calls Gemini directly. It asks this app's own API endpoint,
// which keeps the API key on the server. If the server is not configured yet,
// the app still gives a useful answer from its focused IELTS knowledge base.

const CHAT_API_ENDPOINT = window.CHATBOT_CONFIG?.apiEndpoint || '/api/chat';

const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'about', 'can', 'do', 'for', 'how', 'i', 'in', 'is',
  'me', 'of', 'the', 'to', 'what', 'which', 'with', 'you', 'your',
]);

function getKeywords(text) {
  return text
    .toLowerCase()
    .match(/[a-z0-9]+/g)
    ?.filter((word) => word.length > 1 && !STOP_WORDS.has(word)) || [];
}

function answerFromKnowledgeBase(question) {
  const questionWords = new Set(getKeywords(question));
  let bestMatch = null;

  for (const chunk of CHATBOT_DATA) {
    const chunkWords = getKeywords(`${chunk.title} ${chunk.text}`);
    const score = chunkWords.reduce(
      (total, word) => total + Number(questionWords.has(word)),
      0
    );

    if (!bestMatch || score > bestMatch.score) {
      bestMatch = { chunk, score };
    }
  }

  if (!bestMatch || bestMatch.score === 0) {
    return 'I can help with IELTS test formats, sections, timings, and band scores. Try asking about one of those topics.';
  }

  return bestMatch.chunk.text;
}

async function askAssistant(question) {
  try {
    const response = await fetch(CHAT_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    });

    if (!response.ok) {
      if (response.status !== 503) {
        console.error(`Chat API request failed with status ${response.status}.`);
      }
      return answerFromKnowledgeBase(question);
    }

    const payload = await response.json();
    if (typeof payload.reply === 'string' && payload.reply.trim()) {
      return payload.reply.trim();
    }
  } catch (error) {
    console.error('Chat API is unavailable:', error);
  }

  return answerFromKnowledgeBase(question);
}
