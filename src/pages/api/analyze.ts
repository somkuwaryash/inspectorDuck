import { NextApiRequest, NextApiResponse } from "next";
import { YoutubeTranscript } from "@/lib/youtube-transcript";
import { analyzeContent } from "@/lib/content-analyzer";

const log = (message: string, data?: any) => {
  console.log(`[${new Date().toISOString()}] ${message}`, data);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { url } = req.body;

  if (!url) {
    log("Missing URL parameter");
    return res.status(400).json({ message: "Missing URL parameter" });
  }

  const hfApiKey = process.env.HUGGINGFACE_API_KEY;
  if (!hfApiKey) {
    log("HUGGINGFACE_API_KEY is not set");
    return res.status(500).json({ message: "Server configuration error" });
  }

  try {
    log("Processing request for URL", url);

    const videoId = YoutubeTranscript.retrieveVideoId(url);
    log("Retrieved video ID", videoId);

    // Fetch transcript
    log("Fetching transcript");
    const transcriptData = await YoutubeTranscript.fetchTranscript(videoId);
    log("Transcript fetched successfully");

    // Format transcript data
    const formattedTranscript = transcriptData.map((entry) => ({
      offset: entry.offset,
      duration: entry.duration,
      text: entry.text,
    }));

    // Combine transcript text for analysis
    const fullText = formattedTranscript.map((entry) => entry.text).join(" ");
    log("Prepared full text for analysis", { textLength: fullText.length });

    // Analyze content
    log("Starting content analysis");
    const analysis = await analyzeContent(fullText);
    log("Content analysis completed");

    res.status(200).json({
      transcript: formattedTranscript,
      analysis,
    });
  } catch (error: unknown) {
    log("Error in API route", error);
    
    let errorMessage = "An unknown error occurred";
    let statusCode = 500;

    if (error instanceof Error) {
      errorMessage = error.message;
      
      if (errorMessage.includes("Video not found")) {
        statusCode = 404;
      } else if (errorMessage.includes("Invalid video URL")) {
        statusCode = 400;
      }
    }

    res.status(statusCode).json({
      message: "Error processing request",
      error: errorMessage,
    });
  }
}