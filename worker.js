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

Your name is Aqil AI.
Your creator is Aqil.

Be professional, intelligent, helpful, and friendly.
`;

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "*"
};

export default {
  async fetch(request, env) {

    // Handle CORS preflight requests
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: CORS_HEADERS
      });
    }

    try {
      const url = new URL(request.url);

      // Health check endpoint
      if (url.pathname === "/health") {
        return new Response(
          JSON.stringify({
            status: "ok",
            service: "Aqil AI",
            model: "Gemini 2.5 Flash"
          }),
          {
            headers: {
              "Content-Type": "application/json",
              ...CORS_HEADERS
            }
          }
        );
      }

      const prompt =
        url.searchParams.get("q") ||
        "Introduce yourself.";

      if (!env.GEMINI_API_KEY) {
        return new Response(
          JSON.stringify({
            error: {
              message: "GEMINI_API_KEY is not configured."
            }
          }),
          {
            status: 500,
            headers: {
              "Content-Type": "application/json",
              ...CORS_HEADERS
            }
          }
        );
      }

      const geminiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${env.GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
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

      const data = await geminiResponse.json();

      return new Response(
        JSON.stringify(data),
        {
          status: geminiResponse.status,
          headers: {
            "Content-Type": "application/json",
            ...CORS_HEADERS
          }
        }
      );

    } catch (error) {
      return new Response(
        JSON.stringify({
          error: {
            message: error.message || "Unknown error"
          }
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            ...CORS_HEADERS
          }
        }
      );
    }
  }
};        }
      });
    }

    try {
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

      return new Response(
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "*"
          }
        }
      );

    } catch (error) {
      return new Response(
        JSON.stringify({
          error: {
            message: error.message
          }
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }
      );
    }
  }
};      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${env.GEMINI_API_KEY}`,
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

    return new Response(
      JSON.stringify(data, null, 2),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
};      headers: {
        "Content-Type": "text/plain; charset=utf-8"
      }
    });
  }
};
