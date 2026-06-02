import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Wallet, Shield, Trophy, Coins, Copy, ExternalLink, Lock, Zap, CheckCircle2, Users, BarChart3, Plus, Sparkles } from "lucide-react";
import { useState } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { VAULT_ADDRESS, BASE_EXPLORER, bets } from "@/lib/mock/bets";
import { toast } from "sonner";
import heroImg from "@/assets/hero.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BetTraction — The Future of Peer-to-Peer Betting on Base" },
      { name: "description", content: "Challenge friends, settle debates, predict outcomes, and compete securely using blockchain-powered escrow on Base." },
      { property: "og:title", content: "BetTraction — Peer-to-Peer Betting on Base" },
      { property: "og:description", content: "Secure. Transparent. Decentralized." },
      { property: "og:image", content: "/og-image.png" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteLayout>
      <Hero />
      <TrustStrip />
      <HowItWorks />
      <Stats />
      <Security />
      <LiveBets />
      <FAQ />
      <CTA />
    </SiteLayout>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 bg-radial-glow" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28 lg:px-8">
        <div className="flex flex-col justify-center">
          <Badge variant="secondary" className="mb-6 w-fit gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Built on Base · Live now
          </Badge>
          <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Challenge Anyone.<br />
            Stake Anything.<br />
            <span className="text-gradient">Win Everything.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            The future of peer-to-peer betting on Base. Secure escrow, on-chain transparency, and zero middlemen — built for the next generation of competitors.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" className="bg-gradient-primary text-primary-foreground shadow-elegant hover:opacity-95">
              <Wallet className="mr-2 h-5 w-5" /> Connect Wallet
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button asChild size="lg" variant="outline" className="border-border bg-surface">
              <Link to="/explore">Explore Bets</Link>
            </Button>
          </div>
          <div className="mt-10 grid max-w-md grid-cols-4 gap-3">
            {[
              { icon: Plus, label: "Create" },
              { icon: Shield, label: "Vault" },
              { icon: Trophy, label: "Compete" },
              { icon: Coins, label: "Payout" },
            ].map((f, i) => (
              <div key={i} className="rounded-xl border border-border bg-surface p-3 text-center shadow-soft">
                <f.icon className="mx-auto h-5 w-5 text-primary" />
                <p className="mt-1.5 text-xs font-semibold">{f.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-primary opacity-20 blur-3xl" />
          <div className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-elegant">
            <img src={heroImg} alt="BetTraction dashboard preview" className="w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const items = [
    { icon: Zap, title: "Built on Base", sub: "Fast & low fees" },
    { icon: Shield, title: "Secure Escrow", sub: "Funds protected" },
    { icon: CheckCircle2, title: "Transparent", sub: "On-chain verified" },
    { icon: Users, title: "Decentralized", sub: "No middlemen" },
  ];
  return (
    <section className="border-y border-border bg-surface-elevated">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {items.map((it, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
              <it.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold">{it.title}</p>
              <p className="text-xs text-muted-foreground">{it.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", icon: Plus, title: "Create Challenge", body: "Create your own wager, set the rules, and choose the stake amount." },
    { n: "02", icon: Lock, title: "Lock Funds", body: "Both players deposit their stake into the secure on-chain vault." },
    { n: "03", icon: Trophy, title: "Compete", body: "Complete the challenge according to the agreed-upon rules." },
    { n: "04", icon: Coins, title: "Winner Gets Paid", body: "The winner automatically receives the full reward, on-chain." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="How it works" title="From challenge to payout in four steps" />
      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => (
          <Card key={s.n} className="group relative overflow-hidden border-border bg-surface p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant">
            <span className="absolute right-4 top-4 text-5xl font-extrabold text-primary/5 group-hover:text-primary/10">{s.n}</span>
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-elegant">
              <s.icon className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { value: "$2,456,789", label: "Total Volume", delta: "+12.5%" },
    { value: "342", label: "Active Bets", delta: "+8.3%" },
    { value: "12,847", label: "Active Players", delta: "+15.2%" },
    { value: "1,298", label: "Completed Bets", delta: "+10.1%" },
  ];
  return (
    <section className="border-y border-border bg-surface-elevated">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Card key={i} className="border-border bg-surface p-6 shadow-card">
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p className="mt-2 text-3xl font-extrabold tracking-tight">{s.value}</p>
              <p className="mt-1 text-xs font-semibold text-success">{s.delta}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Security() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(VAULT_ADDRESS);
    setCopied(true);
    toast.success("Vault address copied");
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading eyebrow="Security" title="Protected by Vault Escrow" align="left" />
          <p className="mt-4 max-w-xl text-muted-foreground">
            Every challenge uses a secure on-chain vault. Funds remain locked in escrow until the challenge is completed and the winner is verified. No middlemen. No custodians. Just code.
          </p>
          <ul className="mt-6 space-y-3">
            {["Non-custodial smart contract escrow", "Public, auditable on-chain transactions", "Automatic settlement on resolution", "Built on Base for low fees & fast finality"].map((t) => (
              <li key={t} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" /> {t}
              </li>
            ))}
          </ul>
        </div>

        <Card className="border-border bg-surface p-6 shadow-elegant">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold">BetTraction Vault</p>
              <p className="text-xs text-muted-foreground">Base Mainnet</p>
            </div>
          </div>
          <div className="mt-5 rounded-xl border border-border bg-background p-4">
            <p className="text-xs font-semibold uppercase text-muted-foreground">Vault Address</p>
            <p className="mt-1 break-all font-mono text-sm">{VAULT_ADDRESS}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button size="sm" variant="outline" onClick={copy}>
                <Copy className="mr-2 h-4 w-4" /> {copied ? "Copied" : "Copy"}
              </Button>
              <Button asChild size="sm" className="bg-gradient-primary text-primary-foreground">
                <a href={BASE_EXPLORER} target="_blank" rel="noreferrer">
                  View on Basescan <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3 text-center">
            <Mini label="Locked" value="$842K" />
            <Mini label="Active" value="342" />
            <Mini label="Settled" value="1,298" />
          </div>
        </Card>
      </div>
    </section>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-background p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-0.5 text-base font-bold">{value}</p>
    </div>
  );
}

function LiveBets() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading eyebrow="Live" title="Trending challenges right now" align="left" />
        <Button asChild variant="outline">
          <Link to="/explore">View all <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {bets.slice(0, 6).map((b) => (
          <Card key={b.id} className="border-border bg-surface p-5 shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant">
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="bg-primary/10 text-primary">{b.category}</Badge>
              <span className="text-xs text-muted-foreground">{b.timeLeft}</span>
            </div>
            <h3 className="mt-3 text-lg font-bold">{b.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{b.description}</p>
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
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "How does escrow work?", a: "When you create or accept a bet, your stake is locked in the on-chain BetTraction Vault. Funds stay there until the challenge is resolved and automatically released to the winner." },
    { q: "How are winners determined?", a: "Winners are confirmed through agreed-upon rules and verified on-chain. Future versions will introduce community arbitration and DAO voting for disputed results." },
    { q: "What happens if there is a dispute?", a: "Disputed bets enter an arbitration window. A multi-sig resolver reviews evidence and resolves the outcome transparently. DAO arbitration is on the roadmap." },
    { q: "Which wallets are supported?", a: "MetaMask, Coinbase Wallet, Rabby, and any WalletConnect-compatible wallet on desktop and mobile." },
    { q: "Why Base?", a: "Base offers fast finality, ultra-low fees, and is backed by Coinbase — the ideal Layer 2 for a smooth, beginner-friendly Web3 experience." },
  ];
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />
      <Accordion type="single" collapsible className="mt-10">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`i${i}`} className="border-border">
            <AccordionTrigger className="text-left text-base font-semibold">{f.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-primary p-10 text-primary-foreground shadow-elegant sm:p-16">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="relative grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Join the future of competitive betting.</h2>
            <p className="mt-3 max-w-xl opacity-90">Connect your wallet and create your first on-chain challenge in under a minute.</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              <Wallet className="mr-2 h-5 w-5" /> Connect Wallet
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10">
              <Link to="/create">Create Bet</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, align = "center" }: { eyebrow: string; title: string; align?: "center" | "left" }) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <p className="text-sm font-semibold uppercase tracking-wider text-primary">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
    </div>
  );
}

// Hidden unused import suppress
void BarChart3;
