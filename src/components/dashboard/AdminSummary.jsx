import React from 'react';
import SummaryCard from './SummaryCard';
import { FaUsers } from 'react-icons/fa';

const AdminSummary = () => {
 return (
  <div>
   <h3>Dashboard</h3>
   <div>
    <SummaryCard icon={<FaUsers />} text='Total Employees' number={13} />
   </div>
  </div>
 );
};

export default AdminSummary;
