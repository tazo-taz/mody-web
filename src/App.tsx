import { Route, Routes } from 'react-router-dom';
import './assets/css/App.css';
import HeaderLayout from './components/layouts/header-layout';
import HomePage from './pages/home';
import FooterLayout from './components/layouts/footer-layout';

function App() {
  return (
    <Routes>
      <Route element={<HeaderLayout />}>
        <Route element={<FooterLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
