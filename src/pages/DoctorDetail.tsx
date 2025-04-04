
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppointmentDatePicker from "@/components/AppointmentDatePicker";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

// Mock data for doctor details
const doctorsData = {
  1: {
    id: 1,
    name: "Sarah Johnson",
    specialty: "Cardiologist",
    image: "/placeholder.svg",
    rating: 4.8,
    about: "Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience. She specializes in preventive cardiology and heart disease management.",
    education: ["Harvard Medical School, MD", "Johns Hopkins University, Residency", "Mayo Clinic, Fellowship"],
    languages: ["English", "Spanish"],
    locations: ["Sydney CBD Medical Center", "North Shore Heart Clinic"],
  },
  2: {
    id: 2,
    name: "Michael Lee",
    specialty: "Dermatologist",
    image: "/placeholder.svg",
    rating: 4.6,
    about: "Dr. Michael Lee is a dermatologist specializing in cosmetic dermatology and skin cancer. With 10 years of practice, he is dedicated to providing personalized skin care treatments.",
    education: ["University of Sydney, MD", "Royal Prince Alfred Hospital, Residency", "Skin Institute of Australia, Fellowship"],
    languages: ["English", "Mandarin"],
    locations: ["Parramatta Dermatology Center", "Inner West Skin Clinic"],
  },
  3: {
    id: 3,
    name: "Emily Wilson",
    specialty: "Pediatrician",
    image: "/placeholder.svg",
    rating: 4.9,
    about: "Dr. Emily Wilson is a compassionate pediatrician with a focus on newborn care and childhood development. She works closely with families to ensure children's optimal health.",
    education: ["University of Melbourne, MD", "Children's Hospital, Residency", "Pediatric Society of Australia, Fellowship"],
    languages: ["English"],
    locations: ["Eastern Suburbs Children's Health", "Sutherland Pediatric Care"],
  }
};

const DoctorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showAppointment, setShowAppointment] = useState(false);
  
  // Get doctor data based on ID from URL
  const doctor = doctorsData[Number(id) as keyof typeof doctorsData];
  
  if (!doctor) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow health-container py-12">
          <h1 className="text-2xl font-bold mb-4">Doctor Not Found</h1>
          <p className="mb-6">Sorry, we couldn't find the doctor you're looking for.</p>
          <Button 
            onClick={() => navigate('/appointments')}
            className="bg-health-500 hover:bg-health-600"
          >
            Back to Appointments
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const handleChatNow = () => {
    toast({
      title: "Chat initiated",
      description: `Starting a chat with Dr. ${doctor.name}`,
    });
    navigate(`/chat?doctor=${doctor.id}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <section className="bg-gradient-to-r from-health-500 to-health-600 text-white py-8">
          <div className="health-container">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar className="w-24 h-24 border-4 border-white">
                <AvatarImage src={doctor.image} alt={doctor.name} />
                <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              
              <div className="flex-grow text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Dr. {doctor.name}</h1>
                <p className="text-xl opacity-90 mb-3">{doctor.specialty}</p>
                
                <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                  <Badge className="bg-white/20 hover:bg-white/30">
                    <span className="text-yellow-300 mr-1">★</span> {doctor.rating.toFixed(1)}
                  </Badge>
                  {doctor.languages.map((language, index) => (
                    <Badge key={index} className="bg-white/20 hover:bg-white/30">
                      {language}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <Button 
                    className="bg-white text-health-700 hover:bg-health-50"
                    onClick={() => setShowAppointment(true)}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Book Appointment
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-white text-white hover:bg-health-600/50"
                    onClick={handleChatNow}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Chat Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-8">
          <div className="health-container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-4">About</h2>
                  <p className="text-muted-foreground">{doctor.about}</p>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-4">Education</h2>
                  <ul className="space-y-2">
                    {doctor.education.map((edu, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-health-500 mr-2">•</span>
                        <span>{edu}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-4">Practice Locations</h2>
                  <div className="space-y-4">
                    {doctor.locations.map((location, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <h3 className="font-medium">{location}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Mon-Fri: 9:00 AM - 5:00 PM
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                {showAppointment ? (
                  <AppointmentDatePicker 
                    doctorId={doctor.id.toString()} 
                    doctorName={doctor.name}
                  />
                ) : (
                  <div className="bg-health-50 rounded-lg p-6 border border-health-100 sticky top-24">
                    <h3 className="font-bold text-lg mb-3 text-health-700">Ready to book?</h3>
                    <p className="text-muted-foreground mb-4">
                      Schedule an appointment with Dr. {doctor.name} at your convenience.
                    </p>
                    <Button 
                      className="w-full bg-health-500 hover:bg-health-600 mb-3"
                      onClick={() => setShowAppointment(true)}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      View Available Times
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full border-health-500 text-health-500 hover:bg-health-50"
                      onClick={handleChatNow}
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Chat with Dr. {doctor.name.split(' ')[0]}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default DoctorDetail;
