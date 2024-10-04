"use client";

import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingSpinner } from "./LoadingSpinner";

export function ContentInput() {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setAnalysis("");

    try {
      const response = await fetch("/api/analyze-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      setAnalysis(data.analysis);
    } catch (error: unknown) {
      console.error("Error analyzing content:", error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An error occurred while analyzing the content. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardContent className="p-4">
          <h3 className="text-xl font-semibold mb-4">Input Content</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              placeholder="Enter your content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              className="w-full"
              required
            />
            {error && <div className="text-red-500">{error}</div>}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <LoadingSpinner /> : "Analyze Content"}
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <h3 className="text-xl font-semibold mb-4">Analysis</h3>
          <div className="max-h-96 overflow-y-auto whitespace-pre-wrap text-sm">
            {analysis || "Analysis results will appear here."}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}