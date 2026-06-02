export const VAULT_ADDRESS = "0xc1A020BE6548D70319a31060E32f1E2A8Cf8d930";
export const BASE_EXPLORER = `https://basescan.org/address/${VAULT_ADDRESS}`;

export type Category = "Prediction" | "Crypto" | "Esports" | "Sports" | "Custom";
export type BetStatus = "Open" | "Active" | "Completed";

export interface Bet {
  id: string;
  title: string;
  description: string;
  category: Category;
  creator: string;
  opponent?: string;
  amount: number;
  token: "USDC" | "ETH";
  timeLeft: string;
  status: BetStatus;
}

export const bets: Bet[] = [
  { id: "1", title: "BTC Price Prediction", description: "Will BTC go above $70,000 by May 31?", category: "Crypto", creator: "0xAB...1234", amount: 500, token: "USDC", timeLeft: "2h 45m", status: "Open" },
  { id: "2", title: "NBA Finals Winner", description: "Predict the winner of NBA Finals 2026", category: "Sports", creator: "0x9F...77E1", amount: 250, token: "USDC", timeLeft: "1d 12h", status: "Open" },
  { id: "3", title: "Valorant 1v1 Duel", description: "Best of 3. Map: Ascent", category: "Esports", creator: "0x12...AA90", opponent: "0xCD...5678", amount: 100, token: "USDC", timeLeft: "5h 10m", status: "Active" },
  { id: "4", title: "ETH > $4k by Friday", description: "Will ETH close above $4,000 by Friday UTC?", category: "Crypto", creator: "0x88...BEEF", amount: 1.2, token: "ETH", timeLeft: "3d 4h", status: "Open" },
  { id: "5", title: "F1 Pole Position", description: "Verstappen takes pole this weekend", category: "Sports", creator: "0x44...0042", amount: 300, token: "USDC", timeLeft: "1d 6h", status: "Open" },
  { id: "6", title: "Chess Match", description: "First to 3 wins. Blitz 5+0", category: "Custom", creator: "0x77...C0DE", opponent: "0x33...11AB", amount: 75, token: "USDC", timeLeft: "Live", status: "Active" },
];

export const leaderboard = [
  { rank: 1, addr: "0x9A...7F21", wins: 142, losses: 23, winRate: 86, volume: "$248,910" },
  { rank: 2, addr: "0xC4...88AA", wins: 121, losses: 31, winRate: 80, volume: "$201,500" },
  { rank: 3, addr: "0x1B...EE03", wins: 98, losses: 42, winRate: 70, volume: "$162,300" },
  { rank: 4, addr: "0x44...0042", wins: 81, losses: 39, winRate: 68, volume: "$120,440" },
  { rank: 5, addr: "0x77...C0DE", wins: 64, losses: 28, winRate: 70, volume: "$98,210" },
];
