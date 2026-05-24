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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-center text-orange-500">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mt-2">
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
            className="w-full p-4 border rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
          />

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full p-4 border rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full p-4 border rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
          />

          <button className="w-full bg-orange-500 text-white py-4 rounded-xl hover:bg-orange-600 transition font-semibold">
            Signup
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-orange-500 font-semibold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}