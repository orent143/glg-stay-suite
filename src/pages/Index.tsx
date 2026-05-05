import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Wifi, Sparkles } from "lucide-react";
import { PublicNav } from "@/components/public/PublicNav";
import { PublicFooter } from "@/components/public/PublicFooter";
import { RoomCard } from "@/components/public/RoomCard";
import { Button } from "@/components/ui/button";
import { rooms } from "@/lib/mock-data";

const Index = () => {
  const featured = rooms.filter((r) => r.status === "Available").slice(0, 3);
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PublicNav />

      {/* Hero */}
      <section className="border-b border-border">
        <div className="container-app py-16 md:py-24 grid gap-12 md:grid-cols-2 md:items-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-status-success" />
              Now accepting tenants for May 2026
            </div>
            <h1 className="mt-5 font-display text-5xl md:text-6xl leading-[1.05]">
              A simpler way to find your next home in Digos City.
            </h1>
            <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-lg">
              Casa Digos is a modern boarding house offering single rooms, studios, and shared spaces — fully furnished, fairly priced, and built for students and young professionals.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/rooms">Browse available rooms <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/inquiry">Send an inquiry</Link>
              </Button>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              {[
                { k: "12", l: "Total rooms" },
                { k: "5★", l: "Avg. rating" },
                { k: "24h", l: "Avg. reply" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-2xl font-semibold">{s.k}</div>
                  <div className="text-xs text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-muted">
              <img
                src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80&auto=format&fit=crop"
                alt="Modern boarding house interior"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden md:block w-56 rounded-xl border border-border bg-card p-4 shadow-sm">
              <div className="text-xs text-muted-foreground">Starting at</div>
              <div className="text-2xl font-semibold">₱2,200<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
              <div className="mt-1 text-xs text-muted-foreground">Inclusive of utilities</div>
            </div>
          </div>
        </div>
      </section>

      {/* Value */}
      <section className="border-b border-border">
        <div className="container-app py-16 grid gap-8 md:grid-cols-3">
          {[
            { icon: ShieldCheck, t: "Secure & monitored", d: "24/7 CCTV, gated entry, and verified tenant policies for everyone's peace of mind." },
            { icon: Wifi, t: "Fast Wi-Fi included", d: "Fiber internet across the building. Every room reaches 100+ Mbps." },
            { icon: Sparkles, t: "Maintained weekly", d: "Common areas cleaned weekly. Maintenance requests resolved within 48 hours." },
          ].map((f) => (
            <div key={f.t} className="rounded-xl border border-border p-6">
              <f.icon className="h-5 w-5" />
              <h3 className="mt-4 text-base font-semibold">{f.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured rooms */}
      <section className="container-app py-16">
        <div className="flex items-end justify-between gap-6 mb-8">
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Featured</div>
            <h2 className="mt-2 font-display text-3xl md:text-4xl">Available right now</h2>
          </div>
          <Link to="/rooms" className="text-sm font-medium text-foreground hover:underline whitespace-nowrap">
            View all rooms →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((r) => (
            <RoomCard key={r.id} room={r} />
          ))}
        </div>
      </section>

      <PublicFooter />
    </div>
  );
};

export default Index;
