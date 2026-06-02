import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, Plus, TrendingUp, Trophy, Coins } from "lucide-react";
import { bets } from "@/lib/mock/bets";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard · BetTraction" },
      { name: "description", content: "Your bets, earnings, and active challenges on BetTraction." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <SiteLayout>
      <section className="border-b border-border bg-gradient-hero">
        <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-4 px-4 py-14 sm:px-6 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Welcome back 👋</p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">Ready to challenge and win?</h1>
          </div>
          <Button asChild className="bg-gradient-primary text-primary-foreground shadow-elegant"><Link to="/create"><Plus className="mr-2 h-4 w-4" /> Create Bet</Link></Button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Kpi icon={Coins} label="Total Earnings" value="$3,420" delta="+18%" />
          <Kpi icon={Trophy} label="Wins" value="42" delta="+5" />
          <Kpi icon={TrendingUp} label="Win Rate" value="68%" delta="+2.1%" />
          <Kpi icon={Wallet} label="Total Wagered" value="$8,900" delta="+12%" />
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Section title="Active Bets" items={bets.filter((b) => b.status === "Active")} />
          <Section title="Open Challenges" items={bets.filter((b) => b.status === "Open").slice(0, 3)} />
        </div>
      </section>
    </SiteLayout>
  );
}

function Kpi({ icon: Icon, label, value, delta }: { icon: any; label: string; value: string; delta: string }) {
  return (
    <Card className="border-border bg-surface p-5 shadow-card">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <p className="mt-2 text-2xl font-extrabold">{value}</p>
      <p className="mt-0.5 text-xs font-semibold text-success">{delta}</p>
    </Card>
  );
}

function Section({ title, items }: { title: string; items: typeof bets }) {
  return (
    <Card className="border-border bg-surface p-6 shadow-card">
      <h3 className="text-lg font-bold">{title}</h3>
      <div className="mt-4 space-y-3">
        {items.length === 0 ? (
          <p className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">Nothing here yet — <Link className="text-primary" to="/create">create a challenge</Link>.</p>
        ) : (
          items.map((b) => (
            <div key={b.id} className="flex items-center justify-between rounded-xl border border-border bg-background p-4">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">{b.category}</Badge>
                  <p className="text-sm font-semibold">{b.title}</p>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{b.timeLeft} left</p>
              </div>
              <p className="text-sm font-extrabold">{b.amount} {b.token}</p>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
