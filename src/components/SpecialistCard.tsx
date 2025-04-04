
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface SpecialistProps {
  id: number;
  name: string;
  specialty: string;
  image: string;
  rating: number;
  availability: string;
  locations: string[];
}

export function SpecialistCard({ id, name, specialty, image, rating, availability, locations }: SpecialistProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);

  const handleBookAppointment = () => {
    navigate(`/doctor/${id}`);
  };

  const handleChatNow = () => {
    toast({
      title: "Chat initiated",
      description: `Starting a chat with Dr. ${name}`,
    });
    navigate(`/chat?doctor=${id}`);
  };

  return (
    <Card 
      className={`transition-all duration-300 ${isHovered ? 'shadow-lg border-health-200' : 'shadow-sm'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={image} alt={name} />
              <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">Dr. {name}</CardTitle>
              <CardDescription className="text-health-600 font-medium">{specialty}</CardDescription>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-yellow-500">★</span>
            <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex flex-wrap gap-1 mb-3">
          {locations.map((location, index) => (
            <Badge key={index} variant="outline" className="bg-muted text-muted-foreground">
              {location}
            </Badge>
          ))}
        </div>
        <div className="text-sm text-muted-foreground flex items-center">
          <Calendar className="h-4 w-4 mr-1 text-health-500" />
          <span>{availability}</span>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 pt-2">
        <Button 
          className="flex-1 bg-health-500 hover:bg-health-600 text-white" 
          onClick={handleBookAppointment}
        >
          Book Appointment
        </Button>
        <Button 
          variant="outline" 
          className="border-health-500 text-health-500 hover:bg-health-50"
          onClick={handleChatNow}
        >
          Chat Now
        </Button>
      </CardFooter>
    </Card>
  );
}

export default SpecialistCard;
