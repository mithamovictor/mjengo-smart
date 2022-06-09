import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <header className="flex flex-wrap w-full justify-around max-w-screen-sm p-4 shadow-lg mb-4">
      <NavLink className='w-24 p-2 text-center' to="/">Home</NavLink>
      <NavLink className='w-24 p-2 text-center' to="/about">About</NavLink>
      <NavLink className='w-24 p-2 text-center' to="/login">Login</NavLink>
      <NavLink className='w-24 p-2 text-center' to="/register">Register</NavLink>
      <NavLink className='w-24 p-2 text-center' to="/dashboard">Dashboard</NavLink>
    </header>
  )
}

export default Header
