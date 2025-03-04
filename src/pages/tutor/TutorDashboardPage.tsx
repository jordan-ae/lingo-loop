import { Calendar } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";


export default function TutorDashboardPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Tutor Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Sessions</CardTitle>
            <CardDescription>3 sessions this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p>Math - Algebra</p>
                <Button variant="outline">Details</Button>
              </div>
              <div className="flex items-center justify-between">
                <p>Science - Physics</p>
                <Button variant="outline">Details</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Student Progress</CardTitle>
            <CardDescription>Overall performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p>Math Progress</p>
                {/* <Progress value={75} className="h-2" /> */}
              </div>
              <div>
                <p>Science Progress</p>
                {/* <Progress value={60} className="h-2" /> */}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>Your schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" className="rounded-md border" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Recent Feedback</CardTitle>
            <CardDescription>From your students</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border p-3 rounded-lg">
                <p>"Great explanation of algebra concepts!"</p>
              </div>
              <div className="border p-3 rounded-lg">
                <p>"Helped me understand physics better."</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your tutoring</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button className="w-full">Schedule New Session</Button>
              <Button variant="outline" className="w-full">
                Add Study Material
              </Button>
              <Button variant="outline" className="w-full">
                View All Students
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
