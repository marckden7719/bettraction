import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/docs")({
  head: () => ({
    meta: [
      { title: "Docs · BetTraction" },
      { name: "description", content: "How BetTraction works, the vault escrow model, supported wallets, and security." },
    ],
  }),
  component: Docs,
});

function Docs() {
  return (
    <SiteLayout>
      <section className="border-b border-border bg-gradient-hero">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Documentation</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">Everything you need to know to start competing on BetTraction.</p>
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <Card className="border-border bg-surface p-6 shadow-card sm:p-8">
          <Accordion type="single" collapsible defaultValue="i0">
            {[
              { q: "Getting started", a: "Connect your wallet (MetaMask, Coinbase Wallet, Rabby, or WalletConnect), switch to Base, and you're ready to create or accept your first challenge." },
              { q: "How escrow works", a: "Your stake is locked in the BetTraction Vault smart contract on Base. Funds are released to the winner automatically once a result is verified." },
              { q: "Supported wallets", a: "MetaMask, Coinbase Wallet, Rabby, and any WalletConnect-compatible mobile wallet." },
              { q: "Fees", a: "A flat 5% platform fee is taken from the prize pool. There are no hidden charges." },
              { q: "Disputes", a: "Disputed bets enter an arbitration window. Multi-sig resolvers — and eventually DAO voters — confirm the outcome." },
              { q: "Why Base?", a: "Fast finality, ultra-low fees, and backing from Coinbase make Base the ideal L2 for a seamless betting experience." },
            ].map((f, i) => (
              <AccordionItem key={i} value={`i${i}`}>
                <AccordionTrigger className="text-left font-semibold">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>
      </section>
    </SiteLayout>
  );
}
