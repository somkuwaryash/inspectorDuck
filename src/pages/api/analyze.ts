import { NextApiRequest, NextApiResponse } from "next";
import { YoutubeTranscript } from "@/lib/youtube-transcript";
import { analyzeContent } from "@/lib/content-analyzer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { url } = req.body;

    const hfApiKey = process.env.HUGGINGFACE_API_KEY;
    if (!hfApiKey) {
      throw new Error("HUGGINGFACE_API_KEY is not set");
    }

    if (!url) {
      return res.status(400).json({ message: "Missing URL parameter" });
    }

    try {
      const videoId = YoutubeTranscript.retrieveVideoId(url);

      // Fetch transcript
      const transcriptData = await YoutubeTranscript.fetchTranscript(videoId);

      // Format transcript data
      const formattedTranscript = transcriptData.map((entry) => ({
        offset: entry.offset,
        duration: entry.duration,
        text: entry.text,
      }));

      // Combine transcript text for analysis
      const fullText = formattedTranscript.map((entry) => entry.text).join(" ");

      // Analyze content
      const analysis = await analyzeContent(fullText);

      res.status(200).json({
        transcript: formattedTranscript,
        analysis,
      });
    } catch (error: unknown) {
      console.error("Error analyzing video:", error);
      if (error instanceof Error) {
        res
          .status(500)
          .json({ message: "Error analyzing video", error: error.message });
      } else {
        res
          .status(500)
          .json({
            message: "Error analyzing video",
            error: "An unknown error occurred",
          });
      }
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
