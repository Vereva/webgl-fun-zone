
import React from "react";
import { Gamepad2, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  scrollToGames: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ scrollToGames }) => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-game-dark/20 backdrop-blur-sm -z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-game-primary/10 to-background -z-20"></div>
      
      <div className="container px-4 mx-auto text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-float">
            <span className="text-gradient">WebGL Fun Zone</span>
          </h1>
          <p className="text-xl mb-8 text-muted-foreground">
            Discover amazing WebGL games that push the boundaries of what's possible in the browser. Play, compete, and enjoy the future of web-based gaming.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={scrollToGames} size="lg" className="bg-game-primary hover:bg-game-primary/90">
              <Gamepad2 className="mr-2 h-5 w-5" />
              Browse Games
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/leaderboard">View Leaderboards</Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Button variant="ghost" size="icon" onClick={scrollToGames}>
          <ChevronDown className="h-6 w-6" />
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
