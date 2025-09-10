import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { ThreeCircles } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';

const ViewEmployee = () => {
 const { id } = useParams();
 const [employee, setEmployee] = useState([]);
 const [empLoading, setEmpLoading] = useState(false);

 useEffect(() => {
  const fetchEmployee = async () => {
   setEmpLoading(true);
   try {
    const token =
     localStorage.getItem('token') || sessionStorage.getItem('token');
    const response = await axios.get(
     `http://localhost:5000/api/employee/${id}`,
     {
      /* get request includes n authorization header with a token retirieved from localstorage,
            to ensure that only authenticated user can access the data.  */
      headers: {
       Authorization: `Bearer ${token}`,
      },
     }
    );
    if (response.data.success) {
     setEmployee(response.data.employee);
    }
   } catch (error) {
    if (error.response && !error.response.data.success) {
     toast.error(error.response.data.error);
    }
   } finally {
    setEmpLoading(false);
   }
  };
  fetchEmployee();
 }, []);

 return (
  <>
   {empLoading ? (
    //loading spinner
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
    <div className='px-4 py-8'>
     <div className='max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg'>
      <h3 className='text-2xl font-semibold text-blue-800 text-center mb-10 text-shadow-2xs'>
       Employee Details
      </h3>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
       <div className='flex flex-wrap justify-center items-start '>
        <img
         src={
          employee.userId?.profileImage
           ? `http://localhost:5000/${employee.userId?.profileImage}`
           : '/3.avif'
         }
         className='rounded-full border w-72 hover:-translate-y-2 duration-300 shadow-md'
        />
       </div>
       <div>
        <div className='block space-x-3 mb-5'>
         <p className='text-gray-600 font-mono font-semibold'>Full Name : </p>
         <p className='font-bold text-primary-text font-sans '>
          {employee.emp_Fname}
         </p>
        </div>
        <div className='flex flex-wrap space-x-3 mb-5'>
         <p className='text-gray-600 font-mono font-semibold'>
          Name with Initials :{' '}
         </p>
         <p className='font-bold text-primary-text font-sans '>
          {employee.userId?.name}
         </p>
        </div>
        <div className='flex flex-wrap space-x-3 mb-5'>
         <p className='text-gray-600 font-mono font-semibold'>
          Permanant Address :{' '}
         </p>
         <p className='font-bold text-primary-text font-sans '>
          {employee.emp_address}
         </p>
        </div>
        <div className='flex flex-wrap space-x-3 mb-5'>
         <p className='text-gray-600 font-mono font-semibold'>E-mail : </p>
         <p className='font-bold text-primary-text font-sans '>
          {employee.userId?.email}
         </p>
        </div>
        <div className='flex flex-wrap space-x-3 mb-5'>
         <p className='text-gray-600 font-mono font-semibold'>Employee ID : </p>
         <p className='font-bold text-primary-text font-sans '>
          {employee.emp_id}
         </p>
        </div>
        <div className='flex flex-wrap space-x-3 mb-5'>
         <p className='text-gray-600 font-mono font-semibold'>Designation : </p>
         <p className='font-bold text-primary-text font-sans '>
          {employee.emp_designation}
         </p>
        </div>
        <div className='flex flex-wrap space-x-3 mb-5'>
         <p className='text-gray-600 font-mono font-semibold'>Department : </p>
         <p className='font-bold text-primary-text font-sans '>
          {employee.emp_dep?.dep_name ? employee.emp_dep?.dep_name : 'N/A'}
         </p>
        </div>
        <div className='flex flex-wrap space-x-3 mb-5'>
         <p className='text-gray-600 font-mono font-semibold'>Company : </p>
         <p className='font-bold text-primary-text font-sans '>
          {employee.emp_company}
         </p>
        </div>
        <div className='flex flex-wrap space-x-3 mb-5'>
         <p className='text-gray-600 font-mono font-semibold'>National ID : </p>
         <p className='font-bold text-primary-text font-sans '>
          {employee.emp_Nid}
         </p>
        </div>
        <div className='flex flex-wrap space-x-3 mb-5'>
         <p className='text-gray-600 font-mono font-semibold'>
          Date of Birth :{' '}
         </p>
         <p className='font-bold text-primary-text font-sans '>
          {new Date(employee.emp_dob).toLocaleDateString()}
         </p>
        </div>
        <div className='flex flex-wrap space-x-3 mb-5'>
         <p className='text-gray-600 font-mono font-semibold'>
          Phone Number :{' '}
         </p>
         <p className='font-bold text-primary-text font-sans '>
          0{employee.emp_number1}
         </p>
        </div>
        <div className='flex flex-wrap space-x-3 mb-5'>
         <p className='text-gray-600 font-mono font-semibold'>
          Mobile Number :{' '}
         </p>
         <p className='font-bold text-primary-text font-sans '>
          0{employee.emp_number2}
         </p>
        </div>
        <div className='flex flex-wrap space-x-3 mb-5'>
         <p className='text-gray-600 font-mono font-semibold'>Gender : </p>
         <p className='font-bold text-primary-text font-sans '>
          {employee.emp_gender}
         </p>
        </div>
        <div className='flex flex-wrap space-x-3 mb-5'>
         <p className='text-gray-600 font-mono font-semibold'>
          Marital Status :{' '}
         </p>
         <p className='font-bold text-primary-text font-sans '>
          {employee.emp_Mstatus}
         </p>
        </div>
        <div className='flex flex-wrap space-x-3 mb-5'>
         <p className='text-gray-600 font-mono font-semibold'>Start Date : </p>
         <p className='font-bold text-primary-text font-sans '>
          {new Date(employee.emp_Sdate).toLocaleDateString()}
         </p>
        </div>

        <div className='flex flex-wrap space-x-3 mb-5'>
         <p className='text-gray-600 font-mono font-semibold'>
          Emergency Name :{' '}
         </p>
         <p className='font-bold text-primary-text font-sans '>
          {employee.emp_Ename}
         </p>
        </div>
        <div className='flex flex-wrap space-x-3 mb-5'>
         <p className='text-gray-600 font-mono font-semibold'>
          Emergency Number :{' '}
         </p>
         <p className='font-bold text-primary-text font-sans '>
          0{employee.emp_Enumber}
         </p>
        </div>
        <div className='flex flex-wrap space-x-3 mb-2'>
         <p className='text-gray-600 font-mono font-semibold'>
          Medical History :{' '}
         </p>
         <p className='font-bold text-primary-text font-sans '>
          {employee.emp_medical}
         </p>
        </div>
        <div className='w-full h-0.5 bg-gray-400 mb-5 mt-5'></div>
        <div className='flex flex-wrap space-x-3 mb-5'>
         <p className='text-gray-600 font-mono font-semibold'>
          Basic Salary :{' '}
         </p>
         <p className='font-bold text-primary-text font-sans '>
          {employee.emp_salary}
         </p>
        </div>
        <div className='flex flex-wrap space-x-3 mb-5'>
         <p className='text-gray-600 font-mono font-semibold'>
          Traveling Allowance :{' '}
         </p>
         <p className='font-bold text-primary-text font-sans '>
          {employee.emp_allowance}
         </p>
        </div>
        <div className='flex flex-wrap space-x-3 mb-5'>
         <p className='text-gray-600 font-mono font-semibold'>Staff Loan : </p>
         <p className='font-bold text-primary-text font-sans '>
          {employee.staff_loan}
         </p>
        </div>
        <div className='flex flex-wrap space-x-3 mb-5'>
         <p className='text-gray-600 font-mono font-semibold'>Stamp Duty : </p>
         <p className='font-bold text-primary-text font-sans '>
          {employee.stamp_duty}
         </p>
        </div>
        <div className='flex flex-wrap space-x-3 mb-5'>
         <p className='text-gray-600 font-mono font-semibold'>
          Festival Advance :{' '}
         </p>
         <p className='font-bold text-primary-text font-sans '>
          {employee.festival_advance}
         </p>
        </div>
        <div className='w-full h-0.5 bg-gray-400 mb-5 mt-5'></div>
        <div className='flex flex-wrap space-x-3 mb-5'>
         <p className='text-gray-600 font-mono font-semibold'>Bank Name : </p>
         <p className='font-bold text-primary-text font-sans '>
          {employee.bank_name}
         </p>
        </div>
        <div className='flex flex-wrap space-x-3 mb-5'>
         <p className='text-gray-600 font-mono font-semibold'>Bank Branch : </p>
         <p className='font-bold text-primary-text font-sans '>
          {employee.bank_branch}
         </p>
        </div>
        <div className='flex flex-wrap space-x-3 mb-5'>
         <p className='text-gray-600 font-mono font-semibold'>
          Account Number :{' '}
         </p>
         <p className='font-bold text-primary-text font-sans '>
          {employee.account_number}
         </p>
        </div>
       </div>
      </div>
     </div>
    </div>
   )}
  </>
 );
};

export default ViewEmployee;
