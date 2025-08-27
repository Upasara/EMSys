import React from 'react';
import { FaBuilding, FaUserTie } from 'react-icons/fa';
import { GiMoneyStack } from 'react-icons/gi';
import { LuSettings2 } from 'react-icons/lu';
import { MdDashboard, MdDateRange } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { CgLogOut } from 'react-icons/cg';
import { IoMenu } from 'react-icons/io5';

const AdminSidebar = () => {
 const { logout } = useAuth();
 const [isCollapsed, setIsCollapsed] = useState(false);
 const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
 return (
  <>
   {/* hamberger icon for mobile view */}
   <div className='md:hidden fixed top-4 left-4 z-50'>
    <button
     onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
     className='text-white bg-primary-dark p-2 rounded-md'
    >
     <IoMenu size={24} />
    </button>
   </div>
   {/* sidebar */}

   <div
    className={`bg-secondary-dark  text-white h-screen fixed top-0 z-40 bottom-0 duration-300 ${
     isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
    } md:translate-x-0 md:${isCollapsed ? 'w-20' : 'w-64'} md:relative`}
   >
    {/* sidebar header */}
    <div className='bg-primary-dark  h-12 flex items-center justify-center'>
     <h2
      className={`text-3xl text-primary-gold text-center font-bold text-shadow-lg duration-300 ${
       isCollapsed ? 'hidden' : ''
      } `}
     >
      EMSys
     </h2>
    </div>
    {/* sidebar content */}
    <div className='px-4 text-lg focus'>
     {/* dashboard link */}
     <NavLink
      to='/admin-dashboard'
      className={({ isActive }) =>
       `${
        isActive ? 'bg-primary-dark shadow-lg ' : ' '
       }relative group flex items-center space-x-2 py-2  px-4 rounded-md duration-300 mb-2`
      }
      end
     >
      <MdDashboard
       className='group-focus:-translate-x-1 duration-300'
       size={24}
      />
      <span
       className={`duration-300 ${
        isCollapsed ? 'hidden' : 'group-focus:tracking-wide'
       }`}
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
      <FaUserTie
       className='group-focus:-translate-x-1 duration-300'
       size={24}
      />
      <span
       className={`duration-300 ${
        isCollapsed ? 'hidden' : 'group-focus:tracking-wide '
       }`}
      >
       Employee
      </span>
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
      <FaBuilding
       className='group-focus:-translate-x-1 duration-300'
       size={24}
      />
      <span
       className={`duration-300 ${
        isCollapsed ? 'hidden' : 'group-focus:tracking-wide'
       }`}
      >
       Department
      </span>
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
      <MdDateRange
       className='group-focus:-translate-x-1 duration-300'
       size={24}
      />
      <span
       className={` duration-300 ${
        isCollapsed ? 'hidden' : 'group-focus:tracking-wide '
       }`}
      >
       Leave
      </span>
     </NavLink>
     {/* salary link */}
     <NavLink
      to='/admin-dashboard/salary/add'
      className={({ isActive }) =>
       `${
        isActive ? 'bg-primary-dark shadow-lg ' : ' '
       }relative group flex items-center space-x-2 py-2  px-4 rounded-md duration-300 mb-2`
      }
     >
      <GiMoneyStack
       className='group-focus:-translate-x-1 duration-300'
       size={24}
      />
      <span
       className={`duration-300 ${
        isCollapsed ? 'hidden' : 'group-focus:tracking-wide '
       }`}
      >
       Salary
      </span>
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
      <LuSettings2
       className='group-focus:-translate-x-1 duration-300'
       size={24}
      />
      <span
       className={` duration-300 ${
        isCollapsed ? 'hidden' : 'group-focus:tracking-wide '
       }`}
      >
       Settings
      </span>
     </NavLink>
    </div>
    <div className='px-4 text-base w-full absolute bottom-8'>
     <button
      onClick={logout}
      className='relative group flex justify-center items-center gap-1 px-8 py-2 rounded-md w-full cursor-pointer bg-red-800 text-white font-medium tracking-wide hover:shadow-lg hover:bg-red-700  duration-300'
     >
      <CgLogOut
       className='text-2xl group-hover:-translate-x-1.5 duration-300 '
       size={24}
      />
      <span
       className={`duration-300 ${
        isCollapsed ? 'hidden' : 'group-hover:tracking-wide '
       }`}
      >
       Logout
      </span>
     </button>
    </div>
    {/* collapse button */}
    <div
     className='absolute bottom-4 left-4 md:left-auto md:right-4 cursor-pointer'
     onClick={() => setIsCollapsed(!isCollapsed)}
    >
     <IoMenu
      size={24}
      className={`text-white transform duration-300 ${
       isCollapsed ? 'rotate-180' : ''
      }`}
     />
    </div>
   </div>
   {/* overlay for mobile menu */}
   {isMobileMenuOpen && (
    <div
     className='fixed inset-0 bg-black/50 z-30 md:hidden'
     onClick={() => setIsMobileMenuOpen(false)}
    ></div>
   )}
  </>
 );
};

export default AdminSidebar;
