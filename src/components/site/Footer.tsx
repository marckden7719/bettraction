import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-surface-elevated">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-xs text-sm text-muted-foreground">
            Peer-to-peer betting on Base. Secure escrow, on-chain transparency, no middlemen.
          </p>
        </div>
        <FooterCol title="Product" links={[
          { to: "/explore", label: "Explore" },
          { to: "/create", label: "Create Bet" },
          { to: "/leaderboard", label: "Leaderboard" },
          { to: "/vault", label: "Vault" },
        ]} />
        <FooterCol title="Resources" links={[
          { to: "/docs", label: "Documentation" },
          { to: "/docs", label: "How it works" },
          { to: "/docs", label: "Security" },
          { to: "/docs", label: "FAQ" },
        ]} />
        <div className="space-y-3">
          <h4 className="text-sm font-semibold">Network</h4>
          <p className="text-sm text-muted-foreground">Built on Base · Layer 2</p>
          <p className="break-all rounded-md border border-border bg-background p-2 font-mono text-xs text-muted-foreground">
            0xc1A020BE6548D70319a31060E32f1E2A8Cf8d930
          </p>
        </div>
      </div>
      <div className="border-t border-border/60 py-5">
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} BetTraction. Built on Base.
        </p>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold">{title}</h4>
      <ul className="space-y-2">
        {links.map((l, i) => (
          <li key={i}>
            <Link to={l.to} className="text-sm text-muted-foreground hover:text-foreground">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
