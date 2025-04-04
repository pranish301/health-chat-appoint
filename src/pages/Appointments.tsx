
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SpecialistCard from "@/components/SpecialistCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

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
  },
  {
    id: 4,
    name: "David Chen",
    specialty: "Neurologist",
    image: "/placeholder.svg",
    rating: 4.7,
    availability: "Next available: Friday",
    locations: ["North Sydney", "Chatswood"]
  },
  {
    id: 5,
    name: "Jessica Miller",
    specialty: "Orthopedist",
    image: "/placeholder.svg",
    rating: 4.5,
    availability: "Available today",
    locations: ["Liverpool", "Campbelltown"]
  },
  {
    id: 6,
    name: "Robert Taylor",
    specialty: "General Practitioner",
    image: "/placeholder.svg",
    rating: 4.8,
    availability: "Next available: Tomorrow",
    locations: ["Bondi", "Randwick"]
  }
];

const specialties = [
  "All Specialists",
  "Cardiologist",
  "Dermatologist",
  "Pediatrician",
  "Neurologist",
  "Orthopedist",
  "General Practitioner"
];

const Appointments = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialists");
  
  const filteredSpecialists = specialistsData.filter((specialist) => {
    const matchesSearch = specialist.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         specialist.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSpecialty = selectedSpecialty === "All Specialists" || 
                           specialist.specialty === selectedSpecialty;
                           
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <section className="bg-gradient-to-r from-health-500 to-health-600 text-white py-8">
          <div className="health-container">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Book an Appointment</h1>
            <p className="text-lg opacity-90">
              Find and schedule appointments with top healthcare specialists in your area
            </p>
          </div>
        </section>
        
        <section className="py-8 bg-muted">
          <div className="health-container">
            <div className="relative mb-6">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by name, specialty, or location..."
                className="w-full pl-12 pr-4 py-6 rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Tabs defaultValue="All Specialists" className="w-full">
              <TabsList className="w-full overflow-x-auto flex flex-nowrap justify-start mb-6 bg-muted border-b pb-0">
                {specialties.map((specialty) => (
                  <TabsTrigger
                    key={specialty}
                    value={specialty}
                    className="data-[state=active]:bg-health-100 data-[state=active]:text-health-700 rounded-t-lg rounded-b-none"
                    onClick={() => setSelectedSpecialty(specialty)}
                  >
                    {specialty}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <TabsContent value={selectedSpecialty} className="mt-0">
                {filteredSpecialists.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSpecialists.map((specialist) => (
                      <SpecialistCard key={specialist.id} {...specialist} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-medium mb-2">No specialists found</h3>
                    <p className="text-muted-foreground mb-4">Try adjusting your search criteria</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Appointments;
