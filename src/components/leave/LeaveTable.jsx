import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

const LeaveTable = () => {
 const fetchLeaves = async () => {
  try {
   const response = await axios.get('http://localhost:5000/api/leaves', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
   });
   if (response.data.success) {
    let sno = 1;
    const data = await response.data.leaves.map((leave) => ({
     _id: leave._id,
     sno: sno++,
    }));
   }
  } catch (error) {
   if (error.response && !error.response.data.success) {
    alert(error.response.data.error);
   }
  }
 };
 useEffect(() => {}, []);

 return (
  <div className='p-6'>
   <div className='text-center'>
    <h3 className='text-2xl font-bold'>Manage Leaves</h3>
   </div>
   <div className='flex justify-between items-center'>
    <input
     type='text'
     className='px-4 py-0.5 border'
     placeholder='Search by Name'
    />
    <div className='space-x-3'>
     <button className='px-2 py-1 bg-primaryDark text-white hover:bg-primaryLight rounded'>
      Pending
     </button>
     <button className='px-2 py-1 bg-primaryDark text-white hover:bg-primaryLight rounded'>
      Approved
     </button>
     <button className='px-2 py-1 bg-primaryDark text-white hover:bg-primaryLight rounded'>
      Rejected
     </button>
    </div>
   </div>
  </div>
 );
};

export default LeaveTable;
