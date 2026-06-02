import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Card } from "@/components/ui/card";
import { Trophy } from "lucide-react";
import { leaderboard } from "@/lib/mock/bets";

export const Route = createFileRoute("/leaderboard")({
  head: () => ({
    meta: [
      { title: "Leaderboard · BetTraction" },
      { name: "description", content: "Top winners by win rate, earnings, and volume on BetTraction." },
    ],
  }),
  component: Leaderboard,
});

function Leaderboard() {
  return (
    <SiteLayout>
      <section className="border-b border-border bg-gradient-hero">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Leaderboard</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">The top competitors on BetTraction, ranked by performance.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Card className="overflow-hidden border-border bg-surface shadow-card">
          <div className="grid grid-cols-6 gap-4 border-b border-border bg-surface-elevated px-5 py-3 text-xs font-semibold uppercase text-muted-foreground">
            <span>Rank</span><span className="col-span-2">Player</span><span>Wins</span><span>Win Rate</span><span className="text-right">Volume</span>
          </div>
          {leaderboard.map((p) => (
            <div key={p.rank} className="grid grid-cols-6 items-center gap-4 border-b border-border px-5 py-4 last:border-b-0">
              <div className="flex items-center gap-2">
                {p.rank <= 3 ? <Trophy className={`h-4 w-4 ${p.rank === 1 ? "text-yellow-500" : p.rank === 2 ? "text-zinc-400" : "text-amber-700"}`} /> : null}
                <span className="font-bold">#{p.rank}</span>
              </div>
              <span className="col-span-2 font-mono text-sm">{p.addr}</span>
              <span className="text-sm"><span className="font-semibold">{p.wins}</span> <span className="text-muted-foreground">/ {p.losses}</span></span>
              <span className="text-sm font-semibold text-success">{p.winRate}%</span>
              <span className="text-right font-semibold">{p.volume}</span>
            </div>
          ))}
        </Card>
      </section>
    </SiteLayout>
  );
}
