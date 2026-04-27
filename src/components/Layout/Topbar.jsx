import { MdSearch,MdLightMode, MdDarkMode, MdNotifications } from "react-icons/md";
import { useTheme } from "../../contexts/ThemeContext";

export default function Topbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 right-0 w-[calc(100%-12rem)] bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-40 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center px-8 py-2">

      {/* Search */}
      <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full w-96">
        <MdSearch className="text-slate-400 w-5 h-5" />
        <input
          className="bg-transparent outline-none text-sm w-full text-slate-800 dark:text-slate-100"
          placeholder="Search transactions..."
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-6">

        {/* Theme Toggle */}
  <div className="flex items-center bg-slate-200 dark:bg-slate-800 p-1 rounded-full border border-slate-300 dark:border-slate-700">

  {/* Light Mode */}
  <button
    onClick={() => theme !== "light" && toggleTheme()}
    className={`w-8 h-8 flex items-center justify-center rounded-full transition cursor-pointer
      ${theme === "light"
        ? "bg-white text-yellow-500 shadow-sm"
        : "text-slate-500 dark:text-slate-400"
      }`}
  >
    <MdLightMode className="w-4 h-4" />
  </button>

  {/* Dark Mode */}
  <button
    onClick={() => theme !== "dark" && toggleTheme()}
    className={`w-8 h-8 flex items-center justify-center rounded-full transition cursor-pointer
      ${theme === "dark"
        ? "bg-slate-700 text-emerald-400 shadow-sm"
        : "text-slate-500"
      }`}
  >
    <MdDarkMode className="w-4 h-4" />
  </button>

</div>

        {/* Notifications */}
        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full relative">
          <MdNotifications className="w-6 h-6 text-slate-600 dark:text-slate-300 cursor-pointer " />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-700">
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
              Alex Morgan
            </p>
          </div>

          <img
            src="https://via.placeholder.com/40"
            className="w-10 h-10 rounded-full cursor-pointer"
          />
        </div>

      </div>
    </header>
  );
}