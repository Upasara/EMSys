import React from 'react';
import { FaBuilding, FaUserTie } from 'react-icons/fa';
import { GiMoneyStack } from 'react-icons/gi';
import { LuSettings2 } from 'react-icons/lu';
import { MdDashboard, MdDateRange } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { CgLogOut } from 'react-icons/cg';
import { TiThMenu } from 'react-icons/ti';

const AdminSidebar = () => {
 const { logout } = useAuth();

 return (
  <div className='flex'>
   <div className='w-20 md:w-24 lg:w-64 bg-secondary-dark transition-all duration-300 '>
    {/* sidebar header */}
    <div className='bg-primary-dark h-12  flex justify-center items-center px-4 '>
     <h2 className='hidden md:hidden lg:block text-3xl text-primary-gold  font-bold text-shadow-lg  '>
      EMSys
     </h2>
     <TiThMenu className='block md:block lg:hidden text-2xl text-primary-gold' />
    </div>
    {/* sidebar content */}
    <div className='px-4 pt-4 text-white'>
     {/* dashboard link */}
     <NavLink
      to='/admin-dashboard'
      className={({ isActive }) =>
       `${
        isActive ? 'bg-primary-dark shadow-lg ' : ' '
       }relative group flex items-center space-x-2 py-2  px-4  rounded-md duration-300 mb-2`
      }
      end
     >
      <MdDashboard className='group-focus:-translate-x-1 duration-300 text-2xl' />
      <span className='ml-2 hidden md:hidden lg:block text-lg'>Dashboard</span>
     </NavLink>
     {/* employee link */}
     <NavLink
      to='/admin-dashboard/employees'
      className={({ isActive }) =>
       `${
        isActive ? 'bg-primary-dark shadow-lg ' : ' '
       }relative group flex items-center space-x-2 py-2  px-4 rounded-md duration-300 mb-2`
      }
     >
      <FaUserTie className='group-focus:-translate-x-1 duration-300 text-2xl' />
      <div className='ml-2 hidden md:hidden lg:block'>Employee</div>
     </NavLink>
     {/* department link */}
     <NavLink
      to='/admin-dashboard/departments'
      className={({ isActive }) =>
       `${
        isActive ? 'bg-primary-dark shadow-lg ' : ' '
       }relative group flex items-center space-x-2 py-2  px-4 rounded-md duration-300 mb-2`
      }
     >
      <FaBuilding className='group-focus:-translate-x-1 duration-300 text-2xl' />
      <div className='ml-2 hidden md:hidden lg:block'>Department</div>
     </NavLink>
     {/* leave link */}
     <NavLink
      to='/admin-dashboard/leaves'
      className={({ isActive }) =>
       `${
        isActive ? 'bg-primary-dark shadow-lg ' : ' '
       }relative group flex items-center space-x-2 py-2  px-4 rounded-md duration-300 mb-2`
      }
     >
      <MdDateRange className='group-focus:-translate-x-1 duration-300 text-2xl' />
      <div className='ml-2 hidden md:hidden lg:block'>Leave</div>
     </NavLink>
     {/* salary link */}
     <NavLink
      to='/admin-dashboard/salary/add'
      className={({ isActive }) =>
       `${
        isActive ? 'bg-primary-dark shadow-lg ' : ' '
       }relative group flex items-center space-x-2 py-2  px-4 md:space-x-0  rounded-md duration-300 mb-2`
      }
     >
      <GiMoneyStack className='group-focus:-translate-x-1 duration-300 text-2xl ' />
      <div className='ml-2 hidden md:hidden lg:block'>Salary</div>
     </NavLink>
     {/* settings link */}
     <NavLink
      to='/admin-dashboard/setting'
      className={({ isActive }) =>
       `${
        isActive ? 'bg-primary-dark shadow-lg ' : ' '
       }relative group flex items-center space-x-2 py-2  px-4 rounded-md duration-300 mb-2`
      }
     >
      <LuSettings2 className='group-focus:-translate-x-1 duration-300 text-2xl' />
      <div className='ml-2 hidden md:hidden lg:block'>Settings</div>
     </NavLink>
     {/* logout button */}

     <NavLink
      onClick={logout}
      className='relative group flex   items-center space-x-2 px-4 py-2 rounded-md   bg-red-800 text-white font-medium tracking-wide hover:shadow-lg hover:bg-red-700  duration-300'
     >
      <CgLogOut className='group-hover:-translate-x-1.5 duration-300 text-2xl' />
      <div className='ml-2 hidden md:hidden lg:block'>Logout</div>
     </NavLink>
    </div>
    {/* logout button */}
   </div>
  </div>
 );
};

export default AdminSidebar;
