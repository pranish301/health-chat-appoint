
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", 
  "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM", 
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
];

interface AppointmentDatePickerProps {
  doctorId?: string;
  doctorName?: string;
  onConfirm?: (date: Date, time: string) => void;
}

export function AppointmentDatePicker({ doctorId, doctorName = "your doctor", onConfirm }: AppointmentDatePickerProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const { toast } = useToast();

  // Function to disable weekends and past dates
  const disabledDays = (date: Date) => {
    const day = date.getDay();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Disable weekends (0 is Sunday, 6 is Saturday) and past dates
    return day === 0 || day === 6 || date < today;
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleConfirm = () => {
    if (date && selectedTime) {
      toast({
        title: "Appointment Scheduled",
        description: `Your appointment with Dr. ${doctorName} is confirmed for ${date.toLocaleDateString()} at ${selectedTime}.`,
      });
      
      if (onConfirm) {
        onConfirm(date, selectedTime);
      }
    } else {
      toast({
        title: "Please select a time",
        description: "You need to select both a date and time for your appointment.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl text-health-700">Select Appointment Date</CardTitle>
        <CardDescription>Choose a date and time for your appointment with Dr. {doctorName}</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <div className="flex justify-center mb-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={disabledDays}
            className="rounded-md border"
          />
        </div>
        
        <div className="mt-6">
          <h3 className="text-sm font-medium mb-3">Available Time Slots</h3>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((time, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className={`text-xs ${selectedTime === time ? 'bg-health-100 border-health-500 text-health-700' : ''}`}
                onClick={() => handleTimeSelect(time)}
              >
                {time}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end mt-6">
        <Button 
          className="bg-health-500 hover:bg-health-600 text-white"
          disabled={!date || !selectedTime}
          onClick={handleConfirm}
        >
          Confirm Appointment
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AppointmentDatePicker;
