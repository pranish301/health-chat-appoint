
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatInterface from "@/components/ChatInterface";
import { useToast } from "@/components/ui/use-toast";

// Mock data for doctors
const doctorsData = {
  1: {
    id: 1,
    name: "Sarah Johnson",
    specialty: "Cardiologist",
    image: "/placeholder.svg"
  },
  2: {
    id: 2,
    name: "Michael Lee",
    specialty: "Dermatologist",
    image: "/placeholder.svg"
  },
  3: {
    id: 3,
    name: "Emily Wilson",
    specialty: "Pediatrician",
    image: "/placeholder.svg"
  }
};

const Chat = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  
  // Get doctor ID from URL if available
  const doctorIdParam = searchParams.get('doctor');
  
  useEffect(() => {
    if (doctorIdParam) {
      const doctorId = parseInt(doctorIdParam);
      const doctor = doctorsData[doctorId as keyof typeof doctorsData];
      
      if (doctor) {
        setSelectedDoctor(doctor);
        toast({
          title: "Chat session started",
          description: `You are now chatting with Dr. ${doctor.name}`,
        });
      }
    } else {
      // Default to the first doctor if none specified
      setSelectedDoctor(doctorsData[1]);
    }
  }, [doctorIdParam, toast]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <section className="bg-gradient-to-r from-health-500 to-health-600 text-white py-8">
          <div className="health-container">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Healthcare Chat</h1>
            <p className="text-lg opacity-90">
              Connect directly with your healthcare provider
            </p>
          </div>
        </section>
        
        <section className="py-12">
          <div className="health-container">
            {selectedDoctor ? (
              <ChatInterface 
                doctorId={selectedDoctor.id.toString()}
                doctorName={`Dr. ${selectedDoctor.name}`}
                doctorImage={selectedDoctor.image}
              />
            ) : (
              <div className="text-center py-12">
                <h2 className="text-xl font-medium mb-2">Loading chat...</h2>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Chat;
