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
      <Sidebar/>
      <Topbar/>

      <main className="ml-64 pt-24 pb-12 px-8 min-h-screen bg-background">
        <SummaryCards/>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ChartSection />
          <CategoryChart/>
          <TransactionsTable/>
        </div>
      </main>

      <FloatingButton/>
    </>
  );
}