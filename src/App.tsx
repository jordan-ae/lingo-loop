import React from 'react';
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


// Protected Route Component
const ProtectedRoute = ({ 
  children, 
  allowedRoles = ['student', 'tutor', 'admin'] 
}: { 
  children: React.ReactNode;
  allowedRoles?: string[];
}) => {
  const { isAuthenticated, user } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (user && !allowedRoles.includes(user.role)) {
    // Redirect based on role
    switch (user.role) {
      case 'student':
        return <Navigate to="/dashboard" />;
      case 'tutor':
        return <Navigate to="/tutor-dashboard" />;
      case 'admin':
        return <Navigate to="/admin-dashboard" />;
      default:
        return <Navigate to="/login" />;
    }
  }
  
  return <>{children}</>;
};

function App() {
  const { isAuthenticated, user } = useAuthStore();
  
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/" 
          element={
            isAuthenticated ? (
              user?.role === 'student' ? (
                <Navigate to="/dashboard" />
              ) : user?.role === 'tutor' ? (
                <Navigate to="/tutor-dashboard" />
              ) : (
                <Navigate to="/admin-dashboard" />
              )
            ) : (
              <Navigate to="/login" />
            )
          } 
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