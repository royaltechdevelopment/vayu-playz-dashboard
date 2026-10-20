import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Vayu Playz Official" },
      { name: "description", content: "Manage your Vayu Playz Official preferences." },
      { property: "og:title", content: "Settings — Vayu Playz Official" },
      { property: "og:description", content: "Manage your Vayu Playz Official preferences." },
    ],
  }),
  component: SettingsPage,
});

const options = [
  { key: "notify", label: "Notifications", desc: "Get alerts about your servers." },
  { key: "updates", label: "Product updates", desc: "Hear about new bot features." },
  { key: "compact", label: "Compact cards", desc: "Show smaller server cards." },
];

function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button role="switch" aria-checked={on} onClick={onClick} className={`relative h-7 w-12 shrink-0 rounded-full transition ${on ? "bg-gradient-primary glow" : "bg-muted"}`}>
      <span className={`absolute top-1 h-5 w-5 rounded-full bg-foreground transition-all ${on ? "left-6" : "left-1"}`} />
    </button>
  );
}

function SettingsPage() {
  const [prefs, setPrefs] = useState<Record<string, boolean>>({ notify: true, updates: false, compact: false });
  const [lang, setLang] = useState("en");

  return (
    <AppShell title="Settings" subtitle="Choose how your dashboard works for you.">
      <section className="glass mt-8 rounded-3xl p-6 sm:p-8">
        <div className="divide-y divide-border rounded-2xl border border-border bg-background/40">
          {options.map((o) => (
            <div key={o.key} className="flex items-center justify-between gap-4 p-4">
              <div className="min-w-0">
                <p className="font-medium">{o.label}</p>
                <p className="text-sm text-muted-foreground">{o.desc}</p>
              </div>
              <Toggle on={!!prefs[o.key]} onClick={() => setPrefs({ ...prefs, [o.key]: !prefs[o.key] })} />
            </div>
          ))}
          <div className="flex items-center justify-between gap-4 p-4">
            <div className="min-w-0">
              <p className="font-medium">Language</p>
              <p className="text-sm text-muted-foreground">Dashboard display language.</p>
            </div>
            <select value={lang} onChange={(e) => setLang(e.target.value)} className="rounded-xl border border-input bg-background/50 px-3 py-2">
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
            </select>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button onClick={() => toast.success("Settings saved (demo)")} className="bg-gradient-primary glow rounded-xl px-6 py-3 font-medium hover:opacity-90">Save Changes</button>
        </div>
      </section>
    </AppShell>
  );
}
