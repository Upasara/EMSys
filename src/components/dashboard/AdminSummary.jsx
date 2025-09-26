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
import {
 PieChart,
 Pie,
 Cell,
 ResponsiveContainer,
 BarChart,
 Bar,
 XAxis,
 YAxis,
 CartesianGrid,
 Tooltip,
 Legend,
} from 'recharts';

const AdminSummary = () => {
 const [summary, setSummary] = useState([]);
 const [salarySummary, setSalarySummary] = useState([]);
 const [selectedMonth, setSelectedMonth] = useState('');

 const token = localStorage.getItem('token') || sessionStorage.getItem('token');

 const fetchSummary = async () => {
  try {
   const summary = await axios.get(
    'http://localhost:5000/api/dashboard/summary',
    { headers: { Authorization: `Bearer ${token}` } }
   );
   setSummary(summary.data);
  } catch (error) {
   if (error.response) {
    toast.error(error.response.data.error);
   }
  }
 };

 const fetchSalarySummary = async (month) => {
  try {
   const salarySummary = await axios.post(
    'http://localhost:5000/api/dashboard/summary/month',
    { month },
    { headers: { Authorization: `Bearer ${token}` } }
   );
   setSalarySummary(salarySummary.data);
  } catch (error) {
   if (error.response) {
    toast.error(error.response.data.error);
   }
  }
 };
 useEffect(() => {
  fetchSummary();
 }, []);

 useEffect(() => {
  const currentMonth = new Date().toISOString().slice(0, 7);
  setSelectedMonth(currentMonth);
  fetchSalarySummary(currentMonth);
 }, []);

 const handleChangeMonth = (e) => {
  const month = e.target.value;
  setSelectedMonth(month);
  fetchSalarySummary(month);
 };

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

 const employeeData = [
  { name: 'Active', value: summary.activeEmployees },
  { name: 'Inactive', value: summary.inactiveEmployees },
 ];

 const salaryData = [
  { name: 'Net Salary', amount: salarySummary.totalNetSalary },
  { name: 'Gross Salary', amount: salarySummary.totalGrossSalary },
 ];

 const leaveData = [
  { name: 'Approved', value: summary.leaveSummary?.approved },
  { name: 'Pending', value: summary.leaveSummary?.pending },
  { name: 'Rejected', value: summary.leaveSummary?.rejected },
 ];

 return (
  <div className='p-6 '>
   <h3 className='text-3xl text-blue-800  text-center mt-2 text-shadow-2xs font-semibold'>
    Dashboard
   </h3>

   {/*upper cards in dashboard */}
   <div className='grid grid-cols-1 md:grid-cols-2  gap-4 mt-10'>
    {/* employee card */}
    <div
     className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 bg-white/60 backdrop-blur-[1px]  p-5 shadow-sm rounded-lg   border border-transparent 
    hover:shadow-lg  hover:border hover:border-primary-dark duration-300 animate-slideUp'
    >
     <div className='space-y-1 order-2 md:order-1'>
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
     <div className='p-5 h-48 md:h-full lg:h-full order-1 md:order-2'>
      <ResponsiveContainer width='100%' height='100%'>
       <PieChart>
        <Pie
         data={employeeData}
         cx='50%'
         cy='50%'
         outerRadius={60}
         innerRadius={45}
         fill='black'
         dataKey='value'
         label
        >
         <Cell fill='#16a34a' />
         <Cell fill='#dc2626' />
        </Pie>
        <Tooltip />
       </PieChart>
      </ResponsiveContainer>
     </div>
    </div>

    {/* salary card */}
    <div
     className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2  bg-white/60 backdrop-blur-[1px] p-5 shadow-sm rounded-lg  border border-transparent  
    hover:shadow-lg hover:border hover:border-primary-dark duration-300 animate-slideUp '
    >
     <div className='space-y-1 order-2 md:order-1'>
      <p className='mb-2 font-mono text-primary-text text-lg'>Salary</p>
      <div className='mt-5 flex cursor-pointer'>
       <input
        type='month'
        value={selectedMonth}
        onChange={handleChangeMonth}
        className='border px-1 rounded-md text-sm outline-none cursor-pointer text-gray-500 '
       />
      </div>
      {/* net salary */}
      <SummaryCard
       icon={<MdOutlineAttachMoney />}
       text='Monthly Net Salary'
       number={`Rs.${salarySummary.totalNetSalary} `}
       iconColor='text-green-700'
       textColor='text-secondary-dark'
      />
      {/* grooss salary */}
      <SummaryCard
       icon={<MdOutlineAttachMoney />}
       text='Monthly Gross Salary'
       number={`Rs.${salarySummary.totalGrossSalary}`}
       iconColor='text-green-700'
       textColor='text-secondary-dark'
      />
     </div>
     <div className='p-5 h-48 md:h-full lg:h-full order-1 md:order-2'>
      <ResponsiveContainer width='100%' height='100%'>
       <BarChart data={salaryData}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' className='text-xs' />
        <YAxis className='text-xs' />
        <Tooltip />

        <Bar dataKey='amount' fill='#16a34a' />
       </BarChart>
      </ResponsiveContainer>
     </div>
    </div>
    {/* leave card */}
    <div
     className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2  bg-white/60 backdrop-blur-[1px] p-5 shadow-sm rounded-lg space-y-2  border border-transparent
    hover:shadow-lg  hover:border hover:border-primary-dark duration-300 animate-slideUp'
    >
     <div className='space-y-1 order-2 md:order-1'>
      <p className='mb-2 font-mono text-primary-text text-lg'>Leave</p>

      {/* applied leaves */}
      <SummaryCard
       icon={<LuCalendarDays />}
       text='Total Leaves'
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
     <div className='p-5 h-52 md:h-full lg:h-full order-1 md:order-2'>
      <ResponsiveContainer width='100%' height='100%'>
       <PieChart>
        <Pie
         data={leaveData}
         cx='50%'
         cy='50%'
         outerRadius={60}
         innerRadius={45}
         dataKey='value'
         label
        >
         <Cell fill='#16a34a' />
         <Cell fill='#b98807' />
         <Cell fill='#dc2626' />
        </Pie>
        <Tooltip />
       </PieChart>
      </ResponsiveContainer>
     </div>
    </div>
    {/* department card */}
    <div
     className='bg-white/60 backdrop-blur-[1px] p-5 shadow-sm rounded-lg space-y-2 border border-transparent  
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
   </div>
  </div>
 );
};

export default AdminSummary;
