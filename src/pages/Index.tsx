
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ChevronDown, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import GameCard from "@/components/GameCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { games } from "@/data/games";

const Index: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const scrollToGames = () => {
    document.getElementById('games')?.scrollIntoView({ behavior: 'smooth' });
  };

  const featuredGame = games[0]; // Using the first game as featured

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
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
        
        {/* Featured Game */}
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
        
        {/* Games Gallery */}
        <section id="games" className="py-16">
          <div className="container px-4 mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">All Games</h2>
                <p className="text-muted-foreground">Scroll to browse our collection</p>
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={scrollLeft} 
                  variant="outline" 
                  size="icon"
                  className="hidden md:flex"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <Button 
                  onClick={scrollRight} 
                  variant="outline" 
                  size="icon"
                  className="hidden md:flex"
                >
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto gap-6 pb-6 scrollbar-hide snap-x"
            >
              {games.map((game) => (
                <div 
                  key={game.id} 
                  className="min-w-[300px] md:min-w-[350px] snap-start"
                >
                  <GameCard game={game} featured={game.id === "1"} />
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-b from-game-dark/20 to-background">
          <div className="container px-4 mx-auto text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Ready to Join the Fun?</h2>
              <p className="text-muted-foreground mb-8">
                Discover new games, compete with other players, and join our growing community of WebGL enthusiasts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-game-primary hover:bg-game-primary/90">
                  <Link to="/games/1">Start Playing</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
