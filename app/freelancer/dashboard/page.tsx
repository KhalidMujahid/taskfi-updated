"use client";

import React from "react";
import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";
import { supabase } from "@/lib/supabase";
import { Gig, Job } from "@/types";

const FreelancerDashboard: React.FC = () => {
  const { publicKey } = useWallet();
  const [gigs, setGigs] = React.useState<Gig[]>([]);
  const [jobs, setJobs] = React.useState<Job[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      if (!publicKey) return;

      const { data: gigsData } = await supabase
        .from("gigs")
        .select("*")
        .eq("freelancer_id", publicKey.toString())
        .order("created_at", { ascending: false });

      const { data: jobsData } = await supabase
        .from("jobs")
        .select("*")
        .eq("freelancer_id", publicKey.toString())
        .order("created_at", { ascending: false });

      setGigs(gigsData || []);
      setJobs(jobsData || []);
      setLoading(false);
    };

    fetchData();
  }, [publicKey]);

  async function handleAcceptJob(id: string): Promise<void> {
    setLoading(true);
    const { error } = await supabase
      .from("jobs")
      .update({ status: "accepted" })
      .eq("id", id);
    if (error) {
      alert("Failed to accept job: " + error.message);
    } else {
      setJobs((jobs) =>
        jobs.map((job) =>
          job.id === id ? { ...job, status: "accepted" } : job
        )
      );
    }
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-400 border-opacity-70"></div>
        <span className="ml-4">Loading your dashboard...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white px-6 py-12">
      <h1 className="text-4xl font-extrabold mb-10 text-center">
        Freelancer <span className="text-indigo-400">Dashboard</span>
      </h1>

      {/* Gigs Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">My Gigs</h2>
          <Link
            href="/freelancer/create-gig"
            className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 transition shadow font-semibold"
          >
            Create New Gig
          </Link>
        </div>

        {gigs.length === 0 ? (
          <p className="text-gray-400">You haven’t created any gigs yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gigs.map((gig) => (
              <div
                key={gig.id}
                className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 hover:shadow-xl transition"
              >
                <h3 className="text-xl font-bold mb-2">{gig.title}</h3>
                <p className="text-gray-300 mb-4 line-clamp-3">
                  {gig.description}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-indigo-400">
                    {gig.price} SOL
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      gig.status === "active"
                        ? "bg-green-600/30 text-green-400"
                        : "bg-yellow-600/30 text-yellow-300"
                    }`}
                  >
                    {gig.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">My Jobs</h2>

        {jobs.length === 0 ? (
          <p className="text-gray-400">No jobs assigned yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 hover:shadow-xl transition"
              >
                <h3 className="text-lg font-bold mb-3">
                  Job #{job.id.slice(0, 8)}
                </h3>
                <p className="mb-2 text-sm text-gray-400">
                  Price:{" "}
                  <span className="text-indigo-400 font-semibold">
                    {job.price} SOL
                  </span>
                </p>
                <p className="mb-4 text-sm">
                  Status:{" "}
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      job.status === "accepted"
                        ? "bg-green-600/30 text-green-400"
                        : "bg-yellow-600/30 text-yellow-300"
                    }`}
                  >
                    {job.status}
                  </span>
                </p>

                {job.status === "pending" && (
                  <button
                    onClick={() => handleAcceptJob(job.id)}
                    className="w-full px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 transition shadow font-semibold"
                  >
                    Accept Job
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FreelancerDashboard;
