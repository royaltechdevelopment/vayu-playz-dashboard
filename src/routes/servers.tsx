import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { BookOpen, Headphones, Home, Info, LogOut, Menu, Search, ServerOff, Settings, User } from "lucide-react";
import { toast } from "sonner";
import bg from "@/assets/bg.jpg";
import { Brand } from "@/components/Brand";
import { ServerCard, type Server } from "@/components/ServerCard";

export const Route = createFileRoute("/servers")({
  head: () => ({
    meta: [
      { title: "Select a Server — Vayu Playz Official" },
      { name: "description", content: "Choose a Discord server to manage with Vayu Bot." },
      { property: "og:title", content: "Select a Server — Vayu Playz Official" },
      { property: "og:description", content: "Choose a Discord server to manage with Vayu Bot." },
    ],
  }),
  component: Servers,
});

const nav = [
  { icon: Home, label: "Dashboard" },
  { icon: Headphones, label: "Support" },
  { icon: BookOpen, label: "Documentation" },
];

function Servers() {
  // Replace with real Discord data later.
  const servers: Server[] = [];
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | "added" | "not">("all");
  const [menu, setMenu] = useState(false);
  const [side, setSide] = useState(false);
  const navigate = useNavigate();

  const shown = servers.filter(
    (s) =>
      s.name.toLowerCase().includes(q.toLowerCase()) &&
      (filter === "all" || (filter === "added" ? s.botAdded : !s.botAdded)),
  );

  return (
    <div className="flex min-h-screen">
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-border bg-background transition-transform lg:static lg:translate-x-0 ${side ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="border-b border-border p-5"><Brand size="sm" /></div>
        <nav className="flex flex-col gap-2 p-4">
          {nav.map((n, i) => (
            <button
              key={n.label}
              onClick={() => i > 0 && toast.info(`${n.label} is coming soon`)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left font-medium transition ${i === 0 ? "border border-primary bg-primary/25 glow" : "text-foreground/85 hover:bg-muted"}`}
            >
              <n.icon className="h-5 w-5" /> {n.label}
            </button>
          ))}
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
                  <button onClick={() => { setMenu(false); toast.info("Profile coming soon"); }} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted"><User className="h-4 w-4" />Profile</button>
                  <button onClick={() => { setMenu(false); toast.info("Settings coming soon"); }} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted"><Settings className="h-4 w-4" />Settings</button>
                  <button onClick={() => { toast.success("Logged out"); navigate({ to: "/" }); }} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-destructive hover:bg-muted"><LogOut className="h-4 w-4" />Logout</button>
                </div>
              )}
            </div>
          </header>

          <div className="mt-6">
            <h1 className="text-3xl font-bold">Select a Server</h1>
            <p className="mt-1 text-foreground/80">Choose a Discord server to manage with Vayu Bot.</p>
          </div>

          <section className="glass mt-8 rounded-3xl p-4 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="flex flex-1 items-center gap-3 rounded-xl border border-input bg-background/50 px-4 py-3">
                <Search className="h-5 w-5 text-muted-foreground" />
                <input value={q} onChange={(e) => setQ(e.target.value)} disabled={!servers.length} placeholder="Search your servers..." className="w-full bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed" />
              </label>
              <select value={filter} onChange={(e) => setFilter(e.target.value as typeof filter)} disabled={!servers.length} className="rounded-xl border border-input bg-background/50 px-4 py-3 disabled:cursor-not-allowed">
                <option value="all">All</option>
                <option value="added">Bot Added</option>
                <option value="not">Bot Not Added</option>
              </select>
            </div>

            {shown.length ? (
              <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {shown.map((s) => <ServerCard key={s.id} server={s} onAction={() => toast.info(s.name)} />)}
              </div>
            ) : (
              <div className="flex flex-col items-center py-20 text-center">
                <div className="grid h-20 w-20 place-items-center rounded-full bg-primary/20 text-accent glow"><ServerOff className="h-9 w-9" /></div>
                <h2 className="mt-6 text-2xl font-semibold">{servers.length ? "No matching servers" : "No servers yet"}</h2>
                <p className="mt-2 max-w-md text-muted-foreground">
                  {servers.length ? "Try a different search or filter." : "Connect your Discord account to see the servers you can manage here."}
                </p>
                <Link to="/" className="bg-gradient-primary glow mt-6 rounded-xl px-6 py-3 font-medium hover:opacity-90">Back to Login</Link>
              </div>
            )}

            <div className="mt-6 flex items-start gap-3 rounded-xl border border-border bg-background/40 p-4 text-sm text-foreground/80">
              <Info className="h-5 w-5 shrink-0 text-accent" />
              Only servers you can access will appear here. If your server is not showing, make sure the bot has been added and you have the required permissions.
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
