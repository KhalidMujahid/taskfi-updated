"use client";

import React from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Gig } from "@/types";

const GigsPage: React.FC = () => {
  const [gigs, setGigs] = React.useState<Gig[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState("");
  const [filteredGigs, setFilteredGigs] = React.useState<Gig[]>([]);

  React.useEffect(() => {
    const fetchGigs = async () => {
      const { data, error } = await supabase
        .from("gigs")
        .select("*")
        .eq("status", "active")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching gigs:", error);
      } else {
        setGigs(data || []);
        setFilteredGigs(data || []);
      }
      setLoading(false);
    };

    fetchGigs();
  }, []);

  React.useEffect(() => {
    if (search.trim() === "") {
      setFilteredGigs(gigs);
    } else {
      setFilteredGigs(
        gigs.filter(
          (gig) =>
            gig.title.toLowerCase().includes(search.toLowerCase()) ||
            gig.description.toLowerCase().includes(search.toLowerCase()) ||
            gig.category.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, gigs]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-extrabold mb-6 text-center">
          Browse <span className="text-indigo-400">Available Gigs</span>
        </h1>
        <p className="text-center text-gray-400 mb-10">
          Find the right gig, connect with freelancers, and pay securely via
          escrow.
        </p>

        {/* Search Bar */}
        <div className="flex justify-center mb-10">
          <input
            type="text"
            placeholder="🔍 Search gigs by title, category or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-xl px-4 py-3 rounded-xl bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-gray-800 rounded-2xl p-6 h-48"
              ></div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredGigs.length === 0 && (
          <div className="text-center text-gray-400 mt-20">
            <p className="text-xl">😕 No gigs found.</p>
            <p className="mt-2">Try adjusting your search.</p>
          </div>
        )}

        {/* Gigs Grid */}
        {!loading && filteredGigs.length > 0 && (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredGigs.map((gig) => (
              <div
                key={gig.id}
                className="gig-card bg-gray-800 rounded-2xl p-6 shadow-lg hover:scale-105 hover:shadow-indigo-500/30 transition transform flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-2xl font-bold mb-2">{gig.title}</h3>
                  <p className="text-gray-400 line-clamp-3 mb-4">
                    {gig.description}
                  </p>
                  <span className="inline-block text-xs px-3 py-1 bg-indigo-600 rounded-full mb-4">
                    {gig.category}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="text-indigo-400 font-bold">
                    {gig.price} SOL
                  </div>
                  <Link
                    href={`/gigs/${gig.id}`}
                    className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-sm font-semibold transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GigsPage;
