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
  <div className='payslip-content p-10 mt-10 bg-white rounded-lg max-w-4xl mx-auto shadow-lg'>
   <div className='mt-5 mb-5 text-center'>
    <h2 className='text-lg'>Paymentslip</h2>
    <h2 className='text-xl'>{salaryDetails.sal_emp_id?.emp_company}</h2>
    <h2 className='text-sm'>
     94, York Street,
     <br />
     Colombo 01
    </h2>
   </div>
   <div className='grid grid-cols-2  mt-10'>
    <div>Employee Name : {salaryDetails.sal_emp_id?.emp_Fname}</div>
    <div>Designation : {salaryDetails.sal_emp_id?.emp_designation}</div>
    <div>Department : {salaryDetails.sal_emp_id?.emp_dep.dep_des}</div>
    <div>
     Pay Period : {''}
     {salaryDetails.pay_date
      ? `${new Date(salaryDetails.pay_date).toLocaleDateString('default', {
         month: 'long',
        })} ${new Date(salaryDetails.pay_date).getFullYear()}`
      : 'N/A'}
    </div>
   </div>

   {/* earnings table starts here */}
   <div className='mt-5'>
    <table className='w-full  border border-black '>
     <thead className='font-semibold '>
      <tr className='border-2 border-black'>
       <th className='text-left pl-2'>Earnings</th>
       <th className='text-right pr-2'>Amount (Rs.)</th>
      </tr>
     </thead>
     <tbody>
      <tr className='border-b border-black'>
       <td className='text-left pl-2'>Basic Salary</td>
       <td className='text-right pr-2'>{salaryDetails.basic_salary}</td>
      </tr>
      <tr className='border-b border-black'>
       <td className='text-left pl-2'>Traveling Allowance</td>
       <td className='text-right pr-2'>{salaryDetails.allowances}</td>
      </tr>
      <tr className='border-b border-black'>
       <td className='text-left pl-2'>Traveling Reimbursment</td>
       <td className='text-right pr-2'>{salaryDetails.travelling}</td>
      </tr>
      <tr className='border-b border-black'>
       <td className='text-left pl-2'>Overtime</td>
       <td className='text-right pr-2'>{salaryDetails.over_time}</td>
      </tr>
      <tr className='border-b border-black'>
       <td className='text-left pl-2' >Other Allowances</td>
       <td className='text-right pr-2'>{salaryDetails.other_allowances}</td>
      </tr>
      <tr className='border-b border-black'>
       <td className='text-left pl-2'>Gross Salary</td>
       <td className='text-right pr-2'>{salaryDetails.gross_salary}</td>
      </tr>
     </tbody>
    </table>
   </div>

   {/* deduction table starts here */}
   <div className='mt-5'>
    <table className='w-full  border border-black '>
     <thead className='font-semibold'>
      <tr   className='border-2 border-black'>
       <th className='text-left pl-2'>Deductions</th>
       <th className='text-right pr-2'>Amount (Rs.)</th>
      </tr>
     </thead>
     <tbody>
      <tr className='border-b border-black'>
       <td className='text-left pl-2'>EPF</td>
       <td className='text-right pr-2'>{salaryDetails.epf8}</td>
      </tr>
      <tr className='border-b border-black'>
       <td className='text-left pl-2'>Staff Loan</td>
       <td className='text-right pr-2'>{salaryDetails.staff_loan}</td>
      </tr>
      <tr className='border-b border-black'>
       <td className='text-left pl-2'>Festival Advance</td>
       <td className='text-right pr-2'>{salaryDetails.festival_advance}</td>
      </tr>
      <tr   className='border-b border-black'>
       <td className='text-left pl-2'>Other Allowances</td>
       <td className='text-right pr-2'>{salaryDetails.deductions}</td>
      </tr>
      <tr className='border-b border-black'>
       <td className='text-left pl-2'>Stamp Duty</td>
       <td className='text-right pr-2'>{salaryDetails.stamp_duty}</td>
      </tr>
      <tr className='border-b border-black'>
       <td className='text-left pl-2'>Total Deductions</td>
       <td className='text-right pr-2'>{salaryDetails.total_deductions}</td>
      </tr>
      <tr className='border-2 border-black'>
       <td className='text-right pl-2'>Net Salary</td>
       <td className='text-right pr-2'>{salaryDetails.net_salary}.00</td>
      </tr>
     </tbody>
    </table>
   </div>

   {/* salary in words */}
   <div className='text-center mt-5'>
    <p>{salaryDetails.net_salary || 'N/A'}</p>
    <p>
     {typeof salaryDetails.net_salary === 'number'
      ? `${capitalizeWords(toWords(salaryDetails.net_salary))} Rupees`
      : 'Net Salary not available'}
    </p>
   </div>

   {/* signature section */}
   <div className='grid grid-cols-2 mt-16 '>
    <div className='flex flex-col items-center justify-center'>
     <hr className='w-3/4' />
     <br />
     HR Manager Signature
    </div>
    <div className='flex flex-col items-center justify-center '>
     <hr className='w-3/4' />
     <br />
     Employee Signature
    </div>
   </div>
   <div>
    <Link
                to={`/salary/view/${salaryDetails._id}`}
                className='bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-500 transition'
               >
                View
               </Link>
               </div>
   <div className='text-center text-sm mt-16 text-gray-500 font-sans tracking-wider'>
    This is a system generated payslip
   </div>
  </div>
 );
};

export default PaymentSlip;
