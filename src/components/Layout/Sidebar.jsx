import {
  MdDashboard,
  MdAddCircle,
  MdPayments,
  MdRequestQuote,
  MdVolunteerActivism,
  MdBarChart,
  MdSettings,
  MdAccountBalanceWallet,
} from "react-icons/md";

import logoImg from "../../assets/logo.png"

export default function Sidebar() {
  const menuItems = [
    { name: "Dashboard", icon: MdDashboard },
    { name: "Add Expense", icon: MdAddCircle },
    { name: "Add Income", icon: MdPayments },
    { name: "Borrow", icon: MdRequestQuote },
    { name: "Lend", icon: MdVolunteerActivism },
    { name: "Reports", icon: MdBarChart },
    { name: "Settings", icon: MdSettings },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r bg-white shadow-xl flex flex-col p-4 gap-2 z-50">

      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-6 mb-4">
        {/* <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
          <MdAccountBalanceWallet className="w-6 h-6" />
        </div> */}

        <div>
          {/* <h1 className="text-xl font-black text-emerald-600">MeroHisab</h1> */}
          <img src={logoImg} alt="logo" width={150}/>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Track  Manage  Grow
          </p>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-1">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <a
              key={item.name}
              href="#"
              className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-emerald-600 hover:translate-x-1 transition"
            >
              <Icon className="w-6 h-6" />
              <span>{item.name}</span>
            </a>
          );
        })}
      </nav>
    </aside>
  );
}