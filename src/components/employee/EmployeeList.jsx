import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
 columns,
 conditionalRowStyles,
 EmployeeButtons,
} from '../../utils/EmployeeHelper';
import DataTable from 'react-data-table-component';

const EmployeeList = () => {
 const [employees, setEmployees] = useState([]);
 const [empLoading, setEmpLoading] = useState(false);
 const [fileredEmployee, setFilteredEmployee] = useState([]);

 //use effect to fetch employee data from DB
 useEffect(() => {
  const fetchEmployees = async () => {
   setEmpLoading(true);
   try {
    const token =
     localStorage.getItem('token') || sessionStorage.getItem('token');
    const response = await axios.get('http://localhost:5000/api/employee', {
     headers: { Authorization: `Bearer ${token}` },
    });
    if (response.data.success) {
     let sno = 1;
     const data = await response.data.employees.map((emp) => ({
      _id: emp._id,
      sno: sno++,
      name: emp.userId.name,
      emp_designation: emp.emp_designation,
      dep_name: emp.emp_dep ? emp.emp_dep.dep_name : 'N/A',
      isActive: emp.isActive,
      profileImage: (
       <img
        width={40}
        className='rounded-full'
        src={`http://localhost:5000/${emp.userId.profileImage}`}
       />
      ),
      actions: <EmployeeButtons Id={emp._id} />,
     }));
     const sortedEmployees = response.data.employees.sort((a, b) => {
      return b.isActive - a.isActive;
     });
     setEmployees(data);
     setFilteredEmployee(data);
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

 const handleFilter = (e) => {
  const records = employees.filter((emp) =>
   emp.name.toLowerCase().includes(e.target.value.toLowerCase())
  );
  setFilteredEmployee(records);
 };

 return (
  <>
   {empLoading ? (
    <div>Loading...</div>
   ) : (
    <div className='p-5'>
     <div className='text-center'>
      <h3 className='text-2xl font-bold text-blue-800'>Manage Employees</h3>
     </div>
     <div className='flex justify-between items-center'>
      <input
       type='text'
       placeholder='Search Department'
       className='px-4 py-0.5 border rounded-md'
       onChange={handleFilter}
      />
      <Link
       to='/admin-dashboard/add-employee'
       className='px-4 py-2 border-2 border-primaryDark rounded-md text-primaryText hover:text-white hover:bg-primaryDark'
      >
       Add New Employee
      </Link>
     </div>
     <div className='mt-10'>
      <DataTable
       columns={columns}
       data={fileredEmployee}
       conditionalRowStyles={conditionalRowStyles}
       pagination
      />
     </div>
    </div>
   )}
  </>
 );
};

export default EmployeeList;
