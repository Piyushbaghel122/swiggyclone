/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { FormConfirm } from "../components/FormConfirm";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";

export default function RegisterUserPage() {
  const router = useRouter();
  const { handleRegistrUser, loading, error, isUser } = useAuth();

  const [username, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [localError, setLocalError] = useState<string | null>(null);

  // Automatically redirect when isUser becomes true
  useEffect(() => {
    if (isUser) {
      router.push("/login");
    }
  }, [isUser, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!username || !email || !password || !phone) {
      setLocalError("Please fill in all fields.");
      return;
    }

    try {
      await handleRegistrUser({ username, email, password, mobile: phone });
    } catch (err: any) {
      setLocalError(err?.message || "Registration failed");
    }
  };

  const errorMsg = localError || error;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6 selection:bg-orange-500 selection:text-white">
      <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center font-black text-2xl text-white mx-auto shadow-lg shadow-orange-500/20">
            S
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Partner Registration</h2>
          <p className="text-slate-400 text-xs">Create your seller account to get started</p>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium flex items-center gap-2.5">
            <span>⚠️</span>
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormConfirm
            label="Partner Name"
            placeholder="Enter your username / business name"
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            required={true}
          />

          <FormConfirm
            label="Business Email"
            placeholder="seller@swiggy.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required={true}
          />

          <FormConfirm
            label="Phone Number"
            placeholder="9876543210"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required={true}
          />

          <FormConfirm
            label="Password"
            placeholder="••••••••••••"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={true}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 hover:brightness-110 disabled:opacity-50 transition duration-200 shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 mt-2"
          >
            {loading ? <span>Creating Account...</span> : <span>Register Seller Account</span>}
          </button>
        </form>

        <div className="text-center pt-3 border-t border-slate-800 text-xs text-slate-400">
          Already registered?{" "}
          <Link href="/login" className="text-orange-400 hover:text-orange-300 font-bold ml-1">
            login In
          </Link>
        </div>
      </div>
    </div>
  );
}