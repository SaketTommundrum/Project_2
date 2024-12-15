import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import AdminPage from './pages/AdminPage'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import SearchPage from './pages/SearchPage'
import Dashboard from './pages/Dashboard'
import CreateQuote from './pages/CreateQuote'
import UsersQuotes from './pages/UsersQuotes.jsx'
import DavidChat from './pages/DavidChat.jsx'
import ClientChat from './pages/ClientChat.jsx'
import BillPage from './pages/BillPage.jsx'
import ViewBill from './pages/ViewBill.jsx'
import PayBill from './pages/PayBill.jsx'

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/dashboard/:id" element={<Dashboard/>} />
          <Route path="/createquote/:id" element={<CreateQuote/>} />
          <Route path="/quotes/:id" element={<UsersQuotes/>} />
          <Route path="/chat/:order_id" element={<ClientChat/> } />
          <Route path="/davidchat/:order_id" element={<DavidChat/> } />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/bills/:order_id" element={<BillPage />} />
          <Route path='/getbill/:order_id' element={<ViewBill/>} />
          <Route path='/paybill/:bill_id' element={<PayBill/>} />

        </Routes>
    </Router>
  );
}

export default App;