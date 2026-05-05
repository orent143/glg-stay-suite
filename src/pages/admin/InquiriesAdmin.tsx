import { useState } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { inquiries } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Reply, Archive, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const initials = (name: string) => name.split(" ").map(n => n[0]).slice(0,2).join("");

export default function InquiriesAdmin() {
  const [activeId, setActiveId] = useState(inquiries[0].id);
  const active = inquiries.find(i => i.id === activeId)!;

  return (
    <div className="container-app py-8">
      <PageHeader title="Inquiries" description="Messages submitted through the public contact form." />
      <div className="grid gap-0 lg:grid-cols-[360px_1fr] rounded-xl border border-border bg-card overflow-hidden min-h-[600px]">
        {/* Inbox list */}
        <ul className="border-b lg:border-b-0 lg:border-r border-border divide-y divide-border max-h-[640px] overflow-y-auto">
          {inquiries.map((i) => (
            <li key={i.id}>
              <button
                onClick={() => setActiveId(i.id)}
                className={cn(
                  "w-full text-left p-4 transition-colors hover:bg-secondary/60",
                  activeId === i.id && "bg-secondary",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <Avatar className="h-9 w-9 shrink-0"><AvatarFallback className="text-xs">{initials(i.name)}</AvatarFallback></Avatar>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium truncate">{i.name}</span>
                        {i.unread && <span className="h-1.5 w-1.5 rounded-full bg-status-info shrink-0" />}
                      </div>
                      <div className="text-sm truncate mt-0.5">{i.subject}</div>
                      <div className="text-xs text-muted-foreground truncate mt-0.5">{i.preview}</div>
                    </div>
                  </div>
                  <span className="text-[11px] text-muted-foreground shrink-0">{i.receivedAt}</span>
                </div>
              </button>
            </li>
          ))}
        </ul>

        {/* Conversation panel */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between p-5 border-b border-border">
            <div>
              <div className="text-base font-semibold">{active.subject}</div>
              <div className="text-xs text-muted-foreground mt-0.5">From {active.name} · {active.email}</div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8"><Archive className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" className="h-8 w-8"><Trash2 className="h-4 w-4" /></Button>
            </div>
          </div>
          <div className="p-6 flex-1 overflow-auto">
            <div className="flex items-start gap-3 max-w-2xl">
              <Avatar className="h-9 w-9"><AvatarFallback className="text-xs">{initials(active.name)}</AvatarFallback></Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">{active.name}</span>
                  <span>·</span>
                  <span>{active.receivedAt}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed">{active.body}</p>
              </div>
            </div>
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); (e.target as HTMLFormElement).reset(); toast({ title: "Reply sent" }); }}
            className="border-t border-border p-4 bg-secondary/30"
          >
            <Textarea required placeholder={`Reply to ${active.name.split(" ")[0]}...`} rows={3} className="bg-background" />
            <div className="mt-3 flex justify-end">
              <Button type="submit"><Reply className="h-4 w-4 mr-1.5" /> Send reply</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
