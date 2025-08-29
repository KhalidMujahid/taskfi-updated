"use client";

import React from "react";
import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";
import { supabase } from "@/lib/supabase";
import WalletConnect from "@/components/WalletConnect";
import { motion } from "framer-motion";

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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative flex flex-col justify-center items-center text-center px-6 h-screen">
        {/* Animated background glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-20 left-1/4 w-72 h-72 bg-indigo-500 rounded-full blur-3xl opacity-20"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2, delay: 1, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-20 right-1/4 w-80 h-80 bg-purple-600 rounded-full blur-3xl opacity-20"
        />

        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-6xl md:text-7xl font-extrabold mb-6 leading-tight z-10"
        >
          The Future of <span className="text-indigo-400">Freelancing</span>
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-lg md:text-2xl text-gray-300 max-w-2xl mb-10 z-10"
        >
          Work without borders. Payments without delays.  
          Escrow-powered gigs secured on{" "}
          <span className="text-indigo-300 font-semibold">Solana blockchain</span>.
        </motion.p>

        {/* CTA */}
        {!connected ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="z-10"
          >
            <WalletConnect />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex gap-6 z-10"
          >
            {userRole === "freelancer" && (
              <Link
                href="/freelancer/dashboard"
                className="px-8 py-4 rounded-full bg-indigo-500 hover:bg-indigo-600 transition transform hover:scale-105 shadow-lg font-semibold"
              >
                ✨ Create a Gig
              </Link>
            )}
            {userRole === "hirer" && (
              <Link
                href="/gigs"
                className="px-8 py-4 rounded-full bg-green-500 hover:bg-green-600 transition transform hover:scale-105 shadow-lg font-semibold"
              >
                🔍 Browse Gigs
              </Link>
            )}
            <Link
              href="/gigs"
              className="px-8 py-4 rounded-full bg-gray-700 hover:bg-gray-600 transition transform hover:scale-105 shadow-lg font-semibold"
            >
              🌍 Explore All Gigs
            </Link>
          </motion.div>
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
          <motion.div
            key={idx}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            viewport={{ once: true }}
            className="bg-gray-800 rounded-3xl p-8 text-center shadow-lg hover:scale-105 transition"
          >
            <div className="text-5xl mb-6">{item.icon}</div>
            <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
            <p className="text-gray-400">{item.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="mt-28 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
        <div className="grid md:grid-cols-5 gap-8">
          {[
            { step: "1", title: "Connect Wallet", desc: "Sign in with your Solana wallet securely." },
            { step: "2", title: "Create Profile", desc: "Set up your freelancer or hirer profile." },
            { step: "3", title: "Post / Apply", desc: "Hirers post gigs, freelancers apply to work." },
            { step: "4", title: "Escrow Secured", desc: "Funds are locked until the job is delivered." },
            { step: "5", title: "Get Paid", desc: "Instant crypto payout after approval." },
          ].map((s, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-800 rounded-3xl p-8 text-center shadow-lg hover:scale-105 transition flex flex-col"
            >
              <div className="text-indigo-400 text-4xl font-extrabold mb-4">{s.step}</div>
              <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
              <p className="text-gray-400">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Email Subscribe Section */}
      <section className="mt-28 px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-10 text-center shadow-lg">
          <h3 className="text-2xl font-bold mb-4">Stay Updated 🚀</h3>
          <p className="text-gray-200 mb-6">
            Enter your email to get notified about new features, updates, and opportunities.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-5 py-3 rounded-full w-full sm:w-2/3 text-gray-900 focus:outline-none"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-gray-900 hover:bg-gray-800 text-white font-semibold transition"
            >
              Notify Me
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-28 bg-gray-900 border-t border-gray-700 py-14">
        <div className="max-w-6xl mx-auto px-6 grid gap-10 md:grid-cols-4 text-gray-400 text-sm">
          {/* About */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">TaskFi</h4>
            <p className="mb-4">
              The decentralized freelancing marketplace built on Solana. Work without borders, get paid without delays.
            </p>
            <p className="text-gray-500 text-xs">
              © {new Date().getFullYear()} TaskFi. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-white font-semibold mb-4">Quick Links</h5>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-indigo-400 transition">About</Link></li>
              <li><Link href="/contact" className="hover:text-indigo-400 transition">Contact</Link></li>
              <li><Link href="/gigs" className="hover:text-indigo-400 transition">Explore Gigs</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h5 className="text-white font-semibold mb-4">Resources</h5>
            <ul className="space-y-2">
              <li><a href="https://solana.com" target="_blank" className="hover:text-indigo-400 transition">Solana</a></li>
              <li><a href="https://docs.taskfi.com" target="_blank" className="hover:text-indigo-400 transition">Documentation</a></li>
              <li><a href="/faq" className="hover:text-indigo-400 transition">FAQ</a></li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h5 className="text-white font-semibold mb-4">Community</h5>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-indigo-400 transition">Twitter</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition">Discord</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition">GitHub</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
