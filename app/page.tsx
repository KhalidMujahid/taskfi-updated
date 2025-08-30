"use client";

import React from "react";
import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";
import { supabase } from "@/lib/supabase";
import WalletConnect from "@/components/WalletConnect";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield, Globe, Zap, Rocket, Wallet, User, ClipboardList, Lock, DollarSign, Star } from "lucide-react";

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

  const features = [
    {
      title: "Secure Escrow",
      desc: "Funds are cryptographically secured and released only upon work completion.",
      icon: <Shield className="w-12 h-12 mx-auto text-purple-400" strokeWidth={1} />,
    },
    {
      title: "Global Talent",
      desc: "Hire freelancers from anywhere, pay instantly in crypto.",
      icon: <Globe className="w-12 h-12 mx-auto text-purple-400" strokeWidth={1} />,
    },
    {
      title: "Fair Payments",
      desc: "No middlemen. Low fees. Instant settlement on Solana.",
      icon: <Zap className="w-12 h-12 mx-auto text-purple-400" strokeWidth={1} />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 text-white overflow-hidden grainy">
      {/* Hero Section */}
      <section className="relative flex flex-col justify-center items-center text-center px-6 min-h-screen py-10">
        {/* Animated background glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-green-400 to-blue-500 rounded-full blur-3xl opacity-30"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{
            duration: 3,
            delay: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-tl from-purple-500 to-indigo-600 rounded-full blur-3xl opacity-30"
        />

        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-6xl md:text-8xl font-ExtraBold fontFamily:'Oxanium, sans-serif' 800 mb-6 leading-tight z-5 tracking-tighter"
        >
          The Future of{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
            Freelancing
          </span>
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-lg md:text-2xl text-gray-200 font-medium max-w-3xl mb-10 z-10"
        >
          Work without borders. Payments without delays. Escrow-powered gigs
          secured on{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500 font-semibold">
            Solana blockchain
          </span>
          .
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
                className="px-8 py-4 rounded-full bg-gradient-to-r from-green-400 to-blue-500 text-white hover:opacity-90 transition transform hover:scale-105 shadow-lg font-semibold"
              >
                <Rocket className="inline-block w-5 h-5 mr-2" /> Create a Gig
              </Link>
            )}
            {userRole === "hirer" && (
              <Link
                href="/gigs"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:opacity-90 transition transform hover:scale-105 shadow-lg font-semibold"
              >
                <Zap className="inline-block w-5 h-5 mr-2" /> Browse Gigs
              </Link>
            )}
            <Link
              href="/gigs"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:opacity-90 transition transform hover:scale-105 shadow-lg font-semibold"
            >
              <Globe className="inline-block w-5 h-5 mr-2" /> Explore All Gigs
            </Link>
          </motion.div>
        )}
      </section>

      {/* Features */}
      <section className="mt-28 px-6 grid gap-10 md:grid-cols-3 max-w-6xl mx-auto">
        {features.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            className="hover:scale-105 transition"
          >
            <Card className="text-center h-full">
              <CardHeader>
                <div className="text-5xl mb-4 mx-auto">{item.icon}</div>
                <CardTitle className="text-2xl font-bold">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 font-medium">{item.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="mt-28 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
          {[
            {
              icon: <Wallet className="w-12 h-12 mx-auto text-purple-400" strokeWidth={1} />,
              title: "Connect Wallet",
              desc: "Sign in with your Solana wallet securely.",
              className: "md:col-span-2",
            },
            {
              icon: <User className="w-12 h-12 mx-auto text-purple-400" strokeWidth={1} />,
              title: "Create Profile",
              desc: "Set up your freelancer or hirer profile.",
              className: "md:col-span-2",
            },
            {
              icon: <ClipboardList className="w-12 h-12 mx-auto text-purple-400" strokeWidth={1} />,
              title: "Post / Apply",
              desc: "Hirers post gigs, freelancers apply to work.",
              className: "md:col-span-2",
            },
            {
              icon: <Lock className="w-12 h-12 mx-auto text-purple-400" strokeWidth={1} />,
              title: "Escrow Secured",
              desc: "Funds are locked until the job is delivered.",
              className: "md:col-span-3",
            },
            {
              icon: <DollarSign className="w-12 h-12 mx-auto text-purple-400" strokeWidth={1} />,
              title: "Get Paid",
              desc: "Instant crypto payout after approval.",
              className: "md:col-span-3",
            },
          ].map((s, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className={`hover:scale-105 transition flex flex-col ${s.className}`}
            >
              <Card className="text-center h-full">
                <CardHeader>
                  <div className="text-5xl mb-4 mx-auto">
                    {s.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold">
                    {s.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 font-medium">{s.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Email Subscribe Section */}
      <section className="mt-28 px-6">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-10 text-center shadow-lg relative overflow-hidden"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-r from-green-400 to-purple-600 rounded-3xl blur-2xl"
          />
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-4">Stay Updated <Rocket className="inline-block w-8 h-8" /></h3>
            <p className="text-gray-200 font-medium mb-6">
              Enter your email to get notified about new features, updates, and
              opportunities.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-5 py-3 rounded-full w-full sm:w-2/3 bg-gray-800/50 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold hover:opacity-90 transition transform hover:scale-105"
              >
                Notify Me
              </button>
            </form>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="mt-28 bg-gray-900/50 border-t border-white/10 py-14">
        <div className="max-w-6xl mx-auto px-6 grid gap-10 md:grid-cols-4 text-gray-400 text-sm">
          {/* About */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">TaskFi</h4>
            <p className="mb-4 text-gray-300 font-medium">
              The decentralized freelancing marketplace built on Solana. Work
              without borders, get paid without delays.
            </p>
            <p className="text-gray-400 text-xs">
              © {new Date().getFullYear()} TaskFi. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-white font-semibold mb-4">Quick Links</h5>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-green-400 transition">
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-green-400 transition"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/gigs" className="hover:text-green-400 transition">
                  <Star className="inline-block w-5 h-5 mr-2" strokeWidth={1.5} /> Explore Gigs
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
                  className="hover:text-green-400 transition"
                >
                  Solana
                </a>
              </li>
              <li>
                <a
                  href="https://docs.taskfi.com"
                  target="_blank"
                  className="hover:text-green-400 transition"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-green-400 transition">
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
                <a href="#" className="hover:text-green-400 transition">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition">
                  Discord
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition">
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
