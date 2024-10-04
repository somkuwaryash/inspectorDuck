import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LoadingSpinner } from '@/components/LoadingSpinner';

interface AnalysisResult {
  summary: string[];
  ageCategory: string;
  triggerWarnings: string[];
  logicalFallacies: Array<{ name: string; explanation: string; impact: string }>;
}

export default function ResultsPage() {
  const router = useRouter();
  const { videoId } = router.query;
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (videoId) {
      fetchAnalysis();
    }
  }, [videoId]);

  const fetchAnalysis = async () => {
    try {
      const response = await fetch(`/api/analyze?videoId=${videoId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch analysis');
      }
      const data = await response.json();
      setAnalysis(data);
    } catch (err) {
      setError('An error occurred while fetching the analysis. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!analysis) {
    return <div>No analysis data available.</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Video Analysis Results</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Age Category</CardTitle>
        </CardHeader>
        <CardContent>{analysis.ageCategory}</CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Trigger Warnings</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5">
            {analysis.triggerWarnings.map((warning, index) => (
              <li key={index}>{warning}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Content Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5">
            {analysis.summary.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Logical Fallacies</CardTitle>
        </CardHeader>
        <CardContent>
          {analysis.logicalFallacies.map((fallacy, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-semibold">{fallacy.name}</h3>
              <p><strong>Explanation:</strong> {fallacy.explanation}</p>
              <p><strong>Impact:</strong> {fallacy.impact}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}