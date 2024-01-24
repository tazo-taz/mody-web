import { Route, Routes } from 'react-router-dom';
import './assets/css/App.css';
import HeaderLayout from './components/layouts/header-layout';
import HomePage from './pages/home';
import FooterLayout from './components/layouts/footer-layout';
import { collection, getDocs } from "firebase/firestore";
import { useEffect } from 'react';
import { db } from './firebase';
import ModalProviders from './components/providers/modal';
import { Toaster } from 'react-hot-toast';
import Loading from './components/loading';
import { saveLoadingReference } from './references/loading';
import useAuthStateChange from './hooks/useAuthStateChange';

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
