import React from 'react';
import SummaryCard from './SummaryCard';
import { FaBuilding, FaUsers } from 'react-icons/fa';

const AdminSummary = () => {
 return (
  <div className='p-6'>
   <h3 className='text-2xl font-bold'>Dashboard</h3>
   <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-10'>
    <SummaryCard
     icon={<FaUsers />}
     text='Total Employees'
     number={13}
     color='bg-primaryDark'
    />
    <SummaryCard
     icon={<FaBuilding />}
     text='Total Departments'
     number={5}
     color='bg-primaryDark'
    />
   </div>
  </div>
 );
};

export default AdminSummary;
