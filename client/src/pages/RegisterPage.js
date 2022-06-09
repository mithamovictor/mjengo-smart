import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImSpinner9 } from 'react-icons/im';
import AuthService from '../middleware/authService';
import { ToastRunner } from '../middleware/toastHandler';

const RegisterPage = () => {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch(name) {
      case 'firstName':
        return setFirstName(value);
      case 'middleName':
        return setMiddleName(value);
      case 'lastName':
        return setLastName(value);
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      default:
        return;
    }
  }

  const handleSubmit = e => {
    setLoading(true);
    return AuthService.register(firstName, middleName, lastName, email, password)
      .then(res=>{
        if (res.status === 'success') {
          ToastRunner('success', 'User registration success!');
          setFirstName('');
          setMiddleName('');
          setLastName('');
          setEmail('');
          setPassword('');
          setLoading(false);
          setTimeout(()=>navigate('/login'), 3000);
          return;
        } else {
          ToastRunner('error', 'User registration failed!');
          setLoading(false);
          return;
        }
      }).catch(error=>{
        const err = (error?.response && error?.response?.data && error?.response?.data?.message ) || error?.message || error.toString()
        ToastRunner('error', err);
        setLoading(false);
        return;
      })
  }

  return (
    <>
      <h2 className="text-3xl mt-8 mb-4">Register</h2>
      <form className="flex flex-col bg-white shadow-lg p-4">
        <div className="flex flex-col">
          <label htmlFor="firstName">First Name</label>
          <input name="firstName" type="text" value={firstName} onChange={handleChange} />
        </div>
        <div className="flex flex-col">
          <label htmlFor="middleName">Middle Name</label>
          <input name="middleName" type="text" value={middleName} onChange={handleChange} />
        </div>
        <div className="flex flex-col">
          <label htmlFor="lastName">Last Name</label>
          <input name="lastName" type="text" value={lastName} onChange={handleChange} />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input name="email" type="email" value={email} onChange={handleChange} />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input name="password" type="password" value={password} onChange={handleChange} />
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
              : <span className="text-slate-300">
                  Register
                </span>
            }
          </button>
        </div>
      </form>
    </>
  )
}

export default RegisterPage
