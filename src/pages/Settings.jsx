import React, { useState, useEffect } from "react";
import { useTransactions } from "../contexts/TransactionContext";
import { useUser } from "../contexts/UserContext";
import {
  MdSecurity,
  MdCurrencyExchange,
  MdPerson,
  MdDeleteForever,
  MdDownload,
  MdLock,
  MdEmail,
  MdExpandMore
} from "react-icons/md";

export default function Settings() {
  const { currency, updateCurrency, setTransactions } = useTransactions();
  const { user, updateProfile } = useUser();

  // UI Toggle States
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [securityInput, setSecurityInput] = useState({ current: "", next: "" });
  const [deletePassword, setDeletePassword] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
    password: "", 
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        bio: user.bio || "",
        password: "", 
      });
    }
  }, [user]);

  // --- Profile Actions ---
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName) return;

    if (!user && !formData.password) {
      alert("Please set a password for your new account.");
      return;
    }

    const dataToSave = user 
      ? { ...formData, password: user.password } 
      : { ...formData };

    updateProfile(dataToSave);
    alert(user ? "Profile updated!" : "Profile created!");
  };

  // --- Password Change Logic ---
  const handlePasswordUpdate = () => {
    if (securityInput.current === user.password) {
      updateProfile({ ...user, password: securityInput.next });
      setIsChangingPassword(false);
      setSecurityInput({ current: "", next: "" });
      alert("Password updated successfully.");
    } else {
      alert("Current password does not match.");
    }
  };

  // --- Functional Delete Logic ---
  const handleNuclearDelete = () => {
    if (deletePassword !== user.password) {
      alert("Incorrect password.");
      return;
    }

    if (window.confirm("CRITICAL: This wipes all transactions and profile data. Proceed?")) {
      // Clear localStorage specifically to avoid clashing with other apps
      localStorage.removeItem("vault_finance_user_data");
      localStorage.removeItem("transactions");
      localStorage.removeItem("app_currency");
      localStorage.removeItem("theme");

      // Reset Context States
      setTransactions([]); 
      updateProfile(null); 
      
      // Force hard refresh to clear any cached memory states
      window.location.replace("/"); 
    }
  };

  return (
    <main className="ml-52 pt-17 px-6 pb-6 min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT SIDE: PROFILE & SECURITY */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
              <MdPerson className="text-emerald-500" /> 
              {user ? "Profile Settings" : "Create Account"}
            </h2>
            
            <form onSubmit={handleProfileSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className="h-12 px-4 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white outline-none focus:ring-2 ring-emerald-500/20 border-none"
                />
                <input
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className="h-12 px-4 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white outline-none focus:ring-2 ring-emerald-500/20 border-none"
                />
              </div>

              {/* EMAIL FIELD RESTORED */}
              <div className="relative">
                <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full h-12 pl-10 pr-4 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white outline-none focus:ring-2 ring-emerald-500/20 border-none"
                />
              </div>

              {!user && (
                <div className="relative">
                  <MdLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    placeholder="Set Security Password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full h-12 pl-10 pr-4 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white outline-none focus:ring-2 ring-blue-500/20 border-2 border-blue-500/10"
                  />
                </div>
              )}

              <textarea
                placeholder="Short Bio"
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                rows="2"
                className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white outline-none focus:ring-2 ring-emerald-500/20 border-none"
              />
              
              <button 
                type="submit"
                className={`h-11 rounded-full font-bold text-white transition active:scale-95 shadow-lg ${
                  user ? "bg-emerald-500 shadow-emerald-500/20" : "bg-blue-600 shadow-blue-500/20"
                }`}
              >
                {user ? "Update Profile" : "Create My Profile"}
              </button>
            </form>

            {/* PASSWORD MANAGEMENT */}
            {user && (
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <MdSecurity className="text-emerald-500" />
                    <h3 className="font-bold text-slate-800 dark:text-white text-sm">Account Security</h3>
                  </div>
                  {!isChangingPassword && (
                    <button 
                      onClick={() => setIsChangingPassword(true)}
                      className="text-xs font-bold  text-emerald-500 hover:text-emerald-600 px-4 py-1.5 bg-emerald-50 dark:bg-emerald-500/10 rounded-full transition"
                    >
                      Change Password
                    </button>
                  )}
                </div>

                {isChangingPassword && (
                  <div className="space-y-3 text-slate-800 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                    <input 
                      type="password" 
                      placeholder="Current Password"
                      value={securityInput.current}
                      onChange={(e) => setSecurityInput({...securityInput, current: e.target.value})}
                      className="w-full h-10 px-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm dark:text-white outline-none"
                    />
                    <input 
                      type="password" 
                      placeholder="New Password"
                      value={securityInput.next}
                      onChange={(e) => setSecurityInput({...securityInput, next: e.target.value})}
                      className="w-full h-10 px-4 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm dark:text-white outline-none"
                    />
                    <div className="flex gap-2">
                      <button onClick={handlePasswordUpdate} className="flex-1 h-10 bg-emerald-500 text-white rounded-lg text-xs font-bold hover:bg-emerald-600 transition">Update Password</button>
                      <button onClick={() => setIsChangingPassword(false)} className="px-4 h-10 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-white rounded-lg text-xs font-medium">Cancel</button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="lg:col-span-5 flex flex-col gap-6">
{/* Currency selections */}
<div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-800">
  <h3 className="font-bold text-xl text-slate-800 dark:text-white mb-4 flex items-center gap-2">
     Preferences
  </h3>
  
  <div className="space-y-4">
    <div>
      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Currency</label>
      
      {/* Relative container for the custom dropdown icon */}
      <div className="relative mt-1">
        <select 
          value={currency}
          onChange={(e) => updateCurrency(e.target.value)}
          className="w-full h-11 pl-4 pr-10 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white border-none outline-none appearance-none cursor-pointer focus:ring-2 ring-emerald-500/20"
        >
                  <option value="रू">NPR - Nepalese Rupee (रू)</option>
                <option value="Rs.">NPR - Nepalese Rupee (Rs.)</option>
                  <option value="₹">INR - Indian Rupee (₹)</option>
                  <option value="$">USD - US Dollar ($)</option>
                  <option value="€">EUR - Euro (€)</option>
                  <option value="৳">BDT - Bangladeshi Taka (৳)</option>
                  <option value="₨">PKR - Pakistani Rupee (₨)</option>
                  <option value="£">GBP - British Pound (£)</option>
                  <option value="¥">JPY - Japanese Yen (¥)</option>
        </select>
        
        {/* The Dropdown Arrow Icon */}
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
          <MdExpandMore className="text-slate-500 dark:text-slate-400 text-xl" />
        </div>
      </div>
    </div>
  </div>
</div>
          {/* DANGER ZONE */}
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm p-6 border border-red-100 dark:border-red-900/30 overflow-hidden">
            <h3 className="font-bold text-red-500 mb-2 flex items-center gap-2">
              <MdDeleteForever className="text-xl" /> Danger Zone
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Permanently delete all transactions and your profile data.
            </p>

            {!isConfirmingDelete ? (
              <button 
                onClick={() => setIsConfirmingDelete(true)}
                className="w-full h-11 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-lg text-sm font-bold hover:bg-red-500 hover:text-white transition"
              >
                Delete Account
              </button>
            ) : (
              <div className="space-y-3 p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-100 dark:border-red-900/20">
                <input 
                  type="password" 
                  placeholder="Enter Password to Wipe Data"
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  className="w-full h-10 px-4 rounded-lg bg-white dark:bg-slate-900 border-2 border-red-500 outline-none text-slate-800 dark:text-white text-sm"
                />
                <div className="flex gap-2">
                  <button onClick={handleNuclearDelete} className="flex-1 h-10 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-700">Confirm Deletion</button>
                  <button onClick={() => setIsConfirmingDelete(false)} className="px-4 h-10 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-white rounded-lg text-xs">Cancel</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}