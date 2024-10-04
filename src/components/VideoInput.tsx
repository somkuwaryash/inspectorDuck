"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LoadingSpinner } from "./LoadingSpinner";
import { Card, CardContent } from "@/components/ui/card";
import { TranscriptDisplay } from "./TranscriptDisplay";

export function VideoInput() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<{ timestamp: string; text: string }[]>([]);
  const [analysis, setAnalysis] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setTranscript([]);
    setAnalysis("");

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to analyze video");
      }

      // Process the transcript data
      const processedTranscript = data.transcript.map((entry: any, index: number) => ({
        timestamp: formatTimestamp(entry.offset),
        text: entry.text,
      }));

      setTranscript(processedTranscript);
      setAnalysis(data.analysis);
    } catch (error: unknown) {
      console.error("Error analyzing video:", error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An error occurred while analyzing the video. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const formatTimestamp = (seconds: number): string => {
    const date = new Date(seconds * 1000);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const secs = date.getUTCSeconds().toString().padStart(2, '0');
    const milliseconds = date.getUTCMilliseconds().toString().padStart(3, '0');
    return `${hours}:${minutes}:${secs}.${milliseconds}`;
  };

  return (
    <div className="space-y-4 w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="video-url">YouTube Video URL</Label>
          <Input
            id="video-url"
            type="url"
            placeholder="https://www.youtube.com/watch?v=..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? <LoadingSpinner /> : "Analyze Video"}
        </Button>
      </form>

      {(transcript.length > 0 || analysis) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="text-xl font-semibold mb-4">Transcript</h3>
              <div className="max-h-96 overflow-y-auto">
                <TranscriptDisplay transcript={transcript} />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h3 className="text-xl font-semibold mb-4">Analysis</h3>
              <div className="max-h-96 overflow-y-auto whitespace-pre-wrap text-sm">
                {analysis}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}