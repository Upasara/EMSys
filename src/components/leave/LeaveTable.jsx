import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { columns, LeaveButton } from '../../utils/LeaveHelper';
import DataTable from 'react-data-table-component';
import { BsClockFill } from 'react-icons/bs';
import { FaCheck } from 'react-icons/fa';
import { CgClose } from 'react-icons/cg';

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
    <div className='p-5'>
     <div className='text-center'>
      <h3 className='text-2xl font-semibold text-blue-800 text-shadow-2xs '>
       Manage Leaves
      </h3>
     </div>
     <div className='block md:flex lg:flex  justify-between items-center gap-4 mt-5 space-y-2'>
      <input
       type='text'
       className='px-4 py-0.5  rounded-md border-2 focus:outline-primary-dark focus:outline-1 focus:bg-white duration-300'
       placeholder='Search by name  🔍'
       onChange={handleSearch}
      />
      <div className='flex items-center gap-3 '>
       <button
        className='group px-2 py-1  border-2 border-primary-light rounded-md text-primary-dark hover:text-white hover:text-shadow-sm hover:shadow-md hover:bg-primary-light  transition-all duration-300 text-center'
        onClick={() => handleButton('Pending')}
       >
        <div className='flex items-center gap-1 '>
         <BsClockFill className='group-hover:-translate-x-0.5 duration-300' />
         Pending
        </div>
       </button>
       <button
        className=' group px-2 py-1 border-2 border-green-700 rounded-md text-green-700 hover:text-white hover:text-shadow-sm hover:shadow-md hover:bg-green-700  transition-all duration-300 text-center'
        onClick={() => handleButton('Approved')}
       >
        <div className='flex items-center gap-1 '>
         <FaCheck className='group-hover:-translate-x-0.5 duration-300' />
         Approved
        </div>
       </button>
       <button
        className='group px-2 py-1 border-2 border-red-700 rounded-md text-red-700 hover:text-white hover:text-shadow-sm hover:shadow-md hover:bg-red-700  transition-all duration-300 text-center'
        onClick={() => handleButton('Rejected')}
       >
        <div className='flex items-center gap-1 '>
         <CgClose className='group-hover:-translate-x-0.5 duration-300' />
         Rejected
        </div>
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
