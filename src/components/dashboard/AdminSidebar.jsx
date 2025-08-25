import React from 'react';
import { FaBuilding, FaUserTie } from 'react-icons/fa';
import { GiMoneyStack } from 'react-icons/gi';
import { LuSettings2 } from 'react-icons/lu';
import { MdDashboard, MdDateRange } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

const AdminSidebar = () => {
 const { logout } = useAuth();
 return (
  <div className='bg-secondary-dark text-white h-screen fixed left-0 top-0 bottom-0 space-y-10 w-64 shadow-lg'>
   <div className='bg-primary-dark  h-12 flex items-center justify-center'>
    <h2 className='text-3xl text-primary-gold text-center font-bold text-shadow-lg  '>
     EMSys
    </h2>
   </div>
   <div className='px-4 text-lg focus'>
    <NavLink
     to='/admin-dashboard'
     className={({ isActive }) =>
      `${
       isActive ? 'bg-primary-dark shadow-lg ' : ' '
      }relative group flex items-center space-x-2 py-2  px-4 rounded-md duration-300 mb-2`
     }
     end
    >
     <MdDashboard className='group-focus:-translate-x-1 duration-300' />
     <span className='group-focus:tracking-wide duration-300'>Dashboard</span>
    </NavLink>
    <NavLink
     to='/admin-dashboard/employees'
     className={({ isActive }) =>
      `${
       isActive ? 'bg-primary-dark shadow-lg ' : ' '
      }relative group flex items-center space-x-2 py-2  px-4 rounded-md duration-300 mb-2`
     }
    >
     <FaUserTie className='group-focus:-translate-x-1 duration-300' />
     <span className='group-focus:tracking-wide duration-300'>Employee</span>
    </NavLink>
    <NavLink
     to='/admin-dashboard/departments'
     className={({ isActive }) =>
      `${
       isActive ? 'bg-primary-dark shadow-lg ' : ' '
      }relative group flex items-center space-x-2 py-2  px-4 rounded-md duration-300 mb-2`
     }
    >
     <FaBuilding className='group-focus:-translate-x-1 duration-300' />
     <span className='group-focus:tracking-wide duration-300'>Department</span>
    </NavLink>
    <NavLink
     to='/admin-dashboard/leaves'
     className={({ isActive }) =>
      `${
       isActive ? 'bg-primary-dark shadow-lg ' : ' '
      }relative group flex items-center space-x-2 py-2  px-4 rounded-md duration-300 mb-2`
     }
    >
     <MdDateRange className='group-focus:-translate-x-1 duration-300' />
     <span className='group-focus:tracking-wide duration-300'>Leave</span>
    </NavLink>
    <NavLink
     to='/admin-dashboard/salary/add'
     className={({ isActive }) =>
      `${
       isActive ? 'bg-primary-dark shadow-lg ' : ' '
      }relative group flex items-center space-x-2 py-2  px-4 rounded-md duration-300 mb-2`
     }
    >
     <GiMoneyStack className='group-focus:-translate-x-1 duration-300' />
     <span className='group-focus:tracking-wide duration-300'>Salary</span>
    </NavLink>
    <NavLink
     to='/admin-dashboard/setting'
     className={({ isActive }) =>
      `${
       isActive ? 'bg-primary-dark shadow-lg ' : ' '
      }relative group flex items-center space-x-2 py-2  px-4 rounded-md duration-300 mb-2`
     }
    >
     <LuSettings2 className='group-focus:-translate-x-1 duration-300' />
     <span className='group-focus:tracking-wide duration-300'>Settings</span>
    </NavLink>
   </div>
   <div className='px-4 text-lg bottom-0'>
    <button
     onClick={logout}
     className='bg-red-800 px-8 py-2 rounded-md hover:bg-red-700 transition'
    >
     Logout
    </button>
   </div>
  </div>
 );
};

export default AdminSidebar;
