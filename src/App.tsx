import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { DashboardPage } from './pages/student/DashboardPage';
import { TutorSearchPage } from './pages/student/TutorSearchPage';
import { TutorProfilePage } from './pages/tutor/TutorProfilePage';
import { BookingPage } from './pages/student/BookingPage';
import { TutorApplicationPage } from './pages/tutor/TutorApplicationPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import TutorDashboardPage from './pages/tutor/TutorDashboardPage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';

const ROLE_ROUTES = {
  student: '/dashboard',
  tutor: '/tutor-dashboard',
  admin: '/admin-dashboard',
  default: '/tutors'
};

const ProtectedRoute = ({ 
  children, 
  allowedRoles = ['student', 'tutor', 'admin'] 
}: { 
  children: React.ReactNode;
  allowedRoles?: string[];
}) => {
  const { isAuthenticated, user, isLoading, initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (user && !allowedRoles.includes(user.role)) {
    let redirectPath = ROLE_ROUTES[user.role] || ROLE_ROUTES.default;

    console.log(user, "strange")
    
    if (user.role === 'tutor') {
      const isActive = user.isActive ?? false;
      console.log(isActive)
      redirectPath = isActive ? '/tutor-dashboard' : '/tutor-application';
    }
    
    return <Navigate to={redirectPath} />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/" 
          element={<TutorSearchPage />} 
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Student Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <DashboardPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/tutors" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <TutorSearchPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/tutors/:id" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <TutorProfilePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/booking/:tutorId/:slotId" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <BookingPage />
            </ProtectedRoute>
          } 
        />
        
        {/* Tutor Routes */}
        <Route 
          path="/tutor-application" 
          element={
            <ProtectedRoute allowedRoles={['tutor']}>
              <TutorApplicationPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/tutor-dashboard" 
          element={
            <ProtectedRoute allowedRoles={['tutor']}>
              <TutorDashboardPage />
            </ProtectedRoute>
          } 
        />
        
        {/* Admin Routes */}
        <Route 
          path="/admin-dashboard" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboardPage />
            </ProtectedRoute>
          } 
        />
        
        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
