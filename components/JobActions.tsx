import React from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { supabase } from "@/lib/supabase";
import { Job } from "@/types";

interface JobActionsProps {
  job: Job;
  onUpdate: () => void;
}

const JobActions: React.FC<JobActionsProps> = ({ job, onUpdate }) => {
  const { publicKey } = useWallet();

  const handleCompleteJob = async () => {
    if (!publicKey) return;

    try {
      const { error } = await supabase
        .from("jobs")
        .update({ status: "completed" })
        .eq("id", job.id);

      if (error) throw error;

      // Anchor program go follow here

      alert(
        "Job marked as completed! Funds will be released to the freelancer."
      );
      onUpdate();
    } catch (error) {
      console.error("Error completing job:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      alert("Failed to complete job: " + errorMessage);
    }
  };

  const handleDisputeJob = async () => {
    if (!publicKey) return;

    try {
      const { error } = await supabase
        .from("jobs")
        .update({ status: "disputed" })
        .eq("id", job.id);

      if (error) throw error;

      alert("Job disputed! An admin will review the case.");
      onUpdate();
    } catch (error) {
      console.error("Error disputing job:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      alert("Failed to dispute job: " + errorMessage);
    }
  };

  if (job.status === "accepted" && publicKey?.toString() === job.hirer_id) {
    return (
      <div className="job-actions">
        <button onClick={handleCompleteJob} className="complete-button">
          Mark as Completed
        </button>
        <button onClick={handleDisputeJob} className="dispute-button">
          Raise Dispute
        </button>
      </div>
    );
  }

  return null;
};

export default JobActions;
