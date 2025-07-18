import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import axios from 'axios';
import { useState } from 'react';

const LeaveList = () => {
 const { user } = useAuth();

 const [leaves, setLeaves] = useState([]);

 let sno = 1;

 const fetchLeaves = async () => {
  try {
   const response = await axios.get(
    `http://localhost:5000/api/leave/${user._id}`,
    {
     headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
     },
    }
   );
   if (response.data.success) {
    setLeaves(response.data.leaves);
   }
  } catch (error) {
   if (error.response && !error.response.data.success) {
    alert(error.message);
   }
  }
 };

 useEffect(() => {
  fetchLeaves();
 }, []);
 return (
  <div className='p-6'>
   <div className='text-center'>
    <h2 className='text-2xl font-bold'>Manage Leaves</h2>
   </div>
   <div className='flex justify-between items-center'>
    <input
     type='text'
     className='px-4 py-0.5 border'
     placeholder='Search by leave type'
    />
    <Link
     to='/employee-dashboard/add-leave'
     className='px-4 py-2 border-2 border-primaryDark rounded-md text-primaryText hover:text-white hover:bg-primaryDark'
    >
     Add New Leave
    </Link>
   </div>
   <table className='w-full text-sm text-gray-500 text-center'>
    <thead className='text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200'>
     <tr>
      <th className='px-6 py-3'>SNO</th>
      <th className='px-6 py-3'>Type</th>
      <th className='px-6 py-3'>From</th>
      <th className='px-6 py-3'>To</th>
      <th className='px-6 py-3'>Days</th>
      <th className='px-6 py-3'>Description</th>
      <th className='px-6 py-3'>Status</th>
     </tr>
    </thead>
    <tbody className='font-medium'>
     {leaves.map((leave) => (
      <tr key={leave._id} className='bg-white border-b '>
       <td className='px-6 py-3'>{sno++}</td>
       <td className='px-6 py-3'>{leave.leave_type}</td>
       <td className='px-6 py-3'>
        {new Date(leave.start_date).toLocaleDateString()}
       </td>
       <td className='px-6 py-3'>
        {leave.end_date ? new Date(leave.end_date).toLocaleDateString() : 'N/A'}
       </td>
       <td className='px-6 py-3'>{leave.days}</td>
       <td className='px-6 py-3'>{leave.description}</td>
       <td className='px-6 py-3'>{leave.status}</td>
      </tr>
     ))}
    </tbody>
   </table>
  </div>
 );
};

export default LeaveList;
