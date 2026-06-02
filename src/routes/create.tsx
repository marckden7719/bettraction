import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Shield } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/create")({
  head: () => ({
    meta: [
      { title: "Create a Bet · BetTraction" },
      { name: "description", content: "Create a new peer-to-peer challenge and lock funds in the BetTraction Vault." },
    ],
  }),
  component: CreateBet,
});

function CreateBet() {
  const [submitting, setSubmitting] = useState(false);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Challenge created — waiting for opponent");
    }, 900);
  };
  return (
    <SiteLayout>
      <section className="border-b border-border bg-gradient-hero">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Create a Challenge</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">Set your rules, choose your stake, and invite an opponent. Funds are escrowed in the on-chain vault until resolution.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        <form onSubmit={onSubmit} className="lg:col-span-2">
          <Card className="space-y-6 border-border bg-surface p-6 shadow-card sm:p-8">
            <Field label="Challenge Title">
              <Input required placeholder="e.g. BTC > $80K by Friday" />
            </Field>
            <Field label="Description">
              <Textarea required rows={3} placeholder="Describe the challenge..." />
            </Field>
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Category">
                <Select defaultValue="Prediction">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["Prediction", "Crypto", "Esports", "Sports", "Custom"].map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Token">
                <Select defaultValue="USDC">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USDC">USDC</SelectItem>
                    <SelectItem value="ETH">ETH</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Stake Amount">
                <Input required type="number" min="0" step="any" placeholder="100" />
              </Field>
              <Field label="Expiry Date">
                <Input required type="datetime-local" />
              </Field>
            </div>
            <Field label="Opponent (wallet, optional)">
              <Input placeholder="0x... (leave empty for open challenge)" />
            </Field>
            <Field label="Rules">
              <Textarea required rows={4} placeholder="Clearly define the rules and resolution criteria..." />
            </Field>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button type="submit" disabled={submitting} className="bg-gradient-primary text-primary-foreground shadow-elegant">
                <Sparkles className="mr-2 h-4 w-4" /> {submitting ? "Creating..." : "Create Challenge"}
              </Button>
              <Button type="button" variant="outline">Save draft</Button>
            </div>
          </Card>
        </form>

        <aside className="space-y-4">
          <Card className="border-border bg-surface p-5">
            <div className="flex items-center gap-2 text-primary">
              <Shield className="h-4 w-4" /><p className="text-sm font-semibold">Vault Escrow</p>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">Your stake is locked in the BetTraction Vault on Base. Funds release automatically to the winner.</p>
          </Card>
          <Card className="border-border bg-surface p-5">
            <p className="text-sm font-semibold">Payout breakdown</p>
            <ul className="mt-3 space-y-1.5 text-sm">
              <li className="flex justify-between"><span className="text-muted-foreground">Pool</span><span className="font-semibold">200 USDC</span></li>
              <li className="flex justify-between"><span className="text-muted-foreground">Platform fee (5%)</span><span className="font-semibold">10 USDC</span></li>
              <li className="flex justify-between border-t border-border pt-2"><span>Winner receives</span><span className="font-extrabold text-primary">190 USDC</span></li>
            </ul>
          </Card>
        </aside>
      </section>
    </SiteLayout>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-semibold">{label}</Label>
      {children}
    </div>
  );
}
