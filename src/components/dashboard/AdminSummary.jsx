import React, { useEffect, useState } from 'react';
import SummaryCard from './SummaryCard';
import { FaBuilding, FaRegCalendarCheck, FaUsers } from 'react-icons/fa';
import { FaMoneyBill1Wave, FaRegCalendarXmark } from 'react-icons/fa6';
import { MdEditCalendar } from 'react-icons/md';
import { LuCalendarClock } from 'react-icons/lu';
import axios from 'axios';

const AdminSummary = () => {
 const [summary, setSummary] = useState(null);

 useEffect(() => {
  const fetchSummary = async () => {
   try {
    const summary = await axios.get(
     'http://localhost:5000/api/dashboard/summary',
     {
      headers: {
       Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
     }
    );
    setSummary(summary);
   } catch (error) {
    console.log(error);
   }
  };
 }, []);

 if (!summary) {
  return <div>Loading...</div>;
 }

 return (
  <div className='p-6'>
   <h3 className='text-2xl font-bold text-blue-800'>Dashboard</h3>

   {/*upper cards in dashboard */}
   <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-10'>
    <SummaryCard
     icon={<FaUsers />}
     text='Total Employees'
     number={13}
     iconColor='text-primaryDark'
     textColor='text-primaryText'
    />
    <SummaryCard
     icon={<FaBuilding />}
     text='Total Departments'
     number={5}
     iconColor='text-primaryDark'
     textColor='text-primaryText'
    />
    <SummaryCard
     icon={<FaMoneyBill1Wave />}
     text='Monthly Salary'
     number='Rs. 60,000'
     iconColor='text-primaryDark'
     textColor='text-primaryText'
    />
   </div>

   {/*lower cards in dashboard */}
   <div className='mt-12'>
    <h4 className=' text-2xl font-bold'>Leave Details</h4>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
     <SummaryCard
      icon={<MdEditCalendar />}
      text='Applied Leaves'
      number={2}
      iconColor='text-primaryDark'
      textColor='text-secondaryDark'
     />
     <SummaryCard
      icon={<FaRegCalendarCheck />}
      text='Approved Leaves'
      number={12}
      iconColor='text-primaryDark'
      textColor='text-secondaryDark'
     />
     <SummaryCard
      icon={<LuCalendarClock />}
      text='Pending Leaves'
      number={6}
      iconColor='text-primaryDark'
      textColor='text-secondaryDark'
     />
     <SummaryCard
      icon={<FaRegCalendarXmark />}
      text='Rejected Leaves'
      number={1}
      iconColor='text-primaryDark'
      textColor='text-secondaryDark'
     />
    </div>
   </div>
  </div>
 );
};

export default AdminSummary;
