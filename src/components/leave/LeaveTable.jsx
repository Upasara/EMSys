import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { columns, LeaveButton } from '../../utils/LeaveHelper';
import DataTable from 'react-data-table-component';
import { data } from 'react-router-dom';

const LeaveTable = () => {
 const [leaves, setLeaves] = useState(null);
 const [filteredLeaves, setFilteredLeaves] = useState(null);

 const fetchLeaves = async () => {
  try {
   const token =
    localStorage.getItem('token') || sessionStorage.getItem('token');
   const response = await axios.get('http://localhost:5000/api/leave', {
    headers: {
     Authorization: `Bearer ${token}`,
    },
   });

   if (response.data.success) {
    let sno = 1;
    const data = await response.data.leaves.map((leave) => ({
     _id: leave._id,
     sno: sno++,
     employeeId: leave.employeeId.emp_id,
     name: leave.employeeId.userId.name,
     dep_name: leave.employeeId.emp_dep
      ? leave.employeeId.emp_dep.dep_name
      : 'N/A',
     leave_type: leave.leave_type,
     days: leave.days,
     status: leave.status,
     actions: <LeaveButton Id={leave._id} />,
    }));
    setLeaves(data);
    setFilteredLeaves(data);
   }
  } catch (error) {
   if (error.response && !error.response.data.success) {
    alert(error.response.data.error);
   }
  }
 };
 useEffect(() => {
  fetchLeaves();
 }, []);

 //handles search bar
 const handleSearch = (e) => {
  const data = leaves.filter((leave) =>
   leave.name.toLowerCase().includes(e.target.value.toLowerCase())
  );
  setFilteredLeaves(data);
 };

 //handles button click for filtering leaves
 const handleButton = (status) => {
  const data = leaves.filter((leave) => leave.status === status);
  setFilteredLeaves(data);
 };

 return (
  <>
   {filteredLeaves ? (
    <div className='p-6'>
     <div className='text-center'>
      <h3 className='text-2xl font-bold'>Manage Leaves</h3>
     </div>
     <div className='flex justify-between items-center'>
      <input
       type='text'
       className='px-4 py-0.5 border'
       placeholder='Search by Name'
       onChange={handleSearch}
      />
      <div className='space-x-3'>
       <button
        className='px-2 py-1 bg-primary-dark text-white hover:bg-primary-light rounded-sm'
        onClick={() => handleButton('Pending')}
       >
        Pending
       </button>
       <button
        className='px-2 py-1 bg-primary-dark text-white hover:bg-primary-light rounded-sm'
        onClick={() => handleButton('Approved')}
       >
        Approved
       </button>
       <button
        className='px-2 py-1 bg-primary-dark text-white hover:bg-primary-light rounded-sm'
        onClick={() => handleButton('Rejected')}
       >
        Rejected
       </button>
      </div>
     </div>
     <div className='mt-5'>
      <DataTable columns={columns} data={filteredLeaves} pagination />
     </div>
    </div>
   ) : (
    <div>Loading...</div>
   )}
  </>
 );
};

export default LeaveTable;
