import { BedDouble, CheckCircle2, DoorOpen, Clock, AlertCircle, ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { rooms, bookings, payments, formatPHP } from "@/lib/mock-data";

const stats = [
  { label: "Total Rooms", value: rooms.length, icon: BedDouble, hint: "Across all units" },
  { label: "Available", value: rooms.filter(r => r.status === "Available").length, icon: CheckCircle2, hint: "Ready to book" },
  { label: "Occupied", value: rooms.filter(r => r.status === "Occupied").length, icon: DoorOpen, hint: "Currently rented" },
  { label: "Pending Bookings", value: bookings.filter(b => b.status === "Pending").length, icon: Clock, hint: "Awaiting review" },
];

export default function Dashboard() {
  const recentBookings = bookings.slice(0, 4);
  const overduePayments = payments.filter(p => p.status === "Overdue");

  return (
    <div className="container-app py-8">
      <PageHeader
        title="Welcome back, Owner"
        description="Here's what's happening at Casa Digos today — May 5, 2026."
        actions={<Button asChild><Link to="/admin/rooms">Add new room</Link></Button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
                <div className="mt-2 text-3xl font-semibold tracking-tight">{s.value}</div>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
                <s.icon className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3 text-xs text-muted-foreground">{s.hint}</div>
          </div>
        ))}
      </div>

      {overduePayments.length > 0 && (
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-status-danger/20 bg-status-danger-bg/40 p-4">
          <AlertCircle className="mt-0.5 h-4 w-4 text-status-danger" />
          <div className="flex-1">
            <div className="text-sm font-medium">{overduePayments.length} overdue payment{overduePayments.length > 1 ? "s" : ""}</div>
            <div className="text-xs text-muted-foreground mt-0.5">Total amount: {formatPHP(overduePayments.reduce((a,p)=>a+p.amount,0))}</div>
          </div>
          <Button asChild size="sm" variant="outline"><Link to="/admin/payments">Review</Link></Button>
        </div>
      )}

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between p-5 border-b border-border">
            <div>
              <h2 className="text-base font-semibold">Recent booking requests</h2>
              <p className="text-xs text-muted-foreground mt-0.5">New requests submitted via the public site.</p>
            </div>
            <Link to="/admin/bookings" className="text-xs font-medium inline-flex items-center gap-1 hover:underline">
              View all <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <ul className="divide-y divide-border">
            {recentBookings.map((b) => (
              <li key={b.id} className="flex items-center justify-between gap-4 p-4">
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">{b.guestName}</div>
                  <div className="text-xs text-muted-foreground truncate">{b.roomName} · check-in {b.checkIn}</div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-muted-foreground hidden sm:inline">{b.submittedAt}</span>
                  <StatusBadge status={b.status} />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-border bg-card">
          <div className="p-5 border-b border-border">
            <h2 className="text-base font-semibold">Occupancy</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Current room status mix.</p>
          </div>
          <div className="p-5 space-y-4">
            {(["Available","Occupied","Maintenance"] as const).map((s) => {
              const count = rooms.filter(r => r.status === s).length;
              const pct = (count / rooms.length) * 100;
              return (
                <div key={s}>
                  <div className="flex justify-between text-sm">
                    <span>{s}</span>
                    <span className="text-muted-foreground">{count} / {rooms.length}</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                    <div className="h-full bg-foreground/80" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
