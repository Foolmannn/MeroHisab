// export default function Dashboard({transactions}) {
//   // 1. Initialize state directly from localStorage
//   // const [transactions, setTransactions] = useState(() => {
//   //   const saved = localStorage.getItem("transactions");
//   //   return saved ? JSON.parse(saved) : [];
//   // });

//   // Now, this log will show the data immediately on the first render
//   console.log("Dashboard received:", transactions);
//   console.log("Hellow ")

//   const calculateSummary = (data) => {
//     const income = data
//       .filter(t => t.type === "income" || t.type === "borrow")
//       .reduce((sum, t) => sum + t.amount, 0);

//     const expense = data
//       .filter(t => t.type === "expense" || t.type === "lend")
//       .reduce((sum, t) => sum + t.amount, 0);

//     const borrowed = data.filter(t => t.type === "borrow").reduce((sum, t) => sum + t.amount, 0);
//     const lent = data.filter(t => t.type === "lend").reduce((sum, t) => sum + t.amount, 0);

//     return { income, expense, borrowed, lent, balance: income - expense };
//   };

//   const summary = calculateSummary(transactions);

//   return (
//     <main className="ml-52 pt-20 px-6 pb-6 min-h-screen bg-slate-50 dark:bg-slate-950">
//       <SummaryCards summary={summary} />

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
//         {/* 2. CRITICAL: Pass the transactions to your components! */}
//         <ChartSection transactions={transactions} />
//         <CategoryChart transactions={transactions} />
//         <TransactionsTable transactions={transactions} />
//       </div>
//     </main>
//   );
// }


import { useTransactions } from "../contexts/TransactionContext";

export default function Dashboard() {
  // Grab data from context
  const { transactions } = useTransactions();

  // const calculateSummary = (data = []) => {
  //   const income = data
  //     .filter(t => t.type === "income" || t.type === "borrow")
  //     .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  //   const expense = data
  //     .filter(t => t.type === "expense" || t.type === "lend")
  //     .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  //   return {
  //     income,
  //     expense,
  //     borrowed: data.filter(t => t.type === "borrow").reduce((sum, t) => sum + Number(t.amount || 0), 0),
  //     lent: data.filter(t => t.type === "lend").reduce((sum, t) => sum + Number(t.amount || 0), 0),
  //     balance: income - expense
  //   };
  // };
  // console.log("Dash:",transactions)

  // const summary = calculateSummary(transactions);

  return (
    <main className="ml-52 pt-20 px-6 pb-6 min-h-screen bg-slate-50 dark:bg-slate-950">
      <SummaryCards  />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <ChartSection />
        <CategoryChart />
        <TransactionsTable  />
      </div>
    </main>
  );
}
