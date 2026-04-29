// import { MdTrendingUp, MdTrendingDown, MdRequestQuote, MdVolunteerActivism } from "react-icons/md";
import {useTransactions} from "../../contexts/TransactionContext"
import { MdTrendingUp, MdTrendingDown, MdRequestQuote, MdVolunteerActivism, MdAccountBalanceWallet } from "react-icons/md";

// export default function SummaryCards() {
//   const { transactions } = useTransactions();

//   const calculateSummary = (data = []) => {
//     const income = data
//       .filter(t => t.type === "income" || t.type === "borrow")
//       .reduce((sum, t) => sum + Number(t.amount || 0), 0);

//     const expense = data
//       .filter(t => t.type === "expense" || t.type === "lend")
//       .reduce((sum, t) => sum + Number(t.amount || 0), 0);

//     return {
//       income,
//       expense,
//       borrowed: data.filter(t => t.type === "borrow").reduce((sum, t) => sum + Number(t.amount || 0), 0),
//       lent: data.filter(t => t.type === "lend").reduce((sum, t) => sum + Number(t.amount || 0), 0),
//       balance: income - expense
//     };
//   };
//   console.log("Dash:",transactions)

//   const summary = calculateSummary(transactions);



//   return (
//     <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mb-3">

//       <Card title="Total Balance" value={`$${summary?.balance || 0}`} />

//       <Card title="Income" value={`$${summary?.income || 0}`} icon={MdTrendingUp} />

//       <Card title="Expenses" value={`$${summary?.expense || 0}`} icon={MdTrendingDown} />

//       <Card title="Borrowed" value={`$${summary?.borrowed || 0}`} icon={MdRequestQuote} />

//       <Card title="Lent" value={`$${summary?.lent || 0}`} icon={MdVolunteerActivism} />

//     </div>
//   );
// }

// function Card({ title, value, icon: Icon }) {
//   return (
//     <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-xl shadow-sm flex flex-col gap-2">
//       <div className="flex items-center justify-between">
//       <p className="text-sm text-slate-600 dark:text-slate-300">{title}</p>
//         {Icon && <Icon className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />}
//       </div>

//       <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{value}</h2>
//     </div>
//   );
// }


export default function SummaryCards() {
  // 1. Grab transactions directly from Context
  const { transactions,currency } = useTransactions();

  // 2. Perform calculations locally within the component
  const calculateData = () => {
    const data = transactions || [];
    
    const income = data
      .filter(t => t.type === "income" || t.type === "borrow")
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);

    const expense = data
      .filter(t => t.type === "expense" || t.type === "lend")
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);

    const borrowed = data
      .filter(t => t.type === "borrow")
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);

    const lent = data
      .filter(t => t.type === "lend")
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);

    return {
      income,
      expense,
      borrowed,
      lent,
      balance: income - expense
    };
  };

  const stats = calculateData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
      <Card 
        title="Total Balance" 
        value={`${currency}${stats.balance.toLocaleString()}`} 
        icon={MdAccountBalanceWallet}
        variant="balance" 
      />
      <Card 
        title="Income" 
        value={`${currency}${stats.income.toLocaleString()}`} 
        icon={MdTrendingUp} 
        variant="income"
      />
      <Card 
        title="Expenses" 
        value={`${currency}${stats.expense.toLocaleString()}`} 
        icon={MdTrendingDown} 
        variant="expense"
      />
      <Card 
        title="Borrowed" 
        value={`${currency}${stats.borrowed.toLocaleString()}`} 
        icon={MdRequestQuote} 
      />
      <Card 
        title="Lent" 
        value={`${currency}${stats.lent.toLocaleString()}`} 
        icon={MdVolunteerActivism} 
      />
    </div>
  );
}

function Card({ title, value, icon: Icon, variant }) {
  // Optional: Dynamic colors based on variant
  const iconColors = {
    income: "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20",
    expense: "text-red-500 bg-red-50 dark:bg-red-900/20",
    balance: "text-blue-500 bg-blue-50 dark:bg-blue-900/20",
    default: "text-slate-500 bg-slate-50 dark:bg-slate-800"
  };

  const activeColor = iconColors[variant] || iconColors.default;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm flex flex-col gap-3 transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          {title}
        </p>
        <div className={`p-1.5 rounded-lg ${activeColor}`}>
          {Icon && <Icon className="w-5 h-5" />}
        </div>
      </div>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
        {value}
      </h2>
    </div>
  );
}