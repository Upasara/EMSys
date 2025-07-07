import axios from 'axios';
import { toWords } from 'number-to-words';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const PaymentSlip = () => {
 const { id } = useParams();
 const [salaryDetails, setSalaryDetails] = useState({});

 const fetchSalaryDetails = async () => {
  try {
   const response = await axios.get(
    `http://localhost:5000/api/salary/details/${id}`,
    {
     headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
     },
    }
   );
   console.log(response.data);
   if (response.data.success) {
    setSalaryDetails(response.data.salaryDetails);
   }
  } catch (error) {
   if (error.response && !error.response.data.success) {
    alert(error.message);
   }
  }
 };

 useEffect(() => {
  fetchSalaryDetails();
 }, []);

 const capitalizeWords = (str) => {
  return str
   .split(' ') // Split the string into an array of words
   .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
   .join(' '); // Join the words back into a single string
 };

 return (
  <div className='bg-gray-100 min-h-screen'>
   <div className='grid grid-cols-2 m-5'>
    <button className='justify-self-start'>
     <Link
      to={`/salary/view/${salaryDetails._id}`}
      className='bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-500 transition '
     >
      Printable View
     </Link>
    </button>
    <button className='justify-self-end'>
     <Link
      to='/admin-dashboard/employees'
      className='bg-red-700 py-1 px-3 text-center rounded-md text-white hover:bg-red-600 transition'
     >
      Back
     </Link>
    </button>
   </div>

   <div className='payslip-content p-10 mt-10 bg-white rounded-lg max-w-4xl mx-auto shadow-lg font-serif'>
    <div className=' grid grid-cols-2 font-serif tracking-wider'>
     <div>
      <h2 className='text-2xl font-semibold'>Salary Slip</h2>
     </div>
     <div className='text-right'>
      <h2 className='text-lg font-medium'>
       {salaryDetails.sal_emp_id?.emp_company}
      </h2>
      <h2 className='text-sm'>94, York Street, Colombo 01</h2>
     </div>
    </div>
    <div className='grid grid-cols-2  mt-10 font-light '>
     <div className='mr-4'>
      Employee Name :{' '}
      <span className='font-sans font-medium'>
       {' '}
       {salaryDetails.sal_emp_id?.emp_Fname}
      </span>
     </div>
     <div>
      Designation :{' '}
      <span className='font-sans font-medium'>
       {salaryDetails.sal_emp_id?.emp_designation}
      </span>
     </div>
     <div className='mr-4'>
      Department :{' '}
      <span className='font-sans font-medium'>
       {salaryDetails.sal_emp_id?.emp_dep.dep_des}
      </span>
     </div>
     <div>
      Pay Period :{' '}
      <span className='font-sans font-medium'>
       {salaryDetails.pay_date
        ? `${new Date(salaryDetails.pay_date).toLocaleDateString('default', {
           month: 'long',
          })} ${new Date(salaryDetails.pay_date).getFullYear()}`
        : 'N/A'}
      </span>
     </div>
    </div>

    {/* earnings table starts here */}
    <div className='mt-5'>
     <table className='w-full  border-2 border-black  '>
      <thead className='font-semibold '>
       <tr className='border-2 border-black bg-gray-200'>
        <th className='text-left pl-2'>Earnings</th>
        <th className='text-right pr-2'>Amount (Rs.)</th>
       </tr>
      </thead>
      <tbody>
       <tr className='border-b border-black'>
        <td className='text-left pl-2'>Basic Salary</td>
        <td className='text-right pr-2 font-mono'>
         {salaryDetails.basic_salary}
        </td>
       </tr>
       <tr className='border-b border-black'>
        <td className='text-left pl-2'>Traveling Allowance</td>
        <td className='text-right pr-2 font-mono'>
         {salaryDetails.allowances}
        </td>
       </tr>
       <tr className='border-b border-black'>
        <td className='text-left pl-2'>Traveling Reimbursment</td>
        <td className='text-right pr-2 font-mono'>
         {salaryDetails.travelling}
        </td>
       </tr>
       <tr className='border-b border-black'>
        <td className='text-left pl-2'>Overtime</td>
        <td className='text-right pr-2 font-mono'>{salaryDetails.over_time}</td>
       </tr>
       <tr className='border-b border-black'>
        <td className='text-left pl-2'>Other</td>
        <td className='text-right pr-2 font-mono'>
         {salaryDetails.other_allowances}
        </td>
       </tr>
       <tr className='border-b border-t-2 border-black font-semibold bg-gray-100'>
        <td className='text-left pl-2'>Gross Salary</td>
        <td className='text-right pr-2 font-mono'>
         {salaryDetails.gross_salary}
        </td>
       </tr>
      </tbody>
     </table>
    </div>

    {/* deduction table starts here */}
    <div className='mt-5'>
     <table className='w-full  border-2 border-black '>
      <thead className='font-semibold'>
       <tr className='border-2 border-black bg-gray-200'>
        <th className='text-left pl-2'>Deductions</th>
        <th className='text-right pr-2'>Amount (Rs.)</th>
       </tr>
      </thead>
      <tbody>
       <tr className='border-b border-black'>
        <td className='text-left pl-2'>EPF</td>
        <td className='text-right pr-2 font-mono'>{salaryDetails.epf8}</td>
       </tr>
       <tr className='border-b border-black'>
        <td className='text-left pl-2'>Staff Loan</td>
        <td className='text-right pr-2 font-mono'>
         {salaryDetails.staff_loan}
        </td>
       </tr>
       <tr className='border-b border-black'>
        <td className='text-left pl-2'>Festival Advance</td>
        <td className='text-right pr-2 font-mono'>
         {salaryDetails.festival_advance}
        </td>
       </tr>
       <tr className='border-b border-black'>
        <td className='text-left pl-2'>Other</td>
        <td className='text-right pr-2 font-mono'>
         {salaryDetails.deductions}
        </td>
       </tr>
       <tr className='border-b border-black'>
        <td className='text-left pl-2'>Stamp Duty</td>
        <td className='text-right pr-2 font-mono'>
         {salaryDetails.stamp_duty}
        </td>
       </tr>
       <tr className='border-b border-t-2 border-black font-semibold bg-gray-100'>
        <td className='text-left pl-2'>Total Deductions</td>
        <td className='text-right pr-2 font-mono'>
         {salaryDetails.total_deductions}
        </td>
       </tr>
       <tr className='border-2 border-black font-bold bg-gray-200'>
        <td className='text-right pl-2'>Net Salary</td>
        <td className='text-right pr-2 font-mono'>
         {salaryDetails.net_salary}.00
        </td>
       </tr>
      </tbody>
     </table>
    </div>

    {/* salary in words */}
    <div className='text-center mt-10 text-xl'>
     <p className='font-mono'>{salaryDetails.net_salary || 'N/A'}</p>
     <p className='font-serif'>
      {typeof salaryDetails.net_salary === 'number'
       ? `${capitalizeWords(toWords(salaryDetails.net_salary))} Rupees`
       : 'Net Salary not available'}
     </p>
    </div>

    {/* signature section */}
    <div className='grid grid-cols-2 mt-16 '>
     <div className='flex flex-col items-center justify-center'>
      <hr className='w-3/4 h-0.5 bg-gray-400' />
      <br />
      HR Manager Signature
     </div>
     <div className='flex flex-col items-center justify-center '>
      <hr className='w-3/4  h-0.5 bg-gray-400' />
      <br />
      Employee Signature
     </div>
    </div>

    <div className='text-center text-sm mt-10 text-gray-500 font-sans tracking-wider'>
     This is a system generated payslip
    </div>
   </div>
  </div>
 );
};

export default PaymentSlip;
