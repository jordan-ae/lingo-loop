import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface ProgressSummaryProps {
  grammar: number;
  vocabulary: number;
  pronunciation: number;
  overall: number;
}

export const ProgressSummary: React.FC<ProgressSummaryProps> = ({
  grammar,
  vocabulary,
  pronunciation,
  overall
}) => {
  const renderProgressBar = (value: number, label: string) => {
    return (
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <span className="text-sm font-medium text-gray-700">{value}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full" 
            style={{ width: `${value}%` }}
          ></div>
        </div>
      </div>
    );
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center mb-6">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="3"
                strokeDasharray="100, 100"
              />
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#2563EB"
                strokeWidth="3"
                strokeDasharray={`${overall}, 100`}
              />
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="text-3xl font-bold text-gray-800">{overall}%</div>
              <div className="text-xs text-gray-500">Overall</div>
            </div>
          </div>
        </div>
        
        {renderProgressBar(grammar, 'Grammar')}
        {renderProgressBar(vocabulary, 'Vocabulary')}
        {renderProgressBar(pronunciation, 'Pronunciation')}
        
        <div className="mt-4 text-center">
          <a href="/practice" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            Practice to improve your skills →
          </a>
        </div>
      </CardContent>
    </Card>
  );
};