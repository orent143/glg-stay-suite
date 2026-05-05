import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import type { Room } from "@/lib/mock-data";

export function BookingDialog({ room, trigger }: { room: Room; trigger: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(false);
    toast({ title: "Booking request sent", description: `We'll contact you about ${room.name} within 24 hours.` });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Request to book {room.name}</DialogTitle>
          <DialogDescription>Submit your details and the owner will respond shortly.</DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="fullName">Full name</Label>
            <Input id="fullName" required placeholder="Juan Dela Cruz" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required placeholder="you@example.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" required placeholder="+63 9XX XXX XXXX" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-2">
              <Label htmlFor="checkin">Move-in date</Label>
              <Input id="checkin" type="date" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="duration">Duration</Label>
              <Input id="duration" defaultValue="6 months" required />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message">Message (optional)</Label>
            <Textarea id="message" placeholder="Anything we should know..." rows={3} />
          </div>
          <DialogFooter className="mt-2">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit">Submit request</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
