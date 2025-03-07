import React from 'react';
import { Star, Heart, MapPin, Globe } from 'lucide-react';
import { Tutor } from '../../types';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';

interface TutorCardProps {
  tutor: Tutor;
  isFavorite?: boolean;
  onToggleFavorite?: (tutorId: string) => void;
}

export const TutorCard: React.FC<TutorCardProps> = ({
  tutor,
  isFavorite = false,
  onToggleFavorite
}) => {
  return (
    <Card className="h-full">
      <CardContent className="p-0">
        <div className="relative">
          <img
            src={tutor?.profileImage || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'}
            alt={tutor?.name}
            className="w-full h-48 object-cover object-center"
          />
          
          {onToggleFavorite && (
            <button
              onClick={() => onToggleFavorite(tutor?.id)}
              className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-100"
            >
              <Heart
                size={18}
                className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}
              />
            </button>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{tutor?.name}</h3>
            <div className="flex items-center">
              <Star size={16} className="text-yellow-400" />
              <span className="ml-1 text-sm font-medium text-gray-700">{tutor?.rating}</span>
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-500">
              <Globe size={16} className="mr-2 text-gray-400" />
              <span>
                {tutor?.languages.map(lang => `${lang.name} (${lang.proficiency})`).join(', ')}
              </span>
            </div>
            
            <div className="flex items-center text-sm text-gray-500">
              <MapPin size={16} className="mr-2 text-gray-400" />
              <span>{tutor?.country}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-blue-600 font-semibold">
              ${tutor?.hourlyRate}/hour
            </div>
            <Button
              variant="default"
              size="sm"
            >
              <a href={`/tutors/${tutor?.id}`} />
              View Profile
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};