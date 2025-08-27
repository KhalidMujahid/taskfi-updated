import React from "react";
import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";
import { supabase } from "../../../lib/supabase";
import { Gig, Job } from "../../../types";

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

  if (loading) return <div>Loading dashboard...</div>;

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

  return (
    <div className="freelancer-dashboard">
      <h1>Freelancer Dashboard</h1>

      <div className="dashboard-section">
        <h2>My Gigs</h2>
        <Link href="/freelancer/create-gig" className="create-gig-button">
          Create New Gig
        </Link>

        <div className="gigs-list">
          {gigs.map((gig) => (
            <div key={gig.id} className="gig-item">
              <h3>{gig.title}</h3>
              <p>{gig.description}</p>
              <div className="gig-price">{gig.price} SOL</div>
              <div className="gig-status">{gig.status}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-section">
        <h2>My Jobs</h2>

        <div className="jobs-list">
          {jobs.map((job) => (
            <div key={job.id} className="job-item">
              <h3>Job #{job.id.slice(0, 8)}</h3>
              <div className="job-price">{job.price} SOL</div>
              <div className="job-status">{job.status}</div>
              {job.status === "pending" && (
                <button onClick={() => handleAcceptJob(job.id)}>
                  Accept Job
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FreelancerDashboard;
