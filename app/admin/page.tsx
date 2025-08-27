"use client";

import React from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { supabase } from "@/lib/supabase";
import { Job } from "@/types";

const AdminPage: React.FC = () => {
  const { publicKey } = useWallet();
  const [userRole, setUserRole] = React.useState<string>("");
  const [disputedJobs, setDisputedJobs] = React.useState<Job[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      if (!publicKey) return;

      const { data: user } = await supabase
        .from("users")
        .select("role")
        .eq("wallet_address", publicKey.toString())
        .single();

      if (user) {
        setUserRole(user.role);

        if (user.role === "admin") {
          const { data: jobs } = await supabase
            .from("jobs")
            .select("*")
            .eq("status", "disputed")
            .order("created_at", { ascending: false });

          setDisputedJobs(jobs || []);
        }
      }

      setLoading(false);
    };

    fetchData();
  }, [publicKey]);

  const handleResolveDispute = async (
    jobId: string,
    decision: "release" | "refund"
  ) => {
    try {
      const { error } = await supabase
        .from("jobs")
        .update({ status: decision === "release" ? "completed" : "cancelled" })
        .eq("id", jobId);

      if (error) throw error;

      alert(
        `Dispute resolved: ${
          decision === "release"
            ? "Funds released to freelancer"
            : "Funds refunded to hirer"
        }`
      );

      const { data: jobs } = await supabase
        .from("jobs")
        .select("*")
        .eq("status", "disputed")
        .order("created_at", { ascending: false });

      setDisputedJobs(jobs || []);
    } catch (error) {
      console.error("Error resolving dispute:", error);
      if (error instanceof Error) {
        alert("Failed to resolve dispute: " + error.message);
      } else {
        alert("Failed to resolve dispute: " + String(error));
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (userRole !== "admin") return <div>Access denied. Admin only.</div>;

  return (
    <div className="admin-page">
      <h1>Admin Panel</h1>

      <div className="disputed-jobs">
        <h2>Disputed Jobs</h2>

        {disputedJobs.length === 0 ? (
          <p>No disputed jobs at this time.</p>
        ) : (
          disputedJobs.map((job) => (
            <div key={job.id} className="disputed-job">
              <h3>Job #{job.id.slice(0, 8)}</h3>
              <p>
                Hirer: {job.hirer_id.slice(0, 8)}...{job.hirer_id.slice(-8)}
              </p>
              <p>
                Freelancer: {job.freelancer_id.slice(0, 8)}...
                {job.freelancer_id.slice(-8)}
              </p>
              <p>Price: {job.price} SOL</p>

              <div className="dispute-actions">
                <button
                  onClick={() => handleResolveDispute(job.id, "release")}
                  className="release-button"
                >
                  Release to Freelancer
                </button>
                <button
                  onClick={() => handleResolveDispute(job.id, "refund")}
                  className="refund-button"
                >
                  Refund to Hirer
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminPage;
