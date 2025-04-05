
import { Game, Leaderboard, Player } from "@/types";

export const games: Game[] = [
  {
    id: "1",
    title: "Cosmic Bounce",
    description: "A fast-paced puzzle game where you navigate through cosmic obstacles in a vibrant universe of colors and shapes.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=400&h=300&auto=format&fit=crop",
    url: "/games/cosmic-bounce",
    category: "Puzzle",
    releaseDate: "2024-02-15",
    platform: ["Web", "Mobile"],
    playCount: 24563
  },
  {
    id: "2",
    title: "Neon Racer",
    description: "Race through neon-lit streets in this high-octane racing game featuring stunning WebGL graphics and realistic physics.",
    image: "https://images.unsplash.com/photo-1578377375283-3e8827ef7fae?q=80&w=400&h=300&auto=format&fit=crop",
    url: "/games/neon-racer",
    category: "Racing",
    releaseDate: "2024-01-10",
    platform: ["Web"],
    playCount: 18921
  },
  {
    id: "3",
    title: "Quantum Break",
    description: "Manipulate time and space in this revolutionary puzzle platformer. Solve mind-bending challenges and uncover the secrets of quantum mechanics.",
    image: "https://images.unsplash.com/photo-1614729373307-0ee39bd33e81?q=80&w=400&h=300&auto=format&fit=crop",
    url: "/games/quantum-break",
    category: "Platformer",
    releaseDate: "2023-11-30",
    platform: ["Web", "Desktop"],
    playCount: 32104
  },
  {
    id: "4",
    title: "Pixel Warriors",
    description: "Join forces with friends in this multiplayer battle arena. Choose your warrior, customize your abilities, and dominate the competition.",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=400&h=300&auto=format&fit=crop",
    url: "/games/pixel-warriors",
    category: "Battle",
    releaseDate: "2024-03-05",
    platform: ["Web", "Mobile"],
    playCount: 41283
  },
  {
    id: "5",
    title: "Cyber Defender",
    description: "Protect your digital fortress from waves of cyber attacks in this strategic tower defense game with futuristic visuals.",
    image: "https://images.unsplash.com/photo-1601944179066-29786cb9d32a?q=80&w=400&h=300&auto=format&fit=crop",
    url: "/games/cyber-defender",
    category: "Strategy",
    releaseDate: "2023-12-18",
    platform: ["Web"],
    playCount: 15762
  },
  {
    id: "6",
    title: "Desert Survival",
    description: "Test your survival skills in a procedurally generated desert landscape. Find resources, craft tools, and outlast the harsh environment.",
    image: "https://images.unsplash.com/photo-1547149600-a6eee6c79380?q=80&w=400&h=300&auto=format&fit=crop",
    url: "/games/desert-survival",
    category: "Survival",
    releaseDate: "2024-02-28",
    platform: ["Web", "Desktop"],
    playCount: 28976
  }
];

export const players: Player[] = [
  {
    id: "p1",
    name: "QuantumQueen",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    score: 95432,
    gamesPlayed: 248,
    winRate: 0.72,
    lastPlayed: "2024-04-03"
  },
  {
    id: "p2",
    name: "PixelNinja",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    score: 87621,
    gamesPlayed: 315,
    winRate: 0.68,
    lastPlayed: "2024-04-04"
  },
  {
    id: "p3",
    name: "CyberWolf",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    score: 76543,
    gamesPlayed: 189,
    winRate: 0.65,
    lastPlayed: "2024-04-02"
  },
  {
    id: "p4",
    name: "NebulaGamer",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    score: 68921,
    gamesPlayed: 201,
    winRate: 0.61,
    lastPlayed: "2024-04-03"
  },
  {
    id: "p5",
    name: "VoxelViper",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    score: 54328,
    gamesPlayed: 176,
    winRate: 0.58,
    lastPlayed: "2024-04-01"
  }
];

export const leaderboards: Record<string, Leaderboard> = {
  "1": {
    gameId: "1",
    players: [players[0], players[2], players[3], players[1], players[4]]
  },
  "2": {
    gameId: "2",
    players: [players[1], players[0], players[4], players[2], players[3]]
  },
  "3": {
    gameId: "3",
    players: [players[3], players[2], players[1], players[4], players[0]]
  },
  "4": {
    gameId: "4",
    players: [players[4], players[3], players[0], players[1], players[2]]
  },
  "5": {
    gameId: "5",
    players: [players[2], players[4], players[1], players[0], players[3]]
  },
  "6": {
    gameId: "6",
    players: [players[1], players[3], players[2], players[0], players[4]]
  }
};

export const getGameById = (id: string): Game | undefined => {
  return games.find(game => game.id === id);
};

export const getLeaderboardByGameId = (id: string): Leaderboard | undefined => {
  return leaderboards[id];
};
