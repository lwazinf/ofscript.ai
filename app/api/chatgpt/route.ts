// app/api/chatgpt/route.ts
import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getServerSideProps({
  query: { prompt },
}: {
  query: { prompt?: string };
}) {
  const res: NextApiResponse = {
    // @ts-ignore
    status: 200,
    json: () => ({}),
  };

  if (!prompt) {
    // @ts-ignore
    res.status = 400;
    res.json({ error: "Prompt missing" });
    return { props: {} };
  }

  const promptText = prompt.toString();

  if (promptText.length > 1000) {
    // @ts-ignore
    res.status = 400;
    res.json({ error: "Prompt too long" });
    return { props: {} };
  }

  try {
    const completion = await openai.completions.create({
      model: "text-davinci-003",
      prompt: promptText,
      max_tokens: 2048,
      temperature: 0.9,
      presence_penalty: 0,
      frequency_penalty: 0,
      top_p: 1.0,
    });

    const quote = completion.choices[0] ? completion.choices[0].text : "";

    // @ts-ignore
    res.status = 200;
    res.json({ quote });
    return { props: {} };
  } catch (error) {
    console.error("Error fetching quote:", error);
    // @ts-ignore
    res.status = 500;
    res.json({ error: "Failed to fetch quote" });
    return { props: {} };
  }
}
