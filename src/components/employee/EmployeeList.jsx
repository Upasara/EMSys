import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
 const [employees, setEmployees] = useState([]);
 const [empLoading, setEmpLoading] = useState(false);

 //use effect to fetch employee data from DB
 useEffect(() => {
  const fetchEmployees = async () => {
   setEmpLoading(true);
   try {
    const response = await axios.get('http://localhost:5000/api/employee', {
     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    if (response.data.success) {
     let sno = 1;
     const data = await response.data.employees.map((emp) => ({
      _id: emp._id,
      sno: sno++,
      name: emp.userId.name,
      emp_designation: emp.emp_designation,
      dep_name: emp.emp_dep.dep_name,
      emp_dob: emp.emp_dob,
      profileImage: emp.userId.profileImage,
     }));
     setEmployees(data);
     setFilteredEmployees(data);
    }
   } catch (error) {
    if (error.response && !error.response.data.success) {
     alert(error.response.data.error);
    }
   } finally {
    setEmpLoading(false);
   }
  };
  fetchEmployees();
 }, []);

 return (
  <div className='p-5'>
   <div className='text-center'>
    <h3 className='text-2xl font-bold text-blue-800'>Manage Employees</h3>
   </div>
   <div className='flex justify-between items-center'>
    <input
     type='text'
     placeholder='Search Department'
     className='px-4 py-0.5 border rounded-md'
    />
    <Link
     to='/admin-dashboard/add-employee'
     className='px-4 py-2 border-2 border-primaryDark rounded-md text-primaryText hover:text-white hover:bg-primaryDark'
    >
     Add New Employee
    </Link>
   </div>
  </div>
 );
};

export default EmployeeList;
