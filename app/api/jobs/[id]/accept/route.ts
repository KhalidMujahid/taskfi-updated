import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { useWorkspace } from "@/lib/anchor";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { freelancerWallet } = await request.json();

    if (!freelancerWallet) {
      return NextResponse.json(
        { error: "Freelancer wallet is required" },
        { status: 400 }
      );
    }

    const { data: job, error: updateError } = await supabase
      .from("jobs")
      .update({ status: "accepted" })
      .eq("id", id)
      .select()
      .single();

    if (updateError) {
      console.error("Error updating job:", updateError);
      return NextResponse.json(
        { error: "Failed to accept job" },
        { status: 500 }
      );
    }

    // Anchor program go follow here

    return NextResponse.json({ job });
  } catch (error) {
    console.error("Accept job error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
