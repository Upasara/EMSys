import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../../context/authContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import {
 CartesianGrid,
 Line,
 LineChart,
 ResponsiveContainer,
 Tooltip,
 XAxis,
 YAxis,
} from 'recharts';

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
      netSalary: s.net_salary,
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

 return (
  <div className='p-6 animate-slideDown'>
   <div className='rounded-md flex bg-white shadow-md border border-primary-light '>
    <div
     className={`text-3xl flex justify-center items-center px-3 bg-primary-dark text-white `}
    >
     <FaUserCircle />
    </div>
    <div className={`pl-4 py-1 `}>
     <p className='text-md'>Welcome Back</p>
     <p className='text-lg font-semibold'>{user.name}</p>
     {user._id}
     remainingLeaveDays - {remainingLeaveDays}
     totalLeaveDays - {totalLeaveDays}
     usedLeaveDays - {usedLeaveDays}
    </div>
   </div>
   {/* diagrams */}
   <div>
    {/* leave details */}
    <div className='p-10 bg-amber-200'>
     <ResponsiveContainer>
      <LineChart data={salaries}>
       <CartesianGrid strokeDasharray='3 3' />
       <XAxis dataKey='month' />
       <YAxis />
       <Tooltip />
       <Line
        type='monotone'
        dataKey='netSalary'
        stroke='#000000'
        strokeWidth={3}
        dot={{ r: 5 }}
        activeDot={{ r: 8 }}
       />
      </LineChart>
     </ResponsiveContainer>
    </div>
    {/* salary deatials */}
    <div></div>
   </div>
   {salaries}
  </div>
 );
};

export default EmployeeSummaryCard;
