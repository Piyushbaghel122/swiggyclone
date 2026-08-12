import React from 'react';
import { motion } from 'framer-motion';
import { Store, Mail, Lock, ArrowRight } from 'lucide-react';

export default function LoginPageUser() {
  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-900 w-full max-w-md rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800"
      >
        <div className="p-8 sm:p-10">
          <div className="flex justify-center mb-8">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: -5 }}
              className="bg-orange-500 p-3 rounded-2xl text-white shadow-lg shadow-orange-500/30"
            >
              <Store size={32} strokeWidth={2.5} />
            </motion.div>
          </div>
          
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">
            Welcome Back
          </h2>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
            Login to your Swiggy Seller account
          </p>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all dark:text-white"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                <a href="#" className="text-xs font-medium text-orange-500 hover:text-orange-600">Forgot password?</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all dark:text-white"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transition-all mt-2"
            >
              Sign In
              <ArrowRight size={18} />
            </motion.button>
          </form>
          
          <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            Don't have an account?{" "}
            <a href="/register" className="font-medium text-orange-500 hover:text-orange-600 transition-colors">
              Sign up now
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}