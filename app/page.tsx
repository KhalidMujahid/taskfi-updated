"use client";

import React from "react";
import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";
import { supabase } from "@/lib/supabase";
import WalletConnect from "@/components/WalletConnect";

const HomePage: React.FC = () => {
  const { connected, publicKey } = useWallet();
  const [userRole, setUserRole] = React.useState<string>("");

  React.useEffect(() => {
    const fetchUserRole = async () => {
      if (connected) {
        const { data: user } = await supabase
          .from("users")
          .select("role")
          .eq("wallet_address", publicKey?.toBase58())
          .single();

        if (user) {
          setUserRole(user.role);
        }
      }
    };

    fetchUserRole();
  }, [connected, publicKey]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <section className="flex flex-col items-center text-center px-6 mt-16">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
          Freelancing. <span className="text-indigo-400">Decentralized.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8">
          Secure gigs, instant payments, and full trustless escrow powered by{" "}
          <span className="text-indigo-300 font-semibold">Solana</span>.
        </p>
        {!connected && (
          <div className="p-6 bg-gray-800/70 rounded-2xl shadow-lg border border-gray-700 max-w-md text-center">
            <p className="mb-4 text-gray-300">
              🚀 Connect your wallet to get started
            </p>
            <WalletConnect />
          </div>
        )}
      </section>

      <section className="mt-20 px-6 grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
        {[
          {
            title: "Secure Escrow",
            desc: "Funds are locked in smart contracts until milestones are met.",
            icon: "🛡️",
          },
          {
            title: "Global Talent",
            desc: "Hire freelancers from anywhere, pay instantly in crypto.",
            icon: "🌍",
          },
          {
            title: "Fair Payments",
            desc: "No middlemen. Low fees. Instant settlement on Solana.",
            icon: "⚡",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-gray-800 rounded-2xl p-6 text-center shadow-lg hover:scale-105 transition"
          >
            <div className="text-4xl mb-4">{item.icon}</div>
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-gray-400">{item.desc}</p>
          </div>
        ))}
      </section>

      <section className="mt-20 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">How It Works</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              step: "1",
              title: "Connect Wallet",
              desc: "Sign in with your Solana wallet securely.",
            },
            {
              step: "2",
              title: "Post / Apply",
              desc: "Hirers post gigs, freelancers apply to work.",
            },
            {
              step: "3",
              title: "Escrow & Deliver",
              desc: "Funds are held until the job is done.",
            },
          ].map((s, idx) => (
            <div
              key={idx}
              className="bg-gray-800 rounded-2xl p-6 shadow-lg hover:scale-105 transition"
            >
              <div className="text-indigo-400 text-3xl font-extrabold mb-4">
                {s.step}
              </div>
              <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-gray-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {connected && (
        <section className="mt-20 px-6 w-full max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Your Dashboard
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {userRole === "freelancer" && (
              <Link
                href="/freelancer/dashboard"
                className="block px-6 py-5 text-center rounded-xl bg-indigo-500 hover:bg-indigo-600 transition transform hover:scale-105 shadow-lg font-semibold"
              >
                ✨ Create a Gig
              </Link>
            )}

            {userRole === "hirer" && (
              <Link
                href="/gigs"
                className="block px-6 py-5 text-center rounded-xl bg-green-500 hover:bg-green-600 transition transform hover:scale-105 shadow-lg font-semibold"
              >
                🔍 Browse Gigs
              </Link>
            )}

            <Link
              href="/gigs"
              className="block px-6 py-5 text-center rounded-xl bg-gray-700 hover:bg-gray-600 transition transform hover:scale-105 shadow-lg font-semibold"
            >
              🌍 Explore All Gigs
            </Link>
          </div>
        </section>
      )}

      <footer className="mt-24 py-8 border-t border-gray-700 text-center text-gray-400 text-sm">
        <p>
          Built with ❤️ on Solana •
          <Link href="/about" className="hover:text-indigo-400 transition">
            About
          </Link>{" "}
          •
          <Link href="/contact" className="hover:text-indigo-400 transition">
            Contact
          </Link>
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
