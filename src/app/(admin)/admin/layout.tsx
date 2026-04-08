"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Store,
  LogOut,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const admin = localStorage.getItem("admin");
    if (!admin) {
      router.push("/login");
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAuthorized(true);
    }
  }, [router]);

  if (!authorized) return null; // Prevent sidebar & content flash

  const menu = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Products", path: "/admin/products", icon: Package },
    { name: "Orders", path: "/admin/orders", icon: ShoppingCart },
  ];

  const handleLogout = () => {
    localStorage.removeItem("admin");
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      <div className="w-64 bg-white border-r flex flex-col justify-between shadow-sm">
        <div className="p-6">
          <h1 className="text-xl font-bold mb-10">
            <span className="text-black">SB Collection</span>{" "}
            <span className="text-orange-500">BD</span>
          </h1>
          <div className="space-y-2">
            {menu.map((item) => {
              const Icon = item.icon;
              const active = path.includes(item.path);
              return (
                <Link key={item.name} href={item.path}>
                  <div
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all
                    ${
                      active
                        ? "bg-orange-500 text-white shadow-md"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Icon size={18} />
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="p-6 border-t space-y-3">
          <Link
            href="/"
            className="flex items-center gap-3 text-gray-600 hover:text-black cursor-pointer"
          >
            <Store size={18} />
            <span className="text-sm">Visit Store</span>
          </Link>

          <div
            onClick={handleLogout}
            className="flex items-center gap-3 text-gray-600 hover:text-red-500 cursor-pointer"
          >
            <LogOut size={18} />
            <span className="text-sm">Logout</span>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-8">{children}</div>
    </div>
  );
}