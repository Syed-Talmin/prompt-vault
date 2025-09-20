import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateTag = async (prompt) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `You are an AI that generates tags.

The user will give you some text, sentence, or prompt.

Your job is to analyze the text and extract the most relevant tags.

Always return the tags in the form of a JSON-style strings with comma-separated values.

Each tag must be short (1–3 words).

The tags must contain a maximum of 5–6 tags.

Do not include explanations, just output the tags.

Example:
Input: "A blog about healthy vegetarian recipes"
Output: healthy food, vegetarian, recipes, blog, cooking


Here is the user prompt: ${prompt}
`,
  });
  return (response.text);
};

export const improvePrompt = async (prompt) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `You are an AI that improves prompts.

The user will give you some text, sentence, or prompt.

Your job is to analyze the text and improve it.

Always return the improved prompt.

Example:
Input: "A blog about healthy vegetarian recipes"
Output: "A blog about healthy vegetarian recipes that are easy to make"


Here is the user prompt: ${prompt}
`,
  });
  return response.text;
};
