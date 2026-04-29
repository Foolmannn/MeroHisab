import { useState ,useEffect} from 'react'
import logo from './assets/logo.png'
import Dashboard from './Pages/Dashboard'
import { ThemeProvider } from './contexts/ThemeContext'
import { Routes, Route } from "react-router-dom";
import Sidebar from './components/Layout/Sidebar'
import Topbar from './components/Layout/Topbar'
import FloatingButton from './components/Layout/FloatingButton'
import { ImOffice } from 'react-icons/im';
import AddIncome from './pages/Income';
import BorrowSection from './pages/Borrow';
import LendSection from './pages/Lend';
import ReportSection from './pages/Reports';
import SettingsSection from './pages/Settings';
import AddExpense from './pages/AddExpense';
import { TransactionProvider } from './contexts/TransactionContext';
import { UserProvider } from './contexts/UserContext';


// import './App.css'

// function App() {

// // const [transactions, setTransactions] = useState([]);
// // useEffect(() => {
// //   const saved = JSON.parse(localStorage.getItem("transactions")) || [];
// //   setTransactions(saved);
// // }, []);
// // useEffect(() => {
// //   localStorage.setItem("transactions", JSON.stringify(transactions));
// // }, [transactions]);
// // console.log("App transactions:", transactions)

//   return (
//     <TransactionProvider>

//     <ThemeProvider>
// <div className='dark:bg-slate-950 bg-slate-50'>

// <Sidebar/>

// <Topbar />
//     <Routes>
//    <Route path="/" element={<Dashboard transactions={transactions} />} />
//       <Route path="/add-expense" element={<AddExpense setTransactions={setTransactions}   transactions={transactions}/>} />
//       <Route path="/add-income" element={<AddIncome setTransactions={setTransactions}   transactions={transactions}/>} />
//       <Route path="/borrow" element={<BorrowSection setTransactions={setTransactions}   transactions={transactions}/>} />
//       <Route path="/lend" element={<LendSection setTransactions={setTransactions}   transactions={transactions}/>} />
//       <Route path="/settings" element={<SettingsSection />} />
//       <Route path="/reports" element={<ReportSection />} />
//     </Routes>

// <FloatingButton />
// </div>
//     </ThemeProvider>
//     </TransactionProvider>

//   )
// }

// export default App


function App() {
  return (
    <UserProvider>


    <TransactionProvider>
      <ThemeProvider>
        <div className='dark:bg-slate-950 bg-slate-50'>
          <Sidebar />
          <Topbar />
          <Routes>
            {/* NO MORE PROPS NEEDED HERE! */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-expense" element={<AddExpense />} />
            <Route path="/add-income" element={<AddIncome />} />
            <Route path="/borrow" element={<BorrowSection />} />
            <Route path="/lend" element={<LendSection />} />
            <Route path="/settings" element={<SettingsSection />} />
            <Route path="/reports" element={<ReportSection />} />
          </Routes>
          <FloatingButton />
        </div>
      </ThemeProvider>
    </TransactionProvider>
    </UserProvider>
  );
}

export default App