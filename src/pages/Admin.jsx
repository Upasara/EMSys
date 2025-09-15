import React from 'react';
import { useAuth } from '../context/authContext';
import Navbar from '../components/dashboard/Navbar';
import { Outlet } from 'react-router-dom';
import AdminSidebar2 from '../components/dashboard/AdminSidebar2';

const Admin = () => {
 const { user } = useAuth();

 return (
  <div className='flex bg-gray-100 bg-[url(/loginBg8.png)]'>
   <AdminSidebar2 />
   <div className='flex-1  overflow-y-auto min-h-screen'>
    <Navbar />
    <Outlet />
   </div>
  </div>
 );
};

export default Admin;
