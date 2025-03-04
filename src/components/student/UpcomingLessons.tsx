import React from 'react';
import { Clock, User } from 'lucide-react';
import { Lesson } from '../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

interface UpcomingLessonsProps {
  lessons: Lesson[];
  isLoading?: boolean;
}

export const UpcomingLessons: React.FC<UpcomingLessonsProps> = ({ lessons, isLoading = false }) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Lessons</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="border rounded-md p-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Lessons</CardTitle>
      </CardHeader>
      <CardContent>
        {lessons.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-gray-500 mb-4">No upcoming lessons scheduled</p>
            <Button variant="default" size="sm">Book a Lesson</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {lessons.map((lesson) => (
              <div key={lesson.id} className="border rounded-md p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{lesson.tutorName}</h4>
                  <span className="text-sm text-blue-600 font-medium">
                    {lesson.date}
                  </span>
                </div>
                
                <div className="flex flex-col space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Clock size={16} className="mr-2" />
                    <span>{`${lesson.startTime} - ${lesson.endTime}`}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <User size={16} className="mr-2" />
                    <span>1-on-1 Lesson</span>
                  </div>
                </div>
                
                <div className="mt-4 flex space-x-2">
                  <Button size="sm" variant="outline">Reschedule</Button>
                  <Button size="sm" variant="default">Join Lesson</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};