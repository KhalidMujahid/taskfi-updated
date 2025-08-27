export interface User {
  id: string;
  wallet_address: string;
  role: "hirer" | "freelancer" | "admin";
  created_at: string;
}

export interface Gig {
  id: string;
  freelancer_id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  created_at: string;
  updated_at: string;
  status: "active" | "inactive";
}

export interface Job {
  id: string;
  gig_id: string;
  hirer_id: string;
  freelancer_id: string;
  price: number;
  status: "pending" | "accepted" | "completed" | "cancelled" | "disputed";
  created_at: string;
  updated_at: string;
  escrow_account: string;
}

export interface EscrowState {
  isInitialized: boolean;
  initializerPubkey: string;
  initializerDepositTokenAccount: string;
  initializerReceivingTokenAccount: string;
  initializerAmount: number;
  takerAmount: number;
  state: number;
}
