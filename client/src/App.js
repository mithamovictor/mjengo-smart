import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { useStateContext } from './context/ContextProvider';
import AuthService from './middleware/authService';

import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import Footer from './components/Footer';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ListPosts from './pages/ListPosts';
import ViewPost from './pages/ViewPost';

const USER = 'mjengoSmartUser';

const App = () => {
  const { hasToken, setHasToken } = useStateContext();
  const token = JSON.parse(localStorage.getItem(USER))?.token

  useEffect(()=>{
    AuthService.verifyToken(token)
      .then(res=>{
        if (res.data.message === 'Authorized')
          !hasToken && setHasToken(true);
        else
          setHasToken(false);
      })
      .catch(()=>setHasToken(false))
  }, [token, hasToken, setHasToken])

  console.log(hasToken);

  return (
    <div className="flex flex-col min-w-screen min-h-screen bg-gray-100">
      <ToastContainer />
      <Header />
      <div className="flex flex-col max-w-screen-lg w-full mx-auto flex-grow p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<ListPosts />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/post/:id" element={<ViewPost />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create-post" element={hasToken ? <CreatePost /> : <Navigate to="/login" replace={true} />} />
          <Route path="/edit-post/:id" element={hasToken ? <EditPost /> : <Navigate to="/login" replace={true} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
