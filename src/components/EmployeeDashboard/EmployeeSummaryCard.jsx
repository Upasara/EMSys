import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../../context/authContext';
import SummaryCard from '../dashboard/SummaryCard';

const EmployeeSummaryCard = () => {
 const { user } = useAuth();
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
    </div>
   </div>
  </div>
 );
};

export default EmployeeSummaryCard;
