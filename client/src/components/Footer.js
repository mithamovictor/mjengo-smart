import React from 'react'

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className='flex justify-center items-center text-center p-4'>&copy; {year}. All rights reserved.</footer>
  )
}

export default Footer
