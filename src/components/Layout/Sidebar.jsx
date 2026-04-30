import {
  MdDashboard,
  MdAddCircle,
  MdPayments,
  MdRequestQuote,
  MdVolunteerActivism,
  MdBarChart,
  MdSettings,
} from "react-icons/md";
import { Link } from "react-router-dom";

import logoImg from "../../assets/logo.png";
import logo1Img from "../../assets/logo1.png";
import logo2Img from "../../assets/logo2.png";

export default function Sidebar() {
  const menuItems = [
    { name: "Dashboard", icon: MdDashboard,url:"/" },
    { name: "Add Expense", icon: MdAddCircle,url:"/add-expense"  },
    { name: "Add Income", icon: MdPayments ,url:"/add-income" },
    { name: "Borrow", icon: MdRequestQuote ,url:"/borrow" },
    { name: "Lend", icon: MdVolunteerActivism,url:"/lend"  },
    { name: "Reports", icon: MdBarChart,url:"/reports"  },
    { name: "Settings", icon: MdSettings ,url:"/settings" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-52 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-md flex flex-col p-3 gap-2 z-50">

      {/* Logo */}
      {/* <div className="flex items-center gap-2 px-2 py-0 mb-2 ">
        <div>
          <img src={logoImg} alt="logo" className="w-25 h-auto" />
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Track Manage Grow
          </p>
        </div>
      </div> */}
{/* Logo */}
<div className="flex flex-col items-start gap-1 px-4 py-4 mb-4">
  <div className="relative group">
    {/* 
        1. Added 'dark:invert' if your logo is black-only (turns it white in dark mode).
        2. Added 'dark:drop-shadow' to give it a glow on dark backgrounds.
        3. Added 'brightness' control for better clarity.
    */}
    <img 
      src={logo2Img} 
      alt="Mero Hisab Logo" 
      className="w-32 h-auto object-contain transition-all duration-300
                 filter brightness-100 contrast-110
                 dark:brightness-125 dark:contrast-125 
                 dark:drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]" 
    />
  </div>
  
  {/* Subtext with better spacing and contrast */}
  <div className="">
    <p className="text-[10px] font-bold uppercase tracking-[0.2em] 
                  text-slate-500 dark:text-emerald-500/80 
                  transition-colors duration-300">
      Track.Manage.Grow
    </p>
  </div>
</div>
      {/* Menu */}
      <nav className="flex flex-col gap-1 text-sm">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              to={item.url}
        className="flex items-center gap-2 px-3 py-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all"
            >
              <Icon className="w-4 h-4" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}