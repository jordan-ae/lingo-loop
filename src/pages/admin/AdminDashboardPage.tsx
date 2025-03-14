import React, { useEffect, useState } from 'react';
import { 
  Users, 
  DollarSign, 
  Calendar, 
  AlertTriangle, 
  ChevronRight,
  CheckCircle,
  XCircle,
  BarChart2
} from 'lucide-react';
import { MainLayout } from '../../components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { useAdminStore } from '../../store/adminStore';
import { Tutor } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import TutorProfileView from '../tutor/TutorProfileView';


export const AdminDashboardPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { tutors, fetchAllTutors, updateTutorStatus } = useAdminStore();
  const [selectedApplication, setSelectedApplication] = useState<Tutor | null>(null);

  console.log(selectedApplication)
  
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTutors: 0,
    totalStudents: 0,
    totalLessons: 0,
    totalRevenue: 0,
    pendingApplications: 0,
    reportedIssues: 0
  });
  
  const [recentApplications, setRecentApplications] = useState<Tutor[]>([]);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchAllTutors();

        const applications = tutors.filter(tutor => tutor.tutorProfile.status === 'pending');

        console.log(applications)
        
        setRecentApplications(applications);
        
        const timer = setTimeout(() => {
          setStats({
            totalUsers: 1250,
            totalTutors: tutors.length,
            totalStudents: 1130,
            totalLessons: 3450,
            totalRevenue: 86250,
            pendingApplications: tutors.filter(t => t.tutorProfile.status === 'pending').length,
            reportedIssues: 8
          });
          setIsLoading(false);
        }, 1000);
        
        return () => clearTimeout(timer);
      } catch (error) {
        console.error('Failed to load data:', error);
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [fetchAllTutors, tutors]);
  
  const handleReviewClick = (application: Tutor) => {
    setSelectedApplication(application);
  };

  const handleCloseModal = () => {
    setSelectedApplication(null);
  };

  const handleStatusUpdate = async (tutorId: string, status: 'approved' | 'rejected') => {
    try {
      await updateTutorStatus(tutorId, status);
      // Refresh the applications list
      const applications = tutors.filter(tutor => tutor.tutorProfile.status === 'pending');
      setRecentApplications(applications);
      // Close modal if open
      if (selectedApplication?._id === tutorId) {
        setSelectedApplication(null);
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Platform overview and management</p>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse bg-white rounded-lg shadow-md p-6">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Users</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.totalUsers}</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {stats.totalTutors} tutors, {stats.totalStudents} students
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Users size={20} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Lessons</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.totalLessons}</h3>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <Calendar size={20} className="text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">${stats.totalRevenue}</h3>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <DollarSign size={20} className="text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Pending Applications</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.pendingApplications}</h3>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <AlertTriangle size={20} className="text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Tutor Applications</CardTitle>
              <a 
                href="/tutor-applications" 
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
              >
                View all
                <ChevronRight size={16} />
              </a>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="animate-pulse space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="border rounded-md p-4">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {recentApplications.length === 0 ? (
                    <div className="text-center py-6">
                      <p className="text-gray-500">No pending applications</p>
                    </div>
                  ) : (
                    recentApplications.map((application) => (
                      <div key={application.id} className="border rounded-md p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium">{application.firstName}</h4>
                            <p className="text-sm text-gray-500">{application.email}</p>
                          </div>
                          <span className={`text-sm font-medium ${
                            application.tutorProfile.status === 'pending' ? 'text-yellow-600' : 
                            application.tutorProfile.status === 'approved' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {application.tutorProfile.status}
                          </span>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 border-red-200 hover:bg-red-50 flex items-center gap-1"
                            onClick={() => handleStatusUpdate(application.tutorProfile._id, 'rejected')}
                          >
                            <XCircle size={14} />
                            Reject
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-green-600 border-green-200 hover:bg-green-50 flex items-center gap-1"
                            onClick={() => handleStatusUpdate(application.tutorProfile._id, 'approved')}
                          >
                            <CheckCircle size={14} />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => handleReviewClick(application)}
                          >
                            Review
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>System Health</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">Server Load</span>
                      <span className="text-sm font-medium text-green-600">Normal</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">Database</span>
                      <span className="text-sm font-medium text-green-600">Healthy</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">Storage</span>
                      <span className="text-sm font-medium text-yellow-600">Warning</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Reported Issues:</span>
                      <span className="font-medium text-red-600">{stats.reportedIssues}</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="flex items-center gap-1"
                >
                  <CheckCircle size={16} />
                  Review Applications
                </Button>
                
                <Button
                  variant="outline"
                  className="flex items-center gap-1"
                >
                  <Users size={16} />
                  Manage Users
                </Button>
                
                <Button
                  variant="outline"
                  className="flex items-center gap-1"
                >
                  <AlertTriangle size={16} />
                  View Reports
                </Button>
                
                <Button
                  variant="outline"
                  className="flex items-center gap-1"
                >
                  <BarChart2 size={16} />
                  Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={!!selectedApplication} onOpenChange={handleCloseModal}>
        <DialogContent className="max-w-[800px] h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Review Application</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto px-1">
            {selectedApplication && (
              <TutorProfileView 
                tutorProfile={selectedApplication.tutorProfile}
                firstName={selectedApplication.firstName}
                lastName={selectedApplication.lastName}
                email={selectedApplication.email}
              />
            )}
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button
              variant="outline"
              className="text-red-600 border-red-200 hover:bg-red-50"
              onClick={() => selectedApplication && handleStatusUpdate(selectedApplication.tutorProfile._id, 'rejected')}
            >
              Reject
            </Button>
            <Button
              variant="outline"
              className="text-green-600 border-green-200 hover:bg-green-50"
              onClick={() => selectedApplication && handleStatusUpdate(selectedApplication.tutorProfile._id, 'approved')}
            >
              Approve
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};