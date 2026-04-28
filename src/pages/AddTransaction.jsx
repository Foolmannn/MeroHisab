// import { useState,useEffect } from "react";
// import {
//   MdCategory,
//   MdCalendarToday,
//   MdSync,
//   MdCheckCircle,
// } from "react-icons/md";

// export default function AddExpense({transactions, setTransactions }) {

//   const [form, setForm] = useState({
//     expenseAmount: "",
//     expenseCategory: "",
//     expenseDate:new Date().toISOString().split("T")[0],
//     expenseNote:""
//   });
// //   useEffect(() => {
// //   const saved = JSON.parse(localStorage.getItem("expenses")) || [];
// //   setExpenses(saved);
// // }, []);

// //   useEffect(() => {
// //   localStorage.setItem("expenses", JSON.stringify(expenses));
// // }, [expenses]);

// const handleChange = (e) => {
//   setForm({
//     ...form,
//     [e.target.name]: e.target.value
//   });
// };

// const handleSubmit = (e) => {
//   e.preventDefault();

//   if (!form.expenseAmount || !form.expenseCategory) {
//     alert("Fill required fields");
//     return;
//   }

//   const newTransaction = {
//     id: Date.now().toString(),
//     type: "expense",   // 🔥 IMPORTANT
//     amount: Number(form.expenseAmount),
//     category: form.expenseCategory,
//     date: form.expenseDate,
//     note: form.expenseNote,
//     person: null
//   };

//   setTransactions(prev => [...prev, newTransaction]);

//   setForm({
//     expenseAmount: "",
//     expenseCategory: "",
//     expenseDate: "",
//     expenseNote: ""
//   });
// };
//   return (
//     <main className="ml-52 pt-17 px-6 pb-6 h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors dark:text-slate-400">

//       <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">

//         {/* LEFT SIDE */}
//         <div className="lg:col-span-7 flex flex-col gap-6 h-2/3 *:">

//           {/* CARD */}
//           <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-3 ">

//             {/* HEADER */}
//             <div className="flex justify-between items-center mb-1">
//               <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
//                 New Expense
//               </h2>


//             </div>

//             {/* FORM */}
//             <form className="flex flex-col gap-3" onSubmit={handleSubmit}>

//               {/* AMOUNT */}
//               <div>
//                 <label className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
//                   AMOUNT
//                 </label>

//                 <div className="relative mt-0.5">
//                   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-slate-400">
//                     $
//                   </span>

//                   <input
//                     type="number"
//                       name="expenseAmount"
//   value={form.expenseAmount}
//   onChange={handleChange}
//                     placeholder="0.00"
//                     className="w-full h-11 pl-10 pr-4 rounded-lg bg-slate-100 dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none text-lg font-semibold text-slate-800 dark:text-white"
//                   />
//                 </div>
//               </div>

//               {/* CATEGORY + DATE */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//                 {/* CATEGORY */}
//                 <div>
//                   <label className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
//                     CATEGORY
//                   </label>

//                   <div className="relative mt-0.5">
//                     <MdCategory className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500" />

//                     <select 
//                      name="expenseCategory"
//   value={form.expenseCategory}
//   onChange={handleChange}
//                     className="w-full h-11 pl-10 pr-4 rounded-lg bg-slate-100 dark:bg-slate-800 outline-none text-slate-800 dark:text-white">
//                       <option value="">Select Category</option>
//                       <option>Food</option>
//                       <option>Transport</option>
//                       <option>Shopping</option>
//                       <option>Health</option>
//                       <option>Other</option>
//                     </select>
//                   </div>
//                 </div>

//                 {/* DATE */}
//                 <div>
//                   <label className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
//                     DATE
//                   </label>

//                   <div className="relative mt-0.5">
//                     <MdCalendarToday className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500 " />

//                     <input
//                       type="date"
//                         name="expenseDate"
//   value={form.expenseDate}
//   onChange={handleChange}
//                       className="w-full h-11 pl-10 pr-4 rounded-lg bg-slate-100 dark:bg-slate-800 outline-none text-slate-800 dark:text-white "
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* NOTES */}
//               <div>
//                 <label className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
//                   NOTES
//                 </label>

//                 <textarea
//                   name="expenseNote"
//   value={form.expenseNote}
//   onChange={handleChange}
//                   rows="2"
//                   placeholder="What was this for?"
//                   className="w-full mt-0.5 p-2 rounded-lg bg-slate-100 dark:bg-slate-800 outline-none text-slate-800 dark:text-white"
//                 />
//               </div>

