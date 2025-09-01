import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/authContext';

import { RiMenuFold2Fill } from 'react-icons/ri';
import { RiMenuUnfold2Fill } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
import { MdOutlineDashboard } from 'react-icons/md';
import { FaUserGroup } from 'react-icons/fa6';
import { PiBuildingsFill } from 'react-icons/pi';
import { MdCalendarMonth } from 'react-icons/md';
import { GiMoneyStack } from 'react-icons/gi';
import { LuSettings2 } from 'react-icons/lu';

const AdminSidebar2 = () => {
 const { logout } = useAuth();

 const menus = [
  {
   name: 'Dashboard',
   link: '/admin-dashboard',
   icon: MdOutlineDashboard,
   end: true,
  },
  {
   name: 'Employees',
   link: '/admin-dashboard/employees',
   icon: FaUserGroup,
   end: false,
  },
  {
   name: 'Departments',
   link: '/admin-dashboard/departments',
   icon: PiBuildingsFill,
   end: false,
  },
  {
   name: 'Leaves',
   link: '/admin-dashboard/leaves',
   icon: MdCalendarMonth,
   end: false,
  },
  {
   name: 'Salary',
   link: '/admin-dashboard/salary/add',
   icon: GiMoneyStack,
   end: false,
  },
  {
   name: 'Settings',
   link: '/admin-dashboard/setting',
   icon: LuSettings2,
   end: true,
  },
 ];

 const [open, setOpen] = useState(true);
 const [isMobile, setIsMobile] = useState(false);

 useEffect(() => {
  const handleResize = () => {
   if (window.innerWidth < 1024) {
    setOpen(false);
    setIsMobile(true);
   } else {
    setOpen(true);
    setIsMobile(false);
   }
  };
  handleResize();
  window.addEventListener('resize', handleResize);

  return () => window.removeEventListener('resize', handleResize);
 }, []);

 const handleNavClick = () => {
  if (isMobile) {
   setOpen(false);
  }
 };

 return (
  <div className='flex'>
   {/* overlay for mobile */}
   {isMobile && open && (
    <div
     className='fixed inset-0 bg-black opacity-50 z-50'
     onClick={() => setOpen(false)}
    />
   )}
   {/* toggle icons for mobile */}
   {isMobile && (
    <div
     className=' p-2 cursor-pointer text-primary-gold fixed top-4 left-4 z-50 bg-primary-dark rounded-full shadow-lg '
     onClick={() => setOpen(!open)}
    >
     {/* ------------------------------------------------------------------------------------------------------------------------------ */}
    </div>
   )}
   <div
    className={`bg-secondary-dark min-h-screen fixed lg:relative z-50 ${
     open ? 'w-64' : 'w-20 '
    } duration-500`}
   >
    {/* header */}
    <div className='bg-primary-dark h-12 flex justify-between items-center px-4'>
     <div
      className={`transition-all duration-500 overflow-hidden ${
       open
        ? 'w-auto opacity-100 translate-x-0'
        : 'w-0 opacity-0 -translate-x-10'
      }`}
     >
      <h2 className='whitespace-nowrap text-primary-gold text-3xl text-shadow-md font-bold'>
       EMSys
      </h2>
     </div>
     {open ? (
      <RiMenuUnfold2Fill
       size={24}
       className={`cursor-pointer text-white `}
       onClick={() => setOpen(!open)}
      />
     ) : (
      <RiMenuFold2Fill
       size={24}
       className={`cursor-pointer  mx-auto text-white `}
       onClick={() => setOpen(!open)}
      />
     )}
    </div>
    {/* links */}
    <div className='mt-4 gap-4 flex flex-col relative text-white text-lg px-4'>
     {menus.map((menu, i) => (
      <NavLink
       to={menu.link}
       key={i}
       className={({ isActive }) =>
        `${
         isActive ? 'bg-primary-dark shadow-lg ' : ' hover:bg-primary-light'
        } group flex items-center gap-3.5 py-1.5 px-2 font-medium  rounded-md duration-300`
       }
       end={menu.end}
      >
       <div className='group-focus:translate-x-1 duration-300'>
        {React.createElement(menu.icon, { size: '24' })}
       </div>
       <h2
        style={{ transitionDelay: `${i + 2}00ms` }}
        className={`whitespace-pre duration-500 ${
         !open && 'opacity-0 translate-x-28 overflow-x-hidden'
        }`}
       >
        {menu.name}
       </h2>
       <h2
        className={`${
         open && 'hidden'
        } absolute left-48 bg-white font-semibold text-sm whitespace-pre text-secondary-dark rounded-md drop-shadow-lg px-0 py-0 w-0 
        group-hover:px-1.5 group-hover:py-1 group-hover:left-24 group-hover:duration-300 overflow-hidden group-hover:w-fit`}
       >
        {menu.name}
       </h2>
      </NavLink>
     ))}
    </div>
   </div>
  </div>
 );
};

export default AdminSidebar2;
