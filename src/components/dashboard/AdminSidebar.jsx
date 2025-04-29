import React from 'react';
import { FaBuilding, FaUserTie } from 'react-icons/fa';
import { GiMoneyStack } from 'react-icons/gi';
import { LuSettings2 } from 'react-icons/lu';
import { MdDashboard, MdDateRange } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

const AdminSidebar = () => {
 return (
  <div className='bg-secondaryDark text-white h-screen fixed left-0 top-0 bottom-0 space-y-10 w-64 shadow-'>
   <div className='bg-primaryDark  h-12 flex items-center justify-center'>
    <h2 className='text-2xl text-primaryGold text-center font-bold'>EMSys</h2>
   </div>
   <div className='px-4'>
    <NavLink
     to='/admin-dashboard'
     className={({ isActive }) =>
      `${
       isActive ? 'bg-primaryDark shadow-md ' : ' '
      }flex items-center space-x-4 block py-3 px-4 rounded-md`
     }
     end
    >
     <MdDashboard />
     <span>Dashboard</span>
    </NavLink>
    <NavLink
     to='/admin-dashboard'
     className='flex items-center space-x-4 block py-3 px-4 rounded-md'
    >
     <FaUserTie />
     <span>Employee</span>
    </NavLink>
    <NavLink
     to='/admin-dashboard/department'
     className={({ isActive }) =>
      `${
       isActive ? 'bg-primaryDark shadow-md ' : ' '
      }flex items-center space-x-4 block py-3 px-4 rounded-md`
     }
    >
     <FaBuilding />
     <span>Department</span>
    </NavLink>
    <NavLink
     to='/admin-dashboard'
     className='flex items-center space-x-4 block py-3 px-4 rounded-md'
    >
     <MdDateRange />
     <span>Leave</span>
    </NavLink>
    <NavLink
     to='/admin-dashboard'
     className='flex items-center space-x-4 block py-3 px-4 rounded-md'
    >
     <GiMoneyStack />
     <span>Salary</span>
    </NavLink>
    <NavLink
     to='/admin-dashboard'
     className='flex items-center space-x-4 block py-3 px-4 rounded-md'
    >
     <LuSettings2 />
     <span>Settings</span>
    </NavLink>
   </div>
  </div>
 );
};

export default AdminSidebar;
