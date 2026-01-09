"use client";

import Link from "next/link";
import { useState } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { LuShoppingCart } from "react-icons/lu";
import { FiMenu, FiX } from "react-icons/fi";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems } = useCart();

  const links = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "Membership", href: "/membership" },
    { name: "About", href: "/aboutus" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="flex top-0 z-50 w-full bg-white shadow-sm fixed">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* LOGO */}
          <Link href={"/"} className="flex items-center gap-2 cursor-pointer">
            <div className="w-10 h-10 bg-linear-to-br from-[#FF7A00] to-[#FF5722] rounded-xl flex items-center justify-center">
              <span className="text-white text-xl">🍜</span>
            </div>
            <h1 className="hidden md:block text-[#FF7A00] text-lg font-semibold">
              Rumah Makan
            </h1>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden md:flex items-center gap-6">
            {links.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-[#FF7A00] transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-3 md:gap-4">
            <Link href={"/cart"} className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
              <LuShoppingCart className="w-5 h-5 text-gray-600" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF7A00] text-white rounded-full flex items-center justify-center text-xs">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Link>

            <Link
              href="/profile"
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <IoPersonOutline className="w-5 h-5 text-gray-700" />
              <span className="hidden md:inline">Profile</span>
            </Link>

            {/* MOBILE MENU BUTTON */}
            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? (
                <FiX className="w-5 h-5 text-gray-700" />
              ) : (
                <FiMenu className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div className="md:hidden bg-white py-4 flex flex-col gap-4 px-2 border-t">
            {links.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-[#FF7A00] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

