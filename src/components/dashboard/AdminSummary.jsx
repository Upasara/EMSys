import React, { useEffect, useState } from 'react';
import SummaryCard from './SummaryCard';
import { FaBuilding, FaRegCalendarCheck, FaUsers } from 'react-icons/fa';
import { FaMoneyBill1Wave, FaRegCalendarXmark } from 'react-icons/fa6';
import { MdEditCalendar } from 'react-icons/md';
import { LuCalendarClock } from 'react-icons/lu';
import axios from 'axios';
import { ThreeCircles } from 'react-loader-spinner';
import toast from 'react-hot-toast';

const AdminSummary = () => {
 const [summary, setSummary] = useState([]);
 const [loading, setLoading] = useState(false);

 useEffect(() => {
  const fetchSummary = async () => {
   setLoading(true);
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
    console.log(summary.data);
    setSummary(summary.data);
   } catch (error) {
    if (error.response) {
     toast.error(error.response.data.error);
    }
    console.log(error.message);
    setLoading(false);
   }
  };
  fetchSummary();
 }, []);

 //  if (!summary) {
 //   return (
 //    <div className='flex items-center justify-center bg-black/15 z-50 h-screen '>
 //     <div className='animate-pulse'>
 //      <ThreeCircles
 //       height='50' // Sets the height to 100 pixels
 //       width='50' // Sets the width to 100 pixels
 //       color='#4fa94d' // Example color
 //       outerCircleColor='#b98807'
 //       middleCircleColor='#b98807'
 //       innerCircleColor='#b98807'
 //       ariaLabel='three-circles-loading'
 //       wrapperStyle={{}}
 //       wrapperClass=''
 //       visible={true}
 //      />
 //     </div>
 //    </div>
 //   );
 //  }

 return (
  <>
   {loading ? (
    <div className='flex items-center justify-center bg-black/15 z-50 h-screen '>
     <div className='animate-pulse'>
      <ThreeCircles
       height='50'
       width='50'
       color='#4fa94d'
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
   ) : (
    <div className='p-6 '>
     <h3 className='text-2xl font-bold text-blue-800'>Dashboard</h3>

     {/*upper cards in dashboard */}
     <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-10'>
      <SummaryCard
       icon={<FaUsers />}
       text='Total Employees'
       number={summary.employeeCount}
       iconColor='text-primary-dark'
       textColor='text-primary-text'
      />
      <SummaryCard
       icon={<FaBuilding />}
       text='Total Departments'
       number={5}
       iconColor='text-primary-dark'
       textColor='text-primary-text'
      />
      <SummaryCard
       icon={<FaMoneyBill1Wave />}
       text='Monthly Salary'
       number='Rs. 60,000'
       iconColor='text-primary-dark'
       textColor='text-primary-text'
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
        iconColor='text-primary-dark'
        textColor='text-secondary-dark'
       />
       <SummaryCard
        icon={<FaRegCalendarCheck />}
        text='Approved Leaves'
        number={12}
        iconColor='text-primary-dark'
        textColor='text-secondary-dark'
       />
       <SummaryCard
        icon={<LuCalendarClock />}
        text='Pending Leaves'
        number={6}
        iconColor='text-primary-dark'
        textColor='text-secondary-dark'
       />
       <SummaryCard
        icon={<FaRegCalendarXmark />}
        text='Rejected Leaves'
        number={1}
        iconColor='text-primary-dark'
        textColor='text-secondary-dark'
       />
      </div>
     </div>
    </div>
   )}
  </>
 );
};

export default AdminSummary;
