import CategoryChart from "../components/Layout/CategoryChart";
import ChartSection from "../components/Layout/ChartSection";
import FloatingButton from "../components/Layout/FloatingButton";
import Sidebar from "../components/Layout/Sidebar";
import SummaryCards from "../components/Layout/SummaryCards";
import Topbar from "../components/Layout/Topbar";
import TransactionsTable from "../components/Layout/TransactionsTable";


export default function Dashboard() {
  return (
    <>
{/* <Sidebar /> */}

{/* <Topbar /> */}

<main className="ml-52 pt-20 px-6 pb-6 min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
  <SummaryCards />

  <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 h-[calc(100%-110px)]">
    <ChartSection />
    <CategoryChart />
    <TransactionsTable />
  </div>
</main>

{/* <FloatingButton /> */}
    </>
  );
}