import { create } from 'zustand';
import { User } from '../types';

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
  updateUser: (updates: Partial<User>) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  
  setUser: (user) => set({ user }),

  clearUser: () => set({ user: null }),

  updateUser: (updates) => set((state) => ({
    user: state.user ? { ...state.user, ...updates } : null
  }))
}));

// // To get user data
// const user = useUserStore(state => state.user);

// // To set user data
// const setUser = useUserStore(state => state.setUser);
// setUser(newUserData);

// // To update specific fields
// const updateUser = useUserStore(state => state.updateUser);
// updateUser({ firstName: 'New Name', email: 'new@email.com' });

// // To clear user data
// const clearUser = useUserStore(state => state.clearUser);
// clearUser();