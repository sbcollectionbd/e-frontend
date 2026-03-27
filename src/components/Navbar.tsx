"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <header className="sticky top-0 z-50 bg-background/70 backdrop-blur-xl border-b border-border/50">
      <div className="container flex items-center justify-between h-16">
        
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-2xl font-extrabold tracking-tight text-foreground"
        >
          FASHION<span className="gradient-text">BD</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          <Link
            href="/category/men"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              isActive("/category/men")
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            Men
          </Link>

          <Link
            href="/category/women"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              isActive("/category/women")
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            Women
          </Link>

          <Link
            href="/track-order"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
              isActive("/track-order")
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            <MapPin className="h-3.5 w-3.5" /> Track Order
          </Link>
        </nav>

        {/* Mobile Button */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="md:hidden border-t bg-background/95 backdrop-blur-xl p-4 flex flex-col gap-1">
          <Link
            href="/category/men"
            onClick={() => setMobileOpen(false)}
            className="text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary px-4 py-3 rounded-xl transition-colors"
          >
            Men's Collection
          </Link>

          <Link
            href="/category/women"
            onClick={() => setMobileOpen(false)}
            className="text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary px-4 py-3 rounded-xl transition-colors"
          >
            Women's Collection
          </Link>

          <Link
            href="/track-order"
            onClick={() => setMobileOpen(false)}
            className="text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary px-4 py-3 rounded-xl transition-colors flex items-center gap-2"
          >
            <MapPin className="h-4 w-4" /> Track Order
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Navbar;