import axios from 'axios';
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

 return (
  <div className='p-10 mt-10 bg-white rounded-lg max-w-4xl mx-auto shadow-lg'>
   <div className='mt-5 mb-5 text-center'>
    <h2 className='text-lg'>Paymentslip</h2>
    <h2 className='text-xl'>{salaryDetails.sal_emp_id?.emp_company}</h2>
    <h2 className='text-sm'>
     94, York Street,
     <br />
     Colombo 01
    </h2>
   </div>
   <div className='grid grid-cols-2 gap-4 mt-5'>
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
   <div className='mt-5'>
    <table className='w-full  border-2 bg-blue-300 rounded-2xl'>
     <thead className='font-semibold'>
      <tr>
       <th className='text-left'>Earnings</th>
       <th className='text-right'>Amount (Rs.)</th>
      </tr>
     </thead>
     <tbody>
      <tr>
       <td className='text-left'>Basic Salary</td>
       <td className='text-right'>{salaryDetails.basic_salary}</td>
      </tr>
      <tr>
       <td className='text-left'>Traveling Allowance</td>
       <td className='text-right'>{salaryDetails.allowances}</td>
      </tr>
      <tr>
       <td className='text-left'>Traveling Reimbursment</td>
       <td className='text-right'>{salaryDetails.travelling}</td>
      </tr>
      <tr>
       <td className='text-left'>Overtime</td>
       <td className='text-right'>{salaryDetails.over_time}</td>
      </tr>
      <tr>
       <td className='text-left'>Other Allowances</td>
       <td className='text-right'>{salaryDetails.other_allowances}</td>
      </tr>
      <tr>
       <td className='text-left'>Gross Salary</td>
       <td className='text-right'>{salaryDetails.gross_salary}</td>
      </tr>
     </tbody>
    </table>
   </div>
   <div className='mt-5'>
    <table className='w-full  border-2 '>
     <thead className='font-semibold'>
      <tr>
       <th className='text-left'>Deductions</th>
       <th className='text-right'>Amount (Rs.)</th>
      </tr>
     </thead>
     <tbody>
      <tr>
       <td className='text-left'>EPF</td>
       <td className='text-right'>{salaryDetails.epf8}</td>
      </tr>
      <tr>
       <td className='text-left'>Staff Loan</td>
       <td className='text-right'>{salaryDetails.staff_loan}</td>
      </tr>
      <tr>
       <td className='text-left'>Festival Advance</td>
       <td className='text-right'>{salaryDetails.festival_advance}</td>
      </tr>
      <tr>
       <td className='text-left'>Other Allowances</td>
       <td className='text-right'>{salaryDetails.deductions}</td>
      </tr>
      <tr>
       <td className='text-left'>Stamp Duty</td>
       <td className='text-right'>{salaryDetails.stamp_duty}</td>
      </tr>
      <tr>
       <td className='text-left'>Total Deductions</td>
       <td className='text-right'>{salaryDetails.total_deductions}</td>
      </tr>
     </tbody>
    </table>
   </div>
  </div>
 );
};

export default PaymentSlip;
