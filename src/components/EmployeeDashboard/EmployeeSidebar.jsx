import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { GiMoneyStack } from 'react-icons/gi';
import { LuSettings2 } from 'react-icons/lu';
import { MdDashboard, MdDateRange } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

const EmployeeSidebar = () => {
 const { user } = useAuth();
 return (
  <div className='bg-secondaryDark text-white h-screen fixed left-0 top-0 bottom-0 space-y-10 w-64 shadow-'>
   <div className='bg-primaryDark  h-12 flex items-center justify-center'>
    <h2 className='text-2xl text-primaryGold text-center font-bold'>EMSys</h2>
   </div>
   <div className='px-4'>
    <NavLink
     to='/employee-dashboard'
     className={({ isActive }) =>
      `${
       isActive ? 'bg-primaryDark shadow-md ' : ' '
      }flex items-center space-x-4 py-3  px-4 rounded-md`
     }
     end
    >
     <MdDashboard />
     <span>Dashboard</span>
    </NavLink>
    <NavLink
     to={`/employee-dashboard/profile/${user._id}`}
     className={({ isActive }) =>
      `${
       isActive ? 'bg-primaryDark shadow-md ' : ' '
      }flex items-center space-x-4 py-3  px-4 rounded-md`
     }
    >
     <FaUserCircle />
     <span>My Profile</span>
    </NavLink>
    <NavLink
     to='/employee-dashboard/leaves'
     className={({ isActive }) =>
      `${
       isActive ? 'bg-primaryDark shadow-md ' : ' '
      }flex items-center space-x-4 py-3  px-4 rounded-md`
     }
    >
     <MdDateRange />
     <span>Leaves</span>
    </NavLink>
    <NavLink
     to={`/employee-dashboard/salary/${user._id}`}
     className={({ isActive }) =>
      `${
       isActive ? 'bg-primaryDark shadow-md ' : ' '
      }flex items-center space-x-4  py-3 px-4 rounded-md `
     }
    >
     <GiMoneyStack />
     <span>Salary</span>
    </NavLink>
    <NavLink
     to='/employee-dashboard/setting'
     className={({ isActive }) =>
      `${
       isActive ? 'bg-primaryDark shadow-md ' : ' '
      }flex items-center space-x-4 py-3  px-4 rounded-md`
     }
    >
     <LuSettings2 />
     <span>Settings</span>
    </NavLink>
   </div>
  </div>
 );
};

export default EmployeeSidebar;
