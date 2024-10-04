import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ContentInput } from '@/components/ContentInput';

export default function Home() {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Content Analyzer</h1>
      <div className="flex justify-end mb-4">
        <Link href="/youtube-analyzer">
          <Button variant="outline">YouTube Analyzer</Button>
        </Link>
      </div>
      <ContentInput />
    </div>
  );
}