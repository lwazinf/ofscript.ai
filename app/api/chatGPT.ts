import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { prompt } = req.body;

  try {
    // Validate environment variable
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      console.error("OpenAI API key is missing.");
      return res.status(500).json({ error: "Internal Server Error" });
    }

    // Validate and extract prompt
    if (!prompt) {
      return res.status(400).json({ error: "Prompt missing" });
    }

    const promptText = prompt.toString();

    if (promptText.length > 1000) {
      return res.status(400).json({ error: "Prompt too long" });
    }

    // Call OpenAI API
    const completion = await openai.completions.create({
      model: "text-davinci-003",
      prompt: promptText,
      max_tokens: 2048,
      temperature: 0.9,
      presence_penalty: 0,
      frequency_penalty: 0,
      top_p: 1.0,
    });

    // Extract quote from API response
    const quote = completion.choices[0]?.text || "";

    // Send response
    res.status(200).json({ quote });
  } catch (error) {
    console.error("Error fetching quote:", error);
    res.status(500).json({ error: "Failed to fetch quote" });
  }
}