//               {/* RECURRING */}
//               <div className="flex justify-between items-center p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">

//                 <div className="flex gap-3 items-center">
//                   <MdSync className="text-emerald-500 w-5 h-5" />
//                   <div>
//                     <p className="text-sm font-semibold text-slate-800 dark:text-white">
//                       Recurring
//                     </p>
//                     <p className="text-xs text-slate-500">
//                       Repeat daily
//                     </p>
//                   </div>
//                 </div>

//                 <input type="checkbox" className="cursor-pointer" />
//               </div>

//               {/* BUTTONS */}
//               <div className="flex gap-3 mt-2">
//                 <button className="flex-1 h-12 bg-emerald-500 text-white rounded-full font-semibold flex items-center justify-center gap-2 hover:scale-105 transition">
//                   <MdCheckCircle />
//                   Save
//                 </button>

//                 <button className="px-6 h-12 bg-slate-200 dark:bg-slate-700 rounded-full">
//                   Cancel
//                 </button>
//               </div>

//             </form>
//           </div>

//           {/* QUICK CATEGORY
//           <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-6">
//             <h3 className="text-sm font-semibold text-slate-500 mb-3">
//               Quick Categories
//             </h3>

//             <div className="flex flex-wrap gap-2">
//               {["Food", "Travel", "Shopping", "Health"].map((item) => (
//                 <button
//                   key={item}
//                   className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-sm hover:bg-emerald-100 dark:hover:bg-emerald-900 transition"
//                 >
//                   {item}
//                 </button>
//               ))}
//             </div>
//           </div> */}

//         </div>

//         {/* RIGHT SIDE */}
//         <div className="lg:col-span-5 flex flex-col gap-6">

//           {/* RECENT */}
//           <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-6">
//             <h3 className="font-bold mb-4 text-slate-800 dark:text-white">
//               Recent Expenses
//             </h3>

//             <div className="flex flex-col gap-3">
//               {/* <TransactionItem title="Starbucks" amount="-$4.50" />
//               <TransactionItem title="Uber Ride" amount="-$18.25" />
//               <TransactionItem title="Salary" amount="+$2450" positive /> */}
// {transactions
//   .filter(t => t.type === "expense")
//   .slice(-5)
//   .reverse()
//   .map(t => (
//     <TransactionItem
//       key={t.id}
//       title={t.category}
//       amount={`- $${t.amount}`}
//       date={t.date}
//     />
//   ))}
//             </div>
//           </div>

//           {/* NOTES */}
//           {/* <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-6">
//             <h3 className="font-bold mb-3 text-slate-800 dark:text-white ">
//               Quick Notes
//             </h3>

//             <textarea
//               placeholder="Write something..."
//               className="w-full h-32 p-3 rounded-lg bg-slate-100 dark:bg-slate-800 dark:text-slate-400"
//             />
//           </div> */}
          

          

//         </div>
//       </div>
//     </main>
//   );
// }

// function TransactionItem({ title, amount, positive, date }) {
//   return (
//     <div className="flex items-center justify-between px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition border-b border-slate-100 dark:border-slate-800 last:border-none">

//       {/* LEFT SIDE */}
//       <div className="flex flex-col">
//         <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
//           {title}
//         </p>

//         <p className="text-xs text-slate-500 dark:text-slate-400">
//           {date}
//         </p>
//       </div>

//       {/* RIGHT SIDE */}
//       <div className={`text-sm font-semibold ${
//         positive ? "text-emerald-500" : "text-red-500"
//       }`}>
//         {amount}
//       </div>

//     </div>
//   );
// }


import { useState } from "react";
import { useTransactions } from "../contexts/TransactionContext"; // 1. Import your context hook
import {
  MdCategory,
  MdCalendarToday,
  MdSync,
  MdCheckCircle,
} from "react-icons/md";

