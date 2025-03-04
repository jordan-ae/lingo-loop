import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  User, 
  CreditCard, 
  ChevronLeft, 
  Check,
  AlertCircle
} from 'lucide-react';
import { useTutorStore } from '../../store/tutorStore';
import { Tutor, TimeSlot } from '../../types';
import { MainLayout } from '../../components/layout/MainLayout';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';

export const BookingPage: React.FC = () => {
  const { tutorId, slotId } = useParams<{ tutorId: string; slotId: string }>();
  const navigate = useNavigate();
  const { getTutorById, fetchTutors } = useTutorStore();
  
  const [tutor, setTutor] = useState<Tutor | null>(null);
  const [timeSlot, setTimeSlot] = useState<TimeSlot | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await fetchTutors();
      
      if (tutorId) {
        const tutorData = getTutorById(tutorId);
        if (tutorData) {
          setTutor(tutorData);
          
          if (slotId) {
            const slot = tutorData.availability.find((s: { id: string; }) => s.id === slotId);
            if (slot) {
              setTimeSlot(slot);
            }
          }
        }
      }
      
      setIsLoading(false);
    };
    
    loadData();
  }, [tutorId, slotId, fetchTutors, getTutorById]);
  
  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setIsSuccess(true);
    
    // Redirect to confirmation after a delay
    setTimeout(() => {
      navigate('/dashboard');
    }, 3000);
  };
  
  if (isLoading) {
    return (
      <MainLayout>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  if (!tutor || !timeSlot) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Not Available</h2>
          <p className="text-gray-600 mb-6">The tutor or time slot you selected is not available.</p>
          <Link to="/tutors">
            <Button variant="default">
              <ChevronLeft size={16} className="mr-1" />
              Back to Tutors
            </Button>
          </Link>
        </div>
      </MainLayout>
    );
  }
  
  if (isSuccess) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <div className="bg-green-100 rounded-full p-4 inline-block mb-4">
            <Check size={48} className="text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-6">
            Your lesson with {tutor.name} has been scheduled for {timeSlot.date} at {timeSlot.startTime}.
          </p>
          <p className="text-gray-600 mb-6">
            A calendar invitation has been sent to your email.
          </p>
          <Link to="/dashboard">
            <Button variant="default">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="mb-6">
        <Link to={`/tutors/${tutor.id}`} className="inline-flex items-center text-blue-600 hover:text-blue-800">
          <ChevronLeft size={16} className="mr-1" />
          Back to tutor profile
        </Link>
      </div>
      
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Confirm and Pay</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Lesson Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-4">
                <img
                  src={tutor.profileImage}
                  alt={tutor.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium text-gray-900">{tutor.name}</h3>
                  <div className="text-sm text-gray-500">
                    {tutor.languages.map(l => l.name).join(', ')}
                  </div>
                </div>
              </div>
              
              <div className="border-t border-b border-gray-200 py-4 space-y-3">
                <div className="flex items-center">
                  <Calendar size={18} className="text-gray-500 mr-2" />
                  <span className="text-gray-700">{timeSlot.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={18} className="text-gray-500 mr-2" />
                  <span className="text-gray-700">{timeSlot.startTime} - {timeSlot.endTime}</span>
                </div>
                <div className="flex items-center">
                  <User size={18} className="text-gray-500 mr-2" />
                  <span className="text-gray-700">1-on-1 Lesson</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Lesson (1 hour)</span>
                  <span className="text-gray-900">${tutor.hourlyRate.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Platform fee</span>
                  <span className="text-gray-900">${(tutor.hourlyRate * 0.05).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-blue-600">${(tutor.hourlyRate * 1.05).toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 text-sm text-gray-500">
              <div className="space-y-2">
                <p>
                  <strong>Cancellation Policy:</strong> Free cancellation up to 24 hours before the lesson.
                </p>
                <p>
                  <strong>Refund Policy:</strong> Full refund if you're not satisfied with the lesson.
                </p>
              </div>
            </CardFooter>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex rounded-md overflow-hidden border border-gray-300">
                  <button
                    type="button"
                    className={`flex-1 py-2 px-4 text-center ${
                      paymentMethod === 'card'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    Credit Card
                  </button>
                  <button
                    type="button"
                    className={`flex-1 py-2 px-4 text-center ${
                      paymentMethod === 'paypal'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setPaymentMethod('paypal')}
                  >
                    PayPal
                  </button>
                </div>
              </div>
              
              {paymentMethod === 'card' ? (
                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                  <div className="flex flex-col space-y-1">
                    <label className="text-sm font-medium text-gray-700">Card Number</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CreditCard size={18} className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-1">
                      <label className="text-sm font-medium text-gray-700">Expiration Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label className="text-sm font-medium text-gray-700">CVC</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label className="text-sm font-medium text-gray-700">Cardholder Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div className="pt-4">
                    <Button
                      type="submit"
                      variant="default"
                      disabled={isProcessing}
                    >
                      {isProcessing ? 'Processing...' : `Pay $${(tutor.hourlyRate * 1.05).toFixed(2)}`}
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-600 mb-6">
                    You will be redirected to PayPal to complete your payment.
                  </p>
                  <Button
                    onClick={handlePaymentSubmit}
                    variant="default"
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processing...' : 'Continue to PayPal'}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};