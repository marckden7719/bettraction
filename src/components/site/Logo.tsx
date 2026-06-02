import logo from "@/assets/logo.png";

export function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <div className="flex items-center gap-2">
      <img src={logo} alt="BetTraction" className={className} />
      <span className="text-lg font-extrabold tracking-tight">
        Bet<span className="text-primary">Traction</span>
      </span>
    </div>
  );
}
