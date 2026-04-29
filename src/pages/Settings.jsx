import React, { useState } from "react";
import { useTransactions } from "../contexts/TransactionContext";
import {
  MdSecurity,
  MdNotifications,
  MdCurrencyExchange,
  MdPerson,
  MdDeleteForever,
  MdDownload,
  MdOutlineDateRange,
} from "react-icons/md";

export default function Settings() {
  const { currency, updateCurrency } = useTransactions();

  // Expanded Currency Map
  const currencies = [
    { label: "INR - Indian Rupee", symbol: "₹", code: "INR" },
    { label: "NPR - Nepalese Rupee", symbol: "Rs.", code: "NPR" },
    { label: "USD - US Dollar", symbol: "$", code: "USD" },
    { label: "EUR - Euro", symbol: "€", code: "EUR" },
    { label: "GBP - British Pound", symbol: "£", code: "GBP" },
    { label: "JPY - Japanese Yen", symbol: "¥", code: "JPY" },
    { label: "AUD - Australian Dollar", symbol: "A$", code: "AUD" },
    { label: "CAD - Canadian Dollar", symbol: "C$", code: "CAD" },
  ];

  const handleCurrencySelection = (e) => {
    const selectedSymbol = e.target.value;
    updateCurrency(selectedSymbol);
  };

  return (
    <main className="ml-52 pt-17 px-6 pb-6 min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT SIDE: PROFILE & NOTIFICATIONS */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* PROFILE CARD */}
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-5 flex items-center gap-2">
              <MdPerson className="text-emerald-500" /> Profile Settings
            </h2>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  placeholder="First Name"
                  className="h-12 px-4 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white outline-none focus:ring-2 ring-emerald-500/20"
                />
                <input
                  placeholder="Last Name"
                  className="h-12 px-4 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white outline-none focus:ring-2 ring-emerald-500/20"
                />
              </div>
              <input
                placeholder="Email Address"
                className="h-12 px-4 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white outline-none focus:ring-2 ring-emerald-500/20"
              />
              <textarea
                placeholder="Short Bio"
                rows="3"
                className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white outline-none focus:ring-2 ring-emerald-500/20"
              />
              <button className="h-11 bg-emerald-500 text-white rounded-full font-semibold hover:bg-emerald-600 transition active:scale-95 shadow-lg shadow-emerald-500/20">
                Update Profile
              </button>
            </div>
          </div>

          {/* NOTIFICATIONS */}
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 mb-6">
              <MdNotifications className="text-emerald-500 text-xl" />
              <h3 className="font-bold text-slate-800 dark:text-white">Preferences</h3>
            </div>
            <div className="flex flex-col gap-3">
              <ToggleItem title="Dark Mode" desc="Switch between light and dark theme" />
              <ToggleItem title="Email Reports" desc="Receive weekly spending insights" defaultChecked />
              <ToggleItem title="Budget Alerts" desc="Notify when 80% of budget is used" />
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: CURRENCY & SECURITY */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* CURRENCY & REGION */}
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 mb-4">
              <MdCurrencyExchange className="text-emerald-500 text-xl" />
              <h3 className="font-bold text-slate-800 dark:text-white">Region & Currency</h3>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Default Currency</label>
                <select 
                  value={currency}
                  onChange={handleCurrencySelection}
                  className="w-full mt-1 h-12 px-4 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white border-transparent focus:ring-2 ring-emerald-500/20 outline-none appearance-none cursor-pointer"
                >
                  {currencies.map((curr) => (
                    <option key={curr.code} value={curr.symbol}>
                      {curr.label} ({curr.symbol})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Date Format</label>
                <div className="relative mt-1">
                  <MdOutlineDateRange className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <select className="w-full h-12 pl-10 pr-4 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white border-transparent outline-none">
                    <option>DD/MM/YYYY</option>
                    <option>MM/DD/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* SECURITY QUICK LINKS */}
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 mb-4">
              <MdSecurity className="text-emerald-500" />
              <h3 className="font-bold text-slate-800 dark:text-white">Security</h3>
            </div>
            <div className="flex flex-col gap-2">
              <SecurityButton label="Change Password" />
              <SecurityButton label="Enable 2FA" />
            </div>
          </div>

          {/* DANGER ZONE */}
          <div className="bg-slate-900 dark:bg-red-950/20 rounded-xl shadow-sm p-6 border border-transparent dark:border-red-900/20">
            <h3 className="font-bold text-white mb-2">Account Actions</h3>
            <p className="text-xs text-slate-400 mb-4">Manage your data exports and account status.</p>
            <div className="flex flex-col gap-3">
              <button className="h-11 bg-white/10 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-white/20 transition text-sm font-medium">
                <MdDownload /> Export Data (.CSV)
              </button>
              <button className="h-11 bg-red-500 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-red-600 transition text-sm font-bold">
                <MdDeleteForever className="text-lg" /> Delete All Data
              </button>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

function ToggleItem({ title, desc, defaultChecked = false }) {
  return (
    <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
      <div>
        <p className="text-sm font-semibold text-slate-800 dark:text-white">{title}</p>
        <p className="text-[11px] text-slate-500">{desc}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" defaultChecked={defaultChecked} className="sr-only peer" />
        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
      </label>
    </div>
  );
}

function SecurityButton({ label }) {
  return (
    <button className="h-11 w-full bg-slate-100 dark:bg-slate-800 rounded-lg text-left px-4 hover:bg-slate-200 dark:hover:bg-slate-700 transition text-sm text-slate-700 dark:text-slate-300 font-medium">
      {label}
    </button>
  );
}