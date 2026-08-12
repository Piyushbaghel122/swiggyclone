import axios from "axios";
import { useState } from "react";
import { FormConfirm } from "../../../../features/auth/components/FormConfirm";
import { CheckCircle2, ArrowRight, Building2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
const api = axios.create({
    baseURL:"http://localhost:8001/api/v1/auth",
    headers: {
        "content-type": "application/json"
    },
    withCredentials:true
});


export const LoginUser = () =>{
   const [loading , setLoading] = useState(false);
   const [error , setError] = useState("");
   const [success , setSuccess] = useState(false);
   const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

   const [formData , setFormData ] = useState({
     email: "",
     password: ""
   });


   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const {name, value} = e.target;
     setFormData(prev => ({
        ...prev,
        [name] : value
     }));
   };

   const loginSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();
     
     const errors: Record<string, string> = {};
     
     if (!formData.email) {
       errors.email = "Email is required";
     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
       errors.email = "Invalid email format";
     }
     
     if (!formData.password) {
       errors.password = "Password is required";
     } else if (formData.password.length < 6) {
       errors.password = "Password must be at least 6 characters";
     }
     
     if (Object.keys(errors).length > 0) {
         setFieldErrors(errors);
         return;
     }

     setFieldErrors({});
     setLoading(true);
      try{
         const response = await api.post("/login" , { formData });
         console.log(response.data);
        setSuccess(true);
        setError("");
        setLoading(false);     }
     catch(error){
        console.log(error)
        setLoading(false);
        setError("Login failed")
     }

   }
  
   return (
    <> 
    <div className="min-h-screen flex bg-white font-sans"> 
       {/* Left side - Premium Image Area */}
       <div className="hidden lg:flex lg:w-[45%] relative bg-slate-900 overflow-hidden">
         <img 
           src="https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&q=80&w=1600" 
           alt="Login background" 
           className="w-full h-full object-cover"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-slate-900/20 mix-blend-multiply"></div>
         
         <div className="relative z-10 w-full h-full flex flex-col justify-between p-12 lg:p-16">
            <div>
               <div className="flex items-center gap-2 mb-16">
                  <div className="w-10 h-10 bg-[#B34D15] rounded-xl flex items-center justify-center shadow-lg">
                    <Building2 className="text-white w-6 h-6" />
                  </div>
                  <span className="text-2xl font-bold text-white tracking-tight">Swiggy<span className="text-[#B34D15]">Partner</span></span>
               </div>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl font-extrabold tracking-tight text-white leading-[1.1]">
                Grow your business <br/>with us
              </h1>
              <p className="text-lg text-slate-300 font-medium max-w-md">
                Join thousands of restaurant owners managing their daily operations seamlessly.
              </p>
              
              <div className="flex items-center gap-4 mt-8">
                 <div className="flex -space-x-3">
                   {[1, 2, 3, 4].map((i) => (
                     <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-200 overflow-hidden relative">
                        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" className="w-full h-full object-cover"/>
                     </div>
                   ))}
                 </div>
                 <div className="text-sm font-medium text-slate-300">
                   <span className="text-white font-bold">10,000+</span> active sellers
                 </div>
              </div>
            </div>
         </div>
       </div>

       {/* Right side - Form Area */}
       <div className="w-full lg:w-[55%] flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
         {/* Decorative elements */}
         <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
         <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-50 rounded-full blur-3xl opacity-50 translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

         <div className="max-w-md w-full relative z-10">
           <div className="mb-10 text-center lg:text-left">
             <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
               Welcome back
             </h2>
             <p className="text-gray-500 font-medium">
               Enter your credentials to access your account.
             </p>
           </div>
           
           {success && (
             <div className="mb-6 p-4 bg-green-50/80 backdrop-blur-sm rounded-xl text-green-700 text-sm font-semibold border border-green-200/50 flex items-center gap-2">
               <CheckCircle2 className="w-5 h-5 text-green-500" />
               Login Successful! Redirecting...
             </div>
           )}
           {error && (
             <div className="mb-6 p-4 bg-red-50/80 backdrop-blur-sm rounded-xl text-red-700 text-sm font-semibold border border-red-200/50">
               {error}
             </div>
           )}

           <form className="space-y-6" onSubmit={loginSubmit}>
             <div className="space-y-5">
               <div>
                 <FormConfirm
                   id="email-address"
                   name="email"
                   type="email"
                   autoComplete="email"
                   required
                   label="Email address"
                   placeholder="name@company.com"
                   value={formData.email}
                   onChange={handleChange}
                   error={fieldErrors.email}
                 />
               </div>
               <div>
                 <FormConfirm
                   id="password"
                   name="password"
                   type="password"
                   autoComplete="current-password"
                   required
                   label="Password"
                   placeholder="Enter your password"
                   value={formData.password}
                   onChange={handleChange}
                   error={fieldErrors.password}
                 />
                 <div className="flex justify-end mt-2">
                   <a href="#" className="text-sm font-semibold text-[#B34D15] hover:text-[#9c4312] transition-colors">Forgot password?</a>
                 </div>
               </div>
             </div>

             <button
               type="submit"
               disabled={loading}
               className="group relative w-full flex items-center justify-center gap-2 py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-[#B34D15] hover:bg-[#9c4312] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B34D15] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_4px_14px_0_rgba(179,77,21,0.39)] hover:shadow-[0_6px_20px_rgba(179,77,21,0.23)] hover:-translate-y-0.5"
             >
               {loading ? 'Authenticating...' : 'Sign In'}
               {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
             </button>
           </form>

           <p className="mt-10 text-center text-sm font-medium text-gray-500">
             Don't have an account?{' '}
             <Link to="/registeration" className="font-bold text-[#B34D15] hover:text-[#9c4312] hover:underline transition-all">
               Sign up for free
             </Link>
           </p>
         </div>
       </div>
    </div>
    </>
   )
}

export default LoginUser;