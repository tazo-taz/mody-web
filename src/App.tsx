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

function App() {

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

  return (
    <>
      <Loading ref={saveLoadingReference} />
      <Toaster />
      <Routes>
        <Route element={<HeaderLayout />}>
          <Route element={<FooterLayout />}>
            <Route path="/" element={<HomePage />} />
          </Route>
        </Route>
      </Routes>
      <ModalProviders />
    </>
  );
}

export default App;
