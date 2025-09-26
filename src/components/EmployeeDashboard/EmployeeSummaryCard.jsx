import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../../context/authContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import {
 CartesianGrid,
 Cell,
 Legend,
 Line,
 LineChart,
 Pie,
 PieChart,
 ResponsiveContainer,
 Tooltip,
 XAxis,
 YAxis,
} from 'recharts';
import { data } from 'react-router-dom';

const EmployeeSummaryCard = () => {
 const [remainingLeaveDays, setRemainingLeaveDays] = useState(0);
 const [totalLeaveDays, setTotalLeaveDays] = useState(0);
 const [usedLeaveDays, setUsedLeaveDays] = useState(0);
 const [salaries, setSalaries] = useState([]);
 const { user } = useAuth();

 const fetchLeaves = async () => {
  try {
   const token =
    localStorage.getItem('token') || sessionStorage.getItem('token');
   const response = await axios.get(
    `http://localhost:5000/api/employee/dashboard/summary/${user._id}`,
    {
     headers: { Authorization: `Bearer ${token}` },
    }
   );
   if (response.data.success) {
    setRemainingLeaveDays(response.data.remainingLeaveDays);
    setTotalLeaveDays(response.data.totalLeaveDays);
    setUsedLeaveDays(response.data.usedLeaveDays);

    const salaries = response.data.salaries
     .map((s) => ({
      month: new Date(s.pay_date).toLocaleString('default', {
       month: 'short',
       year: 'numeric',
      }),
      Net_Salary: s.net_salary,
     }))
     .reverse();

    setSalaries(salaries);
   }
  } catch (error) {
   if (error.response && !error.response.data.success) {
    toast.error(error.response.data.error);
   }
  }
 };

 useEffect(() => {
  fetchLeaves();
 }, []);

 const leaveData = [
  { name: 'Remaining', value: remainingLeaveDays },
  { name: 'Used', value: usedLeaveDays },
  { name: 'Total', value: totalLeaveDays },
 ];

 return (
  <div className='p-6 animate-slideUp  '>
   <div className='flex items-center bg-white/60 backdrop-blur-[1px] p-2 shadow-sm rounded-lg space-y-2 hover:shadow-lg  duration-300 animate-slideUp '>
    <div className={` flex justify-center items-center px-3  `}>
     <img
      src={
       user?.profileImage
        ? `http://localhost:5000/${user?.profileImage}`
        : '/3.avif'
      }
      className='rounded-full w-16 shadow-md '
     />
    </div>
    <div className='pl-4 py-1 text-md '>
     Welcome back
     <br />
     <span className='font-mono text-xl font-semibold'>{user.name}</span>
    </div>
   </div>
   {/* diagrams */}
   <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
    {/* leave details */}
    <div className='  bg-white/60 backdrop-blur-[1px] p-5 shadow-sm rounded-lg space-y-2 hover:shadow-lg  hover:-translate-y-2 duration-300 animate-slideUp'>
     <ResponsiveContainer width='100%' height={300}>
      <PieChart>
       <Pie
        data={leaveData}
        dataKey='value'
        cx='50%'
        cy='50%'
        outerRadius={80}
        innerRadius={65}
        label
       >
        <Cell fill='#16a34a' />
        <Cell fill='#dc2626' />
        <Cell fill='#1e40af' />
       </Pie>
       <Tooltip />
       <Legend />
      </PieChart>
     </ResponsiveContainer>
    </div>
    {/* salary deatials */}
    <div className=' bg-white/60 backdrop-blur-[1px] p-5 shadow-sm rounded-lg space-y-2 hover:shadow-lg hover:-translate-y-2  duration-300 animate-slideUp'>
     <ResponsiveContainer width='100%' height={300}>
      <LineChart data={salaries}>
       <CartesianGrid strokeDasharray='3 3' />
       <XAxis dataKey='month' className='text-xs' />
       <YAxis className='text-xs' />
       <Tooltip />
       <Legend />
       <Line
        type='monotone'
        dataKey='Net_Salary'
        stroke='#16a34a'
        strokeWidth={4}
        dot={{ r: 5 }}
        activeDot={{ r: 8 }}
       />
      </LineChart>
     </ResponsiveContainer>
    </div>
   </div>
  </div>
 );
};

export default EmployeeSummaryCard;
