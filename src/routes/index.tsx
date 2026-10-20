import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Users, Zap } from "lucide-react";
import { toast } from "sonner";
import bg from "@/assets/bg.jpg";
import { Brand } from "@/components/Brand";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Login — Vayu Playz Official" },
      { name: "description", content: "Sign in with Discord to manage your server with Vayu Playz Official." },
      { property: "og:title", content: "Login — Vayu Playz Official" },
      { property: "og:description", content: "Build, manage and grow your Discord server." },
    ],
  }),
  component: Login,
});

const features = [
  { icon: Zap, t: "Fast & Reliable", d: "Built for performance" },
  { icon: ShieldCheck, t: "Secure", d: "Your data is safe" },
  { icon: Users, t: "Community Focused", d: "For better servers" },
];
const perks = [
  { icon: ShieldCheck, t: "Secure Login", d: "Your data is safe with us." },
  { icon: Zap, t: "Instant Access", d: "Manage your server in seconds." },
  { icon: Users, t: "Discord Integration", d: "Connect, configure, control." },
];

function IconBubble({ icon: Icon }: { icon: typeof Zap }) {
  return (
    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary/20 text-accent">
      <Icon className="h-5 w-5" />
    </div>
  );
}

function Login() {
  const navigate = useNavigate();
  const login = () => {
    toast.success("Demo login — opening your servers");
    navigate({ to: "/servers" });
  };
  return (
    <div className="relative min-h-screen overflow-hidden">
      <img src={bg} alt="" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-background/40" />
      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col gap-10 px-6 py-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex max-w-xl flex-col gap-10">
          <Brand />
          <div>
            <p className="text-sm tracking-[0.4em] text-accent">DISCORD BOT DASHBOARD</p>
            <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
              Build <span className="text-accent">• Manage • Grow</span>
            </h1>
            <p className="mt-4 text-lg text-foreground/85">
              Take control of your Discord server with Vayu Playz Official. Powerful tools, simple setup, and a better community experience — all in one place.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {features.map((f) => (
              <div key={f.t}>
                <IconBubble icon={f.icon} />
                <p className="mt-3 font-semibold">{f.t}</p>
                <p className="text-sm text-muted-foreground">{f.d}</p>
              </div>
            ))}
          </div>
          <p className="text-xs tracking-[0.2em] text-accent">MORE THAN A BOT • IT'S A COMMUNITY</p>
        </div>

        <div className="glass glow w-full max-w-md rounded-3xl border-primary/60 p-8 text-center">
          <div className="flex justify-center"><Brand size="sm" /></div>
          <h2 className="mt-6 text-3xl font-bold">Welcome Back 👋</h2>
          <p className="mt-2 text-muted-foreground">Sign in with your Discord account to access your dashboard.</p>
          <button onClick={login} className="bg-gradient-primary glow mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-4 text-lg font-semibold transition hover:opacity-90">
            Login with Discord <ArrowRight className="h-5 w-5" />
          </button>
          <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" />OR<span className="h-px flex-1 bg-border" />
          </div>
          <div className="divide-y divide-border rounded-2xl border border-border bg-background/40 text-left">
            {perks.map((p) => (
              <div key={p.t} className="flex items-center gap-4 p-4">
                <IconBubble icon={p.icon} />
                <div>
                  <p className="font-medium">{p.t}</p>
                  <p className="text-sm text-muted-foreground">{p.d}</p>
                </div>
              </div>
            ))}
          </div>
          <Link to="/servers" className="mt-5 inline-block text-sm text-accent hover:underline">Preview Server List (demo) →</Link>
        </div>
      </div>
    </div>
  );
}
