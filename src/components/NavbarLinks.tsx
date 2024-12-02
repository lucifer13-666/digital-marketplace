"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const navbarLinks = [
  {
    id: 0,
    name: "Home",
    href: "/",
  },
  {
    id: 1,
    name: "Templates",
    href: "/products/template",
  },
  {
    id: 2,
    name: "Ui Kits",
    href: "/products/uikit",
  },
  {
    id: 3,
    name: "Icons",
    href: "/products/icon",
  },
];

export default function NavbarLinks() {
  const location = usePathname();

  return (
    <div className="hidden md:flex justify-center items-center col-span-6 gap-x-2">
      {navbarLinks.map((link) => (
        <Link
          href={link.href}
          key={link.id}
          className={cn(
            location === link.href
              ? "bg-muted"
              : "hover:bg-muted hover:bg-opacity-75",
            "group flex items-center px-2 py-2 font-medium rounded-md"
          )}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
}
