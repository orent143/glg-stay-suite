import { useState } from "react";
import { Check, X } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { StatusBadge } from "@/components/StatusBadge";
import { bookings, type Booking } from "@/lib/mock-data";
import { toast } from "@/hooks/use-toast";

export default function BookingsAdmin() {
  const [tab, setTab] = useState("all");
  const [selected, setSelected] = useState<Booking | null>(null);

  const filtered = tab === "all" ? bookings : bookings.filter(b => b.status.toLowerCase() === tab);

  return (
    <div className="container-app py-8">
      <PageHeader title="Bookings" description="Review and respond to incoming booking requests." />

      <Tabs value={tab} onValueChange={setTab} className="mb-5">
        <TabsList>
          <TabsTrigger value="all">All ({bookings.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({bookings.filter(b=>b.status==="Pending").length})</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/40 hover:bg-secondary/40">
              <TableHead>Booking</TableHead>
              <TableHead>Room</TableHead>
              <TableHead>Check-in</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((b) => (
              <TableRow key={b.id} className="cursor-pointer" onClick={() => setSelected(b)}>
                <TableCell>
                  <div className="font-medium">{b.guestName}</div>
                  <div className="text-xs text-muted-foreground">{b.id} · {b.email}</div>
                </TableCell>
                <TableCell className="text-sm">{b.roomName}</TableCell>
                <TableCell className="text-sm">{b.checkIn}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{b.submittedAt}</TableCell>
                <TableCell><StatusBadge status={b.status} /></TableCell>
                <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                  {b.status === "Pending" ? (
                    <div className="flex items-center justify-end gap-1.5">
                      <Button size="sm" variant="outline" onClick={() => toast({ title: "Booking approved" })}>
                        <Check className="h-3.5 w-3.5 mr-1" /> Approve
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => toast({ title: "Booking rejected" })}>
                        <X className="h-3.5 w-3.5 mr-1" /> Reject
                      </Button>
                    </div>
                  ) : (
                    <Button size="sm" variant="ghost" onClick={() => setSelected(b)}>View</Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow><TableCell colSpan={6} className="text-center text-sm text-muted-foreground py-12">No bookings in this category.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Sheet open={!!selected} onOpenChange={(v) => !v && setSelected(null)}>
        <SheetContent className="sm:max-w-md">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle>{selected.guestName}</SheetTitle>
                <SheetDescription>{selected.id} · submitted {selected.submittedAt}</SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-5 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <StatusBadge status={selected.status} />
                </div>
                <div className="grid gap-3">
                  {[
                    ["Email", selected.email],
                    ["Phone", selected.phone],
                    ["Room", selected.roomName],
                    ["Check-in", selected.checkIn],
                    ["Duration", selected.duration],
                  ].map(([k,v]) => (
                    <div key={k} className="flex justify-between border-b border-border pb-2">
                      <span className="text-muted-foreground">{k}</span>
                      <span className="font-medium text-right">{v}</span>
                    </div>
                  ))}
                </div>
                {selected.message && (
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Message</div>
                    <p className="rounded-md bg-secondary p-3 text-sm">{selected.message}</p>
                  </div>
                )}
                {selected.status === "Pending" && (
                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1" onClick={() => { setSelected(null); toast({ title: "Booking approved" }); }}>Approve</Button>
                    <Button className="flex-1" variant="outline" onClick={() => { setSelected(null); toast({ title: "Booking rejected" }); }}>Reject</Button>
                  </div>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
