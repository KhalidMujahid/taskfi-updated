"use client";

import React from "react";
import Link from "next/link";

import { ShieldCheck, Zap, Scale, Globe, Rocket } from "lucide-react";

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <section className="px-6 py-20 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 mt-20">
          About <span className="text-indigo-400">TaskFi</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-200 font-medium leading-relaxed">
          TaskFi is a decentralized freelancing platform powered by{" "}
          <span className="font-semibold text-indigo-300">Solana escrow</span>.
          We connect global talent with hirers while ensuring rustless,
          instant, and secure payments.
        </p>
      </section>

      <section className="px-6 py-10 max-w-6xl mx-auto grid gap-10 md:grid-cols-2 ">
        <div className="bg-gray-800/70 p-8 rounded-2xl shadow-lg border border-gray-700">
          <h2 className="text-2xl font-bold mb-4"><Globe className="inline-block w-6 h-6 mr-2" strokeWidth={1.5} /> Our Mission</h2>
          <p className="text-gray-300 font-medium leading-relaxed">
            We believe freelancers deserve <b>fast payments</b>and hirers deserve
            <b> trust</b>. By leveraging blockchain, we remove middlemen and enable
            a fair, borderless marketplace where work and payments flow
            seamlessly.
          </p>
        </div>
        <div className="bg-gray-800/70 p-8 rounded-2xl shadow-lg border border-gray-700">
          <h2 className="text-2xl font-bold mb-4"><Rocket className="inline-block w-6 h-6 mr-2" strokeWidth={1.5} /> Our Vision</h2>
          <p className="text-gray-300 font-medium leading-relaxed">
            To become the <b>default global freelancing platform</b> where anyone,
            anywhere can collaborate without worrying about payment fraud,
            delayed funds, or unfair fees.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 py-20 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">Our Core Values</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              icon: <ShieldCheck className="w-12 h-12 mx-auto text-zinc-400" strokeWidth={1.5} />,
              title: "Security",
              desc: "Escrow smart contracts guarantee funds are safe until work is delivered.",
            },
            {
              icon: <Zap className="w-12 h-12 mx-auto text-zinc-400" strokeWidth={1.5} />,
              title: "Speed",
              desc: "Instant crypto payments, no waiting for banks or middlemen.",
            },
            {
              icon: <Scale className="w-12 h-12 mx-auto text-zinc-400" strokeWidth={1.5} />,
              title: "Fairness",
              desc: "Low fees, transparent rules, and equal opportunities for all.",
            },
          ].map((v, i) => (
            <div
              key={i}
              className="bg-gray-800/70 p-8 rounded-2xl shadow-lg hover:scale-105 transition border border-gray-700"
            >
              <div className="text-4xl mb-4 flex justify-center items-center">{v.icon}</div>
              <h3 className="text-xl font-bold mb-2">{v.title}</h3>
              <p className="text-gray-300 font-medium">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-20 text-center bg-gray-900 border-t border-gray-700">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Experience Freelancing 3.0?
        </h2>
        <p className="text-gray-300 font-medium mb-8">
          Join TaskFi today and be part of the decentralized work revolution.
        </p>
        <Link
          href="/gigs"
          className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 rounded-xl font-semibold transition shadow-lg"
        >
          Explore Gigs
        </Link>
      </section>
    </div>
  );
};

export default AboutPage;
