
import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, MessageCircle, User, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

export function Navbar() {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const NavigationItems = () => (
    <div className="flex items-center gap-1 md:gap-2">
      <Link to="/">
        <Button variant="ghost" className="flex gap-1 items-center">
          <span className="hidden md:inline">Home</span>
        </Button>
      </Link>
      <Link to="/appointments">
        <Button variant="ghost" className="flex gap-1 items-center">
          <Calendar className="h-4 w-4" />
          <span className="hidden md:inline">Appointments</span>
        </Button>
      </Link>
      <Link to="/chat">
        <Button variant="ghost" className="flex gap-1 items-center">
          <MessageCircle className="h-4 w-4" />
          <span className="hidden md:inline">Chat</span>
        </Button>
      </Link>
      <Link to="/profile">
        <Button variant="ghost" className="flex gap-1 items-center">
          <User className="h-4 w-4" />
          <span className="hidden md:inline">Profile</span>
        </Button>
      </Link>
      <Button variant="ghost" className="flex gap-1 items-center relative">
        <Bell className="h-4 w-4" />
        <span className="absolute -top-1 -right-1 bg-health-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">2</span>
      </Button>
    </div>
  );

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="health-container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-health-500 text-white p-1 rounded-md">
              <span className="font-bold text-lg">HC</span>
            </div>
            <span className="font-bold text-xl hidden md:block text-health-700">HealthConnect</span>
          </Link>
        </div>

        {isMobile ? (
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu">
                  <line x1="4" x2="20" y1="12" y2="12"></line>
                  <line x1="4" x2="20" y1="6" y2="6"></line>
                  <line x1="4" x2="20" y1="18" y2="18"></line>
                </svg>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link to="/" className="px-4 py-2 hover:bg-muted rounded-md" onClick={() => setIsMenuOpen(false)}>Home</Link>
                <Link to="/appointments" className="px-4 py-2 hover:bg-muted rounded-md flex gap-2 items-center" onClick={() => setIsMenuOpen(false)}>
                  <Calendar className="h-4 w-4" /> Appointments
                </Link>
                <Link to="/chat" className="px-4 py-2 hover:bg-muted rounded-md flex gap-2 items-center" onClick={() => setIsMenuOpen(false)}>
                  <MessageCircle className="h-4 w-4" /> Chat
                </Link>
                <Link to="/profile" className="px-4 py-2 hover:bg-muted rounded-md flex gap-2 items-center" onClick={() => setIsMenuOpen(false)}>
                  <User className="h-4 w-4" /> Profile
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        ) : (
          <NavigationItems />
        )}
      </div>
    </header>
  );
}

export default Navbar;
