"use client";

import React, { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  PublicKey,
  SystemProgram,
  Transaction,
  Keypair,
} from "@solana/web3.js";
import { useWorkspace } from "@/lib/anchor";
import { supabase } from "@/lib/supabase";
import { BN } from "@project-serum/anchor";

interface HireButtonProps {
  gigId: string;
  price: number;
  freelancerId: string;
}

const HireButton: React.FC<HireButtonProps> = ({
  gigId,
  price,
  freelancerId,
}) => {
  const { publicKey, sendTransaction } = useWallet();
  const { program, provider } = useWorkspace();
  const [isHiring, setIsHiring] = useState(false);

  const handleHire = async () => {
    if (!publicKey || !program) return;

    setIsHiring(true);
    try {
      const { data: job, error } = await supabase
        .from("jobs")
        .insert([
          {
            gig_id: gigId,
            hirer_id: publicKey.toString(),
            freelancer_id: freelancerId,
            price: price,
            status: "pending",
            escrow_account: "",
          },
        ])
        .single();

      if (error) throw error;

      const escrowAccount = new Keypair();
      const lamports =
        await provider.connection.getMinimumBalanceForRentExemption(
          program.account.escrow.size
        );

      const createEscrowAccountIx = SystemProgram.createAccount({
        fromPubkey: provider.wallet.publicKey,
        newAccountPubkey: escrowAccount.publicKey,
        lamports,
        space: program.account.escrow.size,
        programId: program.programId,
      });

      const initEscrowIx = await program.methods
        .initialize(new BN(price * 1e9))
        .accounts({
          initializer: provider.wallet.publicKey,
          escrowAccount: escrowAccount.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .instruction();

      const tx = new Transaction().add(createEscrowAccountIx).add(initEscrowIx);

      const signature = await sendTransaction(tx, provider.connection, {
        signers: [escrowAccount],
      });

      await provider.connection.confirmTransaction(signature);

      await supabase
        .from("jobs")
        .update({ escrow_account: escrowAccount.publicKey.toString() })
        .eq("id", job);

      alert("Job created successfully! Funds are locked in escrow.");
    } catch (error) {
      console.error("Error creating job:", error);
      alert(
        "Failed to create job: " +
          (error instanceof Error ? error.message : String(error))
      );
    } finally {
      setIsHiring(false);
    }
  };

  return (
    <button onClick={handleHire} disabled={isHiring} className="hire-button">
      {isHiring ? "Processing..." : `Hire for ${price} SOL`}
    </button>
  );
};

export default HireButton;
