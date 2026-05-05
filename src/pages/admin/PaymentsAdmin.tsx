import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/StatusBadge";
import { payments, formatPHP } from "@/lib/mock-data";
import { Download } from "lucide-react";

export default function PaymentsAdmin() {
  const totals = {
    paid: payments.filter(p=>p.status==="Paid").reduce((a,p)=>a+p.amount,0),
    unpaid: payments.filter(p=>p.status==="Unpaid").reduce((a,p)=>a+p.amount,0),
    overdue: payments.filter(p=>p.status==="Overdue").reduce((a,p)=>a+p.amount,0),
  };
  return (
    <div className="container-app py-8">
      <PageHeader
        title="Payments"
        description="Track rent collections, due dates, and outstanding balances."
        actions={<Button variant="outline"><Download className="h-4 w-4 mr-1.5" /> Export</Button>}
      />
      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        {[
          { label: "Collected this month", value: totals.paid, tone: "" },
          { label: "Pending", value: totals.unpaid, tone: "" },
          { label: "Overdue", value: totals.overdue, tone: "text-status-danger" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-5">
            <div className="text-sm text-muted-foreground">{s.label}</div>
            <div className={`mt-2 text-2xl font-semibold ${s.tone}`}>{formatPHP(s.value)}</div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/40 hover:bg-secondary/40">
              <TableHead>Reference</TableHead>
              <TableHead>Tenant</TableHead>
              <TableHead>Room</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Due date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-mono text-xs">{p.id}</TableCell>
                <TableCell className="font-medium text-sm">{p.tenant}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{p.roomName}</TableCell>
                <TableCell className="text-sm font-medium">{formatPHP(p.amount)}</TableCell>
                <TableCell className="text-sm">{p.dueDate}</TableCell>
                <TableCell><StatusBadge status={p.status} /></TableCell>
                <TableCell className="text-right">
                  {p.status !== "Paid" ? (
                    <Button size="sm" variant="outline">Mark paid</Button>
                  ) : (
                    <Button size="sm" variant="ghost">Receipt</Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
