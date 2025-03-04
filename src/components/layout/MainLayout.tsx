import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Search, 
  Calendar, 
  MessageSquare, 
  Book, 
  Clock, 
  Settings, 
  LogOut, 
  Bell, 
  Menu, 
  X,
  User,
  Dumbbell
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../ui/button';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const studentNavItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <Home size={20} /> },
    { path: '/tutors', label: 'Find Tutors', icon: <Search size={20} /> },
    { path: '/lessons', label: 'My Lessons', icon: <Calendar size={20} /> },
    { path: '/messages', label: 'Messages', icon: <MessageSquare size={20} /> },
    { path: '/practice', label: 'Practice Arena', icon: <Dumbbell size={20} /> },
    { path: '/history', label: 'Lesson History', icon: <Clock size={20} /> },
  ];
  
  const tutorNavItems = [
    { path: '/tutor-dashboard', label: 'Dashboard', icon: <Home size={20} /> },
    { path: '/schedule', label: 'My Schedule', icon: <Calendar size={20} /> },
    { path: '/messages', label: 'Messages', icon: <MessageSquare size={20} /> },
    { path: '/earnings', label: 'Earnings', icon: <Book size={20} /> },
    { path: '/profile-management', label: 'Profile', icon: <User size={20} /> },
  ];
  
  const adminNavItems = [
    { path: '/admin-dashboard', label: 'Dashboard', icon: <Home size={20} /> },
    { path: '/tutor-applications', label: 'Tutor Applications', icon: <User size={20} /> },
    { path: '/user-management', label: 'User Management', icon: <Settings size={20} /> },
  ];
  
  const navItems = user?.role === 'student' 
    ? studentNavItems 
    : user?.role === 'tutor' 
      ? tutorNavItems 
      : adminNavItems;
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="text-blue-600 font-bold text-xl">
                  LinguaLearn
                </Link>
              </div>
            </div>
            
            <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
              {user && (
                <>
                  <button className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none">
                    <Bell size={20} />
                  </button>
                  
                  <div className="relative">
                    <div className="flex items-center space-x-3">
                      <div className="flex flex-col items-end">
                        <span className="text-sm font-medium text-gray-700">{user.name}</span>
                        <span className="text-xs text-gray-500 capitalize">{user.role}</span>
                      </div>
                      
                      {user.profileImage ? (
                        <img
                          className="h-8 w-8 rounded-full"
                          src={user.profileImage}
                          alt={user.name}
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <User size={16} className="text-gray-500" />
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
            
            <div className="flex items-center sm:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`${
                    isActive(item.path)
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                  } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                {user?.profileImage ? (
                  <img
                    className="h-10 w-10 rounded-full"
                    src={user.profileImage}
                    alt={user.name}
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <User size={20} className="text-gray-500" />
                  </div>
                )}
                
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user?.name}</div>
                  <div className="text-sm font-medium text-gray-500">{user?.email}</div>
                </div>
              </div>
              
              <div className="mt-3 space-y-1">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  <div className="flex items-center">
                    <LogOut size={20} className="mr-3" />
                    Sign out
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
      
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <nav className="hidden md:block bg-white w-64 border-r border-gray-200 pt-5 pb-4 flex-shrink-0">
          <div className="h-full flex flex-col justify-between">
            <div className="px-2 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`${
                    isActive(item.path)
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                >
                  <div className="mr-3 flex-shrink-0">{item.icon}</div>
                  {item.label}
                </Link>
              ))}
            </div>
            
            <div className="px-2 mt-6 mb-4">
              <Button
                variant="outline"
                className="w-full flex items-center"
                onClick={handleLogout}
              >
                <LogOut size={16} className="mr-2" />
                Sign out
              </Button>
            </div>
          </div>
        </nav>
        
        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};