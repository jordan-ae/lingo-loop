/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from 'zustand';
import { Tutor, Language, TimeSlot, Review } from '../types';

interface TutorState {
  tutors: Tutor[];
  filteredTutors: Tutor[];
  isLoading: boolean;
  error: string | null;
  fetchTutors: () => Promise<void>;
  filterTutors: (filters: TutorFilters) => void;
  getTutorById: (id: string) => Tutor | undefined;
  addFavoriteTutor: (tutorId: string, studentId: string) => Promise<boolean>;
  removeFavoriteTutor: (tutorId: string, studentId: string) => Promise<boolean>;
  submitTutorApplication: (application: TutorApplicationData) => Promise<boolean>;
}

export interface TutorFilters {
  language?: string;
  availability?: string;
  priceMin?: number;
  priceMax?: number;
  country?: string;
  rating?: number;
  search?: string;
}

export interface TutorApplicationData {
  name: string;
  email: string;
  country: string;
  phone: string;
  videoLink: string;
  bio: string;
  languages: Language[];
}

// Mock data
const mockTutors: Tutor[] = [
  {
    id: '1',
    email: 'sophia@example.com',
    name: 'Sophia Rodriguez',
    role: 'tutor',
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    languages: [
      { name: 'Spanish', proficiency: 'native' },
      { name: 'English', proficiency: 'advanced' },
      { name: 'French', proficiency: 'intermediate' }
    ],
    bio: 'Certified language teacher with 5+ years of experience teaching Spanish and English. I specialize in conversational fluency and business language.',
    videoIntroduction: 'https://example.com/videos/sophia-intro.mp4',
    hourlyRate: 25,
    rating: 4.8,
    reviews: [
      {
        id: '101',
        studentId: '201',
        studentName: 'Michael Chen',
        rating: 5,
        comment: 'Sophia is an excellent teacher! Her lessons are engaging and she explains concepts clearly.',
        date: '2023-04-15'
      },
      {
        id: '102',
        studentId: '202',
        studentName: 'Emma Wilson',
        rating: 4.5,
        comment: 'Very patient and knowledgeable. Helped me prepare for my trip to Spain.',
        date: '2023-03-22'
      }
    ],
    availability: [
      { id: 'a1', date: '2023-05-10', startTime: '09:00', endTime: '10:00', isBooked: false },
      { id: 'a2', date: '2023-05-10', startTime: '10:00', endTime: '11:00', isBooked: true },
      { id: 'a3', date: '2023-05-11', startTime: '14:00', endTime: '15:00', isBooked: false }
    ],
    country: 'Spain',
    timezone: 'Europe/Madrid'
  },
  {
    id: '2',
    email: 'akira@example.com',
    name: 'Akira Tanaka',
    role: 'tutor',
    profileImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    languages: [
      { name: 'Japanese', proficiency: 'native' },
      { name: 'English', proficiency: 'advanced' }
    ],
    bio: 'Tokyo University graduate with 7 years of experience teaching Japanese to international students. I focus on practical, everyday Japanese and cultural context.',
    videoIntroduction: 'https://example.com/videos/akira-intro.mp4',
    hourlyRate: 30,
    rating: 4.9,
    reviews: [
      {
        id: '103',
        studentId: '203',
        studentName: 'Sarah Johnson',
        rating: 5,
        comment: 'Akira is fantastic! He makes learning Japanese fun and accessible.',
        date: '2023-04-02'
      }
    ],
    availability: [
      { id: 'a4', date: '2023-05-10', startTime: '18:00', endTime: '19:00', isBooked: false },
      { id: 'a5', date: '2023-05-12', startTime: '18:00', endTime: '19:00', isBooked: false }
    ],
    country: 'Japan',
    timezone: 'Asia/Tokyo'
  },
  {
    id: '3',
    email: 'elena@example.com',
    name: 'Elena Petrova',
    role: 'tutor',
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    languages: [
      { name: 'Russian', proficiency: 'native' },
      { name: 'English', proficiency: 'advanced' },
      { name: 'German', proficiency: 'intermediate' }
    ],
    bio: 'Professional linguist with a Master\'s degree in Language Education. I specialize in Russian for beginners and intermediate learners.',
    videoIntroduction: 'https://example.com/videos/elena-intro.mp4',
    hourlyRate: 22,
    rating: 4.7,
    reviews: [
      {
        id: '104',
        studentId: '204',
        studentName: 'David Brown',
        rating: 4.5,
        comment: 'Elena is very thorough and provides excellent materials.',
        date: '2023-03-15'
      },
      {
        id: '105',
        studentId: '205',
        studentName: 'Lisa Garcia',
        rating: 5,
        comment: 'I\'ve made incredible progress with Elena\'s help. Highly recommend!',
        date: '2023-02-28'
      }
    ],
    availability: [
      { id: 'a6', date: '2023-05-11', startTime: '10:00', endTime: '11:00', isBooked: false },
      { id: 'a7', date: '2023-05-11', startTime: '11:00', endTime: '12:00', isBooked: true }
    ],
    country: 'Russia',
    timezone: 'Europe/Moscow'
  }
];

export const useTutorStore = create<TutorState>((set, get) => ({
  tutors: [],
  filteredTutors: [],
  isLoading: true,
  error: null,
  
  fetchTutors: async () => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set({ tutors: mockTutors, filteredTutors: mockTutors, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch tutors', isLoading: false });
    }
  },
  
  filterTutors: (filters) => {
    const { tutors } = get();
    
    let filtered = [...tutors];
    
    if (filters.language) {
      filtered = filtered.filter(tutor => 
        tutor.languages.some(lang => 
          lang.name.toLowerCase().includes(filters.language!.toLowerCase())
        )
      );
    }
    
    if (filters.country) {
      filtered = filtered.filter(tutor => 
        tutor.country.toLowerCase().includes(filters.country!.toLowerCase())
      );
    }
    
    if (filters.priceMin !== undefined) {
      filtered = filtered.filter(tutor => tutor.hourlyRate >= filters.priceMin!);
    }
    
    if (filters.priceMax !== undefined) {
      filtered = filtered.filter(tutor => tutor.hourlyRate <= filters.priceMax!);
    }
    
    if (filters.rating !== undefined) {
      filtered = filtered.filter(tutor => tutor.rating >= filters.rating!);
    }
    
    if (filters.search) {
      filtered = filtered.filter(tutor => 
        tutor.name.toLowerCase().includes(filters.search!.toLowerCase()) ||
        tutor.bio.toLowerCase().includes(filters.search!.toLowerCase())
      );
    }
    
    set({ filteredTutors: filtered });
  },
  
  getTutorById: (id) => {
    return get().tutors.find(tutor => tutor.id === id);
  },
  
  addFavoriteTutor: async (tutorId, studentId) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return true;
  },
  
  removeFavoriteTutor: async (tutorId, studentId) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return true;
  },
  
  submitTutorApplication: async (application) => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    set({ isLoading: false });
    return true;
  }
}));