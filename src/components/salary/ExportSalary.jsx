import axios from 'axios';
import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const ExportSalary = () => {
 const [month, setMonth] = useState('');
 const [salaries, setSalaries] = useState([]);
 const [loading, setLoading] = useState(false);

 const handleMonthChange = (e) => {
  setMonth(e.target.value);
 };

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!month) {
   alert('Please select a month');
   return;
  }

  try {
   setLoading(true);
   const response = await axios.post(
    'http://localhost:5000/api/salary/month',
    { month },
    {
     headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
     },
    }
   );
   if (response.data.success) {
    setSalaries(response.data.salaries);
   }
  } catch (error) {
   if (error.response && !error.response.data.success) {
    alert(error.message);
   }
  } finally {
   setLoading(false);
  }
 };

 const handleExportToExcel = () => {
  if (salaries.length === 0) {
   alert('No data to export');
   return;
  }

  // prepare the data to export
  const data = salaries.map((salExport) => ({
   'Employee ID': salExport.sal_emp_id.emp_id,
   Name: salExport.sal_emp_id.userId.name,
   Department: salExport.sal_emp_id.emp_dep.dep_name,
   'Company Name': salExport.sal_emp_id.emp_company,
   'Bank Name': salExport.sal_emp_id.bank_name,
   'Bank Branch': salExport.sal_emp_id.bank_branch,
   'Account No.': salExport.sal_emp_id.account_number,
  }));

  //create a new workbook and worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  //set column widths
  worksheet['!cols'] = [
   { wch: 15 }, // Employee ID
   { wch: 20 }, // Name
  ];
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Salaries');

  //export the excel file
  XLSX.writeFile(workbook, `Salaries_${month}.xlsx`);
 };

 return (
  <div>
   <div className=' flex justify-center items-center p-5'>
    <form className='flex gap-5' onSubmit={handleSubmit}>
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

   {/* show filtered salary */}
   {salaries.length > 0 && (
    <div className='p-5'>
     <table className='w-full border-collapse border border-gray-300'>
      <thead className='bg-gray-200'>
       <tr>
        <th className='border p-2'>Employee ID</th>
        <th className='border p-2'>Name</th>
        <th className='border p-2'>Department</th>
        <th className='border p-2'>Gross Salary</th>
        <th className='border p-2'>Total Deductions</th>
        <th className='border p-2'>Net Salary</th>
        <th className='border p-2'>Pay Month</th>
       </tr>
      </thead>
      <tbody>
       {salaries.map((sal) => (
        <tr key={sal._id}>
         <td className='border p-2'>{sal.sal_emp_id.emp_id}</td>
         <td className='border p-2'>{sal.sal_emp_id.userId.name}</td>
         <td className='border p-2'>{sal.sal_emp_id.emp_dep.dep_name}</td>
         <td className='border p-2'>{sal.gross_salary}</td>
         <td className='border p-2'>{sal.total_deductions}</td>
         <td className='border p-2'>{sal.net_salary}</td>
         <td className='border p-2'>
          {new Date(sal.pay_date).toLocaleDateString('en-US', {
           year: 'numeric',
           month: 'long',
          })}
         </td>
        </tr>
       ))}
      </tbody>
     </table>
     <button
      onClick={handleExportToExcel}
      className='py-1.5 px-2 bg-primaryLight hover:bg-primaryDark transition text-white rounded-md '
     >
      Export to Excel
     </button>
    </div>
   )}
   {!loading && salaries.length === 0 && month && (
    <p>No salaries found for this month</p>
   )}
  </div>
 );
};

export default ExportSalary;
