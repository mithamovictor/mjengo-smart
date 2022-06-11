import { useEffect, useState } from 'react'
import AuthService from '../middleware/authService';

const AboutPage = () => {
  const [user, setUser] = useState({});

  const roleDisplay = (role) => {
    switch(role) {
      case 1:
        return 'ADMIN';
      case 2:
        return 'WRITER';
      default:
        return;
    }
  }

  useEffect(()=>{
    const currentUser = AuthService.getCurrentUser();
    setUser(state=>({
      ...state,
      ...currentUser
    }));
  }, [setUser]);

  return (
    <>
      <h2 className="text-3xl mt-8 mb-4">Profile</h2>
      <div className="flex flex-col w-full max-w-screen-sm rounded-lg bg-white shadow-lg p-4">
        <p className="p-2">Name: {`${user.firstName} ${user.middleName} ${user.lastName}`}</p>
        <p className="p-2">Email: {user.email}</p>
        <p className="p-2">Role: {roleDisplay(user.role)}</p>
      </div>
    </>
  )
}

export default AboutPage
