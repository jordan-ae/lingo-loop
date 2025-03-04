/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (token: string, newPassword: string) => Promise<boolean>;
}

// Mock data with passwords
const mockUsers: User[] = [
  {
    id: '1',
    email: 'student@example.com',
    name: 'John Student',
    role: 'student',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    password: 'student123'
  },
  {
    id: '2',
    email: 'tutor@example.com',
    name: 'Jane Tutor',
    role: 'tutor',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    password: 'tutor123'
  },
  {
    id: '3',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    password: 'admin123'
  }
];

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email, password) => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
      set({ user, isAuthenticated: true, isLoading: false });
      return true;
    }
    
    set({ isLoading: false });
    return false;
  },
  
  register: async (email, password, name) => {
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
      role: 'student',
      profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
      password
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