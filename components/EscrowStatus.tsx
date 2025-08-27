import React from "react";
import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useWorkspace } from "@/lib/anchor";
import { EscrowState } from "@/types";

interface EscrowStatusProps {
  escrowAccount: string;
  jobId: string;
}

const EscrowStatus: React.FC<EscrowStatusProps> = ({
  escrowAccount,
  jobId,
}) => {
  const { connection } = useConnection();
  const { program } = useWorkspace();
  const [escrowState, setEscrowState] = React.useState<EscrowState | null>(
    null
  );
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchEscrowState = async () => {
      if (!program || !escrowAccount) return;

      try {
        const account = await program.account.escrow.fetch(
          new PublicKey(escrowAccount)
        );
        setEscrowState(account as unknown as EscrowState);
      } catch (error) {
        console.error("Error fetching escrow state:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEscrowState();
  }, [program, escrowAccount]);

  if (loading) return <div>Loading escrow status...</div>;
  if (!escrowState) return <div>Escrow account not found</div>;

  const getStatusText = (state: number) => {
    switch (state) {
      case 0:
        return "Initialized (Funds Locked)";
      case 1:
        return "Accepted (Funds Released)";
      case 2:
        return "Refunded";
      case 3:
        return "Disputed";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="escrow-status">
      <h3>Escrow Status</h3>
      <p>
        Account: {escrowAccount.slice(0, 8)}...{escrowAccount.slice(-8)}
      </p>
      <p>Status: {getStatusText(escrowState.state)}</p>
      <p>Amount: {escrowState.initializerAmount / 1e9} SOL</p>
    </div>
  );
};

export default EscrowStatus;
