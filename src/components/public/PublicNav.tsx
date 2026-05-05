import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/rooms", label: "Rooms" },
  { to: "/inquiry", label: "Contact" },
  { to: "/admin", label: "Owner Portal" },
];

export function PublicNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container-app flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="leading-tight">
            <h1 className="font-display font-light text-[23px]">GLG Suite</h1>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                cn(
                  "rounded-md px-3 py-2 text-l font-light transition-colors",
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Button asChild size="sm">
            <Link to="/rooms" className="font-extralight">Browse Rooms</Link>
          </Button>
        </div>

        <button className="md:hidden p-2" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container-app py-3 flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "rounded-md px-3 py-2 text-sm font-medium",
                    isActive ? "bg-secondary text-foreground" : "text-muted-foreground",
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Button asChild size="sm" className="mt-2">
              <Link to="/rooms" onClick={() => setOpen(false)} className="font-display">Browse Rooms</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
