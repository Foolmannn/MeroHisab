export default function AddIncome() {
  return (
   <main className="ml-52 pt-20 px-6 pb-6 min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-4xl mx-auto">

        {/* Heading */}
        <div className="flex flex-col gap-2 mb-8">
          <h2 className="text-3xl font-bold text-on-surface dark:text-white">
            Add Income
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Log your new earnings to keep your financial records accurate.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

          {/* FORM SECTION */}
          <div className="lg:col-span-2 space-y-6">

            <section className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-md dark:shadow-none border border-slate-100 dark:border-slate-800">

              <form className="space-y-6">

                {/* AMOUNT */}
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                    AMOUNT
                  </label>

                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600 text-xl font-bold">
                      $
                    </span>

                    <input
                      type="number"
                      placeholder="0.00"
                      className="w-full h-14 pl-10 pr-4 rounded-lg bg-slate-100 dark:bg-slate-800 text-xl font-semibold
                      border border-transparent focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition"
                    />
                  </div>
                </div>

                {/* CATEGORY + DATE */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                      CATEGORY
                    </label>

                    <select className="w-full h-12 px-4 rounded-lg bg-slate-100 dark:bg-slate-800
                    border border-transparent focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition">
                      <option>Salary</option>
                      <option>Freelance</option>
                      <option>Gift</option>
                      <option>Investments</option>
                      <option>Refund</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                      DATE
                    </label>

                    <input
                      type="date"
                      className="w-full h-12 px-4 rounded-lg bg-slate-100 dark:bg-slate-800
                      border border-transparent focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition"
                    />
                  </div>
                </div>

                {/* NOTES */}
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                    NOTES (OPTIONAL)
                  </label>

                  <textarea
                    rows="4"
                    placeholder="Describe where this income came from..."
                    className="w-full p-4 rounded-lg bg-slate-100 dark:bg-slate-800
                    border border-transparent focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition"
                  />
                </div>

                {/* BUTTONS */}
                <div className="flex flex-col md:flex-row gap-4 pt-2">

                  <button
                    type="submit"
                    className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 rounded-full
                    transition active:scale-95"
                  >
                    Confirm Income
                  </button>

                  <button
                    type="button"
                    className="px-6 py-3 rounded-full bg-slate-200 dark:bg-slate-800
                    text-slate-700 dark:text-slate-300 font-semibold hover:opacity-80 transition"
                  >
                    Cancel
                  </button>

                </div>

              </form>
            </section>

            {/* INFO BOX */}
            <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-5 flex gap-4">
              <span className="text-emerald-600 text-2xl">ℹ️</span>
              <div>
                <h4 className="font-semibold text-emerald-800 dark:text-emerald-300">
                  Did you know?
                </h4>
                <p className="text-sm text-emerald-700 dark:text-emerald-400">
                  Categorizing income helps improve financial insights and forecasting accuracy.
                </p>
              </div>
            </div>

          </div>

          {/* SIDE CARD */}
          <div className="space-y-6">

            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-100 dark:border-slate-800">
              <h3 className="text-xl font-bold mb-4">Quick Tips</h3>

              <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                Keep entries consistent for better analytics.
              </p>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                You can later export income reports for tax or budgeting.
              </p>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}