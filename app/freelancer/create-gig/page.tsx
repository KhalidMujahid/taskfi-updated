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

      alert("✅ Gig created successfully!");
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
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-200">
        <h2 className="text-2xl font-bold mb-4">🔑 Wallet Required</h2>
        <p className="text-gray-400">
          Please connect your Solana wallet to create a gig.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700">
        <h1 className="text-3xl font-extrabold text-white mb-8 text-center">
          Create <span className="text-indigo-400">New Gig</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-gray-300 mb-2"
            >
              Gig Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g. Build a responsive website"
              className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-gray-300 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={5}
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Describe what your gig offers..."
              className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-semibold text-gray-300 mb-2"
            >
              Price (in SOL)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              step="0.01"
              min="0.01"
              value={formData.price}
              onChange={handleChange}
              required
              placeholder="e.g. 0.5"
              className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-semibold text-gray-300 mb-2"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            >
              <option value="">Select a category</option>
              <option value="web-development">Web Development</option>
              <option value="graphic-design">Graphic Design</option>
              <option value="content-writing">Content Writing</option>
              <option value="marketing">Marketing</option>
              <option value="other">Other</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white font-semibold transition shadow-lg"
          >
            {loading ? "Creating..." : "Create Gig"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGigPage;
