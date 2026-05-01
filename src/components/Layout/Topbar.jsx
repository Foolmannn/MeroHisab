import { MdSearch, MdLightMode, MdDarkMode, MdNotifications, MdKeyboardCommandKey } from "react-icons/md";
import { useTheme } from "../../contexts/ThemeContext";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { useState, useRef, useEffect } from "react";
import { useTransactions } from "../../contexts/TransactionContext";

export default function Topbar() {
  const { theme, toggleTheme } = useTheme();
  const { user } = useUser();
  const { addTransaction, currency, notifications, setNotifications } = useTransactions();

  // --- STATE ---
  const [command, setCommand] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false); // FIXED: Added missing state
  const notificationRef = useRef(null); // Ref for click-outside logic

  const unreadCount = notifications.filter((n) => !n.read).length;

  // --- HANDLERS ---
  const markAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setShowNotifications(false);
  };

  const handleQuickCommand = (input) => {
    const parts = input.split("-");
    if (parts.length < 3) return;

    const typeCode = parts[0].toLowerCase().trim();
    const amount = Number(parts[1].trim());
    const detail = parts[2].trim();
    const note = parts[3] ? parts[3].trim() : "";

    if (isNaN(amount)) return;

    const typeMap = { e: "expense", i: "income", l: "lend", b: "borrow" };
    const type = typeMap[typeCode];
    if (!type) return;

    // 1. Instant UI Feedback
    setCommand("");
    setIsProcessing(true);

    // 2. Logic
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    const newEntry = {
      id: Date.now().toString(),
      type,
      amount,
      date: today.toISOString().split("T")[0],
      note: note || detail,
      status: "Pending",
      ...(type === "lend" || type === "borrow"
        ? { person: detail, dueDate: nextWeek.toISOString().split("T")[0] }
        : { category: detail }),
    };

    addTransaction(newEntry);

    // 3. Short animation reset
    setTimeout(() => {
      setIsProcessing(false);
    }, 150);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleQuickCommand(command);
    }
  };

  // --- CLICK OUTSIDE TO CLOSE ---
  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload
    handleQuickCommand(command);
  };

  return (
<header className="fixed top-0 right-0 w-full lg:w-[calc(100%-13rem)] bg-white/95 dark:bg-slate-900/95 backdrop-blur-md z-40 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center h-16 lg:h-20 pl-14 pr-3 lg:px-8 py-2">
  
  {/* QUICK COMMAND BAR */}
  <form 
    onSubmit={handleSubmit}
    className={`relative flex items-center gap-3 px-4 h-11 lg:h-12 rounded-xl lg:rounded-full flex-1 lg:flex-none lg:w-2/3 transition-all border-2 ${
      isProcessing ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20" : "bg-slate-100 dark:bg-slate-800 border-transparent"
    }`}
  >
    <MdKeyboardCommandKey className={`${isProcessing ? "text-emerald-500" : "text-slate-400"} text-xl shrink-0`} />
    
    <input
      type="text"
      value={command}
      onChange={(e) => setCommand(e.target.value)}
      inputMode="text" 
      /* 
         Placeholder logic: 
         - Short on mobile to avoid overlap
         - Full version on desktop
      */
      placeholder={window.innerWidth < 768 ? "e-500-Food..." : "e-500-Food-Note"}
      className="bg-transparent outline-none text-base lg:text-sm w-full text-slate-800 dark:text-slate-100 font-mono placeholder:text-slate-400"
    />

    {/* HELPER TEXT: Same as before, only visible on larger devices (lg and up) */}
    {!command && (
      <span className="hidden lg:block absolute right-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest pointer-events-none">
        Type-Amount-Name-Note
      </span>
    )}

    <button type="submit" className="hidden" />
  </form>

   <div className="flex items-center gap-2 lg:gap-6 ml-2">
        {/* THEME TOGGLE */}
     <div className="hidden sm:flex items-center bg-slate-200 dark:bg-slate-800 p-1 rounded-full border border-slate-300 dark:border-slate-700">
          <button
            onClick={() => theme !== "light" && toggleTheme()}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition cursor-pointer ${
              theme === "light" ? "bg-white text-yellow-500 shadow-sm" : "text-slate-500"
            }`}
          >
            <MdLightMode className="w-4 h-4" />
          </button>
          <button
            onClick={() => theme !== "dark" && toggleTheme()}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition cursor-pointer ${
              theme === "dark" ? "bg-slate-700 text-emerald-400 shadow-sm" : "text-slate-500"
            }`}
          >
            <MdDarkMode className="w-4 h-4" />
          </button>
        </div>

        {/* NOTIFICATIONS */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full relative cursor-pointer"
          >
            <MdNotifications className="w-6 h-6 text-slate-600 dark:text-slate-300" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-4 h-4 bg-red-500 text-[10px] text-white flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute top-14 right-0 w-80 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl z-50 overflow-hidden">
              <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-950">
                <h4 className="font-bold text-slate-800 dark:text-white">Notifications</h4>
                <button 
                  onClick={() => setNotifications([])} 
                  className="text-xs text-red-500 hover:underline cursor-pointer"
                >
                  Clear all
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto bg-white dark:bg-slate-950">
                {notifications.length > 0 ? (
                  notifications.map((n) => (
                    <div key={n.id} className={`p-4 border-b border-slate-50 dark:border-slate-900 transition-colors ${!n.read ? 'bg-emerald-50/50 dark:bg-emerald-900/10' : ''}`}>
                      <div className="flex gap-3">
                        <div className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${n.type === 'warning' ? 'bg-orange-500' : 'bg-emerald-500'}`} />
                        <div>
                          <p className="text-sm text-slate-700 dark:text-slate-300 leading-tight">{n.text}</p>
                          <span className="text-[10px] text-slate-400">{n.time}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-10 text-center text-slate-400 text-sm">No new alerts</div>
                )}
              </div>
              <button 
                onClick={markAsRead} 
                className="w-full py-3 text-xs font-bold text-slate-500 hover:text-emerald-500 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 cursor-pointer"
              >
                Mark all as read
              </button>
            </div>
          )}
        </div>

        {/* PROFILE */}
<div className="flex items-center gap-2 lg:gap-6 ml-2">
  {/* THEME TOGGLE: Hide on very small screens, or keep it compact */}
  <div className="hidden sm:flex items-center bg-slate-200 dark:bg-slate-800 p-1 rounded-full border border-slate-300 dark:border-slate-700">
    {/* ... your toggle buttons ... */}
  </div>

  {/* NOTIFICATIONS: Keep as is, but maybe reduce padding */}
  <div className="relative" ref={notificationRef}>
     {/* ... your notification button ... */}
  </div>

  {/* PROFILE: Hide name on mobile */}
  <div className="flex items-center gap-3 pl-2 lg:pl-4 border-l border-slate-200 dark:border-slate-700">
    <div className="hidden md:block text-right">
      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate max-w-[100px]">
        {user?.firstName || "User"}
      </p>
    </div>
    <Link to="/settings">
      <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-emerald-100 dark:bg-slate-800 flex items-center justify-center border-2 border-emerald-500/20 hover:border-emerald-500 transition-all overflow-hidden">
        <span className="text-emerald-600 text-xs lg:text-base font-bold">
          {user?.firstName ? user.firstName[0].toUpperCase() : "?"}
        </span>
      </div>
    </Link>
  </div>
  </div>
      </div>
    </header>
  );
}