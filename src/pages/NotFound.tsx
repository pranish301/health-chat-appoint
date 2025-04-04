
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-health-50 px-4">
      <div className="text-center max-w-md">
        <div className="bg-health-500 text-white rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
          <span className="text-5xl font-bold">404</span>
        </div>
        <h1 className="text-3xl font-bold mb-4 text-health-700">Page Not Found</h1>
        <p className="text-xl text-muted-foreground mb-8">
          We couldn't find the page you were looking for. It may have been moved or deleted.
        </p>
        <div className="space-y-3">
          <Button 
            className="w-full bg-health-500 hover:bg-health-600"
            onClick={() => navigate('/')}
          >
            Return to Home
          </Button>
          <Button 
            variant="outline" 
            className="w-full border-health-500 text-health-500 hover:bg-health-50"
            onClick={() => navigate('/appointments')}
          >
            Book an Appointment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
