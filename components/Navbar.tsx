"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";
import { supabase } from "@/lib/supabase";
import WalletConnect from "@/components/WalletConnect";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

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
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className="sticky top-0 z-50 w-full bg-transparent backdrop-blur-md border-b"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
          TaskFi
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              className="text-gray-300 hover:text-green-400 transition-colors duration-300 font-medium relative group"
            >
              {link.name}
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-green-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
          ))}
          {connected && userRole === "freelancer" && (
            <Link
              href="/freelancer/dashboard"
              className="text-gray-300 hover:text-purple-400 transition-colors duration-300 font-medium relative group"
            >
              Freelancer Dashboard
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-purple-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
          )}
          {connected && userRole === "hirer" && (
            <Link
              href="/hirer/jobs"
              className="text-gray-300 hover:text-indigo-400 transition-colors duration-300 font-medium relative group"
            >
              Hirer Jobs
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-indigo-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
          )}
        </div>

        {/* Wallet Button */}
        <div className="hidden md:block">
          <WalletConnect />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-300 hover:text-green-400 transition-colors duration-300"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-gray-900/90 border-t border-gray-800 px-6 py-4 space-y-4"
        >
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              className="block text-gray-300 hover:text-green-400 transition-colors duration-300 font-medium py-2"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          {connected && userRole === "freelancer" && (
            <Link
              href="/freelancer/dashboard"
              className="block text-gray-300 hover:text-purple-400 transition-colors duration-300 font-medium py-2"
              onClick={() => setMenuOpen(false)}
            >
              Freelancer Dashboard
            </Link>
          )}
          {connected && userRole === "hirer" && (
            <Link
              href="/hirer/jobs"
              className="block text-gray-300 hover:text-indigo-400 transition-colors duration-300 font-medium py-2"
              onClick={() => setMenuOpen(false)}
            >
              Hirer Jobs
            </Link>
          )}
          <div className="pt-4 border-t border-gray-700">
            <WalletConnect />
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
