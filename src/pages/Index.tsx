
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, MessageCircle, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SpecialistCard from "@/components/SpecialistCard";
import UpcomingAppointments from "@/components/UpcomingAppointments";

// Mock data for specialists
const specialistsData = [
  {
    id: 1,
    name: "Sarah Johnson",
    specialty: "Cardiologist",
    image: "/placeholder.svg",
    rating: 4.8,
    availability: "Available today",
    locations: ["Sydney CBD", "North Shore"]
  },
  {
    id: 2,
    name: "Michael Lee",
    specialty: "Dermatologist",
    image: "/placeholder.svg",
    rating: 4.6,
    availability: "Next available: Tomorrow",
    locations: ["Parramatta", "Inner West"]
  },
  {
    id: 3,
    name: "Emily Wilson",
    specialty: "Pediatrician",
    image: "/placeholder.svg",
    rating: 4.9,
    availability: "Available today",
    locations: ["Eastern Suburbs", "Sutherland"]
  }
];

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

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-health-500 to-health-600 text-white py-12 md:py-20">
          <div className="health-container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6 animate-fade-in">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Your Health, Your Schedule</h1>
                <p className="text-lg md:text-xl opacity-90 italic">
                  "Health is not valued till sickness comes."
                </p>
                <p className="text-lg md:text-xl opacity-90">
                  Book appointments with top healthcare specialists and chat with them directly through our secure platform.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button 
                    size="lg" 
                    className="bg-white text-health-700 hover:bg-health-50"
                    onClick={() => navigate('/appointments')}
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    Book Appointment
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white text-white hover:bg-health-600/50"
                    onClick={() => navigate('/chat')}
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Chat with Doctor
                  </Button>
                </div>
              </div>
              <div className="hidden md:block">
                <img 
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Doctor and patient consultation" 
                  className="w-full max-w-md mx-auto rounded-lg shadow-xl object-cover h-80"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Search & Filter Section */}
        <section className="py-8 bg-muted">
          <div className="health-container">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for specialists, conditions, or treatments..."
                className="w-full pl-12 pr-4 py-3 rounded-full border border-border focus:border-health-500 focus:outline-none focus:ring-1 focus:ring-health-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              <Button variant="outline" size="sm" className="rounded-full">All Specialists</Button>
              <Button variant="outline" size="sm" className="rounded-full">Cardiologists</Button>
              <Button variant="outline" size="sm" className="rounded-full">Dermatologists</Button>
              <Button variant="outline" size="sm" className="rounded-full">Pediatricians</Button>
              <Button variant="outline" size="sm" className="rounded-full">Neurologists</Button>
              <Button variant="outline" size="sm" className="rounded-full">General Practitioners</Button>
            </div>
          </div>
        </section>
        
        {/* Appointments Section */}
        <section className="py-12 health-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Top Specialists</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {specialistsData.map((specialist) => (
                  <SpecialistCard key={specialist.id} {...specialist} />
                ))}
              </div>
              <div className="mt-8 text-center">
                <Button 
                  variant="outline" 
                  className="border-health-500 text-health-500 hover:bg-health-50"
                  onClick={() => navigate('/appointments')}
                >
                  View All Specialists
                </Button>
              </div>
            </div>
            
            <div>
              <UpcomingAppointments appointments={upcomingAppointmentsData} />
              
              <div className="mt-8">
                <div className="bg-health-50 rounded-lg p-6 border border-health-100">
                  <h3 className="font-bold text-lg mb-3 text-health-700">Need immediate help?</h3>
                  <p className="text-muted-foreground mb-4">
                    Connect with a healthcare professional right now through our chat service.
                  </p>
                  <Button 
                    className="w-full bg-health-500 hover:bg-health-600"
                    onClick={() => navigate('/chat')}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Start a Chat
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-12 bg-health-50">
          <div className="health-container">
            <h2 className="text-2xl font-bold mb-8 text-center">Why Choose HealthConnect?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-health-100">
                <div className="rounded-full bg-health-100 p-3 inline-block mb-4">
                  <Calendar className="h-6 w-6 text-health-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Easy Scheduling</h3>
                <p className="text-muted-foreground">
                  Book appointments with specialists at your convenience, 24/7.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-health-100">
                <div className="rounded-full bg-health-100 p-3 inline-block mb-4">
                  <MessageCircle className="h-6 w-6 text-health-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Direct Communication</h3>
                <p className="text-muted-foreground">
                  Chat directly with your healthcare provider for quick questions and follow-ups.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-health-100">
                <div className="rounded-full bg-health-100 p-3 inline-block mb-4">
                  <Search className="h-6 w-6 text-health-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Find Specialists</h3>
                <p className="text-muted-foreground">
                  Easily search and filter through our network of verified healthcare specialists.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-12 bg-gradient-to-r from-health-600 to-health-700 text-white">
          <div className="health-container text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to take control of your healthcare?</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
              Join thousands of patients who have made healthcare more accessible and convenient with HealthConnect.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-health-700 hover:bg-health-50"
              onClick={() => navigate('/appointments')}
            >
              Book Your First Appointment
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
