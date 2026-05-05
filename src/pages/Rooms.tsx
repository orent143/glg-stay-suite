import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PublicNav } from "@/components/public/PublicNav";
import { PublicFooter } from "@/components/public/PublicFooter";
import { RoomCard } from "@/components/public/RoomCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { rooms } from "@/lib/mock-data";

const Rooms = () => {
  const [q, setQ] = useState("");
  const [type, setType] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");
  const [price, setPrice] = useState<number[]>([8000]);

  const filtered = useMemo(() => {
    return rooms.filter((r) => {
      if (q && !r.name.toLowerCase().includes(q.toLowerCase())) return false;
      if (type !== "all" && r.type !== type) return false;
      if (status !== "all" && r.status !== status) return false;
      if (r.price > price[0]) return false;
      return true;
    });
  }, [q, type, status, price]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PublicNav />

      <section className="border-b border-border bg-secondary/30">
        <div className="container-app py-10">
          <h1 className="font-display text-4xl md:text-5xl">Find your room</h1>
          <p className="mt-2 text-muted-foreground max-w-xl">Browse all rooms at GLG Suite. Filter by type, price, and availability.</p>
        </div>
      </section>

      <section className="container-app py-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        {/* Filters */}
        <aside className="space-y-6 lg:sticky lg:top-20 lg:self-start">
          <div>
            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Search</label>
            <div className="relative mt-2">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Room name..." className="pl-9" />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Type</label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                <SelectItem value="Single">Single</SelectItem>
                <SelectItem value="Double">Double</SelectItem>
                <SelectItem value="Studio">Studio</SelectItem>
                <SelectItem value="Shared">Shared</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Availability</label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="Occupied">Occupied</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <div className="flex justify-between">
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Max price</label>
              <span className="text-xs text-muted-foreground">₱{price[0].toLocaleString()}</span>
            </div>
            <Slider value={price} onValueChange={setPrice} min={1000} max={10000} step={500} className="mt-3" />
          </div>
          <Button variant="outline" className="w-full" onClick={() => { setQ(""); setType("all"); setStatus("all"); setPrice([8000]); }}>
            Reset filters
          </Button>
        </aside>

        {/* Results */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-muted-foreground">{filtered.length} room{filtered.length !== 1 ? "s" : ""} found</p>
          </div>
          {filtered.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((r) => <RoomCard key={r.id} room={r} />)}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border p-16 text-center">
              <h3 className="font-medium">No rooms match your filters</h3>
              <p className="mt-1 text-sm text-muted-foreground">Try adjusting price or availability.</p>
            </div>
          )}
        </div>
      </section>

      <PublicFooter />
    </div>
  );
};

export default Rooms;
