"use client";

import React from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { supabase } from "@/lib/supabase";
import { Job } from "@/types";
import EscrowStatus from "@/components/EscrowStatus";
import JobActions from "@/components/JobActions";

const HirerJobsPage: React.FC = () => {
  const { publicKey } = useWallet();
  const [jobs, setJobs] = React.useState<Job[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchJobs = async () => {
      if (!publicKey) return;

      const { data: jobsData, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("hirer_id", publicKey.toString())
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching jobs:", error);
      } else {
        setJobs(jobsData || []);
      }
      setLoading(false);
    };

    fetchJobs();
  }, [publicKey]);

  const handleJobUpdate = () => {
    if (publicKey) {
      supabase
        .from("jobs")
        .select("*")
        .eq("hirer_id", publicKey.toString())
        .order("created_at", { ascending: false })
        .then(({ data, error }) => {
          if (!error && data) {
            setJobs(data);
          }
        });
    }
  };

  if (loading) return <div>Loading jobs...</div>;
  if (!publicKey)
    return <div>Please connect your wallet to view your jobs</div>;

  return (
    <div className="hirer-jobs-page">
      <h1>My Jobs</h1>

      <div className="jobs-list">
        {jobs.length === 0 ? (
          <p>You haven't hired any freelancers yet.</p>
        ) : (
          jobs.map((job) => (
            <div key={job.id} className="job-card">
              <h3>Job #{job.id.slice(0, 8)}</h3>
              <p>
                Status:{" "}
                <span className={`status-${job.status}`}>{job.status}</span>
              </p>
              <p>Price: {job.price} SOL</p>

              {job.escrow_account && (
                <EscrowStatus
                  escrowAccount={job.escrow_account}
                  jobId={job.id}
                />
              )}

              <JobActions job={job} onUpdate={handleJobUpdate} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HirerJobsPage;
