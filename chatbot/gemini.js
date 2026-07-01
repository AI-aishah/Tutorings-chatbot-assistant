// ============================================
// YOUR FILE — talks to the Gemini API.
// ============================================
//
// askGemini(question) sends the user's question to Gemini, along with
// the document content from data.js as context, and returns the reply.
//
// This already works end-to-end (v1). Ideas to improve if you have time:
//   - keep a running conversation history so follow-up questions work
//     (currently each question is asked fresh, with no memory)
//   - trim/select only the most relevant chunks from CHATBOT_DATA instead
//     of sending everything, if the document gets long (keeps it fast/cheap)
//   - show a "typing..." indicator while waiting for the response
//   - handle rate-limit / network errors with a friendlier message

function buildContext() {
  // Turns the array in data.js into one big text block for Gemini to read.
  return CHATBOT_DATA.map((chunk) => `## ${chunk.title}\n${chunk.text}`).join(
    '\n\n'
  );
}

const SYSTEM_INSTRUCTION = `You are a helpful assistant for MLSAC.
Answer the user's question using ONLY the document content provided below.
If the answer isn't in the document, say you don't have that information —
don't make things up. Keep replies short and friendly, no markdown.

DOCUMENT:
${buildContext()}`;

async function askGemini(question) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': GEMINI_API_KEY,
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: SYSTEM_INSTRUCTION }],
        },
        contents: [
          {
            parts: [{ text: question }],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error('Gemini API error:', response.status, errBody);
      return `Sorry, something went wrong talking to Gemini (status ${response.status}). Check the console for details.`;
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    return text || "Sorry, I didn't get a usable reply from Gemini.";
  } catch (err) {
    console.error('Network error calling Gemini:', err);
    return 'Sorry, I could not reach Gemini — check your internet connection.';
  }
}
