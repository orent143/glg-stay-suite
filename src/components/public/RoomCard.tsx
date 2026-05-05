import { Link } from "react-router-dom";
import { Users, Maximize } from "lucide-react";
import { type Room, formatPHP } from "@/lib/mock-data";
import { StatusBadge } from "@/components/StatusBadge";

export function RoomCard({ room }: { room: Room }) {
  return (
    <Link
      to={`/rooms/${room.id}`}
      className="group block overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-foreground/20 hover:shadow-sm"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={room.image}
          alt={room.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute left-3 top-3">
          <StatusBadge status={room.status} className="bg-background/95 backdrop-blur" />
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">{room.type}</div>
            <h3 className="mt-0.5 text-base font-semibold leading-snug">{room.name}</h3>
          </div>
          <div className="text-right">
            <div className="text-base font-semibold">{formatPHP(room.price)}</div>
            <div className="text-xs text-muted-foreground">/ month</div>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> {room.capacity} pax</span>
          <span className="inline-flex items-center gap-1.5"><Maximize className="h-3.5 w-3.5" /> {room.area}</span>
        </div>
      </div>
    </Link>
  );
}
