import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ViewEmployee = () => {
 const { id } = useParams();
 const [employees, setEmployees] = useState([]);

 useEffect(() => {
  const fetchEmployee = async () => {
   try {
    const response = await axios.get(
     `http://localhost:5000/api/employee/${id}`,
     {
      headers: {
       Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
     }
    );

    if (response.data.success) {
     setEmployees(response.data.employees);
    }
   } catch (error) {
    if (error.response && !error.response.data.success) {
     alert(error.response.data.error);
    }
   }
  };
  fetchEmployee();
 }, []);

 return (
  <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
   <h3 className='text-2xl font-bold text-blue-800 text-center'>
    Employee Details
   </h3>
   <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
    <div>
     <img
      src={`http://localhost:5000/${employees.userId.profileImage}`}
      className='rounded-full border w-72'
     />
    </div>
    <div>
     <div className='flex space-x-3 mb-5'>
      <p className='text-lg font-bold'>Full Name : </p>
      <p className='font-medium'>{employee.emp_Fname}</p>
     </div>
     <div className='flex space-x-3 mb-5'>
      <p className='text-lg font-bold'>Name with Initials : </p>
      <p className='font-medium'>{employee.userId.name}</p>
     </div>
     <div className='flex space-x-3 mb-5'>
      <p className='text-lg font-bold'>Permanant Address : </p>
      <p className='font-medium'>{employee.emp_address}</p>
     </div>
     <div className='flex space-x-3 mb-5'>
      <p className='text-lg font-bold'>E-mail : </p>
      <p className='font-medium'>{employee.userId.email}</p>
     </div>
     <div className='flex space-x-3 mb-5'>
      <p className='text-lg font-bold'>Employee ID : </p>
      <p className='font-medium'>{employee.emp_id}</p>
     </div>
     <div className='flex space-x-3 mb-5'>
      <p className='text-lg font-bold'>Designation : </p>
      <p className='font-medium'>{employee.emp_designation}</p>
     </div>
     <div className='flex space-x-3 mb-5'>
      <p className='text-lg font-bold'>Department : </p>
      <p className='font-medium'>{employee.emp_dep.dep_name}</p>
     </div>
     <div className='flex space-x-3 mb-5'>
      <p className='text-lg font-bold'>National ID : </p>
      <p className='font-medium'>{employee.emp_Nid}</p>
     </div>
     <div className='flex space-x-3 mb-5'>
      <p className='text-lg font-bold'>Date of Birth : </p>
      <p className='font-medium'>
       {new Date(employee.emp_dob).toLocaleDateString()}
      </p>
     </div>
     <div className='flex space-x-3 mb-5'>
      <p className='text-lg font-bold'>Phone Number </p>
      <p className='font-medium'>{employee.emp_number1}</p>
     </div>
     <div className='flex space-x-3 mb-5'>
      <p className='text-lg font-bold'>Mpbile Number </p>
      <p className='font-medium'>{employee.emp_number2}</p>
     </div>
     <div className='flex space-x-3 mb-5'>
      <p className='text-lg font-bold'>Gender : </p>
      <p className='font-medium'>{employee.emp_gender}</p>
     </div>
     <div className='flex space-x-3 mb-5'>
      <p className='text-lg font-bold'>Marital Status : </p>
      <p className='font-medium'>{employee.emp_Mstatus}</p>
     </div>
     <div className='flex space-x-3 mb-5'>
      <p className='text-lg font-bold'>Start Date </p>
      <p className='font-medium'>
       {new Date(employee.emp_Sdate).toLocaleDateString()}
      </p>
     </div>
     <div className='flex space-x-3 mb-5'>
      <p className='text-lg font-bold'>Salary </p>
      <p className='font-medium'>{employee.emp_salary}</p>
     </div>
     <div className='flex space-x-3 mb-5'>
      <p className='text-lg font-bold'>Emergency Name : </p>
      <p className='font-medium'>{employee.emp_Ename}</p>
     </div>
     <div className='flex space-x-3 mb-5'>
      <p className='text-lg font-bold'>Emergency Number </p>
      <p className='font-medium'>{employee.emp_Enumber}</p>
     </div>
     <div className='flex space-x-3 mb-5'>
      <p className='text-lg font-bold'>Medical History </p>
      <p className='font-medium'>{employee.emp_medical}</p>
     </div>
     <div className='flex space-x-3 mb-5'>
      <p className='text-lg font-bold'>Ethnicity : </p>
      <p className='font-medium'>{employee.emp_ethnicity}</p>
     </div>
    </div>
   </div>
  </div>
 );
};

export default ViewEmployee;
