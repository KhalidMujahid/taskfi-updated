import React from "react";
import { useParams } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import { supabase } from "@/lib/supabase";
import { Gig } from "@/types";
import HireButton from "@/components/HireButton";

const GigDetailPage: React.FC = () => {
  const params = useParams();
  const id = params?.id;
  const { connected, publicKey } = useWallet();
  const [gig, setGig] = React.useState<Gig | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [userRole, setUserRole] = React.useState<string>("");

  React.useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      const { data: gigData, error } = await supabase
        .from("gigs")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching gig:", error);
      } else {
        setGig(gigData);
      }

      if (connected && publicKey) {
        const { data: user } = await supabase
          .from("users")
          .select("role")
          .eq("wallet_address", publicKey.toString())
          .single();

        if (user) {
          setUserRole(user.role);
        }
      }

      setLoading(false);
    };

    fetchData();
  }, [id, connected, publicKey]);

  if (loading) return <div>Loading gig details...</div>;
  if (!gig) return <div>Gig not found</div>;

  return (
    <div className="gig-detail-page">
      <h1>{gig.title}</h1>
      <p className="gig-description">{gig.description}</p>
      <div className="gig-meta">
        <div className="gig-price">{gig.price} SOL</div>
        <div className="gig-category">{gig.category}</div>
      </div>

      {connected && userRole === "hirer" && (
        <HireButton
          gigId={gig.id}
          price={gig.price}
          freelancerId={gig.freelancer_id}
        />
      )}

      {!connected && <p>Connect your wallet to hire this freelancer</p>}

      {connected && userRole !== "hirer" && <p>Only hirers can create jobs</p>}
    </div>
  );
};

export default GigDetailPage;
