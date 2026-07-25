import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Mail, RotateCcw } from "lucide-react";
import useAuth from "../hook/useAuth";

export default function SendLink() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const { handleSendLinkUser } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            setMessage("");
            const res = await handleSendLinkUser({ email });
            setLoading(false);
            setMessage(res?.message || "If an account with that email exists, we have sent a reset link.");
        } catch (err) {
            setLoading(false);
            setMessage("An error occurred while sending the reset link.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4 font-sans">
            <div className="w-full max-w-[440px] bg-white shadow-xl rounded-2xl p-8 md:p-10 border border-gray-100">
                {/* Icon */}
                <div className="w-16 h-16 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center mx-auto mb-6">
                    <RotateCcw size={28} strokeWidth={2.5} />
                </div>

                {/* Headers */}
                <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
                    Forgot Password
                </h2>
                <p className="text-center text-gray-500 text-sm mb-8 leading-relaxed px-2">
                    Enter your email address and we'll send you a link to reset your password.
                </p>

                {message && (
                    <div className="bg-green-50 text-green-700 p-3 rounded-lg text-sm mb-6 text-center border border-green-200 font-medium">
                        {message}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
                            Email Address
                        </label>
                        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-3.5 focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500 transition-all">
                            <Mail size={18} className="text-gray-500 mr-2 flex-shrink-0" />
                            <input
                                id="email"
                                type="email"
                                required
                                placeholder="name@example.com"
                                className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400 text-sm font-medium"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-orange-500 text-white font-bold text-sm py-3.5 rounded-lg hover:bg-orange-600 transition-colors uppercase tracking-wide shadow-sm hover:shadow disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                    >
                        {loading ? "SENDING..." : "SEND RESET LINK"}
                    </button>
                </form>

                {/* Footer Link */}
                <div className="mt-8 text-center">
                    <Link to="/login" className="text-xs font-bold text-orange-700 uppercase tracking-wide hover:underline cursor-pointer">
                        BACK TO SIGN IN
                    </Link>
                </div>
            </div>
        </div>
    );
}