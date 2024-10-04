import { VideoInput } from "@/components/VideoInput";
import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function YouTubeAnalyzer() {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">YouTube Video Analyzer</h1>
      <div className="flex justify-end mb-4">
        <Link href="/">
          <Button variant="outline">Back to Content Analyzer</Button>
        </Link>
      </div>
      <p className="text-center mb-8">
        Enter a YouTube video URL to analyze its content, age category, and logical fallacies.
      </p>
      <VideoInput />
    </div>
  );
}