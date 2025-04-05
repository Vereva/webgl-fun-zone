
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Trophy, Medal, Users, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getGameById, getLeaderboardByGameId, games } from "@/data/games";
import { Game, Leaderboard, Player } from "@/types";

const LeaderboardPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const [leaderboard, setLeaderboard] = useState<Leaderboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (id) {
      const foundGame = getGameById(id);
      const foundLeaderboard = getLeaderboardByGameId(id);
      
      if (foundGame) {
        setGame(foundGame);
      }
      
      if (foundLeaderboard) {
        setLeaderboard(foundLeaderboard);
      }
      
      setLoading(false);
    } else {
      // If no specific game ID, just show global leaderboard
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading leaderboard...</div>
      </div>
    );
  }

  const renderPlayerRank = (index: number) => {
    if (index === 0) {
      return <Trophy className="h-5 w-5 text-yellow-500" />;
    } else if (index === 1) {
      return <Medal className="h-5 w-5 text-gray-400" />;
    } else if (index === 2) {
      return <Medal className="h-5 w-5 text-amber-700" />;
    } else {
      return <span className="text-muted-foreground">{index + 1}</span>;
    }
  };

  // Filtered players from specific game or all games
  const displayPlayers = id && leaderboard 
    ? leaderboard.players.filter(player => 
        player.name.toLowerCase().includes(search.toLowerCase())
      )
    : games.flatMap(g => {
        const lb = getLeaderboardByGameId(g.id);
        return lb ? lb.players.slice(0, 1).map(p => ({...p, gameId: g.id})) : [];
      }).filter(player => 
        player.name.toLowerCase().includes(search.toLowerCase())
      );

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
            
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">
                {game ? `${game.title} Leaderboard` : "Global Leaderboard"}
              </h1>
              <p className="text-muted-foreground">
                {game 
                  ? `Check out the top players for ${game.title}` 
                  : "Top players across all games"}
              </p>
            </div>
            
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <span>{displayPlayers.length} Players</span>
              </div>
              
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search players..."
                  className="pl-8 w-full md:w-[250px]"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            
            <div className="bg-card rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Rank</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Player</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Score</th>
                      {!id && (
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Game</th>
                      )}
                      <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Win Rate</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Last Played</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayPlayers.map((player, index) => (
                      <tr key={player.id} className="border-b last:border-b-0 hover:bg-muted/50">
                        <td className="px-4 py-3 text-sm">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                            {renderPlayerRank(index)}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                              <img src={player.avatar} alt={player.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <div className="font-medium">{player.name}</div>
                              <div className="text-xs text-muted-foreground">{player.gamesPlayed} games</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right font-mono font-medium">
                          {player.score.toLocaleString()}
                        </td>
                        {!id && (
                          <td className="px-4 py-3">
                            <Link to={`/games/${(player as any).gameId}`} className="text-game-primary hover:underline">
                              {getGameById((player as any).gameId)?.title}
                            </Link>
                          </td>
                        )}
                        <td className="px-4 py-3 text-right">
                          {(player.winRate * 100).toFixed(1)}%
                        </td>
                        <td className="px-4 py-3 text-right text-sm text-muted-foreground">
                          {player.lastPlayed}
                        </td>
                      </tr>
                    ))}
                    
                    {displayPlayers.length === 0 && (
                      <tr>
                        <td colSpan={id ? 5 : 6} className="px-4 py-8 text-center text-muted-foreground">
                          No players found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Game Leaderboards Navigation */}
            {!id && (
              <div className="mt-12">
                <h2 className="text-xl font-bold mb-4">Game Leaderboards</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {games.map(game => (
                    <Link 
                      key={game.id}
                      to={`/leaderboard/${game.id}`}
                      className="bg-card rounded-lg p-4 hover:bg-card/80 transition-colors group"
                    >
                      <div className="flex items-center">
                        <div className="h-16 w-16 rounded overflow-hidden flex-shrink-0 mr-4">
                          <img 
                            src={game.image} 
                            alt={game.title} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium group-hover:text-game-primary transition-colors">
                            {game.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">View Leaderboard</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LeaderboardPage;
