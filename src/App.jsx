import { useState } from 'react'
import logo from './assets/logo.png'
import Dashboard from './Pages/Dashboard'
import { ThemeProvider } from './contexts/ThemeContext'
import { Routes, Route } from "react-router-dom";
import Sidebar from './components/Layout/Sidebar'
import Topbar from './components/Layout/Topbar'
import FloatingButton from './components/Layout/FloatingButton'
import AddTransaction from './pages/AddTransaction';
import { ImOffice } from 'react-icons/im';
import AddIncome from './pages/Income';
import BorrowSection from './pages/Borrow';
import LendSection from './pages/Lend';
import ReportSection from './pages/Reports';
import SettingsSection from './pages/Settings';


// import './App.css'

function App() {

  return (
    <ThemeProvider>
<div className='dark:bg-slate-950 bg-slate-50'>

<Sidebar/>

<Topbar />
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/add-expense" element={<AddTransaction />} />
      <Route path="/add-income" element={<AddIncome />} />
      <Route path="/borrow" element={<BorrowSection/>} />
      <Route path="/lend" element={<LendSection />} />
      <Route path="/settings" element={<SettingsSection />} />
      <Route path="/reports" element={<ReportSection />} />
    </Routes>

<FloatingButton />
</div>
    </ThemeProvider>
  )
}

export default App
