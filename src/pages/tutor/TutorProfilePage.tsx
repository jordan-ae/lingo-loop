/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, 
  Heart, 
  MapPin, 
  Globe, 
  Clock, 
  Calendar, 
  ChevronLeft,
  Play,
  MessageSquare
} from 'lucide-react';
import { useTutorStore } from '../../store/tutorStore';
import { useStudentStore } from '../../store/studentStore';
import { useAuthStore } from '../../store/authStore';
import { Tutor, TimeSlot, Language } from '../../types';
import { Button } from '../../components/ui/button';
import { MainLayout } from '../../components/layout/MainLayout';

export const TutorProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuthStore();
  const { getTutorById, fetchTutors } = useTutorStore();
  const { student, fetchStudentData, addFavoriteTutor, removeFavoriteTutor } = useStudentStore();
  
  const [tutor, setTutor] = useState<Tutor | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await fetchTutors();
      
      if (user) {
        await fetchStudentData(user.id);
      }
      
      setIsLoading(false);
    };
    
    loadData();
  }, [id, user]);
  
  useEffect(() => {
    if (id) {
      const tutorData = getTutorById(id);
      if (tutorData) {
        setTutor(tutorData);
        
        // Get unique dates from availability
        if (tutorData.availability.length > 0) {
          setSelectedDate(tutorData.availability[0].date);
        }
      }
    }
  }, [id, getTutorById]);
  
  useEffect(() => {
    if (student && tutor) {
      setIsFavorite(student.favoriteTutors.includes(tutor.id));
    }
  }, [student, tutor]);
  
  const handleToggleFavorite = async () => {
    if (!tutor) return;
    
    if (isFavorite) {
      await removeFavoriteTutor(tutor.id);
    } else {
      await addFavoriteTutor(tutor.id);
    }
    
    setIsFavorite(!isFavorite);
  };
  
  const handleSelectTimeSlot = (timeSlot: TimeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };
  
  if (isLoading) {
    return (
      <MainLayout>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </MainLayout>
    );
  }

  if (!tutor) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center h-96">
          <h2 className="text-2xl font-semibold">Tutor not found</h2>
          <Link to="/tutors" className="mt-4">
            <Button variant="outline">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Tutors
            </Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Tutor Info */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">{tutor.name}</h1>
                <Button
                  variant="ghost"
                  onClick={handleToggleFavorite}
                  className="text-red-500 hover:bg-red-50"
                >
                  <Heart className={`w-6 h-6 ${isFavorite ? 'fill-red-500' : ''}`} />
                </Button>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <Star className="w-5 h-5 mr-1 text-yellow-400" />
                  <span>{tutor.rating} ({tutor.reviews.length} reviews)</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-1" />
                  <span>{tutor.country}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Globe className="w-5 h-5 mr-1" />
                  <span>{tutor.languages.map((lang: Language) => lang.name).join(', ')}</span>
                </div>
              </div>

              <div className="prose max-w-none mb-8">
                <h2 className="text-xl font-semibold mb-4">About Me</h2>
                <p>{tutor.bio}</p>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Availability</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {tutor.availability.map((slot: TimeSlot) => (
                    !slot.isBooked && (
                      <Button
                        key={slot.id}
                        variant={selectedTimeSlot === slot ? 'default' : 'outline'}
                        onClick={() => handleSelectTimeSlot(slot)}
                        disabled={slot.isBooked}
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        {slot.date} <Clock className="w-4 h-4 ml-2" /> {slot.startTime}
                      </Button>
                    )
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking & Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Book a Lesson</h2>
              <div className="space-y-4">
                <Button className="w-full">
                  <Play className="w-4 h-4 mr-2" />
                  Start Lesson
                </Button>
                <Button variant="outline" className="w-full">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Languages & Proficiencies</h2>
              <div className="flex flex-wrap gap-2">
                {tutor.languages.map((lang: Language) => (
                  <span
                    key={lang.name}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    {lang.name} ({lang.proficiency})
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};