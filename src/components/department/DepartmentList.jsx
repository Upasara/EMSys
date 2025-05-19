import React from 'react';
import { Link } from 'react-router-dom';
const DepartmentList = () => {
 return (
  <div className='m-5'>
   <div className='text-center'>
    <h3 className='text-2xl font-bold text-blue-800'>Manage Department</h3>
   </div>
   <div className='flex justify-between items-center '>
    {/*search bar */}
    <input
     type='text'
     placeholder='Search Department'
     className='px-4 py-0.5 rounded-md'
    />
    {/*button */}
    <Link
     to='/admin-dashboard/add-department'
     className='border-solid border-2 border-primaryDark py-1 px-4 rounded-md text-primaryText hover:bg-primaryDark hover:text-white transition'
    >
     Add New Department
    </Link>
   </div>
  </div>
 );
};

export default DepartmentList;