// 2. Remove props from the function arguments
export default function AddExpense() {
  // 3. Grab the shared state from context
  const { transactions, setTransactions } = useTransactions();

  const [form, setForm] = useState({
    expenseAmount: "",
    expenseCategory: "",
    expenseDate: new Date().toISOString().split("T")[0],
    expenseNote: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.expenseAmount || !form.expenseCategory) {
      alert("Fill required fields");
      return;
    }

    const newTransaction = {
      id: Date.now().toString(),
      type: "expense",
      amount: Number(form.expenseAmount),
      category: form.expenseCategory,
      date: form.expenseDate,
      note: form.expenseNote,
      person: null
    };

    // 4. This now updates the global context and triggers local storage save automatically
    setTransactions(prev => [...prev, newTransaction]);

    setForm({
      expenseAmount: "",
      expenseCategory: "",
      expenseDate: new Date().toISOString().split("T")[0], // Reset to today
      expenseNote: ""
    });
  };

  return (
    <main className="ml-52 pt-17 px-6 pb-6 h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors dark:text-slate-400">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT SIDE: FORM */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-6 ">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                New Expense
              </h2>
            </div>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              {/* AMOUNT */}
              <div>
                <label className="text-xs text-slate-500 dark:text-slate-400 font-semibold">AMOUNT</label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-slate-400">$</span>
                  <input
                    type="number"
                    name="expenseAmount"
                    value={form.expenseAmount}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="w-full h-11 pl-10 pr-4 rounded-lg bg-slate-100 dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none text-lg font-semibold text-slate-800 dark:text-white"
                  />
                </div>
              </div>

              {/* CATEGORY + DATE */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-500 dark:text-slate-400 font-semibold">CATEGORY</label>
                  <div className="relative mt-1">
                    <MdCategory className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500" />
                    <select 
                      name="expenseCategory"
                      value={form.expenseCategory}
                      onChange={handleChange}
                      className="w-full h-11 pl-10 pr-4 rounded-lg bg-slate-100 dark:bg-slate-800 outline-none text-slate-800 dark:text-white appearance-none"
                    >
                      <option value="">Select Category</option>
                      <option>Food</option>
                      <option>Transport</option>
                      <option>Shopping</option>
                      <option>Health</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-500 dark:text-slate-400 font-semibold">DATE</label>
                  <div className="relative mt-1">
                    <MdCalendarToday className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500" />
                    <input
                      type="date"
                      name="expenseDate"
                      value={form.expenseDate}
                      onChange={handleChange}
                      className="w-full h-11 pl-10 pr-4 rounded-lg bg-slate-100 dark:bg-slate-800 outline-none text-slate-800 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* NOTES */}
              <div>
                <label className="text-xs text-slate-500 dark:text-slate-400 font-semibold">NOTES</label>
                <textarea
                  name="expenseNote"
                  value={form.expenseNote}
                  onChange={handleChange}
                  rows="2"
                  placeholder="What was this for?"
                  className="w-full mt-1 p-3 rounded-lg bg-slate-100 dark:bg-slate-800 outline-none text-slate-800 dark:text-white"
                />
              </div>

              {/* RECURRING */}
              <div className="flex justify-between items-center p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                <div className="flex gap-3 items-center">
                  <MdSync className="text-emerald-500 w-5 h-5" />
                  <div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-white">Recurring</p>
                    <p className="text-xs text-slate-500">Repeat daily</p>
                  </div>
                </div>
                <input type="checkbox" className="cursor-pointer w-5 h-5 accent-emerald-500" />
              </div>

              {/* BUTTONS */}
              <div className="flex gap-3 mt-2">
                <button type="submit" className="flex-1 h-12 bg-emerald-500 text-white rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-emerald-600 transition active:scale-95">
                  <MdCheckCircle />
                  Save
                </button>
                <button type="button" className="px-6 h-12 bg-slate-200 dark:bg-slate-700 rounded-full hover:bg-slate-300 dark:hover:bg-slate-600 transition">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* RIGHT SIDE: RECENT HISTORY */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-6">
            <h3 className="font-bold mb-4 text-slate-800 dark:text-white">
              Recent Expenses
            </h3>

            <div className="flex flex-col gap-1">
              {transactions
                .filter(t => t.type === "expense")
                .slice(-5)
                .reverse()
                .map(t => (
                  <TransactionItem
                    key={t.id}
                    title={t.category}
                    amount={`- $${t.amount}`}
                    date={t.date}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function TransactionItem({ title, amount, positive, date }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition border-b border-slate-100 dark:border-slate-800 last:border-none rounded-lg">
      <div className="flex flex-col">
        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{title}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">{date}</p>
      </div>
      <div className={`text-sm font-semibold ${positive ? "text-emerald-500" : "text-red-500"}`}>
        {amount}
      </div>
    </div>
  );
}