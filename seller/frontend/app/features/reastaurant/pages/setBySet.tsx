"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  UtensilsCrossed, 
  TrendingUp, 
  Truck, 
  Activity,
  Check
} from "lucide-react";
import RegisterRestaurant from "./regiterReastaurant";


export const StepByStep = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: 1, title: "Business Details" },
    { id: 2, title: "Documents" },
    { id: 3, title: "Verification" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans">
      
      {/* Left Sidebar */}
      <div className="w-full md:w-1/3 lg:w-[400px] bg-[#ab5603] text-white p-10 flex flex-col relative overflow-hidden shrink-0 rounded-b-3xl md:rounded-b-none md:rounded-r-3xl shadow-2xl z-10">
        
        {/* Subtle dot pattern background overlay */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}
        ></div>

        <div className="relative z-10">
          <div className="mb-12">
            <UtensilsCrossed size={40} className="text-white/90 mb-8" />
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight tracking-tight text-white">
              Grow your business with Partner Central.
            </h1>
            <p className="text-white/80 text-sm md:text-base leading-relaxed">
              Join the leading delivery network and unlock exponential growth. We handle the logistics, you focus on the food.
            </p>
          </div>

          <div className="space-y-8 mt-8">
            {/* Feature 1 */}
            <div className="flex gap-4">
              <div className="bg-white/20 p-2 rounded-lg h-fit shrink-0">
                <TrendingUp size={24} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Reach 10M+ Customers</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Tap into a massive, hungry user base looking for exactly what you cook.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex gap-4">
              <div className="bg-white/20 p-2 rounded-lg h-fit shrink-0">
                <Truck size={24} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Seamless Delivery</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Our fleet is ready when you are. Real-time tracking and dedicated support.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex gap-4">
              <div className="bg-white/20 p-2 rounded-lg h-fit shrink-0">
                <Activity size={24} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Actionable Insights</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Track performance, manage menus, and optimize revenue from your dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 flex flex-col bg-[#0a0a0a] text-gray-200">
        
        {/* Header & Stepper */}
        <div className="px-8 md:px-16 pt-12 pb-6 border-b border-white/10 bg-[#0a0a0a] sticky top-0 z-20">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-white mb-2">Register your restaurant</h2>
            <p className="text-gray-400">Complete your profile to start receiving orders.</p>
          </div>

          {/* Stepper Component */}
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-6 left-0 right-0 h-[2px] bg-white/10 -z-10"></div>
            
            <div className="flex justify-between max-w-2xl">
              {steps.map((step) => {
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;
                
                return (
                  <div key={step.id} className="flex flex-col items-center gap-3 relative bg-[#0a0a0a] px-2">
                    <motion.div 
                      initial={false}
                      animate={{
                        backgroundColor: isActive || isCompleted ? '#ab5603' : 'rgba(255,255,255,0.05)',
                        borderColor: isActive || isCompleted ? '#ab5603' : 'rgba(255,255,255,0.1)',
                        color: isActive || isCompleted ? '#ffffff' : '#9ca3af',
                        scale: isActive ? 1.1 : 1
                      }}
                      className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-sm border-[3px] transition-colors duration-300"
                    >
                      {isCompleted ? <Check size={20} className="text-white" /> : step.id}
                    </motion.div>
                    <span 
                      className={`text-sm font-semibold transition-colors duration-300 ${
                        isActive ? 'text-[#ab5603]' : isCompleted ? 'text-gray-300' : 'text-gray-500'
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Dynamic Step Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            {currentStep === 1 && (
              <div className="bg-[#0a0a0a] overflow-hidden">
                <RegisterRestaurant />
              </div>
            )}
            
            {currentStep === 2 && (
              <div className="p-12 text-center border-2 border-dashed border-white/10 bg-white/5 rounded-3xl mt-8">
                <h3 className="text-2xl font-bold text-white mb-4">Document Upload</h3>
                <p className="text-gray-400 mb-8">Please upload your FSSAI license, GST certificate, and bank details.</p>
                <button 
                  onClick={() => setCurrentStep(3)}
                  className="px-8 py-3 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all"
                >
                  Continue to Verification
                </button>
              </div>
            )}

            {currentStep === 3 && (
              <div className="p-12 text-center border-2 border-dashed border-white/10 bg-white/5 rounded-3xl mt-8">
                <h3 className="text-2xl font-bold text-white mb-4">Verification</h3>
                <p className="text-gray-400 mb-8">Review your details and submit for final approval.</p>
                <button 
                  onClick={() => alert('Submitted successfully!')}
                  className="px-8 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors"
                >
                  Submit Registration
                </button>
              </div>
            )}
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default StepByStep;
