import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = process.env.GOOGLE_API_KEY || "";
const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_REST_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

// Default to API-key auth. Set GEMINI_AUTH_MODE=oauth only when GOOGLE_API_KEY
// contains an OAuth bearer token instead of a Gemini API key.
const isOAuthToken = process.env.GEMINI_AUTH_MODE === "oauth";

// Use SDK for API keys, REST for OAuth tokens
const ai = isOAuthToken ? null : new GoogleGenAI({ apiKey: GEMINI_API_KEY });

async function callGeminiREST(contents: object[], systemInstruction?: string): Promise<string> {
  const body: any = { contents };
  if (systemInstruction) {
    body.systemInstruction = { parts: [{ text: systemInstruction }] };
  }

  const url = isOAuthToken
    ? GEMINI_REST_URL
    : `${GEMINI_REST_URL}?key=${GEMINI_API_KEY}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (isOAuthToken) {
    headers["Authorization"] = `Bearer ${GEMINI_API_KEY}`;
  }

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Gemini REST error ${response.status}: ${err}`);
  }

  const data = await response.json() as any;
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
}

export async function getChatResponse(message: string): Promise<string> {
  try {
    const systemPrompt = `You are a helpful career guidance AI assistant. Provide thoughtful, personalized career advice based on the user's questions. Keep responses conversational, encouraging, and practical. Focus on career development, skill building, industry insights, and educational pathways.`;

    if (isOAuthToken || !ai) {
      // Use REST API with Bearer token
      const text = await callGeminiREST(
        [{ role: "user", parts: [{ text: message }] }],
        systemPrompt
      );
      return text || "I'm sorry, I couldn't process your request at the moment. Please try again.";
    }

    // Use SDK with API key
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      config: { systemInstruction: systemPrompt },
      contents: message,
    });
    return response.text || "I'm sorry, I couldn't process your request at the moment. Please try again.";
  } catch (error) {
    console.error('Gemini API error:', error);
    return "I'm currently having trouble connecting to my knowledge base. Please try again in a moment.";
  }
}

export async function getCareerRecommendation(quizAnswers: any[]): Promise<string> {
  try {
    const answersText = quizAnswers.map((answer, index) =>
      `Question ${index + 1}: ${answer.text} (Stream: ${answer.stream})`
    ).join('\n');

    const prompt = `Based on these career assessment quiz answers, provide a detailed career recommendation and analysis:\n\n${answersText}\n\nPlease provide:\n1. A personalized career recommendation\n2. Key strengths identified from the answers\n3. Suggested career paths and specific job roles\n4. Skills to develop for success in this field\n5. Educational recommendations\n\nKeep the response encouraging and actionable.`;

    if (isOAuthToken || !ai) {
      const text = await callGeminiREST(
        [{ role: "user", parts: [{ text: prompt }] }]
      );
      return text || "Unable to generate career recommendation at this time.";
    }

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
    });
    return response.text || "Unable to generate career recommendation at this time.";
  } catch (error) {
    console.error('Gemini API error for career recommendation:', error);
    return "Unable to analyze your quiz results at the moment. Please try again later.";
  }
}
