"use client";

import React, { useState } from "react";
import { Globe } from "lucide-react";

const ContactPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    //na so we see am for here o

    setTimeout(() => {
      setLoading(false);
      alert("Message sent!");
      setForm({ name: "", email: "", message: "" });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <section className="px-6 py-16 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 mt-10">Contact Us</h1>
        <p className="text-lg text-gray-300">
          Have questions, feedback, or partnership ideas? We’d love to hear from
          you!
        </p>
      </section>

      <section className="px-6 pb-20 max-w-6xl mx-auto grid gap-12 md:grid-cols-2">
        <div className="bg-gray-800/70 p-8 rounded-2xl shadow-lg border border-gray-700">
          <h2 className="text-2xl font-bold mb-6">📩 Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-2 text-sm text-gray-400">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm text-gray-400">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm text-gray-400">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-500"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 transition font-semibold shadow-lg"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        <div className="flex flex-col justify-center bg-gray-800/50 p-8 rounded-2xl shadow-lg border border-gray-700">
          <h2 className="text-2xl font-bold mb-6">📍 Get in Touch</h2>
          <ul className="space-y-4 text-gray-300">
            <li>
              <span className="-semibold">Email:</span>{" "}
              <a
                href="mailto:support@taskfi.io"
                className="text-indigo-400 hover:underline"
              >
                support@taskfi.io
              </a>
            </li>
            <li>
              <span className="font-semibold">Location:</span> Remote •
              Worldwide <Globe className="inline-block w-5 h-5 ml-1" strokeWidth={1.5} />
            </li>
            <li>
              <span className="font-semibold">Socials:</span>
              <div className="flex gap-4 mt-2">
                <a href="#" target="_blank" className="hover:text-indigo-400">
                  X
                </a>
                <a href="#" target="_blank" className="hover:text-indigo-400">
                  LinkedIn
                </a>
                <a href="#" target="_blank" className="hover:text-indigo-400">
                  Discord
                </a>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
