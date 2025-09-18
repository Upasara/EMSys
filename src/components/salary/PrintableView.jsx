import axios from 'axios';
import { toWords } from 'number-to-words';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IoMdArrowRoundBack, IoMdPrint } from 'react-icons/io';
import { ThreeCircles } from 'react-loader-spinner';

const PaymentSlip = () => {
 const { id } = useParams();
 const [salaryDetails, setSalaryDetails] = useState({});
 const navigate = useNavigate();
 const [loading, setLoading] = useState(false);

 const fetchSalaryDetails = async () => {
  try {
   setLoading(true);
   const token =
    localStorage.getItem('token') || sessionStorage.getItem('token');
   const response = await axios.get(
    `http://localhost:5000/api/salary/details/${id}`,
    {
     headers: {
      Authorization: `Bearer ${token}`,
     },
    }
   );
   if (response.data.success) {
    setSalaryDetails(response.data.salaryDetails);
   }
  } catch (error) {
   if (error.response && !error.response.data.success) {
    alert(error.message);
   }
  } finally {
   setLoading(false);
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

 //  back button navigation
 const handleGoBack = () => {
  navigate(-1);
 };

 return (
  <>
   {loading ? ( //loading spinner
    <div className='flex flex-wrap items-center justify-center bg-black/15 z-50  h-screen'>
     <div className='animate-pulse'>
      <ThreeCircles
       height='50'
       width='50'
       color='#4fa94d'
       outerCircleColor='#b98807'
       middleCircleColor='#b98807'
       innerCircleColor='#b98807'
       ariaLabel='three-circles-loading'
       wrapperStyle={{}}
       wrapperClass=''
       visible={true}
      />
     </div>
    </div>
   ) : (
    <div className='bg-[url(/loginBg8.png)] bg-slate-100 p-4'>
     <div className='w-full hidden md:flex lg:flex justify-between items-center gap-2 pb-2 print:hidden '>
      <Link
       onClick={handleGoBack}
       className='group inline-flex p-3 rounded-full bg-white/60 backdrop-blur-[1px] shadow-sm hover:shadow-lg duration-300 
     animate-slideRight'
      >
       <IoMdArrowRoundBack className='text-primary-dark text-2xl group-hover:-translate-x-0.5 duration-300' />
      </Link>
      <button
       onClick={() => window.print()}
       className='group border-2 border-green-700  py-2 px-4 rounded-md hover:shadow-md  hover:bg-green-700 
     transition animate-slideLeft duration-300'
      >
       <IoMdPrint className='text-2xl text-green-700 group-hover:text-white animate-bounce duration-300' />
      </button>
     </div>
     <div
      className='p-5 md:p-10 md:pb-5 md:pt-7 bg-white rounded-lg max-w-xl mx-auto shadow-lg font-serif
    print:shadow-none animate-slideUp'
     >
      <div className=' grid grid-cols-2 font-serif tracking-wider'>
       <div>
        <h2 className='text-xl font-semibold'>Salary Slip</h2>
       </div>
       <div className='text-right leading-none'>
        <span className='text-sm'>{salaryDetails.sal_emp_id?.emp_company}</span>
        <br />
        <span className='text-xs'>94, York Street, Colombo 01</span>
       </div>
      </div>
      <div className='mt-4 text-sm'>
       Employee Name :{' '}
       <span className='font-sans font-medium'>
        {' '}
        {salaryDetails.sal_emp_id?.emp_Fname}
       </span>
      </div>
      <div className='grid md:grid-cols-2 font-light text-sm '>
       <div className='mr-4'>
        Employee Number :{' '}
        <span className='font-sans font-medium'>
         {' '}
         {salaryDetails.sal_emp_id?.emp_id}
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
         {salaryDetails.sal_emp_id?.emp_dep
          ? salaryDetails.sal_emp_id.emp_dep.dep_des
          : 'N/A'}
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
      <div className='mt-4 pr-3 pl-3'>
       <table className='w-full  border-2 border-black  '>
        <thead className='font-semibold text-sm'>
         <tr className='border-2 border-black bg-gray-200'>
          <th className='text-left pl-2'>Earnings</th>
          <th className='text-right pr-2'>Amount (Rs.)</th>
         </tr>
        </thead>
        <tbody className='text-sm'>
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
          <td className='text-right pr-2 font-mono'>
           {salaryDetails.over_time}
          </td>
         </tr>
         <tr className='border-b border-black'>
          <td className='text-left pl-2'>Other</td>
          <td className='text-right pr-2 font-mono'>
           {salaryDetails.other_allowances}
          </td>
         </tr>
         <tr className='border-b border-t-2 border-black font-semibold bg-gray-100'>
          <td className='text-left pl-2'>Gross Salary (EPF)</td>
          <td className='text-right pr-2 font-mono'>
           {salaryDetails.gross_salary_epf}
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
      <div className='mt-3 pr-3 pl-3'>
       <table className='w-full  border-2 border-black '>
        <thead className='font-semibold text-sm'>
         <tr className='border-2 border-black bg-gray-200'>
          <th className='text-left pl-2'>Deductions</th>
          <th className='text-right pr-2'>Amount (Rs.)</th>
         </tr>
        </thead>
        <tbody className='text-sm'>
         <tr className='border-b border-black'>
          <td className='text-left pl-2'>No Pay</td>
          <td className='text-right pr-2 font-mono'>
           {salaryDetails.no_pay_amount} ({salaryDetails.no_pay_days} days)
          </td>
         </tr>
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
         <tr className='border-b border-black'>
          <td className='text-left pl-2'>Tax</td>
          <td className='text-right pr-2 font-mono'>{salaryDetails.tax}</td>
         </tr>
         <tr className='border-b border-t-2 border-black font-semibold bg-gray-100'>
          <td className='text-left pl-2'>Total Deductions</td>
          <td className='text-right pr-2 font-mono'>
           {salaryDetails.total_deductions}
          </td>
         </tr>
         <tr className='border-2 border-black font-bold bg-gray-200 text-base'>
          <td className='text-right pl-2'>Net Salary</td>
          <td className='text-right pr-2 font-mono'>
           {salaryDetails.net_salary}
          </td>
         </tr>
        </tbody>
       </table>
      </div>

      {/* salary in words */}
      <div className='text-center mt-4 text-base'>
       <p className='font-mono'>{salaryDetails.net_salary || 'N/A'}</p>
       <p className='font-serif'>
        {typeof salaryDetails.net_salary === 'number'
         ? `${capitalizeWords(toWords(salaryDetails.net_salary))} Rupees`
         : 'Net Salary not available'}
       </p>
      </div>

      {/* signature section */}
      <div className='grid grid-cols-2 mt-10 text-sm'>
       <div className='flex flex-col items-center gap-y-1'>
        <div className='w-3/4 border-t border-gray-400' />

        <span className='justify-center'>HR Manager </span>
       </div>
       <div className='flex flex-col items-center justify-center gap-y-1'></div>
      </div>

      <div className='text-center text-xs mt-5 text-gray-400 font-sans tracking-wider'>
       This is a system generated Salary Slip
      </div>
     </div>
    </div>
   )}
  </>
 );
};

export default PaymentSlip;
