import React from 'react';
import { useAuth } from '../context/AuthContext';
import AdminSidebar from '../components/dashboard/AdminSidebar';
import Navbar from '../components/dashboard/Navbar';
import AdminSummary from '../components/dashboard/AdminSummary';

const Admin = () => {
 const { user } = useAuth();

 return (
  <div className='flex'>
   <AdminSidebar />
   <div className='flex-1 ml-64 bg-gray-100 h-screen'>
    <Navbar />
    <AdminSummary />
   </div>
  </div>
 );
};

export default Admin;
