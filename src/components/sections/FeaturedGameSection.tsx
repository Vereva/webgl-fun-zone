
import React from "react";
import { Link } from "react-router-dom";
import { Play, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Game } from "@/types";

interface FeaturedGameSectionProps {
  featuredGame: Game;
}

const FeaturedGameSection: React.FC<FeaturedGameSectionProps> = ({ featuredGame }) => {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-game-dark/20">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl font-bold mb-2">Featured Game</h2>
        <p className="text-muted-foreground mb-8">Our top pick for this week</p>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="rounded-lg overflow-hidden animate-glow">
            <img 
              src={featuredGame.image} 
              alt={featuredGame.title} 
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
          <div>
            <h3 className="text-2xl md:text-4xl font-bold mb-4">{featuredGame.title}</h3>
            <p className="text-muted-foreground mb-6">{featuredGame.description}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {featuredGame.platform.map((platform) => (
                <span key={platform} className="bg-game-dark px-3 py-1 rounded-full text-sm">
                  {platform}
                </span>
              ))}
            </div>
            <div className="flex gap-4">
              <Button asChild size="lg" className="bg-game-primary hover:bg-game-primary/90">
                <Link to={`/games/${featuredGame.id}`}>
                  <Play className="mr-2 h-5 w-5" />
                  Play Now
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to={`/leaderboard/${featuredGame.id}`}>
                  <Trophy className="mr-2 h-5 w-5" />
                  View Scores
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedGameSection;
