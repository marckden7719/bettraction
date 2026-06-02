import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { bets, type Category } from "@/lib/mock/bets";

const CATS: ("All" | Category)[] = ["All", "Prediction", "Crypto", "Esports", "Sports", "Custom"];

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore Bets · BetTraction" },
      { name: "description", content: "Browse open peer-to-peer challenges on Base. Accept a bet and lock your stake in the vault." },
    ],
  }),
  component: Explore,
});

function Explore() {
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");
  const [q, setQ] = useState("");
  const filtered = bets.filter(
    (b) => (cat === "All" || b.category === cat) && (q === "" || b.title.toLowerCase().includes(q.toLowerCase())),
  );

  return (
    <SiteLayout>
      <section className="border-b border-border bg-gradient-hero">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Explore Challenges</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">Discover open peer-to-peer bets. Accept a challenge to lock your stake in the BetTraction Vault.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search challenges..." className="pl-9" />
            </div>
            <Button asChild className="bg-gradient-primary text-primary-foreground">
              <Link to="/create">Create Bet</Link>
            </Button>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  cat === c ? "border-primary bg-primary text-primary-foreground" : "border-border bg-surface text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {filtered.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((b) => (
              <Card key={b.id} className="border-border bg-surface p-5 shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">{b.category}</Badge>
                  <span className="text-xs text-muted-foreground">{b.timeLeft} left</span>
                </div>
                <h3 className="mt-3 text-lg font-bold">{b.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{b.description}</p>
                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="font-mono">{b.creator}</span>
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Stake</p>
                    <p className="text-base font-extrabold">{b.amount} {b.token}</p>
                  </div>
                  <Button size="sm" className="bg-gradient-primary text-primary-foreground">Accept</Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-surface p-12 text-center">
      <h3 className="text-lg font-bold">No bets found</h3>
      <p className="mt-1 text-sm text-muted-foreground">Try adjusting filters or create your first challenge.</p>
      <Button asChild className="mt-5 bg-gradient-primary text-primary-foreground">
        <Link to="/create">Create Your First Challenge</Link>
      </Button>
    </div>
  );
}
