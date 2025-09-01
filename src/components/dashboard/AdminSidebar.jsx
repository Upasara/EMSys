import React, { useState } from 'react';
import { FaBuilding, FaUserTie } from 'react-icons/fa';
import { GiMoneyStack } from 'react-icons/gi';
import { LuSettings2 } from 'react-icons/lu';
import { MdDashboard, MdDateRange } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { CgLogOut } from 'react-icons/cg';
import { TiThMenu } from 'react-icons/ti';
import { RiCloseFill } from 'react-icons/ri';

const AdminSidebar = () => {
 const { logout } = useAuth();
 const [isOpen, setIsOpen] = useState(false);

 return (
  <div className='h-screen'>
   <div
    className={`lg:w-64 bg-secondary-dark transition-all duration-300 ease-in-out ${
     isOpen ? 'w-64' : 'w-24'
    } `}
   >
    {/* sidebar header */}
    <div className='bg-primary-dark h-12  flex justify-between items-center pl-8 px-4 '>
     <h2
      className={` lg:block text-3xl text-primary-gold  font-bold text-shadow-lg duration-300 ${
       isOpen ? 'opacity-100' : 'opacity-0 overflow-hidden'
      } `}
     >
      EMSys
     </h2>
     <button
      className='block md:block lg:hidden text-2xl text-primary-gold cursor-pointer'
      onClick={() => setIsOpen(!isOpen)}
     >
      {isOpen ? <RiCloseFill /> : <TiThMenu />}
     </button>
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
      <span
       className={`ml-2   lg:block text-lg transition-all duration-300 ease-in-out ${
        isOpen ? 'opacity-100' : 'opacity-0 '
       } overflow-hidden `}
      >
       Dashboard
      </span>
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
      <div
       className={`ml-2   lg:block text-lg ${isOpen ? 'block' : 'hidden'} `}
      >
       Employee
      </div>
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
      <div
       className={`ml-2   lg:block text-lg ${isOpen ? 'block' : 'hidden'} `}
      >
       Department
      </div>
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
      <div
       className={`ml-2   lg:block text-lg ${isOpen ? 'block' : 'hidden'} `}
      >
       Leave
      </div>
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
      <div
       className={`ml-2   lg:block text-lg ${isOpen ? 'block' : 'hidden'} `}
      >
       Salary
      </div>
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
      <div
       className={`ml-2   lg:block text-lg ${isOpen ? 'block' : 'hidden'} `}
      >
       Settings
      </div>
     </NavLink>
     {/* logout button */}

     <NavLink
      onClick={logout}
      className='relative group flex   items-center space-x-2 px-4 py-2 rounded-md   bg-red-800 text-white font-medium tracking-wide hover:shadow-lg hover:bg-red-700  duration-300'
     >
      <CgLogOut className='group-hover:-translate-x-1.5 duration-300 text-2xl' />
      <div
       className={`ml-2   lg:block text-lg ${isOpen ? 'block' : 'hidden'} `}
      >
       Logout
      </div>
     </NavLink>
    </div>
    {/* logout button */}
   </div>
  </div>
 );
};

export default AdminSidebar;
