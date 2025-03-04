import React from 'react';
import { AuthForm } from '../../components/auth/AuthForm';

export const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-extrabold text-gray-900 mb-2">
          LinguaLearn
        </h1>
        <h2 className="text-center text-sm text-gray-600 mb-8">
          Sign in to your account
        </h2>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <AuthForm type="login" />
      </div>
    </div>
  );
};