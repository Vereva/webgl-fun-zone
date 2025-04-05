
import React from "react";
import { Link } from "react-router-dom";
import { Gamepad2, Mail, Github } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-background border-t py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2">
              <Gamepad2 className="h-6 w-6 text-game-primary" />
              <span className="text-xl font-bold">WebGL Fun Zone</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Discover amazing WebGL games created by talented developers. Play, compete, and enjoy the future of web-based gaming.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-game-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/#games" className="text-sm hover:text-game-primary transition-colors">
                  Games
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="text-sm hover:text-game-primary transition-colors">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-game-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-foreground hover:text-game-primary transition-colors">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
              <a href="#" className="text-foreground hover:text-game-primary transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-muted text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} WebGL Fun Zone. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
