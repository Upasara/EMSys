import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';
import { FaSort } from 'react-icons/fa';
import { MdMenu } from 'react-icons/md';
import { useAuth } from '../../context/authContext';

const ViewSalary = () => {
 const [salaries, setSalaries] = useState([]);
 const [filteredSalaries, setFilteredSalaries] = useState([]);

 const [sortOrder, setSortOrder] = useState('desc'); // State to manage sort order

 const { id } = useParams();
 let sno = 1;

 const { user } = useAuth();

 const fetchSalaries = async () => {
  try {
   const token =
    localStorage.getItem('token') || sessionStorage.getItem('token');
   const response = await axios.get(
    `http://localhost:5000/api/salary/${id}/${user.role}`,
    {
     headers: {
      Authorization: `Bearer ${token}`,
     },
    }
   );

   if (response.data.success) {
    setSalaries(response.data.salary);
    setFilteredSalaries(response.data.salary);
   }
  } catch (error) {
   if (error.response && !error.response.data.success) {
    toast.error(error.response.data.error);
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
    //loading spinner
    <div className='flex items-center justify-center bg-black/15 z-50  h-screen'>
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
    <div className='p-5'>
     <div className='text-center'>
      <h2 className='text-2xl font-semibold text-blue-800 text-shadow-2xs'>
       Salary History
      </h2>
     </div>
     <div className='flex justify-end mt-5 '>
      <button
       onClick={toggleSortOrder}
       className='py-1.5 px-2 rounded-md  font-semibold bg-green-700  text-white hover:shadow-lg  hover:text-shadow-sm duration-300'
      >
       <span className='hidden md:inline-block lg:inline-block'>
        Sort by Pay Date ({sortOrder === 'asc' ? 'New - Old' : 'Old - New'})
       </span>
       <span className='flex items-center gap-1 md:hidden lg:hidden'>
        <FaSort /> {sortOrder === 'asc' ? 'New - Old' : 'Old - New'}
       </span>
      </button>
     </div>
     {filteredSalaries.length > 0 ? (
      <div className='overflow-x-auto mt-8 shadow-md rounded-lg'>
       <table className='w-full  text-center '>
        <thead className='text-[15px] text-primary-text  bg-white border border-gray-200'>
         <tr>
          <th className='px-6 py-3'>SNO</th>
          <th className='px-6 py-3'>Pay Date</th>
          <th className='px-6 py-3'>Basic Salary</th>
          <th className='px-6 py-3'>Allowance</th>
          <th className='px-6 py-3'>Gross Salary</th>
          <th className='px-6 py-3'>Total Deduction</th>
          <th className='px-6 py-3'>Net Salary</th>
          <th className='px-6 py-3'></th>
         </tr>
        </thead>
        <tbody className='font-medium text-[14px] text-primary-text'>
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
            <th className='px-6 py-3 font-medium'>{salary.gross_salary}</th>
            <td className='px-6 py-3'>{salary.total_deductions}</td>
            <td className='px-6 py-3 font-bold text-[16px]'>
             {salary.net_salary}
            </td>
            <td className='px-6 py-3'>
             <Link
              to={`/salary/view/${salary._id}`}
              className='bg-emerald-600 flex items-center justify-center rounded-md px-1.5 py-1 text-white group hover:shadow-md duration-300'
             >
              <MdMenu
               size={20}
               className='group-hover:-translate-y-0.5 duration-300'
              />
             </Link>
            </td>
           </tr>
          ))}
        </tbody>
       </table>
      </div>
     ) : (
      <div className='bg-white p-5 mt-10 shadow-md rounded-lg'>No Records</div>
     )}
    </div>
   )}
  </>
 );
};

export default ViewSalary;
