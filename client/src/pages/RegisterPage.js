import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImSpinner9 } from 'react-icons/im';
import isEmail from 'validator/es/lib/isEmail';
import AuthService from '../middleware/authService';
import { ToastRunner } from '../middleware/toastHandler';

const RegisterPage = () => {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ firstName: false, lastName: false, email: false, password: false });
  // const [passwordErrors, setPasswordErrors] = useState([]);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch(name) {
      case 'firstName':
        errors.firstName && setErrors(state=>({ ...state, firstName: false }));
        return setFirstName(value);
      case 'middleName':
        return setMiddleName(value);
      case 'lastName':
        errors.lastName && setErrors(state=>({ ...state, lastName: false }));
        return setLastName(value);
      case 'email':
        errors.email && setErrors(state=>({ ...state, email: false }));
        if (!isEmail(value)) {
          setErrors(state=>({ ...state, email: true }));
        }
        return setEmail(value);
      case 'password':
        let lowercase = new RegExp('^(?=.*[a-z])'),
            uppercase = new RegExp('^(?=.*[A-Z])'),
            number = new RegExp('^(?=.*[0-9])'),
            specialChar = new RegExp('^(?=.*[.!@#$%^&*])'),
            passLength = new RegExp('^(?=.{8,40})');

        setPasswordErrors([]);
        errors.password && setErrors(state=>({ ...state, password: false }));

        if (!lowercase.test(value)) setPasswordErrors(state => [...state, 'Must contain lowercase']);
        if (!uppercase.test(value)) setPasswordErrors(state => [...state, 'Must contain uppercase']);
        if (!number.test(value)) setPasswordErrors(state => [...state, 'Must contain numeric value']);
        if (!specialChar.test(value)) setPasswordErrors(state => [...state, 'Must contain atleast one special characters']);
        if (!passLength.test(value)) setPasswordErrors(state => [...state, 'Password length must be greater than 8']);

        if (!lowercase.test(value) || !uppercase.test(value) || !number.test(value) || !specialChar.test(value) || !passLength.test(value)) {
          setErrors({ ...errors, password: true });
        }
        return setPassword(value);
      default:
        return;
    }
  }

  const handleSubmit = () => {
    setLoading(true);
    if (firstName.length > 0 && lastName.length > 0 && email.length > 0 && password.length > 0 && !errors.firstName && !errors.lastName && !errors.email && !errors.password) {
      AuthService.register(firstName, middleName, lastName, email, password)
        .then(res=>{
          ToastRunner('success', res.data.message);
          setFirstName('');
          setMiddleName('');
          setLastName('');
          setEmail('');
          setPassword('');
          setLoading(false);
          setTimeout(()=>navigate('/login'), 3000);
          return;
        }).catch(error=>{
          const err = (error?.response && error?.response?.data && error?.response?.data?.message ) || error?.message || error.toString()
          ToastRunner('error', err);
          setLoading(false);
          return;
        });
    } else {
      (firstName.length <= 0) && setErrors(state =>({ ...state, firstName: true }));
      (lastName.length <= 0) && setErrors(state =>({ ...state, lastName: true }));
      (email.length <= 0) && setErrors(state =>({ ...state, email: true }));
      (password.length <= 0) && setErrors(state =>({ ...state, password: true }));
      setLoading(false);
    }
  }
  return (
    <>
      <h2 className="text-3xl mt-8 mb-4">Register</h2>
      <form className="flex flex-col w-full max-w-screen-sm rounded-lg bg-white shadow-lg p-4">
        <div className="flex flex-col mb-2">
          <label htmlFor="firstName">First Name</label>
          <input className="text-base text-gray-700 p-2 border-2 border-white bg-gray-100 rounded-md focus:border-gray-300 focus:outline-none" name="firstName" type="text" value={firstName} onChange={handleChange} />
          <span className={`text-xs ${errors.firstName
            ? 'text-red-800' : 'text-white'} py-1`}>This field cannot be left blank</span>
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="middleName">Middle Name <span className="text-sm text-gray-500 italic">( Optional )</span></label>
          <input className="text-base text-gray-700 p-2 border-2 border-white bg-gray-100 rounded-md focus:border-gray-300 focus:outline-none" name="middleName" type="text" value={middleName} onChange={handleChange} />
          <span className="text-xs text-white py-1">This field cannot be left blank</span>
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="lastName">Last Name</label>
          <input className="text-base text-gray-700 p-2 border-2 border-white bg-gray-100 rounded-md focus:border-gray-300 focus:outline-none" name="lastName" type="text" value={lastName} onChange={handleChange} />
          <span className={`text-xs ${errors.lastName
            ? 'text-red-800' : 'text-white'} py-1`}>This field cannot be left blank</span>
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="email">Email</label>
          <input className="text-base text-gray-700 p-2 border-2 border-white bg-gray-100 rounded-md focus:border-gray-300 focus:outline-none" name="email" type="email" value={email} onChange={handleChange} />
          <span className={`text-xs ${errors.email
            ? 'text-red-800' : 'text-white'} py-1`}>Please enter a valid email</span>
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="password">Password</label>
          <input className="text-base text-gray-700 p-2 border-2 border-white bg-gray-100 rounded-md focus:border-gray-300 focus:outline-none" name="password" type="password" value={password} onChange={handleChange} />
          <span className={`text-xs ${errors.password
            ? 'text-red-800' : 'text-white'} py-1`}>Please enter a valid password</span>
          {errors.password &&
            passwordErrors.map((error, idx)=>(
              <span key={idx} className="text-xs text-red-800 py-1 italic">- {error}</span>
            ))
          }
        </div>
        <div className="flex flex-col">
          <button
            className={`bg-slate-${loading ? '800' : '900'} w-full px-6 py-3 rounded-md`}
            onClick={handleSubmit}
            disabled={loading}
            type="button"
          >
            {loading
              ? <span className="flex justify-center items-center text-slate-500">
                  <ImSpinner9 className="animate-spin mr-4 fill-slate-300" />Loading...
                </span>
              : <span className="text-slate-300">Register</span>
            }
          </button>
        </div>
      </form>
    </>
  )
}

export default RegisterPage
