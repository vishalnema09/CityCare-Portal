import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// console.log('Gemini API Key:', process.env.GEMINI_API_KEY);


export async function generateSummary(description) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-thinking-exp-01-21" });

  const prompt = `Summarize the following complaint description into 2 lines:\n\n"${description}"`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const summary = response.text().trim();

  return summary;
}
