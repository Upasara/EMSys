import React from 'react';
import { useAuth } from '../context/authContext';
import AdminSidebar from '../components/dashboard/AdminSidebar';
import Navbar from '../components/dashboard/Navbar';
import { Outlet } from 'react-router-dom';
import AdminSidebar2 from '../components/dashboard/AdminSidebar2';

const Admin = () => {
 const { user } = useAuth();

 return (
  <div className='flex'>
   <AdminSidebar />
   <div className='flex-1 bg-gray-100 min-h-screen'>
    <Navbar />
    <Outlet />
   </div>
  </div>
 );
};

export default Admin;
