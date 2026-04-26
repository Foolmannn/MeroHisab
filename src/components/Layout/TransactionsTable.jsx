import { MdShoppingBag, MdRestaurant, MdWork } from "react-icons/md";

export default function TransactionsTable() {
  return (
    <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow">

      <h3 className="font-bold mb-4">Recent Transactions</h3>

      <table className="w-full text-left">

        <tbody className="divide-y">

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
    <tr className="hover:bg-slate-50">

      <td className="py-3 flex items-center gap-3">
        <Icon className="w-5 h-5 text-slate-600" />
        <div>
          <p className="font-semibold">{title}</p>
          <p className="text-xs text-slate-400">{subtitle}</p>
        </div>
      </td>

      <td className={`text-right font-bold ${color}`}>
        {amount}
      </td>

    </tr>
  );
}