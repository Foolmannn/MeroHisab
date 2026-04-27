import { MdShoppingBag, MdRestaurant, MdWork } from "react-icons/md";

export default function TransactionsTable() {
  return (
  <div className="lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl shadow-sm">

      <h3 className="font-bold mb-4 text-slate-900 dark:text-slate-100">Recent Transactions</h3>

      <table className="w-full text-left">

       <tbody className="divide-y divide-slate-200 dark:divide-slate-800">

          <Row
            icon={MdShoppingBag}
            title="Apple Store"
            subtitle="Subscription"
            amount="-$14.99"
            color="text-red-500"
          />

          <Row
            icon={MdRestaurant}
            title="Whole Foods"
            subtitle="Grocery"
            amount="-$243.50"
            color="text-red-500"
          />

          <Row
            icon={MdWork}
            title="Tech Corp"
            subtitle="Salary"
            amount="+$6,500"
            color="text-green-600"
          />

        </tbody>
      </table>
    </div>
  );
}

function Row({ icon: Icon, title, subtitle, amount, color }) {
  return (
<tr className="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition">

      <td className="py-3 flex items-center gap-3">
<Icon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        <div>
          <p className="font-semibold text-slate-800 dark:text-slate-100">{title}</p>
        <p className="text-xs text-slate-400 dark:text-slate-500">{subtitle}</p>
        </div>
      </td>

      <td className={`text-right font-bold ${color}`}>
        {amount}
      </td>

    </tr>
  );
}