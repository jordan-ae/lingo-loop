/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from 'zustand';
import { User, UserRole } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  register: (email: string, password: string, name: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (token: string, newPassword: string) => Promise<boolean>;
}

// Mock data for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    email: 'student@example.com',
    name: 'John Student',
    role: 'student',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: '2',
    email: 'tutor@example.com',
    name: 'Jane Tutor',
    role: 'tutor',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: '3',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
  }
];

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email, password, role) => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = mockUsers.find(u => u.email === email && u.role === role);
    
    if (user) {
      set({ user, isAuthenticated: true, isLoading: false });
      return true;
    }
    
    set({ isLoading: false });
    return false;
  },
  
  register: async (email, password, name, role) => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const userExists = mockUsers.some(u => u.email === email);
    if (userExists) {
      set({ isLoading: false });
      return false;
    }
    
    const newUser: User = {
      id: `${mockUsers.length + 1}`,
      email,
      name,
      role,
      profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
    };
    
    mockUsers.push(newUser);
    set({ user: newUser, isAuthenticated: true, isLoading: false });
    return true;
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
  
  forgotPassword: async (email: string) => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const userExists = mockUsers.some(u => u.email === email);
    set({ isLoading: false });
    
    return userExists;
  },
  
  resetPassword: async (token, newPassword) => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    set({ isLoading: false });
    return true;
  }
}));