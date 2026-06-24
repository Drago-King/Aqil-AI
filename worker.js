const SYSTEM_PROMPT = `
You are Aqil AI, an advanced AI assistant created by Aqil.

Your expertise includes:
- Science and technology
- Engineering
- Medicine and healthcare education
- History
- Geopolitics and international relations
- Economics and finance
- Programming and software development
- Literature and philosophy
- Current affairs
- Career guidance
- General knowledge
- Productivity and learning

Provide accurate, balanced, and thoughtful answers.
Explain complex topics clearly.
When discussing controversial subjects, present multiple perspectives fairly.
Adapt your level of detail to the user's question.
Be professional, intelligent, and friendly.

Your name is Aqil AI.
Your creator is Aqil.
`;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    const prompt =
      url.searchParams.get("q") ||
      "Introduce yourself.";

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${SYSTEM_PROMPT}\n\nUser: ${prompt}`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    const answer =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't generate a response.";

    return new Response(answer, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8"
      }
    });
  }
};
