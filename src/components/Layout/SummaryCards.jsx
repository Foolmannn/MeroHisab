import { MdTrendingUp, MdTrendingDown, MdRequestQuote, MdVolunteerActivism } from "react-icons/md";

export default function SummaryCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

      <Card title="Total Balance" value="$42,850" />
      <Card title="Income" value="$8,400" icon={MdTrendingUp} />
      <Card title="Expenses" value="$3,120" icon={MdTrendingDown} />
      <Card title="Borrowed" value="$1,250" icon={MdRequestQuote} />

    </div>
  );
}

function Card({ title, value, icon: Icon }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">{title}</p>
        {Icon && <Icon className="w-5 h-5 text-emerald-500" />}
      </div>

      <h2 className="text-xl font-bold">{value}</h2>
    </div>
  );
}