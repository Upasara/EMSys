import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/dashboard/Navbar';
import EmployeeSidebar2 from '../components/EmployeeDashboard/EmployeeSidebar2';

const EmployeeDashboard = () => {
 return (
  <div className='flex'>
   <EmployeeSidebar2 />
   <div className='flex-1  bg-gray-100 bg-[url(/loginBg8.png)] h-screen overflow-y-auto'>
    <Navbar />
    <Outlet />
   </div>
  </div>
 );
};

export default EmployeeDashboard;
