import { useState } from "react";
import {
  MdSecurity,
  MdNotifications,
  MdCurrencyExchange,
  MdPerson,
  MdDeleteForever,
  MdDownload,
} from "react-icons/md";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <main className="ml-52 pt-20 px-6 pb-6 min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT SIDE */}
        <div className="lg:col-span-7 flex flex-col gap-6">

          {/* PROFILE CARD */}
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-6">

            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-5">
              Profile Settings
            </h2>

            <div className="flex flex-col gap-4">

              <input
                placeholder="Full Name"
                className="h-12 px-4 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white"
              />

              <input
                placeholder="Email"
                className="h-12 px-4 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white"
              />

              <textarea
                placeholder="Bio"
                rows="3"
                className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white"
              />

              <button className="h-12 bg-emerald-500 text-white rounded-full font-semibold hover:scale-105 transition">
                Save Profile
              </button>

            </div>
          </div>

          {/* NOTIFICATIONS */}
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-6">

            <div className="flex items-center gap-2 mb-4">
              <MdNotifications className="text-emerald-500" />
              <h3 className="font-bold text-slate-800 dark:text-white">
                Notifications
              </h3>
            </div>

            <div className="flex flex-col gap-4">

              <ToggleItem title="Daily Summary" desc="Get daily expense report" />
              <ToggleItem title="Budget Alerts" desc="When budget exceeds limit" />
              <ToggleItem title="Bill Reminders" desc="Upcoming bill alerts" />

            </div>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="lg:col-span-5 flex flex-col gap-6">

          {/* SECURITY */}
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-6">

            <div className="flex items-center gap-2 mb-4">
              <MdSecurity className="text-emerald-500" />
              <h3 className="font-bold text-slate-800 dark:text-white">
                Security
              </h3>
            </div>

            <div className="flex flex-col gap-3 dark:text-slate-400">

              <button className="h-12 bg-slate-100 dark:bg-slate-800 rounded-lg text-left px-4 hover:bg-slate-200 dark:hover:bg-slate-700 transition">
                Change Password
              </button>

              <button className="h-12 bg-slate-100 dark:bg-slate-800 rounded-lg text-left px-4 hover:bg-slate-200 dark:hover:bg-slate-700 transition">
                Two Factor Authentication
              </button>

              <button className="h-12 bg-slate-100 dark:bg-slate-800 rounded-lg text-left px-4 hover:bg-slate-200 dark:hover:bg-slate-700 transition">
                Active Sessions
              </button>

            </div>
          </div>

          {/* CURRENCY */}
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-6">

            <div className="flex items-center gap-2 mb-4">
              <MdCurrencyExchange className="text-emerald-500" />
              <h3 className="font-bold text-slate-800 dark:text-white">
                Currency
              </h3>
            </div>

            <div className="flex flex-col gap-3">

              <select className="h-12 px-4 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white">
                <option>NPR</option>
                <option>USD</option>
                <option>EUR</option>
              </select>

              <select className="h-12 px-4 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white">
                <option>DD/MM/YYYY</option>
                <option>MM/DD/YYYY</option>
                <option>YYYY-MM-DD</option>
              </select>

            </div>
          </div>

          {/* DATA ACTIONS */}
          <div className="bg-slate-900 text-white rounded-xl shadow p-6">

            <h3 className="font-bold mb-3">Data & Privacy</h3>

            <p className="text-sm text-slate-300 mb-4">
              Export or delete your financial data
            </p>

            <div className="flex flex-col gap-3">

              <button className="h-12 bg-white/10 rounded-lg flex items-center justify-center gap-2 hover:bg-white/20 transition">
                <MdDownload />
                Export Data
              </button>

              <button className="h-12 bg-red-500 rounded-lg flex items-center justify-center gap-2 hover:brightness-110 transition">
                <MdDeleteForever />
                Delete Account
              </button>

            </div>

          </div>

        </div>
      </div>
    </main>
  );
}

/* TOGGLE COMPONENT */
function ToggleItem({ title, desc }) {
  return (
    <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
      <div>
        <p className="text-sm font-semibold text-slate-800 dark:text-white">
          {title}
        </p>
        <p className="text-xs text-slate-500">{desc}</p>
      </div>

      <input type="checkbox" />
    </div>
  );
}