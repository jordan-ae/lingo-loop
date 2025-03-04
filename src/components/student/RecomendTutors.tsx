import React from 'react';
import { Star, ChevronRight } from 'lucide-react';
import { Tutor } from '../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

interface RecommendedTutorsProps {
  tutors: Tutor[];
  isLoading?: boolean;
}

export const RecommendedTutors: React.FC<RecommendedTutorsProps> = ({ 
  tutors, 
  isLoading = false 
}) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recommended Tutors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex space-x-4">
                <div className="rounded-full bg-gray-200 h-12 w-12"></div>
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recommended Tutors</CardTitle>
        <a 
          href="/tutors" 
          className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
        >
          View all
          <ChevronRight size={16} />
        </a>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tutors.slice(0, 3).map((tutor) => (
            <div key={tutor.id} className="flex items-center space-x-4">
              <img
                src={tutor.profileImage}
                alt={tutor.name}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {tutor.name}
                </p>
                <div className="flex items-center">
                  <Star size={14} className="text-yellow-400" />
                  <span className="text-xs text-gray-500 ml-1">{tutor.rating}</span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-xs text-gray-500">
                    {tutor.languages.map(l => l.name).join(', ')}
                  </span>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                asChild
              >
                <a href={`/tutors/${tutor.id}`}>
                  View
                </a>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};