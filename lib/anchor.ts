import { Program, AnchorProvider, Idl } from "@project-serum/anchor";
import { Connection, PublicKey, clusterApiUrl, Cluster } from "@solana/web3.js";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import idl from "@/contracts/escrow.json";

const network = process.env.NEXT_PUBLIC_SOLANA_NETWORK!;
const connection = new Connection(
  clusterApiUrl(network as Cluster),
  "confirmed"
);

const preflightCommitment = "processed";
const commitment = "confirmed";

const programID = new PublicKey(process.env.NEXT_PUBLIC_PROGRAM_ID!);

export const useWorkspace = () => {
  const wallet = useAnchorWallet();
  const { connection } = useConnection();

  const provider = new AnchorProvider(connection, wallet!, {
    preflightCommitment,
    commitment,
  });
  const program = new Program(idl as Idl, programID, provider);

  return { provider, program };
};
