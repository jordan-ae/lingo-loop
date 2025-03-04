/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useTutorStore, TutorFilters as FilterType } from '../../store/tutorStore';
import { useStudentStore } from '../../store/studentStore';
import { useAuthStore } from '../../store/authStore';
import { Tutor } from '../../types';
import { MainLayout } from '../../components/layout/MainLayout';
import { TutorCard } from '../../components/tutor/TutorCard';
import { TutorFilters } from '../../components/tutor/TutorFilters';

export const TutorSearchPage: React.FC = () => {
  const { user } = useAuthStore();
  const { tutors, filteredTutors, fetchTutors, filterTutors, isLoading } = useTutorStore();
  const { student, fetchStudentData, addFavoriteTutor, removeFavoriteTutor } = useStudentStore();
  
  const [favorites, setFavorites] = useState<string[]>([]);
  
  useEffect(() => {
    fetchTutors();
    
    if (user) {
      fetchStudentData(user.id);
    }
  }, [fetchStudentData, fetchTutors, user]);
  
  useEffect(() => {
    if (student) {
      setFavorites(student.favoriteTutors);
    }
  }, [student]);
  
  const handleFilter = (filters: FilterType) => {
    filterTutors(filters);
  };
  
  const handleToggleFavorite = async (tutorId: string) => {
    if (favorites.includes(tutorId)) {
      await removeFavoriteTutor(tutorId);
      setFavorites(favorites.filter(id => id !== tutorId));
    } else {
      await addFavoriteTutor(tutorId);
      setFavorites([...favorites, tutorId]);
    }
  };
  
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Find Your Perfect Tutor</h1>
        <p className="text-gray-600">Browse our qualified language tutors and find the right match for your learning goals.</p>
      </div>
      
      <TutorFilters onFilter={handleFilter} />
      
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4 space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="flex justify-between">
                  <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {filteredTutors.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tutors found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your filters to find more tutors.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTutors.map((tutor: Tutor) => (
                <TutorCard
                  key={tutor.id}
                  tutor={tutor}
                  isFavorite={favorites.includes(tutor.id)}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          )}
        </>
      )}
    </MainLayout>
  );
};