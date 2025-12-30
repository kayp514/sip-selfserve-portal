"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { HeaderUserActions } from "@/components/header-user-actions";

export function DashboardNavigationMenu() {
  const pathname = usePathname();

  const menuItems = [
    { href: "/dashboard", label: "Overview" },
    { href: "/dashboard/carrier", label: "Carrier" },
    { href: "/dashboard/trunk", label: "Trunk" },
    { href: "/dashboard/phone-did", label: "Phone Numbers" },
    { href: "/dashboard/subscribers", label: "Subscribers" },
    { href: "/dashboard/settings", label: "Settings" },
  ];

  return (
    <header className="border-b bg-card shadow-sm">
      <div className="flex items-center justify-between px-8">
        <div className="flex items-center gap-12 h-16">
          <nav className="flex items-stretch h-full -mb-px">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  href={item.href}
                  key={item.href}
                  className={cn(
                    "flex items-center px-4 font-medium text-sm transition-all relative border-b-2",
                    isActive
                      ? "text-primary border-primary bg-accent/50"
                      : "text-muted-foreground border-transparent hover:text-foreground hover:bg-accent/30"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <HeaderUserActions />
      </div>
    </header>
  );
}
