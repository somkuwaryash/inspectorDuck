import { VideoInput } from "@/components/VideoInput";

export default function Home() {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">YouTube Video Analyzer</h1>
      <p className="text-center mb-8">
        Enter a YouTube video URL to analyze its content, age category, and logical fallacies.
      </p>
      <VideoInput />
    </div>
  );
}