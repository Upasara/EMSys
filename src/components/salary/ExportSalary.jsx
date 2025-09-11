import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import * as XLSX from 'xlsx';
import { IoSearch } from 'react-icons/io5';
import { RiFileExcel2Fill } from 'react-icons/ri';
const ExportSalary = () => {
 const [month, setMonth] = useState('');
 const [salaries, setSalaries] = useState([]);
 const [loading, setLoading] = useState(false);
 const [searched, setSearched] = useState(false);

 const handleMonthChange = (e) => {
  setMonth(e.target.value);
 };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setSearched(true);

  try {
   setLoading(true);
   const token =
    localStorage.getItem('token') || sessionStorage.getItem('token');
   const response = await axios.post(
    'http://localhost:5000/api/salary/month',
    { month },
    {
     headers: {
      Authorization: `Bearer ${token}`,
     },
    }
   );
   if (response.data.success) {
    setSalaries(response.data.salaries);
   }
  } catch (error) {
   if (error.response && !error.response.data.success) {
    toast.error(error.response.data.error, {
     icon: '⚠️',
    });
   }
  } finally {
   setLoading(false);
  }
 };

 const handleExportToExcel = () => {
  if (salaries.length === 0) {
   toast.error('No data to export');
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
   'Basic Salary': salExport.basic_salary,
   'Tavelling Allowance': salExport.allowances,
   'Tavelling Reimbursement': salExport.travelling,
   'Over Time': salExport.over_time,
   'Other Allowances': salExport.other_allowances,
   'No Pay Days': salExport.no_pay_days,
   'No Pay Amount': salExport.no_pay_amount,
   'Staff Loan': salExport.staff_loan,
   'Stamp Duty': salExport.stamp_duty,
   'Festival Advance': salExport.festival_advance,
   'Other Dections': salExport.deductions,
   'Gross Salary (EPF)': salExport.gross_salary_epf,
   'EPF 8%': salExport.epf8,
   'EPF 12%': salExport.epf12,
   'ETF 3%': salExport.etf3,
   Tax: salExport.tax,
   'Gross Salary': salExport.gross_salary,
   'Total Deductions': salExport.total_deductions,
   'Net Salary': salExport.net_salary,
   'Pay Month': new Date(salExport.pay_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
   }),
  }));

  //create a new workbook and worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  //set column widths
  worksheet['!cols'] = [
   { wch: 15 }, // Employee ID
   { wch: 15 },
   { wch: 15 },
   { wch: 15 },
   { wch: 15 },
   { wch: 15 },
   { wch: 15 },
   { wch: 15 },
   { wch: 15 },
   { wch: 15 },
   { wch: 15 },
   { wch: 15 },
   { wch: 15 },
   { wch: 15 },
   { wch: 15 },
   { wch: 15 },
   { wch: 15 },
   { wch: 15 },
   { wch: 15 },
   { wch: 15 },
   { wch: 15 },
   { wch: 15 },
   { wch: 15 },
   { wch: 15 },
   { wch: 15 },
   { wch: 15 },
   { wch: 15 },
  ];
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Salaries');

  //export the excel file
  XLSX.writeFile(workbook, `Salaries_${month}.xlsx`);
 };

 return (
  <div className='p-5'>
   <div className=' flex justify-center items-center '>
    <form className='flex gap-4' onSubmit={handleSubmit}>
     <input
      type='month'
      name='month'
      placeholder='select a month'
      value={month}
      onChange={handleMonthChange}
      className='py-1.5 px-2 border bg-white border-secondary-light rounded-md font-semibold outline-hidden text-primary-text focus:border focus:border-primary-dark focus:shadow-md   font-sans  duration-300  '
     />

     <button
      type='submit'
      className='group py-1 px-2 border-2 border-green-700 text-green-700 hover:bg-green-700 hover:shadow-md hover:text-white transition-all duration-300 rounded-md '
     >
      <div className='flex items-center gap-2 font-semibold'>
       <IoSearch className='group-hover:-translate-y-0.5 duration-300' />
       Search Salary
      </div>
     </button>
    </form>
   </div>

   {/* show filtered salary */}
   {salaries.length > 0 && (
    <div className=''>
     <div className=' overflow-x-auto mt-8 shadow-md rounded-lg  bg-white '>
      <table className='w-full border-collapse border border-gray-300 text-center text-primary-text'>
       <thead className='bg-gray-200 text-[15px] '>
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
       <tbody className='text-[14px]'>
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
     </div>
     <button
      onClick={handleExportToExcel}
      className='group mt-5 py-1.5 px-2 border-2  bg-green-700 hover:shadow-md text-white transition-all duration-300 rounded-md'
     >
      <div className='flex items-center gap-1 font-semibold'>
       Export to Excel
       <RiFileExcel2Fill
        className='group-hover:translate-x-1 duration-300 animate-bounce'
        size={20}
       />
      </div>
     </button>
    </div>
   )}
   {!loading && salaries.length === 0 && searched && (
    <div className='bg-white p-5 mt-10 shadow-md rounded-lg'>
     No salaries found for this month
    </div>
   )}
  </div>
 );
};

export default ExportSalary;
