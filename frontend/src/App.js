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
import TopClients from './pages/TopClients.jsx'
import DifficultClients from './pages/DifficultClients.jsx'
import ThisMonth from './pages/ThisMonthQuotes.jsx'
import ProspectiveClients from './pages/ProspectiveClients.jsx'
import LargestDriveway from './pages/LargestDriveway.jsx'
import OverdueBills from './pages/OverdueBills.jsx'
import BadClients from './pages/BadClients.jsx'
import GoodClients from './pages/GoodClients.jsx'

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
          <Route path='/topclients' element={<TopClients/>} />
          <Route path='/difficultclients' element={<DifficultClients/>} />
          <Route path='/this-month-quotes' element={<ThisMonth/>} />
          <Route path='/prospectiveclients' element={<ProspectiveClients/>} />
          <Route path='/largest-driveway' element={<LargestDriveway/>} />
          <Route path='/overdue-bills' element={<OverdueBills/>} />
          <Route path='/badclients' element={<BadClients/>} />
          <Route path='/goodclients' element={<GoodClients/>} />

        </Routes>
    </Router>
  );
}

export default App;