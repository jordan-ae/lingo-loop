import React, { useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useStudentStore } from '../../store/studentStore';
import { useTutorStore } from '../../store/tutorStore';
import { Dumbbell } from 'lucide-react';
import { MainLayout } from '../../components/layout/MainLayout';
import { UpcomingLessons } from '../../components/student/UpcomingLessons';
import { ProgressSummary } from '../../components/student/ProgressSumary';
import { RecommendedTutors } from '../../components/student/RecomendTutors';
import { NotificationsList } from '../../components/student/NotificationsList';
import { useUserStore } from '@/store/userStore';

export const DashboardPage: React.FC = () => {
  const { user } = useAuthStore();
  const { 
    student, 
    upcomingLessons, 
    notifications, 
    isLoading,
    fetchStudentData, 
    fetchUpcomingLessons, 
    fetchNotifications,
    markNotificationAsRead
  } = useStudentStore();
  
  const { tutors, fetchTutors } = useTutorStore();
  const userI = useUserStore(state => state.user);
  
  useEffect(() => {
    if (user) {
      fetchStudentData(user.id);
      fetchUpcomingLessons(user.id);
      fetchNotifications(user.id);
      fetchTutors();
    }
  }, [user]);
  
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {userI?.firstName}!</h1>
        <p className="text-gray-600">Here's an overview of your language learning journey.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2">
          <UpcomingLessons lessons={upcomingLessons} isLoading={isLoading} />
        </div>
        
        <div>
          <div className="bg-blue-600 rounded-lg shadow-md p-6 text-white mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Practice Arena</h3>
              <Dumbbell size={24} />
            </div>
            <p className="mb-4 text-blue-100">
              Improve your skills with interactive exercises tailored to your level.
            </p>
            <a
              href="/practice"
              className="inline-flex items-center justify-center rounded-md border border-blue-600 bg-white px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors w-full"
             />
              Start Practicing
          </div>
          
          {student && (
            <ProgressSummary
              grammar={student.progress.grammar}
              vocabulary={student.progress.vocabulary}
              pronunciation={student.progress.pronunciation}
              overall={student.progress.overall}
            />
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <RecommendedTutors tutors={tutors} isLoading={isLoading} />
        </div>
        
        <div>
          <NotificationsList 
            notifications={notifications} 
            onMarkAsRead={markNotificationAsRead}
            isLoading={isLoading}
          />
        </div>
      </div>
    </MainLayout>
  );
};