"use client";

import React from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const WalletConnect: React.FC = () => {
  const { publicKey, connected } = useWallet();
  const router = useRouter();

  React.useEffect(() => {
    const handleUserRegistration = async () => {
      if (connected && publicKey) {
        const { data: existingUser } = await supabase
          .from("users")
          .select("*")
          .eq("wallet_address", publicKey.toString())
          .single();

        if (!existingUser) {
          const { error } = await supabase.from("users").insert([
            {
              wallet_address: publicKey.toString(),
              role: "hirer",
            },
          ]);

          if (error) {
            console.error("Error creating user:", error);
            return;
          }

          router.push("/onboarding");
        } else if (!existingUser.full_name || !existingUser.email) {
          router.push("/onboarding");
        }
      }
    };

    handleUserRegistration();
  }, [connected, publicKey, router]);

  return (
    <div className="wallet-connect">
      <WalletMultiButton />
    </div>
  );
};

export default WalletConnect;