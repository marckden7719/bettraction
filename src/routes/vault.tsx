import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink, Shield, CheckCircle2 } from "lucide-react";
import { VAULT_ADDRESS, BASE_EXPLORER } from "@/lib/mock/bets";
import { toast } from "sonner";

export const Route = createFileRoute("/vault")({
  head: () => ({
    meta: [
      { title: "Vault Transparency · BetTraction" },
      { name: "description", content: "Inspect the BetTraction on-chain vault. Total locked value, payouts, and verifiable deposits on Base." },
    ],
  }),
  component: Vault,
});

const TIMELINE = [
  { label: "Challenge Created", done: true },
  { label: "Player A Deposited", done: true },
  { label: "Player B Deposited", done: true },
  { label: "Challenge Active", done: true },
  { label: "Winner Selected", done: false },
  { label: "Payout Released", done: false },
];

const TXS = [
  { type: "Deposit", from: "0xAB...1234", amount: "100 USDC", time: "2m ago" },
  { type: "Payout", from: "0x9F...77E1", amount: "190 USDC", time: "12m ago" },
  { type: "Deposit", from: "0xCD...5678", amount: "250 USDC", time: "34m ago" },
  { type: "Deposit", from: "0x77...C0DE", amount: "0.5 ETH", time: "1h ago" },
  { type: "Payout", from: "0x44...0042", amount: "475 USDC", time: "2h ago" },
];

function Vault() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(VAULT_ADDRESS);
    setCopied(true);
    toast.success("Copied");
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <SiteLayout>
      <section className="border-b border-border bg-gradient-hero">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Transparency</p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">BetTraction Vault</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">Every stake on BetTraction flows through this on-chain vault on Base. Verify any deposit or payout in real time.</p>

          <Card className="mt-8 border-border bg-surface p-6 shadow-elegant">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary"><Shield className="h-6 w-6" /></div>
                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground">Vault Address</p>
                  <p className="break-all font-mono text-sm">{VAULT_ADDRESS}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={copy}><Copy className="mr-2 h-4 w-4" /> {copied ? "Copied" : "Copy"}</Button>
                <Button asChild size="sm" className="bg-gradient-primary text-primary-foreground">
                  <a href={BASE_EXPLORER} target="_blank" rel="noreferrer">Basescan <ExternalLink className="ml-2 h-4 w-4" /></a>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Total Locked Value" value="$842,150" />
          <Stat label="Active Bets" value="342" />
          <Stat label="Completed Bets" value="1,298" />
          <Stat label="Total Payouts" value="$2.4M" />
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <Card className="border-border bg-surface p-6 shadow-card lg:col-span-2">
            <h3 className="text-lg font-bold">Recent on-chain activity</h3>
            <div className="mt-4 divide-y divide-border">
              {TXS.map((t, i) => (
                <div key={i} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${t.type === "Deposit" ? "bg-primary/10 text-primary" : "bg-success/10 text-success"}`}>{t.type}</span>
                    <span className="font-mono text-sm text-muted-foreground">{t.from}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{t.amount}</p>
                    <p className="text-xs text-muted-foreground">{t.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="border-border bg-surface p-6 shadow-card">
            <h3 className="text-lg font-bold">Challenge lifecycle</h3>
            <ol className="mt-5 space-y-4">
              {TIMELINE.map((s, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className={`mt-0.5 grid h-6 w-6 place-items-center rounded-full ${s.done ? "bg-primary text-primary-foreground" : "border border-border bg-surface text-muted-foreground"}`}>
                    {s.done ? <CheckCircle2 className="h-4 w-4" /> : <span className="text-[10px] font-bold">{i + 1}</span>}
                  </div>
                  <span className={`text-sm ${s.done ? "font-semibold" : "text-muted-foreground"}`}>{s.label}</span>
                </li>
              ))}
            </ol>
          </Card>
        </div>
      </section>
    </SiteLayout>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <Card className="border-border bg-surface p-5 shadow-card">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1.5 text-2xl font-extrabold">{value}</p>
    </Card>
  );
}
