"use client";

import { useState } from "react";
import Link from "next/link";

import API from "../../services/api";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post(
        "/auth/signup",
        {
          name,
          email,
          password,
        }
      );

      localStorage.setItem(
        "userInfo",
        JSON.stringify(data)
      );
      window.dispatchEvent(new Event("auth:changed"));

      alert("Signup Successful");

      window.location.href = "/";
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Signup Failed"
      );
    }
  };

  return (
    <div className="relative min-h-screen bg-black px-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="absolute -bottom-28 -right-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.14),transparent_55%)]" />
      </div>

      <div className="relative flex min-h-screen items-center justify-center">
        <div className="fade-in-up w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
          <h1 className="text-3xl font-bold text-center text-orange-500">
            Create Account
          </h1>

          <p className="text-center text-white/70 mt-2">
            Signup to start ordering delicious food
          </p>

          <form
            onSubmit={handleSignup}
            className="mt-8 space-y-5"
          >
            <input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="w-full rounded-xl border border-white/15 bg-white/10 p-4 text-white outline-none placeholder:text-white/50 focus:ring-2 focus:ring-orange-500"
            />

            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full rounded-xl border border-white/15 bg-white/10 p-4 text-white outline-none placeholder:text-white/50 focus:ring-2 focus:ring-orange-500"
            />

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full rounded-xl border border-white/15 bg-white/10 p-4 text-white outline-none placeholder:text-white/50 focus:ring-2 focus:ring-orange-500"
            />

            <button className="w-full bg-orange-500 text-white py-4 rounded-xl hover:bg-orange-600 transition font-semibold">
              Signup
            </button>
          </form>

          <p className="text-center mt-6 text-white/70">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-orange-400 font-semibold hover:text-orange-300 transition"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
