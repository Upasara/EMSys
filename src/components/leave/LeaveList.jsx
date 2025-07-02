import React from 'react';
import { Link } from 'react-router-dom';

const LeaveList = () => {
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
  </div>
 );
};

export default LeaveList;
