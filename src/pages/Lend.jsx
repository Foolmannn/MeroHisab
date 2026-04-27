import { MdPerson, MdCalendarToday, MdAttachMoney } from "react-icons/md";

export default function LendSection() {
  return (
    <main className="ml-52 pt-20 px-6 pb-6 min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors dark:text-slate-400">

      <div className="max-w-6xl mx-auto flex flex-col gap-6">

        {/* HEADER */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
            Lent Money
          </h2>
          <p className="text-sm text-slate-500">
            Track money you have lent to others
          </p>
        </div>

        {/* FORM */}
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-6">

          <form className="grid grid-cols-1 md:grid-cols-2 gap-4 dark:text-slate-400">

            <Input label="Lent To" icon={<MdPerson />} placeholder="Name" />
            <Input label="Amount" icon={<MdAttachMoney />} type="number" />
            <Input label="Date" icon={<MdCalendarToday />} type="date" />
            <Input label="Expected Return" icon={<MdCalendarToday />} type="date" />

            <div className="md:col-span-2">
              <label className="text-xs text-slate-500">NOTES</label>
              <textarea
                className="w-full mt-1 p-3 rounded-lg bg-slate-100 dark:bg-slate-800"
                rows="3"
                placeholder="Why did you lend?"
              />
            </div>

            <div className="md:col-span-2 flex justify-end">
              <button className="px-6 h-12 bg-emerald-500 text-white rounded-full font-semibold">
                Save Lend
              </button>
            </div>

          </form>
        </div>

        {/* LIST */}
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-6">

          <h3 className="font-semibold mb-4">Lend History</h3>

          <div className="flex flex-col gap-3">
            <LendItem name="Hari" amount="₹3000" status="Pending" />
            <LendItem name="Asha" amount="₹2000" status="Returned" />
          </div>

        </div>

      </div>
    </main>
  );
}

/* INPUT */
function Input({ label, icon, ...props }) {
  return (
    <div>
      <label className="text-xs text-slate-500">{label}</label>
      <div className="relative mt-1">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500">
          {icon}
        </span>
        <input
          {...props}
          className="w-full h-12 pl-10 rounded-lg bg-slate-100 dark:bg-slate-800 outline-none"
        />
      </div>
    </div>
  );
}

/* ITEM */
function LendItem({ name, amount, status }) {
  return (
    <div className="flex justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-xs text-slate-500">{status}</p>
      </div>

      <p className="font-bold text-emerald-500">{amount}</p>
    </div>
  );
}