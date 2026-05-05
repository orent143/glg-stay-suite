import { useState } from "react";
import { Plus, Pencil, Trash2, MoreHorizontal } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { StatusBadge } from "@/components/StatusBadge";
import { rooms as initial, formatPHP, type Room } from "@/lib/mock-data";
import { toast } from "@/hooks/use-toast";

function RoomFormDialog({ open, onOpenChange, room }: { open: boolean; onOpenChange: (v: boolean) => void; room?: Room }) {
  const editing = !!room;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{editing ? "Edit room" : "Add new room"}</DialogTitle>
        </DialogHeader>
        <form className="grid gap-4" onSubmit={(e) => { e.preventDefault(); onOpenChange(false); toast({ title: editing ? "Room updated" : "Room added" }); }}>
          <div className="grid gap-2">
            <Label htmlFor="rname">Name</Label>
            <Input id="rname" defaultValue={room?.name} required placeholder="Sunrise Single Room" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-2">
              <Label>Type</Label>
              <Select defaultValue={room?.type ?? "Single"}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Single">Single</SelectItem>
                  <SelectItem value="Double">Double</SelectItem>
                  <SelectItem value="Studio">Studio</SelectItem>
                  <SelectItem value="Shared">Shared</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Status</Label>
              <Select defaultValue={room?.status ?? "Available"}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Occupied">Occupied</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="grid gap-2">
              <Label htmlFor="rprice">Price (PHP)</Label>
              <Input id="rprice" type="number" defaultValue={room?.price ?? 3500} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="rcap">Capacity</Label>
              <Input id="rcap" type="number" defaultValue={room?.capacity ?? 1} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="rarea">Area</Label>
              <Input id="rarea" defaultValue={room?.area ?? "12 sqm"} required />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="rdesc">Description</Label>
            <Textarea id="rdesc" defaultValue={room?.description} rows={3} />
          </div>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit">{editing ? "Save changes" : "Add room"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function RoomsAdmin() {
  const [list] = useState(initial);
  const [openAdd, setOpenAdd] = useState(false);
  const [editing, setEditing] = useState<Room | undefined>();

  return (
    <div className="container-app py-8">
      <PageHeader
        title="Rooms"
        description="Manage all rooms in your boarding house."
        actions={<Button onClick={() => setOpenAdd(true)}><Plus className="h-4 w-4 mr-1.5" /> Add room</Button>}
      />

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/40 hover:bg-secondary/40">
              <TableHead>Room</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.map((r) => (
              <TableRow key={r.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-14 overflow-hidden rounded-md bg-muted shrink-0">
                      <img src={r.image} alt="" className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <div className="font-medium">{r.name}</div>
                      <div className="text-xs text-muted-foreground">{r.id} · {r.area}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm">{r.type}</TableCell>
                <TableCell className="text-sm">{r.capacity} pax</TableCell>
                <TableCell className="text-sm font-medium">{formatPHP(r.price)}</TableCell>
                <TableCell><StatusBadge status={r.status} /></TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setEditing(r)}><Pencil className="h-3.5 w-3.5 mr-2" /> Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-status-danger focus:text-status-danger" onClick={() => toast({ title: "Room deleted" })}>
                        <Trash2 className="h-3.5 w-3.5 mr-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <RoomFormDialog open={openAdd} onOpenChange={setOpenAdd} />
      <RoomFormDialog open={!!editing} onOpenChange={(v) => !v && setEditing(undefined)} room={editing} />
    </div>
  );
}
