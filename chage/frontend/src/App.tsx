/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Lock, Eye, EyeOff, KeyRound } from "lucide-react";
import "./App.css";

export default function NewPasswordAndConfirmPassword() {
  const [newpassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (newpassword.length < 8) {
        setError("Password must be at least 8 characters long.");
        return;
      }

      if (newpassword !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      const response = await fetch(
        "http://localhost:8001/auth/changepassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newpassword: newpassword,
            confirmpassword: confirmPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Something went wrong");
        return;
      }

      setSuccess("Password changed successfully");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4 font-sans">
      <div className="w-full max-w-[440px] bg-white shadow-xl rounded-2xl p-8 md:p-10 border border-gray-100">
        {/* Icon */}
        <div className="w-16 h-16 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center mx-auto mb-6">
          <KeyRound size={28} strokeWidth={2.5} />
        </div>

        {/* Headers */}
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
          Set New Password
        </h2>
        <p className="text-center text-gray-500 text-sm mb-8 leading-relaxed px-2">
          Your new password must be different from previous used passwords.
        </p>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm mb-6 text-center border border-red-100 font-medium">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 text-green-700 p-3 rounded-lg text-sm mb-6 text-center border border-green-200 font-medium">
            {success}
          </div>
        )}

        {/* Form or Success State */}
        {!success ? (
          <>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
                  New Password
                </label>
                <div className="relative flex items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-3.5 focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500 transition-all">
                  <Lock size={18} className="text-gray-500 mr-2 flex-shrink-0" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400 text-sm font-medium pr-8"
                    value={newpassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
                  Confirm Password
                </label>
                <div className="relative flex items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-3.5 focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500 transition-all">
                  <Lock size={18} className="text-gray-500 mr-2 flex-shrink-0" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400 text-sm font-medium pr-8"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-500 text-white font-bold text-sm py-3.5 mt-2 rounded-lg hover:bg-orange-600 transition-colors uppercase tracking-wide shadow-sm hover:shadow disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? "RESETTING..." : "RESET PASSWORD"}
              </button>
            </form>

            <div className="mt-8 text-center">
              <Link to="/login" className="text-xs font-bold text-orange-700 uppercase tracking-wide hover:underline cursor-pointer">
                BACK TO SIGN IN
              </Link>
            </div>
          </>
        ) : (
          <div className="mt-6">
            <a href="http://localhost:3000/auth/login" className="w-full inline-block text-center bg-orange-500 text-white font-bold text-sm py-3.5 rounded-lg hover:bg-orange-600 transition-colors uppercase tracking-wide shadow-sm hover:shadow cursor-pointer">
              BACK TO LOGIN
            </a>
          </div>
        )}
      </div>
    </div>
  );
}