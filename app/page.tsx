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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 text-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center px-6 mt-20">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
          Freelancing. <span className="text-indigo-400">Redefined.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mb-10">
          Work and hire in a decentralized way. Powered by{" "}
          <span className="text-indigo-300 font-semibold">Solana</span> for
          instant, secure, and low-cost escrow payments.
        </p>

        {/* CTA */}
        {!connected ? (
          <div className="p-8 bg-gray-800/70 rounded-3xl shadow-lg border border-gray-700 max-w-lg text-center">
            <p className="mb-5 text-gray-300 text-lg">
              🚀 Get started by connecting your wallet
            </p>
            <WalletConnect />
          </div>
        ) : (
          <div className="flex gap-6">
            {userRole === "freelancer" && (
              <Link
                href="/freelancer/dashboard"
                className="px-8 py-4 rounded-2xl bg-indigo-500 hover:bg-indigo-600 transition transform hover:scale-105 shadow-lg font-semibold"
              >
                ✨ Create a Gig
              </Link>
            )}
            {userRole === "hirer" && (
              <Link
                href="/gigs"
                className="px-8 py-4 rounded-2xl bg-green-500 hover:bg-green-600 transition transform hover:scale-105 shadow-lg font-semibold"
              >
                🔍 Browse Gigs
              </Link>
            )}
            <Link
              href="/gigs"
              className="px-8 py-4 rounded-2xl bg-gray-700 hover:bg-gray-600 transition transform hover:scale-105 shadow-lg font-semibold"
            >
              🌍 Explore All Gigs
            </Link>
          </div>
        )}
      </section>

      {/* Features */}
      <section className="mt-28 px-6 grid gap-10 md:grid-cols-3 max-w-6xl mx-auto">
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
            className="bg-gray-800 rounded-3xl p-8 text-center shadow-lg hover:scale-105 transition"
          >
            <div className="text-5xl mb-6">{item.icon}</div>
            <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
            <p className="text-gray-400">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* How It Works */}
      <section className="mt-28 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">How It Works</h2>
        <div className="grid gap-10 md:grid-cols-3">
          {[
            {
              step: "1",
              title: "Connect Wallet",
              desc: "Sign in with your Solana wallet securely.",
            },
            {
              step: "2",
              title: "Post or Apply",
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
              className="bg-gray-800 rounded-3xl p-8 shadow-lg hover:scale-105 transition"
            >
              <div className="text-indigo-400 text-4xl font-extrabold mb-6">
                {s.step}
              </div>
              <h3 className="text-2xl font-semibold mb-3">{s.title}</h3>
              <p className="text-gray-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-28 bg-gray-900 border-t border-gray-700 py-14">
        <div className="max-w-6xl mx-auto px-6 grid gap-10 md:grid-cols-4 text-gray-400 text-sm">
          {/* About */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">TaskFi</h4>
            <p className="mb-4">
              The decentralized freelancing marketplace built on Solana. Work
              without borders, get paid without delays.
            </p>
            <p className="text-gray-500 text-xs">
              © {new Date().getFullYear()} TaskFi. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-white font-semibold mb-4">Quick Links</h5>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-indigo-400 transition">
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-indigo-400 transition"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/gigs"
                  className="hover:text-indigo-400 transition"
                >
                  Explore Gigs
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h5 className="text-white font-semibold mb-4">Resources</h5>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://solana.com"
                  target="_blank"
                  className="hover:text-indigo-400 transition"
                >
                  Solana
                </a>
              </li>
              <li>
                <a
                  href="https://docs.taskfi.com"
                  target="_blank"
                  className="hover:text-indigo-400 transition"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="hover:text-indigo-400 transition"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h5 className="text-white font-semibold mb-4">Community</h5>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="hover:text-indigo-400 transition"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-indigo-400 transition"
                >
                  Discord
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-indigo-400 transition"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
