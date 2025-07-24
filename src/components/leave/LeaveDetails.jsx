import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const LeaveDetails = () => {
 const { id } = useParams();
 const [leaveDetails, setLeaveDetails] = useState(null);

 useEffect(() => {
  const fetchLeaveDetails = async () => {
   try {
    const response = await axios.get(
     `http://localhost:5000/api/leave/detail/${id}`,
     {
      headers: {
       Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
     }
    );
    if (response.data.success) {
     setLeaveDetails(response.data.leaveDetails);
    }
   } catch (error) {
    if (error.response && !error.response.data.success) {
     alert(error.response.data.error);
    }
   }
  };
  fetchLeaveDetails();
 }, []);
 return (
  <>
   {leaveDetails ? (
    <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
     <h2 className='text-2xl font-bold mb-8 text-center'>Leave Details</h2>
     <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
      <div>
       <img
        src={`http://localhost:5000/${leaveDetails.employeeId.userId.profileImage}`}
        className='rounded-full border w-72'
       />
      </div>
      <div>
       <div className='flex space-x-3 mb-5'>
        <p className='text-lg font-bold'>Employee Name : </p>
        <p className='font-medium'>{leaveDetails.employeeId.userId.name}</p>
       </div>
       <div className='flex space-x-3 mb-5'>
        <p className='text-lg font-bold'>Employee ID : </p>
        <p className='font-medium'>{leaveDetails.employeeId.emp_id}</p>
       </div>
       <div className='flex space-x-3 mb-5'>
        <p className='text-lg font-bold'>Department : </p>
        <p className='font-medium'>
         {leaveDetails.employeeId.emp_dep.dep_name}
        </p>
       </div>
       <div className='flex space-x-3 mb-5'>
        <p className='text-lg font-bold'>Leave Type : </p>
        <p className='font-medium'>{leaveDetails.leave_type}</p>
       </div>
       <div className='flex space-x-3 mb-5'>
        <p className='text-lg font-bold'>Start Date : </p>
        <p className='font-medium'>
         {new Date(leaveDetails.start_date).toLocaleDateString()}
        </p>
       </div>
       <div className='flex space-x-3 mb-5'>
        <p className='text-lg font-bold'>End Date : </p>
        <p className='font-medium'>
         {leaveDetails.end_date
          ? new Date(leaveDetails.end_date).toLocaleDateString()
          : 'N/A'}
        </p>
       </div>
       <div className='flex space-x-3 mb-5'>
        <p className='text-lg font-bold'>Days : </p>
        <p className='font-medium'>{leaveDetails.days}</p>
       </div>
       <div className='flex space-x-3 mb-5'>
        <p className='text-lg font-bold'>Description : </p>
        <p className='font-medium'>{leaveDetails.description}</p>
       </div>
       <div className='flex space-x-3 mb-5'>
        <p className='text-lg font-bold'>
         {leaveDetails.status === 'Pending' ? 'Action :' : 'Status :'}{' '}
        </p>
        {leaveDetails.status === 'Pending' ? (
         <div>
          <button>Approve</button>
          <button>Reject</button>
         </div>
        ) : (
         <p>{leaveDetails.status}</p>
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
