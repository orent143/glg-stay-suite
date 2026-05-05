import { PublicNav } from "@/components/public/PublicNav";
import { PublicFooter } from "@/components/public/PublicFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin } from "lucide-react";

const Inquiry = () => {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    (e.target as HTMLFormElement).reset();
    toast({ title: "Inquiry sent", description: "We'll respond via email within 24 hours." });
  };
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PublicNav />
      <section className="container-app py-12 md:py-20 grid gap-12 lg:grid-cols-[1fr_420px]">
        <div>
          <h1 className="font-display text-4xl md:text-5xl">Get in touch</h1>
          <p className="mt-3 text-muted-foreground max-w-xl">
            Have a question about a room, pricing, or visiting? Send us a message — we typically reply within a day.
          </p>
          <div className="mt-10 space-y-5">
            {[
              { icon: Mail, label: "Email", value: "orentgultiano11@gmail.com" },
              { icon: Phone, label: "Phone", value: "+63 917 555 0142" },
              { icon: MapPin, label: "Address", value: "Rizal Ave., Digos City, Davao del Sur" },
            ].map((c) => (
              <div key={c.label} className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-secondary">
                  <c.icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{c.label}</div>
                  <div className="mt-0.5 text-sm font-medium">{c.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-4 h-fit">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" required placeholder="Juan Dela Cruz" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="iemail">Email</Label>
            <Input id="iemail" type="email" required placeholder="you@example.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" required placeholder="Inquiry about studio rooms" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="msg">Message</Label>
            <Textarea id="msg" required rows={5} placeholder="Tell us how we can help..." />
          </div>
          <Button type="submit" className="w-full">Send message</Button>
        </form>
      </section>
      <PublicFooter />
    </div>
  );
};

export default Inquiry;
