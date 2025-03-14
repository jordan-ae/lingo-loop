import { Tutor } from '@/types';
import { create } from 'zustand';

interface AdminState {
  tutors: Tutor[];
  totalUsers: number;
  isLoading: boolean;
  error: string | null;
  lastFetchedTutors: number | null;
  lastFetchedUsers: number | null;
  fetchAllTutors: () => Promise<void>;
  fetchTotalUsers: () => Promise<void>;
  updateTutorStatus: (tutorId: string, status: 'approved' | 'rejected') => Promise<void>;
}

export const useAdminStore = create<AdminState>((set, get) => ({
  tutors: [],
  totalUsers: 0,
  isLoading: false,
  error: null,
  lastFetchedTutors: null,
  lastFetchedUsers: null,
  
  fetchAllTutors: async () => {
    const { lastFetchedTutors } = get();
    const now = Date.now();
    
    if (lastFetchedTutors && now - lastFetchedTutors < 300000) {
      return;
    }
    
    set({ isLoading: true, error: null });
    
    try {
      const response = await fetch('http://localhost:5000/api/admin/tutors');
      if (!response.ok) {
        throw new Error('Failed to fetch tutors');
      }
      const tutors = await response.json();
      set({ tutors, isLoading: false, lastFetchedTutors: now });
    } catch (error) {
      if (error instanceof Error) {
        set({ error: error.message, isLoading: false });
      } else {
        set({ error: 'Failed to fetch tutors', isLoading: false });
      }
    }
  },
  
  fetchTotalUsers: async () => {
    const { lastFetchedUsers } = get();
    const now = Date.now();
    
    if (lastFetchedUsers && now - lastFetchedUsers < 300000) {
      return;
    }
    
    set({ isLoading: true, error: null });
    
    try {
      const response = await fetch('http://localhost:5000/api/admin/total-users');
      if (!response.ok) {
        throw new Error('Failed to fetch total users');
      }
      const { totalUsers } = await response.json();
      set({ totalUsers, isLoading: false, lastFetchedUsers: now });
    } catch (error) {
      if (error instanceof Error) {
        set({ error: error.message, isLoading: false });
      } else {
        set({ error: 'Failed to fetch total users', isLoading: false });
      }
    }
  },
  
  updateTutorStatus: async (tutorId: string, status: 'approved' | 'rejected') => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await fetch(`http://localhost:5000/api/tutors/${tutorId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update tutor status');
      }
      
      const updatedTutor = await response.json();
      
      set((state) => ({
        tutors: state.tutors.map((tutor) => 
          tutor._id === tutorId ? { ...tutor, status: updatedTutor.status } : tutor
        ),
        isLoading: false,
      }));
      
    } catch (error) {
      if (error instanceof Error) {
        set({ error: error.message, isLoading: false });
      } else {
        set({ error: 'Failed to update tutor status', isLoading: false });
      }
    }
  },
}));