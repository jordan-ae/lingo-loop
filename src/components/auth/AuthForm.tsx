/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Mail, Lock, User, Facebook, LogIn } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { UserRole } from '../../types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

interface AuthFormProps {
  type: 'login' | 'register';
}

interface FormData {
  email: string;
  password: string;
  name?: string;
}

export const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const navigate = useNavigate();
  const { login, register: registerUser, isLoading } = useAuthStore();
  const [role, setRole] = useState<UserRole>('student');
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  
  const onSubmit = async (data: FormData) => {
    if (type === 'login') {
      const success = await login(data.email, data.password, role);
      if (success) {
        if (role === 'student') {
          navigate('/dashboard');
        } else if (role === 'tutor') {
          navigate('/tutor-dashboard');
        } else {
          navigate('/admin-dashboard');
        }
      }
    } else {
      if (data.name) {
        const success = await registerUser(data.email, data.password, data.name, role);
        if (success) {
          if (role === 'student') {
            navigate('/dashboard');
          } else if (role === 'tutor') {
            navigate('/tutor-application');
          }
        }
      }
    }
  };
  
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center text-2xl">
          {type === 'login' ? 'Sign In' : 'Create Account'}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="mb-6">
          <div className="flex rounded-md overflow-hidden border border-gray-300">
            <button
              type="button"
              className={`flex-1 py-2 px-4 text-center ${
                role === 'student'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setRole('student')}
            >
              Student
            </button>
            <button
              type="button"
              className={`flex-1 py-2 px-4 text-center ${
                role === 'tutor'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setRole('tutor')}
            >
              Tutor
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {type === 'register' && (
            <div className="space-y-1">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  id="name"
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  {...register('name', { required: 'Name is required' })}
                />
              </div>
            </div>
          )}
          
          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={18} className="text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
          />
          </div>
          <div className="space-y-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-400" />
              </div>
              <input
                id="password"
                type="password"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                {...register('password', { 
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters'
              }
            })}
          />
          
          {type === 'login' && (
            <div className="text-right">
              <a href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
                Forgot Password?
              </a>
            </div>
          )}
          
          <Button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <LogIn size={18} />
            {type === 'login' ? 'Sign In' : 'Create Account'}
          </Button>
          </div>
          </div>
          </div>
        </form>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex items-center gap-2"
            >
              <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
              </svg>
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex items-center gap-2"
            >
              <Facebook size={18} />
              Facebook
            </Button>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-600">
          {type === 'login' ? "Don't have an account? " : "Already have an account? "}
          <a
            href={type === 'login' ? '/register' : '/login'}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            {type === 'login' ? 'Sign up' : 'Sign in'}
          </a>
        </p>
      </CardFooter>
    </Card>
  );
};