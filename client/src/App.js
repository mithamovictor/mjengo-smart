// import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// import { useStateContext } from './context/ContextProvider';
// import { AuthHeader } from './middleware/authHeader';

import AboutPage from './pages/AboutPage';
import Dashboard from './pages/Dashboard';
import Footer from './components/Footer';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/RegisterPage';

const App = () => {
  // const {hasToken, setHasToken} = useStateContext();

  // useEffect(()=>{
  //   let headers = AuthHeader();
  // }, [])

  return (
    <div className="flex flex-col min-w-screen min-h-screen bg-gray-100">
      <ToastContainer />
      <Header />
      <div className="flex flex-col max-w-screen-lg w-full mx-auto flex-grow p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
