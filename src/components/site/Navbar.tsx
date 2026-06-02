import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Wallet, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/explore", label: "Explore" },
  { to: "/create", label: "Create Bet" },
  { to: "/leaderboard", label: "Leaderboard" },
  { to: "/vault", label: "Vault" },
  { to: "/docs", label: "Docs" },
];

export function Navbar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center"><Logo /></Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
                pathname === l.to && "bg-secondary text-foreground",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button className="hidden bg-gradient-primary text-primary-foreground shadow-elegant hover:opacity-95 md:inline-flex">
            <Wallet className="mr-2 h-4 w-4" />
            Connect Wallet
          </Button>
          <button
            aria-label="Menu"
            className="rounded-md p-2 text-foreground md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground",
                  pathname === l.to && "bg-secondary text-foreground",
                )}
              >
                {l.label}
              </Link>
            ))}
            <Button className="mt-2 w-full bg-gradient-primary text-primary-foreground">
              <Wallet className="mr-2 h-4 w-4" /> Connect Wallet
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
