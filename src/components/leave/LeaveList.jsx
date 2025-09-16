import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useAuth } from '../../context/authContext';
import toast from 'react-hot-toast';
import { ThreeCircles } from 'react-loader-spinner';

const LeaveList = () => {
 const [leaves, setLeaves] = useState(null);
 const [leaveLoading, setLeaveLoading] = useState(false);
 let sno = 1;
 const { user } = useAuth();
 const { id } = useParams();

 const fetchLeaves = async () => {
  setLeaveLoading(true);
  try {
   const token =
    localStorage.getItem('token') || sessionStorage.getItem('token');
   const response = await axios.get(
    `http://localhost:5000/api/leave/${id}/${user.role}`,
    {
     headers: {
      Authorization: `Bearer ${token}`,
     },
    }
   );
   console.log(response.data);
   if (response.data.success) {
    setLeaves(response.data.leaves);
   }
  } catch (error) {
   if (error.response && !error.response.data.success) {
    toast.error(error.response.data.error);
   }
  } finally {
   setLeaveLoading(false);
  }
 };

 useEffect(() => {
  fetchLeaves();
 }, []);

 return (
  <>
   {leaveLoading ? (
    //loading spinner
    <div className='flex items-center justify-center bg-black/15 z-50  h-screen'>
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
    <div className='p-5'>
     <div className='text-center'>
      <h2 className='text-2xl font-semibold text-blue-800 text-shadow-2xs '>
       Manage Leaves
      </h2>
     </div>
     <div className='flex justify-between items-center mt-5'>
      <input
       type='text'
       className='px-4 py-0.5  rounded-md border-2 focus:outline-primary-dark focus:outline-1 focus:bg-white duration-300'
       placeholder='Search by leave type  🔍'
      />
      {user.role === 'employee' && (
       <Link
        to='/employee-dashboard/add-leave'
        className='px-2 py-1 border-2 border-primary-light rounded-md text-primary-text hover:text-white hover:text-shadow-sm hover:shadow-md hover:bg-primary-light transition duration-300 text-center '
       >
        <span className='hidden md:block lg:block'>Add Leave</span>
        <span className='block md:hidden lg:hidden'>Add</span>
       </Link>
      )}
     </div>
     {leaves ? (
      <div className='overflow-x-auto mt-5 shadow-md rounded-lg'>
       <table className='w-full text-center '>
        <thead className='text-[15px] text-primary-text   bg-white border border-gray-200'>
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
        <tbody className='font-medium text-[14px] text-primary-text'>
         {leaves.map((leave) => (
          <tr key={leave._id} className='bg-white border-b '>
           <td className='px-6 py-3'>{sno++}</td>
           <td className='px-6 py-3'>{leave.leave_type}</td>
           <td className='px-6 py-3'>
            {new Date(leave.start_date).toLocaleDateString()}
           </td>
           <td className='px-6 py-3'>
            {leave.end_date
             ? new Date(leave.end_date).toLocaleDateString()
             : 'N/A'}
           </td>
           <td className='px-6 py-3'>{leave.days}</td>
           <td className='px-6 py-3'>
            {leave.description ? leave.description : 'N/A'}
           </td>
           <td className='px-6 py-3'>
            <span
             className={`${
              leave.status === 'Approved'
               ? 'px-1 bg-green-100 text-green-800 rounded-md'
               : leave.status === 'Rejected'
               ? 'px-1 bg-red-100 text-red-800 rounded-md'
               : 'px-1 bg-yellow-100 text-yellow-800 rounded-md'
             }`}
            >
             {leave.status}
            </span>
           </td>
          </tr>
         ))}
        </tbody>
       </table>
      </div>
     ) : (
      <div className='bg-white p-5 mt-10 shadow-md rounded-lg'>No Records</div>
     )}
    </div>
   )}
  </>
 );
};

export default LeaveList;
