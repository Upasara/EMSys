import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../../context/authContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EmployeeSummaryCard = () => {
 const [leaves, setLeaves] = useState([]);
 const { user } = useAuth();
 const { id } = useParams();

 const fetchLeaves = async () => {
  try {
   const token =
    localStorage.getItem('token') || sessionStorage.getItem('token');
  } catch (error) {
   if (error.response && !error.response.data.success) {
    toast.error(error.response.data.error);
   }
  }
 };

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
    </div>
    {leaves}
   </div>
  </div>
 );
};

export default EmployeeSummaryCard;
