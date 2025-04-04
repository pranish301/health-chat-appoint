
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t bg-background mt-auto">
      <div className="health-container py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-health-500 text-white p-1 rounded-md">
                <span className="font-bold text-lg">HC</span>
              </div>
              <span className="font-bold text-xl text-health-700">HealthConnect</span>
            </div>
            <p className="text-muted-foreground text-sm mt-2">
              Your trusted partner for convenient healthcare appointments and communication.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-sm mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link></li>
              <li><Link to="/appointments" className="text-muted-foreground hover:text-foreground transition-colors">Book Appointment</Link></li>
              <li><Link to="/chat" className="text-muted-foreground hover:text-foreground transition-colors">Chat with Doctor</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-sm mb-3">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact Us</Link></li>
              <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-sm mb-3">Connect</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Twitter</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Facebook</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Instagram</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>© 2025 HealthConnect. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link to="/cookies" className="hover:text-foreground transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
