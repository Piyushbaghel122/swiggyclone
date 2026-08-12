import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, FileText, ArrowRight, ShieldCheck, MapPin, Map } from "lucide-react";
import { FormGroup } from "../components/FormGroup";

const api = axios.create({
  baseURL: "http://localhost:8002/api/v1/auth",
  withCredentials: true,
});

export default function Document() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Document states
  const [pancardNumber, setPancardNumber] = useState("");
  const [AadhaarNumber, setAadhaarNumber] = useState("");
  const [Drivelicence, setDrivelicence] = useState("");
  const [Address, setAddress] = useState("");
  const [state, setState] = useState("");

  const router = useRouter();

  const submitDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      
      // Basic validation
      if (!pancardNumber.trim() || !AadhaarNumber.trim() || !Drivelicence.trim() || !Address.trim() || !state.trim()) {
        throw new Error("Please fill in all document and address fields.");
      }

      setLoading(true);

      const response = await api.post("/Document", {
        pancardNumber,
        AadhaarNumber,
        Drivelicence,
        Address,
        state
        
});

      if (response.data?.success || response.status === 200) {
        // Documents submitted successfully, go to dashboard
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Failed to submit documents. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white dark:bg-gray-900">
      
      {/* Left Column - Image & Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618060932014-4deda4932554?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-gray-900/20"></div>
        
        <div className="relative w-full flex flex-col justify-end p-12 lg:p-16 text-white z-10">
          <div className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-sm font-medium w-max">
            <ShieldCheck className="w-4 h-4 text-green-400" />
            Verification Step
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Upload your <span className="text-blue-400">Documents</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-md">
            To become a verified Foodcut partner and start earning, we need to verify your identity and driving credentials.
          </p>
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 lg:p-12">
        <div className="w-full max-w-md">
          
          <div className="mb-8">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6">
              <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Partner Documents</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Please enter your official document numbers to complete your onboarding.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={submitDocument} className="space-y-5">
            <FormGroup
              id="pancard"
              type="text"
              label="PAN Card Number"
              placeholder="e.g. ABCDE1234F"
              value={pancardNumber}
              onChange={(e) => setPancardNumber(e.target.value.toUpperCase())}
              icon={<CreditCard className="w-5 h-5" />}
              maxLength={10}
            />

            <FormGroup
              id="aadhaar"
              type="text"
              label="Aadhaar Number"
              placeholder="e.g. 1234 5678 9012"
              value={AadhaarNumber}
              onChange={(e) => setAadhaarNumber(e.target.value)}
              icon={<ShieldCheck className="w-5 h-5" />}
              maxLength={12}
            />

            <FormGroup
              id="license"
              type="text"
              label="Driving License Number"
              placeholder="e.g. MH14 20110012345"
              value={Drivelicence}
              onChange={(e) => setDrivelicence(e.target.value.toUpperCase())}
              icon={<FileText className="w-5 h-5" />}
            />

            <FormGroup
              id="address"
              type="text"
              label="Full Address"
              placeholder="e.g. 123 Main St, Apartment 4B"
              value={Address}
              onChange={(e) => setAddress(e.target.value)}
              icon={<MapPin className="w-5 h-5" />}
            />

            <FormGroup
              id="state"
              type="text"
              label="State"
              placeholder="e.g. Maharashtra"
              value={state}
              onChange={(e) => setState(e.target.value)}
              icon={<Map className="w-5 h-5" />}
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg font-medium transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed mt-8"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Submit Documents
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
