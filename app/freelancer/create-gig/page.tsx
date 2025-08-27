"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import { supabase } from "@/lib/supabase";

const CreateGigPage: React.FC = () => {
  const router = useRouter();
  const { publicKey } = useWallet();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!publicKey) return;

    setLoading(true);
    try {
      const { error } = await supabase.from("gigs").insert([
        {
          freelancer_id: publicKey.toString(),
          title: formData.title,
          description: formData.description,
          price: parseFloat(formData.price),
          category: formData.category,
          status: "active",
        },
      ]);

      if (error) throw error;

      alert("Gig created successfully!");
      router.push("/freelancer/dashboard");
    } catch (error) {
      console.error("Error creating gig:", error);
      alert(
        "Failed to create gig: " +
          (error instanceof Error ? error.message : String(error))
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!publicKey) {
    return <div>Please connect your wallet to create a gig</div>;
  }

  return (
    <div className="create-gig-page">
      <h1>Create New Gig</h1>

      <form onSubmit={handleSubmit} className="gig-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={5}
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price (SOL)</label>
          <input
            type="number"
            id="price"
            name="price"
            step="0.01"
            min="0.01"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            <option value="web-development">Web Development</option>
            <option value="graphic-design">Graphic Design</option>
            <option value="content-writing">Content Writing</option>
            <option value="marketing">Marketing</option>
            <option value="other">Other</option>
          </select>
        </div>

        <button type="submit" disabled={loading} className="submit-button">
          {loading ? "Creating..." : "Create Gig"}
        </button>
      </form>
    </div>
  );
};

export default CreateGigPage;
