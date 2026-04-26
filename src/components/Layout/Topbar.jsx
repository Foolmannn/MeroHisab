import { MdSearch, MdDarkMode, MdNotifications } from "react-icons/md";

export default function Topbar() {
  return (
    <header className="fixed top-0 right-0 w-[calc(100%-16rem)] bg-white/80 backdrop-blur-md z-40 border-b flex justify-between items-center px-8 py-4">

      {/* Search */}
      <div className="flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-full w-96">
        <MdSearch className="text-slate-400 w-5 h-5" />
        <input
          className="bg-transparent outline-none text-sm w-full"
          placeholder="Search transactions..."
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-6">

        <button className="p-2 hover:bg-slate-100 rounded-full">
          <MdDarkMode className="w-6 h-6 text-slate-600" />
        </button>

        <button className="p-2 hover:bg-slate-100 rounded-full relative">
          <MdNotifications className="w-6 h-6 text-slate-600" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l">
          <div className="text-right">
            <p className="text-sm font-semibold">Alex Morgan</p>
            <p className="text-xs text-slate-400">Premium Member</p>
          </div>

          <img
            src="https://via.placeholder.com/40"
            className="w-10 h-10 rounded-full"
          />
        </div>

      </div>
    </header>
  );
}