"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";
import { supabase } from "@/lib/supabase";
import WalletConnect from "@/components/WalletConnect";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const { publicKey, connected } = useWallet();
  const [userRole, setUserRole] = React.useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);

  React.useEffect(() => {
    const fetchUserRole = async () => {
      if (connected && publicKey) {
        const { data: user } = await supabase
          .from("users")
          .select("role")
          .eq("wallet_address", publicKey.toString())
          .single();

        if (user) {
          setUserRole(user.role);
        }
      }
    };

    fetchUserRole();
  }, [connected, publicKey]);

  const navLinks = [
    { name: "About", href: "/about" },
    { name: "Explore Gigs", href: "/gigs" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold text-indigo-400 tracking-wide">
          TaskFi
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              className="text-gray-300 hover:text-indigo-400 transition font-medium"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Wallet Button */}
        <div className="hidden md:block">
          <WalletConnect />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-300 hover:text-indigo-400 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 px-6 py-4 space-y-4">
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              className="block text-gray-300 hover:text-indigo-400 transition font-medium"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-gray-700">
            <WalletConnect />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
