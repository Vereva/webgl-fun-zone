
import { useRef, useEffect, useState, RefObject } from "react";

type UseAutoScrollOptions = {
  speed?: number;
  pauseOnHover?: boolean;
  initialDirection?: 1 | -1;
};

type UseAutoScrollReturn = {
  scrollContainerRef: RefObject<HTMLDivElement>;
  isPaused: boolean;
  setIsPaused: (paused: boolean) => void;
  scrollDirection: 1 | -1;
  scrollLeft: () => void;
  scrollRight: () => void;
};

export function useAutoScroll({
  speed = 0.5,
  pauseOnHover = true,
  initialDirection = 1,
}: UseAutoScrollOptions = {}): UseAutoScrollReturn {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollDirection, setScrollDirection] = useState<1 | -1>(initialDirection);
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
      
      container.scrollLeft += speed * scrollDirection;
      animationFrameId = requestAnimationFrame(autoScroll);
    };
    
    animationFrameId = requestAnimationFrame(autoScroll);
    
    // Pause auto-scrolling when user interacts with the container
    const handleInteractionStart = () => pauseOnHover && setIsPaused(true);
    const handleInteractionEnd = () => pauseOnHover && setIsPaused(false);
    
    if (pauseOnHover) {
      container.addEventListener('mouseenter', handleInteractionStart);
      container.addEventListener('touchstart', handleInteractionStart);
      container.addEventListener('mouseleave', handleInteractionEnd);
      container.addEventListener('touchend', handleInteractionEnd);
    }
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (pauseOnHover) {
        container.removeEventListener('mouseenter', handleInteractionStart);
        container.removeEventListener('touchstart', handleInteractionStart);
        container.removeEventListener('mouseleave', handleInteractionEnd);
        container.removeEventListener('touchend', handleInteractionEnd);
      }
    };
  }, [scrollDirection, isPaused, speed, pauseOnHover]);

  return {
    scrollContainerRef,
    isPaused,
    setIsPaused,
    scrollDirection,
    scrollLeft,
    scrollRight
  };
}
