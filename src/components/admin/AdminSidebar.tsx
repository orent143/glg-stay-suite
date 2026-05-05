import { NavLink, Link } from "react-router-dom";
import { LayoutDashboard, BedDouble, CalendarCheck, Users, Wallet, Inbox, Home as HomeIcon } from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const items = [
  { title: "Overview", url: "/admin", icon: LayoutDashboard, end: true },
  { title: "Rooms", url: "/admin/rooms", icon: BedDouble },
  { title: "Bookings", url: "/admin/bookings", icon: CalendarCheck },
  { title: "Tenants", url: "/admin/tenants", icon: Users },
  { title: "Payments", url: "/admin/payments", icon: Wallet },
  { title: "Inquiries", url: "/admin/inquiries", icon: Inbox },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <Link to="/admin" className="flex items-center gap-2 px-2 py-1.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
            <HomeIcon className="h-4 w-4" />
          </div>
          {!collapsed && (
            <div className="leading-tight">
              <div className="text-sm font-semibold">GLG Suite</div>
              <div className="text-[11px] text-sidebar-foreground/60">Owner Portal</div>
            </div>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Manage</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.end}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-2 rounded-md px-2 py-2 text-sm",
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                            : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
                        )
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <Link
          to="/"
          className={cn(
            "flex items-center gap-2 rounded-md px-2 py-2 text-sm text-sidebar-foreground/80 hover:bg-sidebar-accent/60",
          )}
        >
          <HomeIcon className="h-4 w-4" />
          {!collapsed && <span>View public site</span>}
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
