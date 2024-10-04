import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface Analysis {
  ageRestriction: string;
  triggerWarnings: string[];
  contentSummary: string[];
  logicalFallacies: string[];
}

interface AnalysisDisplayProps {
  analysis: Analysis;
}

export const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ analysis }) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4">
          <h3 className="text-xl font-semibold mb-2">Age Restriction</h3>
          <p>{analysis.ageRestriction}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h3 className="text-xl font-semibold mb-2">Trigger Warnings</h3>
          {analysis.triggerWarnings.length > 0 ? (
            <ul className="list-disc list-inside">
              {analysis.triggerWarnings.map((warning, index) => (
                <li key={index}>{warning}</li>
              ))}
            </ul>
          ) : (
            <p>None</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h3 className="text-xl font-semibold mb-2">Content Summary</h3>
          <ol className="list-decimal list-inside">
            {analysis.contentSummary.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ol>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h3 className="text-xl font-semibold mb-2">Logical Fallacies</h3>
          {analysis.logicalFallacies.length > 0 ? (
            <ul className="list-disc list-inside">
              {analysis.logicalFallacies.map((fallacy, index) => (
                <li key={index}>{fallacy}</li>
              ))}
            </ul>
          ) : (
            <p>No logical fallacies detected.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};