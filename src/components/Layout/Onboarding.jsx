import React, { useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { MdPerson, MdEmail, MdLock, MdAccountBalanceWallet } from "react-icons/md";
import logoImg from "../../assets/logo2.png"

export default function Onboarding() {
  const { updateProfile } = useUser();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    bio: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate required fields
    if (!formData.firstName || !formData.email || !formData.password) {
      alert("Please fill in all required fields.");
      return;
    }
    
    updateProfile({
      ...formData,
      joinedDate: new Date().toISOString(),
      theme: "light",
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-100 dark:bg-slate-950 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl max-w-md w-full border border-slate-200 dark:border-slate-800">
        <div className="text-center mb-8">
          <div className=" w-25 h-25 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/20">
                   <div className="relative group">
                      <img
                        src={logoImg}
                        alt="Mero Hisab Logo"
                        className="w-32 h-auto object-contain transition-all duration-300 filter brightness-100 dark:brightness-125 dark:drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]"
                      />
                    </div>
            {/* <MdAccountBalanceWallet className="text-white text-3xl" /> */}
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Create Your Account</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">Welcome to Mero Hisab. Let's set up your profile.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <input 
              type="text" 
              placeholder="First Name"
              className="w-full h-11 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 dark:text-white outline-none focus:ring-2 ring-emerald-500/20 border-none"
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              required
            />
            <input 
              type="text" 
              placeholder="Last Name"
              className="w-full h-11 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 dark:text-white outline-none focus:ring-2 ring-emerald-500/20 border-none"
              value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
            />
          </div>

          <div className="relative">
            <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="email" 
              placeholder="Email Address"
              className="w-full h-11 pl-10 pr-4 rounded-xl bg-slate-100 dark:bg-slate-800 dark:text-white outline-none focus:ring-2 ring-emerald-500/20 border-none"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>

          <div className="relative">
            <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="password" 
              placeholder="Security Password"
              className="w-full h-11 pl-10 pr-4 rounded-xl bg-slate-100 dark:bg-slate-800 dark:text-white outline-none focus:ring-2 ring-emerald-500/20 border-none"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full h-12 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition active:scale-[0.98] shadow-lg shadow-emerald-500/20 mt-2 cursor-pointer"
          >
            Get Started
          </button>
        </form>
      </div>
    </div>
  );
}