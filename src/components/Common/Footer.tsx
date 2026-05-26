import { MapPin, Phone, Truck } from "lucide-react";
import Link from "next/link";

const WHATSAPP_NUMBER = "8801335295494";
const FB_PAGE = "https://web.facebook.com/profile.php?id=61580752964125";

export default function Footer() {
  return (
    <footer className="border-t bg-secondary/30 mt-auto">
      <div className="container py-12 grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
        {/* Brand */}
        <div className="md:col-span-1">
          <h3 className="font-display text-xl font-extrabold mb-3">
            SB COLLECTION <span className="gradient-text">BD</span>
          </h3>

          <p className="text-sm text-muted-foreground leading-relaxed">
            Premium Bangladeshi clothing for Men & Women. Quality fashion
            delivered to your doorstep with care.
          </p>
        </div>

        {/* Collections */}
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

        {/* Delivery Info */}
        <div>
          <h4 className="font-semibold text-sm mb-4 text-foreground">
            Delivery Info
          </h4>

          <div className="text-sm text-muted-foreground space-y-2.5">
            <p className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              Inside Dhaka: ৳60
            </p>

            <p className="flex items-center gap-2">
              <Truck className="h-3.5 w-3.5 text-primary" />
              Outside Dhaka: ৳120
            </p>

            <p className="flex items-center gap-2">💵 Cash on Delivery</p>
          </div>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-semibold text-sm mb-4 text-foreground">
            Support
          </h4>

          <div className="text-sm text-muted-foreground space-y-2.5">
            {/* Track Order */}
            <Link
              href="/track-order"
              className="hover:text-primary transition-colors flex items-center gap-2"
            >
              <Phone className="h-3.5 w-3.5 text-primary" />
              Track Your Order
            </Link>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-600 transition-colors flex items-center text-green-600 gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Us
            </a>

            {/* Facebook */}
            <a
              href={FB_PAGE}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-3.5 w-3.5 text-blue-500"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              SB Collection BD
            </a>
          </div>
        </div>
      </div>

      <div className="border-t py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} SB Collection BD. All rights reserved.
      </div>
    </footer>
  );
}
