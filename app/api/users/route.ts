import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const {
      walletAddress,
      name,
      username,
      bio,
      role,
      categories,
      avatarUrl,
    } = await request.json();

    if (!walletAddress) {
      return NextResponse.json(
        { error: "Wallet address is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("users")
      .update({
        full_name: name,
        username,
        bio,
        role,
        categories,
        avatar_url: avatarUrl,
      })
      .eq("wallet_address", walletAddress)
      .select()
      .single();

    if (error) {
      console.error("Error updating user:", error);
      return NextResponse.json(
        { error: "Failed to update user" },
        { status: 500 }
      );
    }

    return NextResponse.json({ user: data });
  } catch (error) {
    console.error("Update user API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
