import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { CgClose } from 'react-icons/cg';
import { FaCheck } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

const LeaveDetails = () => {
 const { id } = useParams();
 const [leaveDetails, setLeaveDetails] = useState(null);

 const navigate = useNavigate();

 useEffect(() => {
  const fetchLeaveDetails = async () => {
   try {
    const token =
     localStorage.getItem('token') || sessionStorage.getItem('token');
    const response = await axios.get(
     `http://localhost:5000/api/leave/detail/${id}`,
     {
      headers: {
       Authorization: `Bearer ${token}`,
      },
     }
    );
    if (response.data.success) {
     setLeaveDetails(response.data.leaveDetails);
    }
   } catch (error) {
    if (error.response && !error.response.data.success) {
     toast.error(error.response.data.error);
    }
   }
  };
  fetchLeaveDetails();
 }, []);

 const changeStatus = async (id, status) => {
  try {
   const token =
    localStorage.getItem('token') || sessionStorage.getItem('token');
   const response = await axios.put(
    `http://localhost:5000/api/leave/${id}`,
    { status },
    {
     headers: {
      Authorization: `Bearer ${token}`,
     },
    }
   );
   if (response.data.success) {
    navigate('/admin-dashboard/leaves');
   }
  } catch (error) {
   if (error.response && !error.response.data.success) {
    alert(error.response.data.error);
   }
  }
 };

 return (
  <>
   {leaveDetails ? (
    <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
     <h2 className='text-2xl font-bold mb-8 text-center'>Leave Details</h2>
     <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
      <div className='flex justify-center items-start '>
       <img
        src={`http://localhost:5000/${leaveDetails.employeeId.userId.profileImage}`}
        className='rounded-full border w-64 hover:-translate-y-2 hover:shadow-lg drop-shadow-sm duration-300'
       />
      </div>
      <div>
       <div className='flex space-x-3 mb-5'>
        <p className='text-gray-600 font-mono font-semibold'>
         Employee Name :{' '}
        </p>
        <p className='font-bold text-primary-text font-sans '>
         {leaveDetails.employeeId.userId.name}
        </p>
       </div>
       <div className='flex space-x-3 mb-5'>
        <p className='text-gray-600 font-mono font-semibold'>Employee ID : </p>
        <p className='font-bold text-primary-text font-sans '>
         {leaveDetails.employeeId.emp_id}
        </p>
       </div>
       <div className='flex space-x-3 mb-5'>
        <p className='text-gray-600 font-mono font-semibold'>Department : </p>
        <p className='font-bold text-primary-text font-sans '>
         {leaveDetails.employeeId.emp_dep
          ? leaveDetails.employeeId.emp_dep.dep_name
          : 'N/A'}
        </p>
       </div>
       <div className='flex space-x-3 mb-5'>
        <p className='text-gray-600 font-mono font-semibold'>Leave Type : </p>
        <p className='font-bold text-primary-text font-sans '>
         {leaveDetails.leave_type}
        </p>
       </div>
       <div className='flex space-x-3 mb-5'>
        <p className='text-gray-600 font-mono font-semibold'>Start Date : </p>
        <p className='font-bold text-primary-text font-sans '>
         {new Date(leaveDetails.start_date).toLocaleDateString()}
        </p>
       </div>
       <div className='flex space-x-3 mb-5'>
        <p className='text-gray-600 font-mono font-semibold'>End Date : </p>
        <p className='font-bold text-primary-text font-sans '>
         {leaveDetails.end_date
          ? new Date(leaveDetails.end_date).toLocaleDateString()
          : 'N/A'}
        </p>
       </div>
       <div className='flex space-x-3 mb-5'>
        <p className='text-gray-600 font-mono font-semibold'>Days : </p>
        <p className='font-bold text-primary-text font-sans '>
         {leaveDetails.days}
        </p>
       </div>
       <div className='flex space-x-3 mb-5'>
        <p className='text-gray-600 font-mono font-semibold'>Description : </p>
        <p className='font-bold text-primary-text font-sans '>
         {leaveDetails.description}
        </p>
       </div>
       <div className='flex space-x-3 mb-5'>
        <p className='text-gray-600 font-mono font-semibold'>
         {leaveDetails.status === 'Pending' ? 'Action :' : 'Status :'}{' '}
        </p>
        {leaveDetails.status === 'Pending' ? (
         <div className='flex space-x-3'>
          <button
           className='group px-2 py-0 font-medium text-sm border-2 rounded-md text-green-700 hover:text-white hover:text-shadow-sm hover:shadow-md hover:bg-green-700 border-green-700 transition-all duration-300 text-center'
           onClick={() => changeStatus(leaveDetails._id, 'Approved')}
          >
           <div className='flex items-center gap-1 '>
            <FaCheck className='group-hover:-translate-x-0.5 duration-300' />
            Approve
           </div>
          </button>
          <button
           className='group px-2 py-0 font-medium border-2 rounded-md text-red-700 hover:text-white hover:text-shadow-sm hover:shadow-md hover:bg-red-700 border-red-700 transition-all duration-300 text-center'
           onClick={() => changeStatus(leaveDetails._id, 'Rejected')}
          >
           <div className='flex items-center gap-0.5 '>
            <CgClose className='group-hover:-translate-x-0.5 duration-300' />
            Reject
           </div>
          </button>
         </div>
        ) : (
         <p
          className={`font-bold  font-sans ${
           leaveDetails.status === 'Approved'
            ? 'text-green-600'
            : 'text-red-600'
          }`}
         >
          {leaveDetails.status}
         </p>
        )}
       </div>
      </div>
     </div>
    </div>
   ) : (
    <div>Loading ....</div>
   )}
  </>
 );
};

export default LeaveDetails;
