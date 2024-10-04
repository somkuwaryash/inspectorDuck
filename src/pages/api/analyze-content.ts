import { NextApiRequest, NextApiResponse } from "next";
import { analyzeContent } from "@/lib/content-analyzer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { content } = req.body;

    const hfApiKey = process.env.HUGGINGFACE_API_KEY;
    if (!hfApiKey) {
      return res.status(500).json({ message: "HUGGINGFACE_API_KEY is not set" });
    }

    if (!content) {
      return res.status(400).json({ message: "Missing content parameter" });
    }

    try {
      // Analyze content
      const analysis = await analyzeContent(content);

      res.status(200).json({
        analysis,
      });
    } catch (error: unknown) {
      console.error("Error analyzing content:", error);
      if (error instanceof Error) {
        res.status(500).json({ message: "Error analyzing content", error: error.message });
      } else {
        res.status(500).json({
          message: "Error analyzing content",
          error: "An unknown error occurred",
        });
      }
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}