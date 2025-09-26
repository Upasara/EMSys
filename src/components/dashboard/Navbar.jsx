import React from 'react';
import { useAuth } from '../../context/authContext';
import { FaCircleUser } from 'react-icons/fa6';

const Navbar = () => {
 const { user } = useAuth();
 return (
  <div className='px-2 flex items-center justify-end h-12 bg-primary-dark text-white shadow-lg gap-2  '>
   <img
    src={
     user?.profileImage
      ? `http://localhost:5000/${user?.profileImage}`
      : '/1.png'
    }
    className='rounded-full w-8 shadow-md bg-white'
    onError={(e) => {
     e.target.onerror = null; // prevent infinite loop
     e.target.src = '/1.png'; // fallback image
    }}
   />
   <p className='text-xs'>
    Welcome{' '}
    <span className='text-base font-mono font-semibold'>{user.name}</span>
   </p>
  </div>
 );
};

export default Navbar;
