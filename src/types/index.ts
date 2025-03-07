export type UserRole = 'student' | 'tutor' | 'admin';

export interface User {
  id: string;
  email: string;
  firstName: string,
  lastName: string,
  name: string;
  role: UserRole;
  profileImage?: string;
  password: string;
  isActive: boolean;
  isVerified: boolean
}

export interface Tutor extends User {
  languages: Language[];
  bio: string;
  videoIntroduction?: string;
  hourlyRate: number;
  rating: number;
  reviews: Review[];
  availability: TimeSlot[];
  country: string;
  timezone: string;
}

export interface Student extends User {
  progress: {
    grammar: number;
    vocabulary: number;
    pronunciation: number;
    overall: number;
  };
  achievements: Achievement[];
  favoriteLanguages: string[];
  favoriteTutors: string[];
}

export interface Language {
  name: string;
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'native';
}

export interface Review {
  id: string;
  studentId: string;
  studentName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface TimeSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

export interface Lesson {
  id: string;
  tutorId: string;
  tutorName: string;
  studentId: string;
  studentName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  dateEarned: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type: 'lesson' | 'message' | 'system';
  linkTo?: string;
}

export interface Exercise {
  id: string;
  type: 'vocabulary' | 'grammar' | 'pronunciation' | 'spelling';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  title: string;
  description: string;
  content: unknown;
}

export interface Payment {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  date: string;
  lessonId?: string;
}

export interface TutorApplication {
  id: string;
  userId: string;
  name: string;
  email: string;
  country: string;
  phone: string;
  videoLink: string;
  bio: string;
  languages: Language[];
  status: 'pending' | 'approved' | 'rejected';
  submissionDate: string;
  reviewDate?: string;
  reviewedBy?: string;
  rejectionReason?: string;
  document?: File;
}