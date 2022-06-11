import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImSpinner9 } from 'react-icons/im';
import isEmail from 'validator/es/lib/isEmail';
import AuthService from '../middleware/authService';
import { ToastRunner } from '../middleware/toastHandler';

import { useStateContext } from '../context/ContextProvider';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: false, password: false });
  const navigate = useNavigate();
  const USER = 'mjengoSmartUser';
  const { setHasToken } = useStateContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch(name) {
      case 'email':
        errors.email && setErrors(state=>({ ...state, email: false }));
        if (!isEmail(value)) {
          setErrors(state=>({ ...state, email: true }));
        }
        return setEmail(value);
      case 'password':
        errors.password && setErrors(state=>({ ...state, password: false }));
        return setPassword(value);
      default:
        return;
    }
  }

  const handleSubmit = () => {
    setLoading(true);
    if (email.length > 0 && password.length > 0 && !errors.email && !errors.password) {
      AuthService.login(email, password)
        .then(res=>{
          const {data} = res;
          localStorage.removeItem(USER);
          if (data.status === 'success') {
            localStorage.setItem(USER, JSON.stringify(data));
            ToastRunner('success', 'Login success!');
            setEmail('');
            setPassword('');
            setLoading(false);
            setHasToken(true);
            setTimeout(()=>navigate('/blog'), 3000);
            return;
          } else {
            ToastRunner('error', 'Login failed!');
            setLoading(false);
            return;
          }
        }).catch(error=>{
          const err = (error?.response && error?.response?.data && error?.response?.data?.message ) || error?.message || error.toString()
          localStorage.removeItem(USER);
          ToastRunner('error', err);
          setLoading(false);
          return;
        });
    } else {
      (email.length <= 0) && setErrors(state =>({ ...state, email: true }));
      (password.length <= 0) && setErrors(state =>({ ...state, password: true }));
      setLoading(false);
    }
  }
  return (
    <>
      <h2 className="text-3xl mt-8 mb-4">Login</h2>
      <form className="flex flex-col w-full max-w-screen-sm rounded-lg bg-white shadow-lg p-4">
        <div className="flex flex-col mb-6">
          <label htmlFor="email">Email</label>
          <input className="text-base text-gray-700 p-2 border-2 border-white bg-gray-100 rounded-md focus:border-gray-300 focus:outline-none" name="email" type="email" value={email} onChange={handleChange} />
          <span className={`text-xs ${errors.email
            ? 'text-red-800' : 'text-white'} py-1`}>Please enter a valid email</span>
        </div>
        <div className="flex flex-col mb-6">
          <label htmlFor="password">Password</label>
          <input className="text-base text-gray-700 p-2 border-2 border-white bg-gray-100 rounded-md focus:border-gray-300 focus:outline-none" name="password" type="password" value={password} onChange={handleChange} />
          <span className={`text-xs ${errors.password
            ? 'text-red-800' : 'text-white'} py-1`}>Please enter a valid password</span>
        </div>
        <div className="flex flex-col">
          <button
            className="bg-slate-900 w-full px-6 py-3 rounded-md"
            onClick={handleSubmit}
            disabled={loading}
            type="button"
          >
            {loading
              ? <span className="flex justify-center items-center text-slate-300">
                  <ImSpinner9 className="animate-spin mr-4" />Loading...
                </span>
              : <span className="text-slate-300">Login</span>
            }
          </button>
        </div>
      </form>
    </>
  )
}

export default LoginPage
