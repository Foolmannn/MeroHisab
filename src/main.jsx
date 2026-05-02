import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from './contexts/UserContext.jsx';
import { TransactionProvider } from './contexts/TransactionContext.jsx';

createRoot(document.getElementById('root')).render(
  <UserProvider>
    <TransactionProvider>

 <BrowserRouter>
    <App />
  </BrowserRouter>
    </TransactionProvider>
  </UserProvider>
)
