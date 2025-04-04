
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import UpcomingAppointments from "@/components/UpcomingAppointments";
import { useToast } from "@/components/ui/use-toast";

// Mock data for upcoming appointments
const upcomingAppointmentsData = [
  {
    id: "app1",
    doctorName: "Sarah Johnson",
    specialty: "Cardiologist",
    date: "May 5, 2025",
    time: "10:30 AM"
  }
];

// Mock data for past appointments
const pastAppointmentsData = [
  {
    id: "past1",
    doctorName: "Michael Lee",
    specialty: "Dermatologist",
    date: "April 10, 2025",
    time: "2:00 PM"
  },
  {
    id: "past2",
    doctorName: "Emily Wilson",
    specialty: "Pediatrician",
    date: "March 22, 2025",
    time: "11:15 AM"
  }
];

const Profile = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "0412 345 678",
    dateOfBirth: "1985-06-15"
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <section className="bg-gradient-to-r from-health-500 to-health-600 text-white py-8">
          <div className="health-container">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Avatar className="w-24 h-24 border-4 border-white">
                <AvatarImage src="/placeholder.svg" alt="User Profile" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-center md:text-left">
                  {formData.firstName} {formData.lastName}
                </h1>
                <p className="opacity-90 text-center md:text-left">
                  Member since January 2025
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-8">
          <div className="health-container">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="w-full max-w-md mx-auto mb-8">
                <TabsTrigger value="profile" className="flex-1">Profile</TabsTrigger>
                <TabsTrigger value="appointments" className="flex-1">Appointments</TabsTrigger>
                <TabsTrigger value="medical" className="flex-1">Medical History</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Update your personal details here
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSaveProfile}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input 
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input 
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input 
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input 
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="dateOfBirth">Date of Birth</Label>
                          <Input 
                            id="dateOfBirth"
                            name="dateOfBirth"
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <Button 
                          type="submit"
                          className="bg-health-500 hover:bg-health-600"
                        >
                          Save Changes
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="appointments">
                <div className="space-y-8">
                  <UpcomingAppointments appointments={upcomingAppointmentsData} />
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Past Appointments</CardTitle>
                      <CardDescription>Your appointment history</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {pastAppointmentsData.length > 0 ? (
                        <div className="space-y-4">
                          {pastAppointmentsData.map((appointment) => (
                            <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarFallback>{appointment.doctorName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">Dr. {appointment.doctorName}</p>
                                  <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {appointment.date} • {appointment.time}
                                  </p>
                                </div>
                              </div>
                              <Button variant="outline" size="sm">View Details</Button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-center text-muted-foreground py-4">
                          No past appointments found
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="medical">
                <Card>
                  <CardHeader>
                    <CardTitle>Medical History</CardTitle>
                    <CardDescription>
                      View and manage your medical records
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <p className="text-muted-foreground mb-4">
                        Your medical history will be available here after your first appointment.
                      </p>
                      <Button 
                        className="bg-health-500 hover:bg-health-600"
                        onClick={() => window.location.href = '/appointments'}
                      >
                        Book an Appointment
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
