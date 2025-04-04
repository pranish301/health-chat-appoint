
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Appointment {
  id: string;
  doctorName: string;
  doctorImage?: string;
  specialty: string;
  date: string;
  time: string;
}

interface UpcomingAppointmentsProps {
  appointments: Appointment[];
}

export function UpcomingAppointments({ appointments }: UpcomingAppointmentsProps) {
  const navigate = useNavigate();

  if (appointments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Upcoming Appointments</CardTitle>
          <CardDescription>You have no upcoming appointments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center p-4">
            <Calendar className="h-12 w-12 text-muted-foreground mb-2" />
            <p className="text-center text-muted-foreground mb-4">
              No appointments scheduled. Book a consultation with one of our specialists.
            </p>
            <Button 
              onClick={() => navigate('/appointments')}
              className="bg-health-500 hover:bg-health-600"
            >
              Book an Appointment
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Upcoming Appointments</CardTitle>
        <CardDescription>Your scheduled appointments</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-lg transition-all hover:shadow-sm">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={appointment.doctorImage} />
                  <AvatarFallback>{appointment.doctorName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Dr. {appointment.doctorName}</p>
                  <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                  <div className="flex items-center mt-1">
                    <Calendar className="h-3 w-3 mr-1 text-health-500" />
                    <p className="text-xs">{appointment.date} • {appointment.time}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-health-500 text-health-500 hover:bg-health-50"
                  onClick={() => navigate(`/chat?doctor=${appointment.id}`)}
                >
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Chat
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate(`/appointments/${appointment.id}`)}
                >
                  Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default UpcomingAppointments;
