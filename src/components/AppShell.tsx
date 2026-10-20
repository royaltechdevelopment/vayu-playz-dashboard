import { Link, useNavigate } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { BookOpen, Headphones, Home, LogOut, Menu, Settings, User } from "lucide-react";
import { toast } from "sonner";
import bg from "@/assets/bg.jpg";
import { Brand } from "@/components/Brand";

const nav = [
  { icon: Home, label: "Dashboard", to: "/servers" as const },
  { icon: Headphones, label: "Support" },
  { icon: BookOpen, label: "Documentation" },
];

export function AppShell({ title, subtitle, active, children }: { title: string; subtitle: string; active?: string; children: ReactNode }) {
  const [menu, setMenu] = useState(false);
  const [side, setSide] = useState(false);
  const navigate = useNavigate();
  const item = "flex w-full items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted";

  return (
    <div className="flex min-h-screen">
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-border bg-background transition-transform lg:static lg:translate-x-0 ${side ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="border-b border-border p-5"><Brand size="sm" /></div>
        <nav className="flex flex-col gap-2 p-4">
          {nav.map((n) => {
            const cls = `flex items-center gap-3 rounded-xl px-4 py-3 text-left font-medium transition ${active === n.label ? "border border-primary bg-primary/25 glow" : "text-foreground/85 hover:bg-muted"}`;
            return n.to ? (
              <Link key={n.label} to={n.to} className={cls}><n.icon className="h-5 w-5" /> {n.label}</Link>
            ) : (
              <button key={n.label} onClick={() => toast.info(`${n.label} is coming soon`)} className={cls}><n.icon className="h-5 w-5" /> {n.label}</button>
            );
          })}
        </nav>
        <img src={bg} alt="" loading="lazy" className="mt-auto h-64 w-full object-cover opacity-40 [mask-image:linear-gradient(transparent,black)]" />
      </aside>
      {side && <div className="fixed inset-0 z-30 bg-background/70 lg:hidden" onClick={() => setSide(false)} />}

      <main className="relative min-w-0 flex-1">
        <img src={bg} alt="" className="absolute inset-x-0 top-0 h-72 w-full object-cover opacity-50 [mask-image:linear-gradient(black,transparent)]" />
        <div className="relative p-4 sm:p-8">
          <header className="flex items-center justify-between">
            <button className="rounded-lg p-2 hover:bg-muted lg:hidden" onClick={() => setSide(true)} aria-label="Open menu"><Menu /></button>
            <div className="relative ml-auto">
              <button onClick={() => setMenu(!menu)} aria-label="Profile menu" className="grid h-11 w-11 place-items-center rounded-full border border-primary bg-secondary glow">
                <User className="h-5 w-5" />
              </button>
              {menu && (
                <div className="glass absolute right-0 z-20 mt-2 w-56 rounded-2xl bg-popover p-2">
                  <div className="border-b border-border px-3 py-2 text-sm text-muted-foreground">Not connected to Discord</div>
                  <Link to="/account" className={item}><User className="h-4 w-4" />Account</Link>
                  <Link to="/settings" className={item}><Settings className="h-4 w-4" />Settings</Link>
                  <button onClick={() => { toast.success("Logged out"); navigate({ to: "/" }); }} className={`${item} text-destructive`}><LogOut className="h-4 w-4" />Logout</button>
                </div>
              )}
            </div>
          </header>
          <div className="mt-6">
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="mt-1 text-foreground/80">{subtitle}</p>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
