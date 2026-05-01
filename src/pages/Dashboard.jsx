import SummaryCards from "../components/Layout/SummaryCards";
import ChartSection from "../components/Layout/ChartSection";
import CategoryChart from "../components/Layout/CategoryChart";
import TransactionsTable from "../components/Layout/TransactionsTable";

export default function Dashboard() {
  return (
    /* 
       CHANGE 1: Responsive Margin 
       - ml-0 on mobile (small screens)
       - lg:ml-52 on desktop (large screens)
       CHANGE 2: Horizontal Padding
       - px-4 for mobile to maximize space
       - md:px-6 for tablets/desktop
    */
    <main className="ml-0 lg:ml-52 pt-20 px-4 md:px-6 pb-6 min-h-screen bg-slate-50 dark:bg-slate-950 transition-all duration-300">
      
      {/* Summary Cards usually handle their own grid, so keep as is */}
      <SummaryCards />
      
      {/* 
         CHANGE 3: Improved Grid Layout
         - grid-cols-1: Everything stacks vertically on mobile
         - lg:grid-cols-3: Side-by-side on desktop
         - Added 'items-start' to prevent charts from stretching weirdly if one is taller
      */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 items-start">
        
        {/* Typically, you'd want the main chart to take more space on Desktop */}
        <div className="lg:col-span-2">
          <ChartSection />
        </div>

        <div className="lg:col-span-1">
          <CategoryChart />
        </div>

        {/* Transactions Table should probably span the full width below the charts on desktop */}
        <div className="lg:col-span-3">
          <TransactionsTable />
        </div>
        
      </div>
    </main>
  );
}