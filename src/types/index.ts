
export interface Game {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
  category: string;
  releaseDate: string;
  platform: string[];
  playCount: number;
}

export interface Player {
  id: string;
  name: string;
  avatar: string;
  score: number;
  gamesPlayed: number;
  winRate: number;
  lastPlayed: string;
}

export interface Leaderboard {
  gameId: string;
  players: Player[];
}
