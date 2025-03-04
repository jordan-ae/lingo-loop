/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from 'zustand';
import { Student, Lesson, Achievement, Notification } from '../types';

interface StudentState {
  student: Student | null;
  upcomingLessons: Lesson[];
  completedLessons: Lesson[];
  notifications: Notification[];
  isLoading: boolean;
  error: string | null;
  fetchStudentData: (studentId: string) => Promise<void>;
  fetchUpcomingLessons: (studentId: string) => Promise<void>;
  fetchCompletedLessons: (studentId: string) => Promise<void>;
  fetchNotifications: (studentId: string) => Promise<void>;
  markNotificationAsRead: (notificationId: string) => Promise<void>;
  addFavoriteTutor: (tutorId: string) => Promise<void>;
  removeFavoriteTutor: (tutorId: string) => Promise<void>;
  updateProgress: (type: string, value: number) => Promise<void>;
}

// Mock data
const mockStudent: Student = {
  id: '1',
  email: 'student@example.com',
  name: 'John Student',
  role: 'student',
  profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
  progress: {
    grammar: 75,
    vocabulary: 60,
    pronunciation: 80,
    overall: 72
  },
  achievements: [
    {
      id: 'a1',
      name: 'First Lesson',
      description: 'Completed your first lesson',
      icon: 'award',
      dateEarned: '2023-03-15'
    },
    {
      id: 'a2',
      name: 'Vocabulary Master',
      description: 'Scored 90% or higher on a vocabulary test',
      icon: 'book-open',
      dateEarned: '2023-04-02'
    }
  ],
  favoriteLanguages: ['Spanish', 'French'],
  favoriteTutors: ['1', '3']
};

const mockUpcomingLessons: Lesson[] = [
  {
    id: 'l1',
    tutorId: '1',
    tutorName: 'Sophia Rodriguez',
    studentId: '1',
    studentName: 'John Student',
    date: '2023-05-10',
    startTime: '10:00',
    endTime: '11:00',
    status: 'scheduled'
  },
  {
    id: 'l2',
    tutorId: '3',
    tutorName: 'Elena Petrova',
    studentId: '1',
    studentName: 'John Student',
    date: '2023-05-11',
    startTime: '11:00',
    endTime: '12:00',
    status: 'scheduled'
  }
];

const mockCompletedLessons: Lesson[] = [
  {
    id: 'l3',
    tutorId: '1',
    tutorName: 'Sophia Rodriguez',
    studentId: '1',
    studentName: 'John Student',
    date: '2023-04-28',
    startTime: '10:00',
    endTime: '11:00',
    status: 'completed',
    notes: 'Worked on past tense conjugation and vocabulary for travel.'
  },
  {
    id: 'l4',
    tutorId: '2',
    tutorName: 'Akira Tanaka',
    studentId: '1',
    studentName: 'John Student',
    date: '2023-04-25',
    startTime: '18:00',
    endTime: '19:00',
    status: 'completed',
    notes: 'Introduction to basic Japanese greetings and writing system.'
  }
];

const mockNotifications: Notification[] = [
  {
    id: 'n1',
    userId: '1',
    title: 'Upcoming Lesson',
    message: 'You have a lesson with Sophia Rodriguez tomorrow at 10:00 AM.',
    timestamp: '2023-05-09T14:30:00Z',
    isRead: false,
    type: 'lesson',
    linkTo: '/lessons/l1'
  },
  {
    id: 'n2',
    userId: '1',
    title: 'New Message',
    message: 'Elena Petrova sent you a message.',
    timestamp: '2023-05-09T10:15:00Z',
    isRead: true,
    type: 'message',
    linkTo: '/messages/m1'
  }
];

export const useStudentStore = create<StudentState>((set) => ({
  student: null,
  upcomingLessons: [],
  completedLessons: [],
  notifications: [],
  isLoading: false,
  error: null,
  
  fetchStudentData: async (studentId) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set({ student: mockStudent, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch student data', isLoading: false });
    }
  },
  
  fetchUpcomingLessons: async (studentId) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      set({ upcomingLessons: mockUpcomingLessons, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch upcoming lessons', isLoading: false });
    }
  },
  
  fetchCompletedLessons: async (studentId) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      set({ completedLessons: mockCompletedLessons, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch completed lessons', isLoading: false });
    }
  },
  
  fetchNotifications: async (studentId) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 600));
      
      set({ notifications: mockNotifications, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch notifications', isLoading: false });
    }
  },
  
  markNotificationAsRead: async (notificationId) => {
    set(state => ({
      notifications: state.notifications.map(notification =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      )
    }));
  },
  
  addFavoriteTutor: async (tutorId) => {
    set(state => ({
      student: state.student
        ? {
            ...state.student,
            favoriteTutors: [...state.student.favoriteTutors, tutorId]
          }
        : null
    }));
  },
  
  removeFavoriteTutor: async (tutorId) => {
    set(state => ({
      student: state.student
        ? {
            ...state.student,
            favoriteTutors: state.student.favoriteTutors.filter(id => id !== tutorId)
          }
        : null
    }));
  },
  
  updateProgress: async (type, value) => {
    set(state => {
      if (!state.student) return state;
      
      const updatedProgress = { ...state.student.progress };
      
      if (type === 'grammar') updatedProgress.grammar = value;
      if (type === 'vocabulary') updatedProgress.vocabulary = value;
      if (type === 'pronunciation') updatedProgress.pronunciation = value;
      
      // Recalculate overall progress
      updatedProgress.overall = Math.round(
        (updatedProgress.grammar + updatedProgress.vocabulary + updatedProgress.pronunciation) / 3
      );
      
      return {
        student: {
          ...state.student,
          progress: updatedProgress
        }
      };
    });
  }
}));