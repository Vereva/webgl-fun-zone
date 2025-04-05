
import React from "react";
import { Link } from "react-router-dom";
import { Game } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Trophy } from "lucide-react";

interface GameCardProps {
  game: Game;
  featured?: boolean;
}

const GameCard: React.FC<GameCardProps> = ({ game, featured = false }) => {
  return (
    <Card className={`overflow-hidden game-card-shadow game-card-hover ${featured ? 'border-game-primary' : ''}`}>
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={game.image} 
          alt={game.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-game-dark/80 backdrop-blur-sm">
            {game.category}
          </Badge>
        </div>
        {featured && (
          <div className="absolute top-2 left-2">
            <Badge variant="secondary" className="bg-game-primary/80 backdrop-blur-sm">
              Featured
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <h3 className="text-xl font-bold mb-2">{game.title}</h3>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{game.description}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Release: {game.releaseDate}</span>
          <span>{game.playCount.toLocaleString()} plays</span>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between gap-2">
        <Button asChild variant="outline" size="sm" className="w-1/2">
          <Link to={`/leaderboard/${game.id}`} className="flex items-center justify-center gap-1">
            <Trophy className="h-4 w-4" />
            <span>Scores</span>
          </Link>
        </Button>
        <Button asChild size="sm" className="w-1/2 bg-game-primary hover:bg-game-primary/90">
          <Link to={`/games/${game.id}`} className="flex items-center justify-center gap-1">
            <Play className="h-4 w-4" />
            <span>Play</span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GameCard;
