import { Outlet } from "react-router-dom";
import { Bell, Search } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

export default function AdminLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-secondary/30">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="sticky top-0 z-30 h-14 flex items-center justify-between gap-4 border-b border-border bg-background/90 backdrop-blur px-4">
            <div className="flex items-center gap-2 min-w-0">
              <SidebarTrigger />
              <div className="hidden md:flex items-center gap-2 ml-2 max-w-md w-full">
                <div className="relative w-full">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search rooms, tenants, bookings..." className="pl-9 h-9 bg-secondary/50 border-transparent" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative rounded-md p-2 hover:bg-secondary" aria-label="Notifications">
                <Bell className="h-4 w-4" />
                <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-status-danger" />
              </button>
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs">RJ</AvatarFallback>
              </Avatar>
            </div>
          </header>
          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
