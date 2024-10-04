import React from 'react';

interface TranscriptEntry {
  timestamp: string;
  text: string;
}

interface TranscriptDisplayProps {
  transcript: TranscriptEntry[];
}

export const TranscriptDisplay: React.FC<TranscriptDisplayProps> = ({ transcript }) => {
  const formatText = (text: string) => {
    return text.replace(/&amp;#39;/g, "'").replace(/&amp;quot;/g, '"');
  };

  return (
    <div className="font-mono text-sm">
      {transcript.map((entry, index) => (
        <div key={index} className="flex mb-2">
          <span className="w-32 flex-shrink-0 text-gray-500">{entry.timestamp}</span>
          <span>{formatText(entry.text)}</span>
        </div>
      ))}
    </div>
  );
};