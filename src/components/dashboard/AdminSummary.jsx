import React, { useEffect, useState } from 'react';
import SummaryCard from './SummaryCard';
import axios from 'axios';
import { ThreeCircles } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { FaUserFriends, FaUserCheck, FaUserTimes } from 'react-icons/fa';
import { PiBuildingsFill } from 'react-icons/pi';
import { MdOutlineAttachMoney } from 'react-icons/md';
import {
 LuCalendarDays,
 LuCalendarCheck2,
 LuCalendarX2,
 LuCalendarClock,
} from 'react-icons/lu';

const AdminSummary = () => {
 const [summary, setSummary] = useState([]);

 useEffect(() => {
  const fetchSummary = async () => {
   try {
    const token =
     localStorage.getItem('token') || sessionStorage.getItem('token');
    const summary = await axios.get(
     'http://localhost:5000/api/dashboard/summary',

     {
      headers: {
       Authorization: `Bearer ${token}`,
      },
     }
    );
    setSummary(summary.data);
   } catch (error) {
    if (error.response) {
     toast.error(error.response.data.error);
    }
   }
  };
  fetchSummary();
 }, []);

 if (!summary) {
  return (
   <div className='flex items-center justify-center bg-black/15 z-50 h-screen '>
    <div className='animate-pulse'>
     <ThreeCircles
      height='50' // Sets the height to 100 pixels
      width='50' // Sets the width to 100 pixels
      color='#4fa94d' // Example color
      outerCircleColor='#b98807'
      middleCircleColor='#b98807'
      innerCircleColor='#b98807'
      ariaLabel='three-circles-loading'
      wrapperStyle={{}}
      wrapperClass=''
      visible={true}
     />
    </div>
   </div>
  );
 }

 return (
  <div className='p-6 '>
   <h3 className='text-3xl text-blue-800  text-center mt-2 text-shadow-2xs font-semibold'>
    Dashboard
   </h3>

   {/*upper cards in dashboard */}
   <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-10'>
    <div
     className='bg-white/50 backdrop-blur-[1px]  p-5 shadow-sm rounded-lg space-y-2  border border-transparent 
    hover:shadow-lg  hover:border hover:border-primary-dark duration-300 animate-slideUp'
    >
     <p className='mb-2 font-mono text-primary-text text-lg'>Employee</p>
     {/* total employees */}
     <SummaryCard
      icon={<FaUserFriends />}
      text='Total Employees'
      number={summary.totalEmployees}
      iconColor='text-blue-800'
      textColor='text-secondary-dark'
     />
     {/* active employees */}
     <SummaryCard
      icon={<FaUserCheck />}
      text='Active Employees'
      number={summary.activeEmployees}
      iconColor='text-green-700'
      textColor='text-secondary-dark'
     />
     {/* inactive employees */}
     <SummaryCard
      icon={<FaUserTimes />}
      text='Inactive Employees'
      number={summary.inactiveEmployees}
      iconColor='text-red-600'
      textColor='text-secondary-dark'
     />
    </div>
    <div
     className='bg-white/50 backdrop-blur-[1px] p-5 shadow-sm rounded-lg space-y-2 border border-transparent  
    hover:shadow-lg hover:border hover:border-primary-dark duration-300 animate-slideUp'
    >
     <p className='mb-2 font-mono text-primary-text text-lg'>Department</p>
     {/* departments */}
     <SummaryCard
      icon={<PiBuildingsFill />}
      text='Total Deparments'
      number={summary.totalEmployees}
      iconColor='text-blue-800'
      textColor='text-secondary-dark'
     />
    </div>
    <div
     className='bg-white/50 backdrop-blur-[1px] p-5 shadow-sm rounded-lg space-y-2 border border-transparent  
    hover:shadow-lg hover:border hover:border-primary-dark duration-300 animate-slideUp '
    >
     <p className='mb-2 font-mono text-primary-text text-lg'>Salary</p>
     {/* net salary */}
     <SummaryCard
      icon={<MdOutlineAttachMoney />}
      text='Monthly Net Salary'
      number={`Rs.${summary.totalNetSalary}`}
      iconColor='text-green-700'
      textColor='text-secondary-dark'
     />
     {/* grooss salary */}
     <SummaryCard
      icon={<MdOutlineAttachMoney />}
      text='Monthly Gross Salary'
      number={`Rs.${summary.totalGrossSalary}`}
      iconColor='text-green-700'
      textColor='text-secondary-dark'
     />
    </div>
   </div>

   {/*lower cards in dashboard */}
   <div
    className='mt-8 bg-white/50 backdrop-blur-[1px] p-5 shadow-sm rounded-lg space-y-2  border border-transparent
    hover:shadow-lg  hover:border hover:border-primary-dark duration-300 animate-slideUp'
   >
    <p className='mb-2 font-mono text-primary-text text-lg'>Leave</p>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
     {/* applied leaves */}
     <SummaryCard
      icon={<LuCalendarDays />}
      text='Applied Leaves'
      number={summary.leaveSummary?.appliedFor}
      iconColor='text-blue-800'
      textColor='text-secondary-dark'
     />
     {/* approved leaves */}
     <SummaryCard
      icon={<LuCalendarCheck2 />}
      text='Approved Leaves'
      number={summary.leaveSummary?.approved}
      iconColor='text-green-700'
      textColor='text-secondary-dark'
     />
     {/* pending leaves */}
     <SummaryCard
      icon={<LuCalendarClock />}
      text='Pending Leaves'
      number={summary.leaveSummary?.pending}
      iconColor='text-primary-dark'
      textColor='text-secondary-dark'
     />
     {/* rejected leaves */}
     <SummaryCard
      icon={<LuCalendarX2 />}
      text='Rejected Leaves'
      number={summary.leaveSummary?.rejected}
      iconColor='text-red-600'
      textColor='text-secondary-dark'
     />
    </div>
   </div>
  </div>
 );
};

export default AdminSummary;
