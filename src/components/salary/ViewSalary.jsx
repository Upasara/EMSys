import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const ViewSalary = () => {
 const [salaries, setSalaries] = useState([]);
 const [filteredSalaries, setFilteredSalaries] = useState([]);

 const [sortOrder, setSortOrder] = useState('asc'); // State to manage sort order

 const { id } = useParams();
 let sno = 1;

 const fetchSalaries = async () => {
  try {
   const response = await axios.get(`http://localhost:5000/api/salary/${id}`, {
    headers: {
     Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
   });
   console.log(response.data);
   if (response.data.success) {
    setSalaries(response.data.salary);
    setFilteredSalaries(response.data.salary);
   }
  } catch (error) {
   if (error.response && !error.response.data.success) {
    alert(error.message);
   }
  }
 };

 useEffect(() => {
  fetchSalaries();
 }, []);

 const filterSalaries = (q) => {
  const filteredRecords = salaries.filter((leave) =>
   leave.pay_date.toLocaleLowerCase().includes(q.toLocaleLowerCase())
  );
  setFilteredSalaries(filteredRecords);
 };

 const toggleSortOrder = () => {
  setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
 };
 return (
  <>
   {filteredSalaries === null ? (
    <div>Loading...</div>
   ) : (
    <div className='overflow-x-auto p-5'>
     <div className='text-center'>
      <h2 className='text-2xl font-bold'>Salary History</h2>
     </div>
     <div className='flex justify-end my-3 gap-1'>
      <button
       onClick={toggleSortOrder}
       className='bg-green-700 text-white px-3 py-1 rounded-md'
      >
       Sort by Pay Date ({sortOrder === 'asc' ? 'New - Old' : 'Old - New'})
      </button>
      <button>
       <Link
        to='/admin-dashboard/employees'
        className='bg-red-700 py-1 px-3 text-center rounded-md text-white hover:bg-red-600 transition'
       >
        Back
       </Link>
      </button>
     </div>
     {filteredSalaries.length > 0 ? (
      <table className='w-full text-sm text-gray-500'>
       <thead className='text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200'>
        <tr>
         <th className='px-6 py-3'>SNO</th>
         <th className='px-6 py-3'>Pay Date</th>
         <th className='px-6 py-3'>Basic Salary</th>
         <th className='px-6 py-3'>Allowance</th>
         <th className='px-6 py-3'>Deduction</th>
         <th className='px-6 py-3'>Net Salary</th>
        </tr>
       </thead>
       <tbody>
        {filteredSalaries
         .sort((a, b) =>
          sortOrder === 'asc'
           ? new Date(a.pay_date) - new Date(b.pay_date)
           : new Date(b.pay_date) - new Date(a.pay_date)
         )
         .map((salary) => (
          <tr key={salary._id} className='bg-white border-b '>
           <td className='px-6 py-3'>{sno++}</td>
           <td className='px-6 py-3'>
            {new Date(salary.pay_date).toLocaleDateString()}
           </td>
           <td className='px-6 py-3'>{salary.basic_salary}</td>
           <td className='px-6 py-3'>{salary.allowances}</td>
           <td className='px-6 py-3'>{salary.deductions}</td>
           <td className='px-6 py-3'>{salary.net_salary}</td>
          </tr>
         ))}
       </tbody>
      </table>
     ) : (
      <div>No Records</div>
     )}
    </div>
   )}
  </>
 );
};

export default ViewSalary;
