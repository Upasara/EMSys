import axios from 'axios';
import React, { useState } from 'react';

const ExportSalary = () => {
 const [month, setMonth] = useState('');

 const handleMonthChange = (e) => {
  setMonth(e.target.value);
 };
 console.log(month);
 return (
  <div>
   <div className=' flex justify-center items-center p-5'>
    <form className='flex gap-5'>
     <input
      type='month'
      name='month'
      placeholder='select a month'
      value={month}
      onChange={handleMonthChange}
      className='py-1.5 px-1 rounded-lg border border-primaryLight focus:outline-none focus:border-primaryDark focus:border-2 transition  '
     />

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
