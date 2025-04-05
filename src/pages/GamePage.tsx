
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Trophy, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getGameById } from "@/data/games";
import { Game } from "@/types";

const GamePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const foundGame = getGameById(id);
      if (foundGame) {
        setGame(foundGame);
      }
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading game...</div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">Game Not Found</h1>
          <p className="text-muted-foreground mb-6">The game you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Button asChild variant="ghost" className="mb-4">
              <Link to="/" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Games
              </Link>
            </Button>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="rounded-lg overflow-hidden mb-6">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-2xl font-bold mb-4">{game.title}</p>
                      <p className="text-muted-foreground mb-4">WebGL Game Experience</p>
                      <Button size="lg" className="bg-game-primary hover:bg-game-primary/90">
                        Start Game
                      </Button>
                    </div>
                  </div>
                </div>
                
                <h1 className="text-3xl font-bold mb-2">{game.title}</h1>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="secondary" className="bg-game-primary/20 text-game-primary">
                    {game.category}
                  </Badge>
                  {game.platform.map((platform) => (
                    <Badge key={platform} variant="outline">
                      {platform}
                    </Badge>
                  ))}
                </div>
                
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-lg">{game.description}</p>
                  
                  <h2 className="text-xl font-bold mt-8 mb-4">How to Play</h2>
                  <p>
                    Use your mouse and keyboard to navigate through the game world. 
                    Click to interact with objects and press WASD to move your character.
                    Collect points by completing challenges and defeating enemies.
                  </p>
                  
                  <h2 className="text-xl font-bold mt-8 mb-4">Controls</h2>
                  <ul className="list-disc pl-5">
                    <li>WASD: Movement</li>
                    <li>Mouse: Look around</li>
                    <li>Left Click: Interact/Attack</li>
                    <li>Space: Jump</li>
                    <li>E: Use item</li>
                    <li>Esc: Pause game</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-card rounded-lg p-6">
                  <h2 className="text-xl font-bold mb-4">Game Info</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-3 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Release Date</div>
                        <div>{game.releaseDate}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Users className="h-5 w-5 mr-3 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Players</div>
                        <div>{game.playCount.toLocaleString()}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Trophy className="h-5 w-5 mr-3 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Leaderboard</div>
                        <Button asChild variant="link" className="p-0 h-auto font-normal text-game-primary">
                          <Link to={`/leaderboard/${game.id}`}>View Top Players</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-card rounded-lg p-6">
                  <h2 className="text-xl font-bold mb-4">Share This Game</h2>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Copy Link
                    </Button>
                  </div>
                </div>
                
                <div className="bg-card rounded-lg p-6">
                  <h2 className="text-xl font-bold mb-4">Related Games</h2>
                  <div className="space-y-4">
                    {/* Show a couple of related games */}
                    {Array(2).fill(0).map((_, i) => {
                      const relatedGameId = ((parseInt(game.id) + i + 1) % 6) || 6;
                      const relatedGame = getGameById(relatedGameId.toString());
                      
                      if (!relatedGame) return null;
                      
                      return (
                        <Link 
                          key={relatedGame.id} 
                          to={`/games/${relatedGame.id}`}
                          className="flex items-center space-x-3 group"
                        >
                          <div className="h-16 w-16 rounded overflow-hidden flex-shrink-0">
                            <img 
                              src={relatedGame.image} 
                              alt={relatedGame.title} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium group-hover:text-game-primary transition-colors">
                              {relatedGame.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">{relatedGame.category}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default GamePage;
