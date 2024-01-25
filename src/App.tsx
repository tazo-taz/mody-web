import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import './assets/css/App.css';
import FooterLayout from './components/layouts/footer-layout';
import HeaderLayout from './components/layouts/header-layout';
import Loading from './components/loading';
import ModalProviders from './components/providers/modal';
import useAuthStateChange from './hooks/useAuthStateChange';
import HomePage from './pages/home';
import { saveLoadingReference } from './references/loading';
import AccountLayout from './components/layouts/account';
import AccountSettingsPage from './pages/account/settings';
import MyTicketsPage from './pages/account/my-tickets';
import PaymentsPage from './pages/account/payments';
import RedeemCodesPage from './pages/account/redeem-codes';
import InviteFriendsPage from './pages/account/invite-friends';
import useUser from './stores/useUser';

function App() {
  const { user, isLoading } = useUser()

  // useEffect(() => {
  //   const x = async () => {
  //     await getDocs(collection(db, "users")).then((querySnapshot) => {
  //       const newData = querySnapshot.docs
  //         .map((doc) => ({ ...doc.data(), id: doc.id }));

  //       console.log(newData[0]);

  //     })

  //   }

  //   x()
  // }, [])

  useAuthStateChange()

  if (isLoading) return null

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
            <Route path="payments" element={<PaymentsPage />} />
            <Route path="redeem-codes" element={<RedeemCodesPage />} />
            <Route path="invite-friends" element={<InviteFriendsPage />} />
          </Route>
        </Route>
      </Routes>
      <ModalProviders />
    </>
  );
}

export default App;
