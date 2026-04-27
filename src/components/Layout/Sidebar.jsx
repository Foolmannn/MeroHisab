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
      <div className="flex items-center gap-2 px-2 py-0 mb-2 ">
        <div>
          <img src={logoImg} alt="logo" className="w-25 h-auto" />
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Track Manage Grow
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