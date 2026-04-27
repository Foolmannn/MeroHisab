import { MdTrendingUp, MdTrendingDown, MdRequestQuote, MdVolunteerActivism } from "react-icons/md";

export default function SummaryCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mb-3">

      <Card title="Total Balance" value="$42,850" />
      <Card title="Income" value="$8,400" icon={MdTrendingUp} />
      <Card title="Expenses" value="$3,120" icon={MdTrendingDown} />
      <Card title="Borrowed" value="$1,250" icon={MdRequestQuote} />

<Card title="Lent" value="$1,250" icon={MdVolunteerActivism} />

    </div>
  );
}

function Card({ title, value, icon: Icon }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-xl shadow-sm flex flex-col gap-2">
      <div className="flex items-center justify-between">
      <p className="text-sm text-slate-600 dark:text-slate-300">{title}</p>
        {Icon && <Icon className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />}
      </div>

      <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{value}</h2>
    </div>
  );
}