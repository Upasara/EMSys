import React from 'react';
import { useAuth } from '../../context/authContext';
import { FaCircleUser } from 'react-icons/fa6';

const Navbar = () => {
 const { user } = useAuth();
 return (
  <div className='px-2 flex items-center justify-end h-12 bg-primary-dark text-white shadow-lg gap-2  '>
   <FaCircleUser className='text-lg' />
   <p>
    Welcome <b>{user.name}</b>
   </p>
  </div>
 );
};

export default Navbar;
