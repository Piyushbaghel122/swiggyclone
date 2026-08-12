import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FormGroup } from "../components/FormGroup";
import { User, Mail, Phone, Lock, ArrowRight, Github } from "lucide-react";

const api = axios.create({
  baseURL: "http://localhost:8002/api/v1/auth",
  withCredentials: true,
});

export const Singup = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  const validateForm = () => {
    const inputname = username.trim();
    if (inputname.length < 4) throw new Error("Username must be at least 4 characters long.");
    if (!/^[a-zA-Z\s]+$/.test(inputname)) throw new Error("Username can only contain letters and spaces.");
    if (inputname.includes(" ")) throw new Error("Username cannot contain spaces.");
    if (inputname.startsWith(" ")) throw new Error("Username cannot start with space.");

    const inputemail = email.trim();
    if (!inputemail) throw new Error("Email is required.");
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(inputemail)) throw new Error("Invalid email format.");

    const inputmobile = mobile.trim();
    if (!inputmobile) throw new Error("Mobile number is required.");
    if (!/^\d{10}$/.test(inputmobile)) throw new Error("Mobile number must be 10 digits.");

    if (!password) throw new Error("Password is required.");
    if (!password.match(/[a-z]/)) throw new Error("Password must contain at least one lowercase letter.");
    if (!password.match(/[A-Z]/)) throw new Error("Password must contain at least one uppercase letter.");
    if (!password.match(/^[a-zA-Z0-9]{6,}$/)) throw new Error("Password must be at least 6 characters long and alphanumeric.");

    if (password !== confirmPassword) throw new Error("Passwords do not match.");
  };

  const submitRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      validateForm();
      
      setLoading(true);
      const response = await api.post("/register", {
        username,
        email,
        mobile,
        password,
      });

      if (response.data?.success || response.status === 200 || response.status === 201) {
        // Optional: Send OTP
        try {
          await api.post("/sendOtp", { mobile });
        } catch (otpErr) {
          console.error("Failed to send OTP", otpErr);
        }
        
        // Save to localStorage just in case, and pass via URL
        localStorage.setItem("registeredMobile", mobile);
        router.push(`/verifyOtp?mobile=${encodeURIComponent(mobile)}`);
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  const submitGoogleAuth = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post("/google");
      if (response.status === 200) {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during Google authentication");
    } finally {
      setLoading(false);
    }
  };

  const githubSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post("/github");
      if (response.status === 200) {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during Github authentication");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white dark:bg-gray-900">
      
      {/* Left Column - Image & Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558981420-87aa9dad1c89?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center"></div>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-gray-900/20"></div>
        
        <div className="relative w-full flex flex-col justify-end p-12 lg:p-16 text-white z-10">
          <div className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-sm font-medium w-max">
            <span className="w-2 h-2 rounded-full bg-green-400"></span>
            Partner Network
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Join <span className="text-blue-400">Foodcut</span> Partner
          </h1>
          <p className="text-lg text-gray-300 max-w-md">
            Turn your miles into money. Deliver with Foodcut and enjoy flexible timings, great earnings, and seamless rides.
          </p>
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 lg:p-12">
        <div className="w-full max-w-md">
          
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Create Account</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Sign up to start your journey as a delivery partner</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={submitRegister} className="space-y-5">
            <FormGroup
              id="username"
              label="Username"
              placeholder="johndoe"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              icon={<User className="w-5 h-5" />}
            />
            
            <FormGroup
              id="email"
              type="email"
              label="Email Address"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="w-5 h-5" />}
            />

            <FormGroup
              id="mobile"
              type="tel"
              label="Mobile Number"
              placeholder="1234567890"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              icon={<Phone className="w-5 h-5" />}
            />

            <FormGroup
              id="password"
              type="password"
              label="Password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock className="w-5 h-5" />}
            />

            <FormGroup
              id="confirmPassword"
              type="password"
              label="Confirm Password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              icon={<Lock className="w-5 h-5" />}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg font-medium transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed mt-6"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 flex items-center gap-4">
            <div className="h-px bg-gray-200 dark:bg-gray-800 flex-1"></div>
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Or continue with</span>
            <div className="h-px bg-gray-200 dark:bg-gray-800 flex-1"></div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <button 
              onClick={submitGoogleAuth}
              type="button" 
              className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300 font-medium text-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button 
              onClick={githubSubmit}
              type="button" 
              className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300 font-medium text-sm"
            >
              <Github className="w-5 h-5" />
              GitHub
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                Sign in
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Singup;