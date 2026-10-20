import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Info, Search, ServerOff } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
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

function Servers() {
  // Replace with real Discord data later.
  const servers: Server[] = [];
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | "added" | "not">("all");

  const shown = servers.filter(
    (s) =>
      s.name.toLowerCase().includes(q.toLowerCase()) &&
      (filter === "all" || (filter === "added" ? s.botAdded : !s.botAdded)),
  );

  return (
    <AppShell title="Select a Server" subtitle="Choose a Discord server to manage with Vayu Bot." active="Dashboard">
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
    </AppShell>
  );
}
