import { useState ,useEffect} from 'react'
import logo from './assets/logo.png'
import Dashboard from './pages/Dashboard'
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
import { useUser } from './contexts/UserContext';
import Onboarding from './components/Layout/Onboarding';



function App() {
  const { user } = useUser();

  // If no user data in localStorage, force the onboarding
  if (!user) {
    return <Onboarding />;
  }

  // If user exists, show the actual app
  return (


      <ThemeProvider>
     <div className='min-h-screen dark:bg-slate-950 bg-slate-50 transition-colors'>
          <Sidebar />
          
          <Topbar />
          <Routes>
            {/* NO MORE PROPS NEEDED HERE! */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-expense" element={<AddExpense />} />
            <Route path="/add-income" element={<AddIncome />} />
            <Route path="/add-borrow" element={<BorrowSection />} />
            <Route path="/add-lend" element={<LendSection />} />
            <Route path="/settings" element={<SettingsSection />} />
            <Route path="/reports" element={<ReportSection />} />
          </Routes>
          {/* <FloatingButton /> */}
        </div>
      </ThemeProvider>

  );
}

export default App