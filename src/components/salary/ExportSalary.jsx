import axios from 'axios';
import React, { useState } from 'react';

const ExportSalary = () => {
 const [year, setYear] = useState('');
 const [month, setMonth] = useState('');
 const [salaryData, setSalaryData] = useState([]);

 const handleYearChange = (e) => {
  setYear(e.target.value);
 };

 const handleMonthChange = (e) => {
  setMonth(e.target.value);
 };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!year || !month) {
   alert('Please select both year and month');
   return;
  }

  try {
   const response = await axios.post(
    'http://localhost:5000/api/salary/export',
    { year, month },
    {
     headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
     },
    }
   );

   if (response.data.success) {
    setSalaryData(response.data.salaries);
   } else {
    alert('Failed to fetch salary data');
   }
  } catch (error) {
   console.error('Error fetching salary data: ', error);
   alert('An error occurred while fetching salary data');
  }
 };
 return (
  <div>
   <div className=' flex justify-center items-center p-5'>
    <form className='flex gap-5' onSubmit={handleSubmit}>
     <input
      type='number'
      name='year'
      placeholder='Year'
      value={year}
      onChange={handleYearChange}
      className='py-1.5 px-1 rounded-lg border border-primaryLight focus:outline-none focus:border-primaryDark focus:border-2 transition  '
     />
     <select
      name='month'
      value={month}
      onChange={handleMonthChange}
      className='py-1.5 px-1 rounded-lg border border-primaryLight focus:outline-none focus:border-primaryDark focus:border-2 transition'
     >
      <option value=''>Select Month</option>
      <option value='january'>January</option>
      <option value='february'>February</option>
      <option value='march'>March</option>
      <option value='april'>April</option>
      <option value='may'>May</option>
      <option value='june'>June</option>
      <option value='july'>July</option>
      <option value='august'>August</option>
      <option value='september'>September</option>
      <option value='october'>October</option>
      <option value='november'>November</option>
      <option value='december'>December</option>
     </select>
     <button
      type='submit'
      className='py-1.5 px-5 bg-green-700 hover:bg-green-600 transition text-white rounded-lg font-semibold'
     >
      Load Salary
     </button>
    </form>
   </div>
  </div>
 );
};

export default ExportSalary;
