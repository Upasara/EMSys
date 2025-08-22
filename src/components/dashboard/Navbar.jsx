import React from 'react';
import { useAuth } from '../../context/authContext';

const Navbar = () => {
 const { user, logout } = useAuth();
 return (
  <div className='px-2 flex items-center justify-between h-12 bg-primaryDark text-white'>
   <p>
    Welcome <b>{user.name}</b>
   </p>
   <button
    onClick={logout}
    className='bg-red-800 px-4 py-1 rounded-md hover:bg-red-700 transition'
   >
    Logout
   </button>
  </div>
 );
};

export default Navbar;
