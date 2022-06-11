import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaWarehouse } from 'react-icons/fa';
import { CgMenuGridO } from 'react-icons/cg';

import { useStateContext } from '../context/ContextProvider';
import AuthService from '../middleware/authService';

const Header = () => {
  const { hasToken, setHasToken } = useStateContext();
  const navigate = useNavigate();

  const toggleMenu = () => {
    const menu = document.getElementById('menu');
    if (menu?.classList.contains('hidden'))
      menu?.classList.replace('hidden', 'flex');
    else
      menu?.classList.replace('flex', 'hidden');
  }

  const handleLogout = () => {
    AuthService.logout()
    setHasToken(false);
    return navigate("/login", { replace: true });
  }

  useEffect(()=>{
    const menu = document.getElementById('menu');
    const showMenuOnResize = () => {
      if (window.innerWidth > 768)
        menu?.classList.replace('hidden', 'flex');
      else
        menu?.classList.replace('flex', 'hidden');
    }
    window.addEventListener('resize', showMenuOnResize);
    return ()=>window.removeEventListener('resize', showMenuOnResize);
  }, [])

  return (
    <header className="flex w-full justify-center shadow-lg">
      <div className="flex flex-col md:flex-row max-w-screen-lg w-full justify-around md:justify-between mx-auto p-4 relative">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex uppercase font-semibold text-2xl whitespace-nowrap">
            <FaWarehouse className="w-7 h-7 mr-2" />
            Mjengo Smart
          </Link>
          <button
            type="button"
            onClick={toggleMenu}
          >
            <CgMenuGridO className="block md:hidden w-6 h-6" />
          </button>
        </div>
        <nav id="menu" className="hidden md:flex flex-col md:flex-row justify-start md:justify-end items-center absolute md:relative top-0 left-0 bg-slate-900 md:bg-transparent w-full max-w-300 md:max-w-none flex-grow h-full min-h-screen md:min-h-0 z-10 pt-12 md:pt-0"
        onClick={toggleMenu}>
          <Link className="w-full md:w-auto p-4 md:p-2 text-left text-slate-300 md:text-slate-900" to="/">Home</Link>
          <Link className="w-full md:w-auto p-4 md:p-2 text-left text-slate-300 md:text-slate-900" to="/blog">Blog</Link>
          {hasToken
            ? (<>
              <Link className="w-full md:w-auto p-4 md:p-2 text-left text-slate-300 md:text-slate-900" to="/profile">Profile</Link>
              <button type="button" className="w-full md:w-auto p-4 md:p-2 text-left text-slate-300 md:text-slate-900" onClick={handleLogout} href="/#/">Logout</button>
            </>)
            :  (<>
              <Link className="w-full md:w-auto p-4 md:p-2 text-left text-slate-300 md:text-slate-900" to="/login">Login</Link>
              <Link className="w-full md:w-auto p-4 md:p-2 text-left text-slate-300 md:text-slate-900" to="/register">Register</Link>
            </>)
          }
        </nav>
      </div>
    </header>
  )
}

export default Header
