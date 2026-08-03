"use client";
import { useState } from "react";
import { FormConfirm } from "../../features/auth/components/FormConfirm";
import { sendOtp , updateFssai , updateGst , panCardAPI , aadhaarAPI } from "../../ulits/merchant";
import { useNavigate } from "@tanstack/react-router";
import Navbar from "../navbar/navbar";


export default function BankingAndCompteletePage() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [panCardNumber, setPanCardNumber] = useState<string>("");
    const [aadhaarNumber, setAadhaarNumber] = useState<string>("");

    const navigate = useNavigate();

    const panCardSubmitButton = async () => {
        try {
            setLoading(false);
            setError(null);
            const response = await panCardAPI(panCardNumber);
            if (response.error) {
                setError(response.error);
                setLoading(false);
                return;
            }
            setError(null);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setError("Something went wrong");
        }

    

        setTimeout(() => {
            setLoading(true);
            
        },3000)
    }

 const aadhaarSubmitButton = async () => {
    try{
        setLoading(true)
        setError(null)

        const response = await aadhaarAPI(panCardNumber, Number(aadhaarNumber));
      if(response.error){
        setError(response.message)
        setLoading(false)
        return;
      }

      const otpResponse = await sendOtp({
          panCardNumber,
          AadhaarNumber: aadhaarNumber,
          phoneNumber: ""
      });

      if (typeof otpResponse === "string") {
          setError(otpResponse);
          setLoading(false);
          return;
      }

      navigate({
        to: "/confirm-otp",
      })
 }catch(err){
    console.error(err);
    throw new Error("invalid aadhaar number`")
 }

 }




    return (
        <>
         <Navbar />
        <div className="min-h-screen bg-yellow-700/10 flex flex-col items-center py-20 pb-100 p-4">
            <div className="bg-[#EFEBE4] p-10 rounded-2xl shadow-lg w-full max-w-[700px] text-[#2A1F1D]">
                <h1 className="text-3xl font-bold mb-2">Let&apos;s make it official</h1>
                <p className="text-base mb-8 text-gray-700">
                    Verify your business details to start<br />orders on Vibrant Cravings.
                </p>

                {/* Secure Verification Alert Box */}
                <div className="bg-[#F9F6F0] rounded-2xl p-5 flex gap-4 items-start mb-8">
                    <div className="bg-[#F0E5D8] p-3 rounded-full flex-shrink-0 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#A43900]" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944a11.954 11.954 0 007.834 3.055 11.037 11.037 0 01-7.834 13.055 11.037 11.037 0 01-7.834-13.055zm5.127 4.144a.75.75 0 011.06 0l2.062 2.062 3.864-3.864a.75.75 0 111.06 1.06l-4.394 4.394a.75.75 0 01-1.06 0L7.293 10.203a.75.75 0 010-1.06z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-bold text-[#003B5C] text-lg mb-1">Secure Verification</h3>
                        <p className="text-sm text-gray-600 font-medium">
                            Your documents are encrypted and stored<br />securely according to industry standards.
                        </p>
                    </div>
                </div>

                {/* GSTIN Input */}
                <div className="space-y-3">
                    <label className="block text-lg font-bold">GST Identification Number (GSTIN)</label>
                    <div className="relative flex items-center">
                        <input
                            type="text"
                            placeholder="22AAAAA0000A1Z5"
                            className="w-full pl-5 pr-32 py-4 bg-[#F2EAE0] rounded-2xl border-none focus:ring-2 focus:ring-[#A43900] outline-none text-lg placeholder-gray-400 font-medium"
                        />
                        <button className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 bg-[#A43900] hover:bg-[#8B3000] text-white font-bold py-2.5 px-6 rounded-xl transition-colors">
                            Verify
                        </button>
                    </div>
                </div>

                {/* FSSAI License Card */}
                <div className="bg-white rounded-2xl p-6 mt-8 shadow-sm">
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex gap-4">
                            <div className="bg-[#F0E5D8] p-3 rounded-xl flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-[#2A1F1D]">
                                    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
                                    <path d="M7 2v20" />
                                    <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
                                </svg>
                            </div>
                            <div className="mt-0.5">
                                <h3 className="font-bold text-[#001011] text-lg leading-tight">FSSAI License</h3>
                                <p className="text-sm text-gray-500 font-medium mt-1">Mandatory for food businesses</p>
                            </div>
                        </div>
                        <div className="bg-[#EFEBE4] text-[#7A6B63] px-3 py-1.5 rounded-md text-xs font-bold tracking-wider">
                            PENDING
                        </div>
                    </div>

                    {/* Upload Area */}
                    <label className="border-2 border-dashed border-[#D4C3B3] rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                        <input type="file" className="hidden" />
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#A43900] mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <span className="text-[#A43900] font-bold text-lg mb-1">Upload FSSAI Certificate</span>
                        <span className="text-gray-500 text-sm font-medium">PDF, PNG or JPG (Max 5MB)</span>
                    </label>
                </div>
                {/* PAN Card Status */}
                <div className="bg-white rounded-2xl p-6 mt-8 shadow-sm">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex gap-4">
                            <div className="bg-[#F0E5D8] p-3 rounded-xl flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#2A1F1D]">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                                </svg>
                            </div>
                            <div className="mt-0.5">
                                <h3 className="font-bold text-[#001011] text-lg leading-tight">Business PAN Card</h3>
                                <p className="text-sm text-gray-500 font-medium mt-1">Entity or Proprietor PAN</p>
                            </div>
                        </div>
                        <div className="bg-green-50 text-green-600 px-3 py-1.5 rounded-md text-xs font-bold tracking-wider flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                            </svg>
                            VERIFIED
                        </div>
                    </div>

                    <div className="bg-[#F6F3EF] rounded-xl p-4 border border-[#E8E2D9]">
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                            PAN Card Number
                        </label>
                        <div className="relative flex items-center">
                            <div className="absolute left-4 bg-white border border-gray-200 px-2 py-1 rounded text-[10px] font-bold text-gray-600">
                                PAN
                            </div>
                            <input
                                type="text"
                                placeholder="Enter your PAN number"
                                value={panCardNumber}
                                onChange={(e) => setPanCardNumber(e.target.value)}
                                className="w-full pl-16 pr-12 py-3 bg-white rounded-lg border border-[#E8E2D9] focus:ring-2 focus:ring-[#A43900] focus:border-transparent outline-none text-base text-gray-800 placeholder-gray-400 font-medium transition-all"
                            />
                            <div className="absolute right-4 text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Aadhaar E-KYC */}
                <div className="bg-white rounded-2xl p-6 mt-6 shadow-sm">
                    <div className="flex gap-4 mb-6">
                        <div className="bg-[#F0E5D8] p-3 rounded-xl flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#2A1F1D]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                        </div>
                        <div className="mt-0.5">
                            <h3 className="font-bold text-[#001011] text-lg leading-tight">Aadhaar E-KYC</h3>
                            <p className="text-sm text-gray-500 font-medium mt-1">Instant verification via OTP</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Enter 12 digit Aadhaar number"
                            value={aadhaarNumber}
                            onChange={(e) => setAadhaarNumber(e.target.value)}
                            className="w-full px-5 py-4 bg-[#F6F3EF] rounded-xl border-none focus:ring-2 focus:ring-[#A43900] outline-none text-lg placeholder-gray-400 font-medium"
                        />
                        <button onClick={aadhaarSubmitButton} className="w-full bg-[#1A1A1A] hover:bg-black text-white font-bold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 text-lg">
                            Get OTP
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Continue Button */}
                <button onClick={panCardSubmitButton} onMouseDown={(e) => e.preventDefault()} className="w-full bg-[#A43900] hover:bg-[#8B3000] text-white font-bold py-5 px-6 rounded-2xl mt-10 transition-colors flex items-center justify-center gap-2 text-lg shadow-lg">
                    CONTINUE ONBOARDING
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>

            {/* Step Indicators */}
            <div className="flex gap-3 mt-8">
                <div className="w-2.5 h-2.5 rounded-full bg-[#E6D4C9]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#C69A7E]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#E6D4C9]"></div>
            </div>


        </div>
        </>
    )
}