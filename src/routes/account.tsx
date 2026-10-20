import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, ShieldCheck, User } from "lucide-react";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Account — Vayu Playz Official" },
      { name: "description", content: "View your Vayu Playz Official account details." },
      { property: "og:title", content: "Account — Vayu Playz Official" },
      { property: "og:description", content: "View your Vayu Playz Official account details." },
    ],
  }),
  component: Account,
});

const fields = [
  { icon: User, label: "Username" },
  { icon: Mail, label: "Email" },
  { icon: ShieldCheck, label: "Discord ID" },
];

function Account() {
  return (
    <AppShell title="Account" subtitle="Your profile details from Discord.">
      <section className="glass mt-8 rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
          <div className="grid h-24 w-24 shrink-0 place-items-center rounded-full border-2 border-primary bg-secondary glow">
            <User className="h-10 w-10 text-accent" />
          </div>
          <div className="min-w-0">
            <h2 className="text-2xl font-semibold">Not connected</h2>
            <p className="mt-1 text-muted-foreground">Your Discord profile will appear here once you sign in.</p>
          </div>
          <Link to="/" className="bg-gradient-primary glow rounded-xl px-6 py-3 font-medium hover:opacity-90 sm:ml-auto">Connect Discord</Link>
        </div>
        <div className="mt-8 divide-y divide-border rounded-2xl border border-border bg-background/40">
          {fields.map((f) => (
            <div key={f.label} className="flex items-center gap-4 p-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/20 text-accent"><f.icon className="h-5 w-5" /></div>
              <div className="min-w-0">
                <p className="text-sm text-muted-foreground">{f.label}</p>
                <p className="font-medium">—</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
