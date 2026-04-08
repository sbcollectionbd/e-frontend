import { MapPin, Phone, Truck } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-secondary/30 mt-auto">
      <div className="container py-12 grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
        <div className="md:col-span-1">
          <h3 className="font-display text-xl font-extrabold mb-3">
            FASHION<span className="gradient-text">BD</span>
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Premium Bangladeshi clothing for Men & Women. Quality fashion
            delivered to your doorstep with care.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-4 text-foreground">
            Collections
          </h4>
          <div className="flex flex-col gap-2.5 text-sm text-muted-foreground">
            <Link
              href="/category/men"
              className="hover:text-primary transition-colors"
            >
              Men&apos;s Collection
            </Link>
            <Link
              href="/category/women"
              className="hover:text-primary transition-colors"
            >
              Women&apos;s Collection
            </Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-4 text-foreground">
            Delivery Info
          </h4>
          <div className="text-sm text-muted-foreground space-y-2.5">
            <p className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-primary" /> Inside Dhaka: ৳60
            </p>
            <p className="flex items-center gap-2">
              <Truck className="h-3.5 w-3.5 text-primary" /> Outside Dhaka: ৳120
            </p>
            <p className="flex items-center gap-2">💵 Cash on Delivery</p>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-4 text-foreground">
            Support
          </h4>
          <div className="text-sm text-muted-foreground space-y-2.5">
            <Link
              href="/track-order"
              className="hover:text-primary transition-colors flex items-center gap-2"
            >
              <Phone className="h-3.5 w-3.5 text-primary" /> Track Your Order
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} FashionBD. All rights reserved.
      </div>
    </footer>
  );
}
