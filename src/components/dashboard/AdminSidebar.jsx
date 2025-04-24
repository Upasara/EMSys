import React from 'react';
import { FaBuilding, FaTachometerAlt, FaUserTie } from 'react-icons/fa';
import { FaMoneyBill1Wave } from 'react-icons/fa6';
import { LuSettings2 } from 'react-icons/lu';
import { MdDateRange } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

const AdminSidebar = () => {
 return (
  <div className='bg-primaryDark text-white h-screen fixed left-0 top-0 bottom-0 space-y-10 w-64'>
   <div className='bg-secondaryDark  h-12 flex items-center justify-center'>
    <h2 className='text-2xl text-primaryGold text-center '>EMSys</h2>
   </div>
   <div>
    <NavLink to='/admin-dashboard'>
     <FaTachometerAlt />
     <span>Dashboard</span>
    </NavLink>
    <NavLink to='/admin-dashboard'>
     <FaUserTie />
     <span>Employee</span>
    </NavLink>
    <NavLink to='/admin-dashboard'>
     <FaBuilding />
     <span>Department</span>
    </NavLink>
    <NavLink to='/admin-dashboard'>
     <MdDateRange />
     <span>Leave</span>
    </NavLink>
    <NavLink to='/admin-dashboard'>
     <FaMoneyBill1Wave />
     <span>Salary</span>
    </NavLink>
    <NavLink to='/admin-dashboard'>
     <LuSettings2 />
     <span>Settings</span>
    </NavLink>
   </div>
  </div>
 );
};

export default AdminSidebar;
