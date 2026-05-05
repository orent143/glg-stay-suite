import { Link } from "react-router-dom";

export function PublicFooter() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container-app py-12 grid gap-8 md:grid-cols-4">
        <div>
          <div className="text-sm font-semibold">Casa Digos</div>
          <p className="mt-2 text-sm text-muted-foreground max-w-xs">
            Comfortable, affordable boarding house accommodations in the heart of Digos City, Davao del Sur.
          </p>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Explore</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/rooms" className="hover:text-foreground text-muted-foreground">All Rooms</Link></li>
            <li><Link to="/inquiry" className="hover:text-foreground text-muted-foreground">Contact</Link></li>
            <li><Link to="/admin" className="hover:text-foreground text-muted-foreground">Owner Portal</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Visit</div>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Rizal Ave., Digos City</li>
            <li>Davao del Sur, 8002</li>
            <li>Open daily, 8AM – 7PM</li>
          </ul>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Contact</div>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>+63 917 555 0142</li>
            <li>hello@casadigos.ph</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-app py-4 text-xs text-muted-foreground flex justify-between">
          <span>© 2026 Casa Digos. All rights reserved.</span>
          <span>Digos City, Philippines</span>
        </div>
      </div>
    </footer>
  );
}
