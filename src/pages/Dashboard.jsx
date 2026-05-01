import SummaryCards from "../components/Layout/SummaryCards";
import ChartSection from "../components/Layout/ChartSection";
import CategoryChart from "../components/Layout/CategoryChart";
import TransactionsTable from "../components/Layout/TransactionsTable";

export default function Dashboard() {
  return (

    <main className="ml-0 lg:ml-52 pt-20 px-4 md:px-6 pb-6 min-h-screen bg-slate-50 dark:bg-slate-950 transition-all duration-300">
      
      <SummaryCards />
      

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 items-start">
        
        <div className="lg:col-span-2">
          <ChartSection />
        </div>

        <div className="lg:col-span-1">
          <CategoryChart />
        </div>

        <div className="lg:col-span-3">
          <TransactionsTable />
        </div>
        
      </div>
    </main>
  );
}