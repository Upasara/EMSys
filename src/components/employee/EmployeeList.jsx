import React from 'react';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
 return (
  <div className='p-5'>
   <div className='text-center'>
    <h3 className='text-2xl font-bold text-blue-800'>Manage Employees</h3>
   </div>
   <div className='flex justify-between items-center'>
    <input
     type='text'
     placeholder='Search Department'
     className='px-4 py-0.5 border rounded-md'
    />
    <Link
     to='/admin-dashboard/add-employee'
     className='px-4 py-2 border-2 border-primaryDark rounded-md text-primaryText hover:text-white hover:bg-primaryDark'
    >
     Add New Employee
    </Link>
   </div>
  </div>
 );
};

export default EmployeeList;
