import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Check, Users, Maximize, MapPin } from "lucide-react";
import { PublicNav } from "@/components/public/PublicNav";
import { PublicFooter } from "@/components/public/PublicFooter";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { BookingDialog } from "@/components/public/BookingDialog";
import { rooms, formatPHP } from "@/lib/mock-data";

const RoomDetail = () => {
  const { id } = useParams();
  const room = rooms.find((r) => r.id === id);

  if (!room) {
    return (
      <div className="min-h-screen flex flex-col">
        <PublicNav />
        <div className="container-app py-24 text-center">
          <h1 className="font-display text-4xl">Room not found</h1>
          <Button asChild variant="outline" className="mt-6"><Link to="/rooms">Back to rooms</Link></Button>
        </div>
        <PublicFooter />
      </div>
    );
  }

  const available = room.status === "Available";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PublicNav />
      <section className="container-app py-8">
        <Link to="/rooms" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> All rooms
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_380px]">
          <div>
            <div className="aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-muted">
              <img src={room.image} alt={room.name} className="h-full w-full object-cover" />
            </div>

            <div className="mt-6 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">{room.type}</span>
                  <StatusBadge status={room.status} />
                </div>
                <h1 className="mt-2 font-display text-4xl">{room.name}</h1>
                <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5"><Users className="h-4 w-4" /> Up to {room.capacity} pax</span>
                  <span className="inline-flex items-center gap-1.5"><Maximize className="h-4 w-4" /> {room.area}</span>
                  <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" /> Digos City, Davao del Sur</span>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-border pt-8">
              <h2 className="text-lg font-semibold">About this room</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">{room.description}</p>
            </div>

            <div className="mt-8 border-t border-border pt-8">
              <h2 className="text-lg font-semibold">What's included</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {room.amenities.map((a) => (
                  <li key={a} className="flex items-center gap-3 text-sm">
                    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-secondary">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    {a}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 border-t border-border pt-8">
              <h2 className="text-lg font-semibold">House rules</h2>
              <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
                <li>• Quiet hours from 10PM to 6AM</li>
                <li>• No overnight guests without prior arrangement</li>
                <li>• Smoking allowed only in designated areas</li>
                <li>• Monthly rent due every 5th of the month</li>
              </ul>
            </div>
          </div>

          {/* Booking sticky panel */}
          <aside className="lg:sticky lg:top-20 lg:self-start">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-semibold">{formatPHP(room.price)}</span>
                <span className="text-sm text-muted-foreground">/ month</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Inclusive of water and Wi-Fi</p>

              <div className="mt-5 grid gap-3">
                <BookingDialog
                  room={room}
                  trigger={<Button size="lg" className="w-full" disabled={!available}>{available ? "Request to book" : "Currently unavailable"}</Button>}
                />
                <Button asChild variant="outline" size="lg" className="w-full">
                  <Link to="/inquiry">Send an inquiry</Link>
                </Button>
              </div>

              <div className="mt-6 border-t border-border pt-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Deposit</span><span>1 month</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Advance</span><span>1 month</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Min. stay</span><span>3 months</span></div>
              </div>
            </div>
          </aside>
        </div>
      </section>
      <PublicFooter />
    </div>
  );
};

export default RoomDetail;
