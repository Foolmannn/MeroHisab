import { useState } from "react"; // Added
import {
  MdDashboard,
  MdAddCircle,
  MdPayments,
  MdRequestQuote,
  MdVolunteerActivism,
  MdBarChart,
  MdSettings,
  MdMenu,      // Added
  MdClose,     // Added
} from "react-icons/md";
import { Link } from "react-router-dom";
import logo2Img from "../../assets/logo2.png";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false); // State for mobile toggle

  const menuItems = [
    { name: "Dashboard", icon: MdDashboard, url: "/" },
    { name: "Add Expense", icon: MdAddCircle, url: "/add-expense" },
    { name: "Add Income", icon: MdPayments, url: "/add-income" },
    { name: "Borrow", icon: MdRequestQuote, url: "/borrow" },
    { name: "Lend", icon: MdVolunteerActivism, url: "/lend" },
    { name: "Reports", icon: MdBarChart, url: "/reports" },
    { name: "Settings", icon: MdSettings, url: "/settings" },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* MOBILE HAMBURGER BUTTON (Only visible on small screens) */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-[60] p-2 bg-emerald-500 text-white rounded-lg shadow-lg"
      >
        {isOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
      </button>

      {/* OVERLAY (Closes sidebar when clicking outside on mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed left-0 top-0 h-screen w-52 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-md flex flex-col p-3 gap-2 z-50 transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Logo Section */}
        <div className="flex flex-col items-start gap-1 px-4 py-4 mb-4">
          <div className="relative group">
            <img
              src={logo2Img}
              alt="Mero Hisab Logo"
              className="w-32 h-auto object-contain transition-all duration-300 filter brightness-100 dark:brightness-125 dark:drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]"
            />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-emerald-500/80">
            Track.Manage.Grow
          </p>
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col gap-1 text-sm">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.url}
                onClick={() => setIsOpen(false)} // Close on link click (mobile)
                className="flex items-center gap-2 px-3 py-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all"
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}