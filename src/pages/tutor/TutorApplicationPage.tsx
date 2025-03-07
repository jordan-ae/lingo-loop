import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { 
  Mail, 
  Phone, 
  MapPin, 
  FileVideo, 
  FileText, 
  Plus, 
  Trash2,
  CheckCircle,
  Loader2
} from 'lucide-react';
import { useTutorStore, TutorApplicationData } from '../../store/tutorStore';
import { Language } from '../../types';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../../components/ui/card';
import { MainLayout } from '../../components/layout/MainLayout';
import { Button } from '../../components/ui/button';
import { useUserStore } from '@/store/userStore';

export const TutorApplicationPage: React.FC = () => {
  const navigate = useNavigate();
  const { submitTutorApplication, isLoading } = useTutorStore();
  const user = useUserStore(state => state.user);
  
  const [languages, setLanguages] = useState<Language[]>([
    { name: '', proficiency: 'intermediate' }
  ]);
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<TutorApplicationData>();
  
  const handleAddLanguage = () => {
    setLanguages([...languages, { name: '', proficiency: 'intermediate' }]);
  };
  
  const handleRemoveLanguage = (index: number) => {
    setLanguages(languages.filter((_, i) => i !== index));
  };
  
  const handleLanguageChange = (index: number, field: keyof Language, value: string) => {
    const updatedLanguages = [...languages];
    updatedLanguages[index] = {
      ...updatedLanguages[index],
      [field]: value
    };
    setLanguages(updatedLanguages);
  };
  
  const onSubmit = async (data: TutorApplicationData) => {
    const applicationData = {
      userId: user?.id,
      ...data,
      languages
    };
    
    const success = await submitTutorApplication(applicationData);
    
    if (success) {
      setIsSubmitted(true);
      
      // Redirect to dashboard after a delay
      setTimeout(() => {
        navigate('/tutor-dashboard');
      }, 3000);
    }
  };
  
  if (isSubmitted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="bg-green-100 rounded-full p-4 inline-block mb-4">
          <CheckCircle size={48} className="text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for applying to be a tutor. We'll review your application and get back to you soon.
        </p>
        <a 
          href="mailto:support@lingoloop.io" 
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          support@lingoloop.io
        </a>
      </div>
    </div>
    );
  }
  
  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Tutor Application</h1>
        <p className="text-gray-600 mb-6">
          Complete the form below to apply as a tutor on our platform.
        </p>
        
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">Email Address</label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                />
              </div>
              </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">Phone Number</label>
                  <div className="relative">
                    <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      {...register('phone', { required: 'Phone number is required' })}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">Country</label>
                  <div className="relative">
                    <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      {...register('country', { required: 'Country is required' })}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">Video Introduction Link (YouTube, Vimeo, etc.)</label>
                  <div className="relative">
                    <FileVideo size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="https://..."
                      {...register('videoLink', { 
                    required: 'Video link is required',
                    pattern: {
                      value: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|vimeo\.com)\/.+/i,
                      message: 'Please enter a valid YouTube or Vimeo link'
                    }
                  })}
                />
                <p className="mt-1 text-sm text-gray-500">Upload a 1-3 minute video introducing yourself and your teaching style</p>
              </div>
              </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <div className="mt-1">
                  <textarea
                    rows={4}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Tell us about yourself, your teaching experience, and your approach to language instruction..."
                    {...register('bio', { 
                      required: 'Bio is required',
                      minLength: {
                        value: 100,
                        message: 'Bio must be at least 100 characters'
                      }
                    })}
                  />
                  {errors.bio && (
                    <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>
                  )}
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Languages You Can Teach
                  </label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddLanguage}
                    className="flex items-center gap-1"
                  >
                    <Plus size={16} />
                    Add Language
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {languages.map((language, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={language.name}
                          onChange={(e) => handleLanguageChange(index, 'name', e.target.value)}
                          placeholder="Language name"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          required
                        />
                      </div>
                      
                      <div className="flex-1">
                        <select
                          value={language.proficiency}
                          onChange={(e) => handleLanguageChange(index, 'proficiency', e.target.value as string)}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                          <option value="native">Native</option>
                        </select>
                      </div>
                      
                      {languages.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveLanguage(index)}
                          className="p-2 text-gray-500 hover:text-red-500"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <Button
                  type="submit"
                  variant="default"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="animate-spin" size={18} />
                      Submitting...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <FileText size={18} />
                      Submit Application
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="bg-gray-50 text-sm text-gray-500">
            <p>
              By submitting this application, you agree to our Terms of Service and Privacy Policy.
              We'll review your application and get back to you within 3-5 business days.
            </p>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};