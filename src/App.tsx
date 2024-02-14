import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import './assets/css/App.css';
import AccountLayout from './components/layouts/account';
import FooterLayout from './components/layouts/footer-layout';
import HeaderLayout from './components/layouts/header-layout';
import Loading from './components/loading';
import ModalProviders from './components/providers/modal';
import useAuthStateChange from './hooks/useAuthStateChange';
import InviteFriendsPage from './pages/account/invite-friends';
import MyTicketsPage from './pages/account/my-tickets';
import PaymentsPage from './pages/account/payments';
import RedeemCodesPage from './pages/account/redeem-codes';
import AccountSettingsPage from './pages/account/settings';
import HomePage from './pages/home';
import BusTicketsPage from './pages/tickets/bus';
import { saveLoadingReference } from './references/loading';
import useAuth from './stores/useAuth';
import Loader from './components/loading/Loader';
import BusTicketsSearchPage from './pages/tickets/bus/search';
import MyTicketPage from './pages/account/my-tickets/my-ticket';

function App() {
  const { isLoading } = useAuth()

  useAuthStateChange()

  if (isLoading) return <Loader />

  return (
    <>
      <Loading ref={saveLoadingReference} />
      <Toaster />
      <Routes>
        <Route element={<HeaderLayout />}>
          <Route element={<FooterLayout />}>
            <Route path="/" element={<HomePage />} />
          </Route>
          <Route path='account' element={<AccountLayout />}>
            <Route path="" element={<AccountSettingsPage />} />
            <Route path="my-tickets" element={<MyTicketsPage />} />
            <Route path='my-tickets/:id' element={<MyTicketPage />} />
            <Route path="payments" element={<PaymentsPage />} />
            <Route path="redeem-codes" element={<RedeemCodesPage />} />
            <Route path="invite-friends" element={<InviteFriendsPage />} />
          </Route>
          <Route path='/tickets/bus' element={<BusTicketsPage />} />
          <Route path='/tickets/bus/search' element={<BusTicketsSearchPage />} />
        </Route>
      </Routes>
      <ModalProviders />
    </>
  );
}

export default App;
