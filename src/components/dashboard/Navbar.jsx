import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
 const { user } = useAuth();
 return (
  <div className='px-2 flex items-center justify-between h-12 bg-primaryDark text-white'>
   <p>Welcome {user.name}</p>
   <button className='bg-red-700 px-4 py-1 rounded-md hover:bg-red-800'>
    Logout
   </button>
  </div>
 );
};

export default Navbar;
