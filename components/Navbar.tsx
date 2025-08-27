"use client";
import React from "react";
import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";
import { supabase } from "@/lib/supabase";
import WalletConnect from "@/components/WalletConnect";

const Navbar: React.FC = () => {
  const { publicKey, connected } = useWallet();
  const [userRole, setUserRole] = React.useState<string>("");

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

  return (
    <nav className="sticky top-0 z-50 w-full bg-gray-900/80 backdrop-blur-md border-b border-gray-700 flex justify-between items-center px-6 py-4">
      <Link href="/" className="text-2xl font-bold text-indigo-400">
        TaskFi
      </Link>
      <WalletConnect />
    </nav>
  );
};

export default Navbar;
