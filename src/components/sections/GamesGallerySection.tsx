
import React, { useRef, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import GameCard from "@/components/GameCard";
import { Game } from "@/types";

interface GamesGallerySectionProps {
  games: Game[];
}

const GamesGallerySection: React.FC<GamesGallerySectionProps> = ({ games }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollDirection, setScrollDirection] = useState(1); // 1 for right, -1 for left
  const [isPaused, setIsPaused] = useState(false);

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

  // Auto-scrolling logic
  useEffect(() => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    let animationFrameId: number;
    const scrollSpeed = 0.5; // pixels per frame
    
    const autoScroll = () => {
      if (!container || isPaused) {
        animationFrameId = requestAnimationFrame(autoScroll);
        return;
      }
      
      // Check if we've reached the end and need to change direction
      if (scrollDirection > 0 && 
          container.scrollLeft >= container.scrollWidth - container.clientWidth - 5) {
        setScrollDirection(-1);
      } else if (scrollDirection < 0 && container.scrollLeft <= 5) {
        setScrollDirection(1);
      }
      
      container.scrollLeft += scrollSpeed * scrollDirection;
      animationFrameId = requestAnimationFrame(autoScroll);
    };
    
    animationFrameId = requestAnimationFrame(autoScroll);
    
    // Pause auto-scrolling when user interacts with the container
    const handleInteractionStart = () => setIsPaused(true);
    const handleInteractionEnd = () => setIsPaused(false);
    
    container.addEventListener('mouseenter', handleInteractionStart);
    container.addEventListener('touchstart', handleInteractionStart);
    container.addEventListener('mouseleave', handleInteractionEnd);
    container.addEventListener('touchend', handleInteractionEnd);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mouseenter', handleInteractionStart);
      container.removeEventListener('touchstart', handleInteractionStart);
      container.removeEventListener('mouseleave', handleInteractionEnd);
      container.removeEventListener('touchend', handleInteractionEnd);
    };
  }, [scrollDirection, isPaused]);

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
