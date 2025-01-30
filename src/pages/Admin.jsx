import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const Admin = () => {
 const navigate = useNavigate();
 const handleButton = () => {
  navigate('/login');
 };
 const { user } = useAuth();

 return (
  <div className='text-center mt-10'>
   Hello {user && user.name}
   <div className='flex items-center justify-center mt-20'>
    <button
     className='border px-4 py-2 shadow-xl bg-primaryDark text-white rounded-md'
     onClick={handleButton}
    >
     LOGIN
    </button>
   </div>
  </div>
 );
};

export default Admin;
