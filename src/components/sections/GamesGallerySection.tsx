
import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import GameCard from "@/components/GameCard";
import { Game } from "@/types";
import { useAutoScroll } from "@/hooks/useAutoScroll";

interface GamesGallerySectionProps {
  games: Game[];
}

const GamesGallerySection: React.FC<GamesGallerySectionProps> = ({ games }) => {
  const {
    scrollContainerRef,
    isPaused,
    setIsPaused,
    scrollLeft,
    scrollRight
  } = useAutoScroll();

  return (
    <section id="games" className="py-16">
      <div className="container px-4 mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">All Games</h2>
            <p className="text-muted-foreground">Continuously scrolling collection</p>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={() => {
                scrollLeft();
                setIsPaused(true);
                // Resume auto-scrolling after a delay
                setTimeout(() => setIsPaused(false), 1000);
              }} 
              variant="outline" 
              size="icon"
              className="hidden md:flex"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Button 
              onClick={() => {
                scrollRight();
                setIsPaused(true);
                // Resume auto-scrolling after a delay
                setTimeout(() => setIsPaused(false), 1000);
              }} 
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
  );
};

export default GamesGallerySection;
