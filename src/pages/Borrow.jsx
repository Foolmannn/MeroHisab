import { MdPerson, MdCalendarToday, MdAttachMoney } from "react-icons/md";

export default function BorrowSection() {
  return (
    <main className="ml-52 pt-20 px-6 pb-6 min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors dark:text-slate-400">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        {/* HEADER */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
            Borrowed Money
          </h2>
          <p className="text-sm text-slate-500">
            Track money you have borrowed from others
          </p>
        </div>

        {/* FORM CARD */}
        <div className="flex">
          <div className="bg-white mr-6 min-w-1/2 dark:bg-slate-900 rounded-xl shadow p-6 dark:text-slate-400">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* PERSON */}
              <Input
                label="Borrowed From"
                icon={<MdPerson />}
                placeholder="Name"
              />

              {/* AMOUNT */}
              <Input
                label="Amount"
                icon={<MdAttachMoney />}
                placeholder="0.00"
                type="number"
              />

              {/* DATE */}
              <Input label="Date" icon={<MdCalendarToday />} type="date" />

              {/* DUE DATE */}
              <Input label="Due Date" icon={<MdCalendarToday />} type="date" />

              {/* NOTES */}
              <div className="md:col-span-2">
                <label className="text-xs text-slate-500">NOTES</label>
                <textarea
                  className="w-full mt-1 p-3 rounded-lg bg-slate-100 dark:bg-slate-800"
                  rows="3"
                  placeholder="Why did you borrow?"
                />
              </div>

              {/* BUTTON */}
              <div className="md:col-span-2 flex justify-end">
                <button className="px-6 h-12 bg-emerald-500 text-white rounded-full font-semibold cursor-pointer">
                  Save Borrow
                </button>
              </div>
            </form>
          </div>

          {/* LIST */}
          <div className="bg-white min-w-1/3 dark:bg-slate-900 rounded-xl shadow p-6 ">
            <h3 className="font-semibold mb-4">Borrow History</h3>

            <div className="flex flex-col gap-3">
              <BorrowItem name="Ramesh" amount="₹5000" status="Pending" />
              <BorrowItem name="Sita" amount="₹1200" status="Paid" />
            </div>
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
function BorrowItem({ name, amount, status }) {
  return (
    <div className="flex justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-xs text-slate-500">{status}</p>
      </div>

      <p className="font-bold text-red-500">{amount}</p>
    </div>
  );
}
