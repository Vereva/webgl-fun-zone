
import React from "react";
import { Link } from "react-router-dom";
import { Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const Navbar: React.FC = () => {
  const isMobile = useIsMobile();

  const navItems = [
    { text: "Home", href: "/" },
    { text: "Games", href: "/#games" },
    { text: "Leaderboard", href: "/leaderboard" },
    { text: "Contact", href: "/contact" }
  ];

  const NavLinks = () => (
    <>
      {navItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className="text-sm font-medium transition-colors hover:text-game-primary"
        >
          {item.text}
        </Link>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Gamepad2 className="h-6 w-6 text-game-primary" />
          <span className="text-xl font-bold">WebGL Fun Zone</span>
        </Link>

        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col space-y-4 mt-8">
                <NavLinks />
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <nav className="flex items-center space-x-6">
            <NavLinks />
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
