import { ArrowRight, Plus, Users } from "lucide-react";

export type Server = {
  id: string;
  name: string;
  iconUrl?: string;
  memberCount: number;
  botAdded: boolean;
};

export function ServerCard({ server, onAction }: { server: Server; onAction?: (s: Server) => void }) {
  const { name, iconUrl, memberCount, botAdded } = server;
  return (
    <div className={`glass rounded-2xl p-5 transition hover:-translate-y-0.5 ${botAdded ? "border-primary glow" : ""}`}>
      <div className="flex min-w-0 items-center gap-4">
        <div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-full bg-gradient-primary text-xl font-bold">
          {iconUrl ? <img src={iconUrl} alt={name} className="h-full w-full object-cover" /> : name.charAt(0)}
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold">{name}</h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Users className="h-4 w-4" /> {memberCount.toLocaleString()} members
          </p>
          <p className={`mt-1 flex items-center gap-1.5 text-sm ${botAdded ? "text-success" : "text-muted-foreground"}`}>
            <span className={`h-2.5 w-2.5 rounded-full ${botAdded ? "bg-success" : "border border-muted-foreground"}`} />
            {botAdded ? "Bot Added" : "Bot Not Added"}
          </p>
        </div>
      </div>
      <button
        onClick={() => onAction?.(server)}
        className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium transition ${botAdded ? "bg-gradient-primary hover:opacity-90" : "border border-border bg-secondary hover:bg-muted"}`}
      >
        {botAdded ? <>Manage Server <ArrowRight className="h-4 w-4" /></> : <>Add Bot to Server <Plus className="h-4 w-4" /></>}
      </button>
    </div>
  );
}
