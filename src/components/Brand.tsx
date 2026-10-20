import logo from "@/assets/logo.png";

export function Brand({ size = "md" }: { size?: "sm" | "md" }) {
  const img = size === "sm" ? "h-12 w-12" : "h-20 w-20";
  const title = size === "sm" ? "text-2xl" : "text-4xl sm:text-5xl";
  return (
    <div className="flex items-center gap-3">
      <img src={logo} alt="Vayu Playz logo" width={816} height={816} className={`${img} shrink-0 drop-shadow-[0_0_12px_var(--primary)]`} />
      <div className="leading-none">
        <div className={`${title} font-extrabold tracking-tight`}>VAYU</div>
        <div className="mt-1 text-xs font-semibold tracking-[0.3em] text-foreground/90">PLAYZ OFFICIAL</div>
      </div>
    </div>
  );
}
