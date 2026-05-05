import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/StatusBadge";
import { tenants } from "@/lib/mock-data";
import { Plus } from "lucide-react";

const initials = (name: string) => name.split(" ").map(n => n[0]).slice(0,2).join("");

export default function TenantsAdmin() {
  return (
    <div className="container-app py-8">
      <PageHeader
        title="Tenants"
        description="All current and past tenants of GLG Suite."
        actions={<Button><Plus className="h-4 w-4 mr-1.5" /> Add tenant</Button>}
      />
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/40 hover:bg-secondary/40">
              <TableHead>Tenant</TableHead>
              <TableHead>Assigned Room</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Move-in</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tenants.map((t) => (
              <TableRow key={t.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9"><AvatarFallback className="text-xs">{initials(t.name)}</AvatarFallback></Avatar>
                    <div>
                      <div className="font-medium">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.id}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm">{t.roomName}</TableCell>
                <TableCell className="text-sm">{t.contact}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{t.moveInDate}</TableCell>
                <TableCell><StatusBadge status={t.status} /></TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="ghost">View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
