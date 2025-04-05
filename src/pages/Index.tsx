
import React, { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import FeaturedGameSection from "@/components/sections/FeaturedGameSection";
import GamesGallerySection from "@/components/sections/GamesGallerySection";
import CTASection from "@/components/sections/CTASection";
import { games } from "@/data/games";

const Index: React.FC = () => {
  const gamesRef = useRef<HTMLDivElement>(null);

  const scrollToGames = () => {
    document.getElementById('games')?.scrollIntoView({ behavior: 'smooth' });
  };

  const featuredGame = games[0]; // Using the first game as featured

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection scrollToGames={scrollToGames} />
        <FeaturedGameSection featuredGame={featuredGame} />
        <GamesGallerySection games={games} />
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
