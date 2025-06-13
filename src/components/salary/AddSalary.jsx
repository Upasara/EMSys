import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchDepartments, getEmployees } from '../../utils/EmployeeHelper';
import axios from 'axios';

const AddSalary = () => {
 const navigate = useNavigate();
 const [salary, setSalary] = useState({
  sal_emp_id: null,
  basic_salary: 0,
  allowances: 0,
  deductions: 0,
  net_salary: 0,
  pay_date: null,
 });
 const [departments, setDepartments] = useState(null);
 const [employees, setEmployees] = useState([]);

 const handleDepartment = async (e) => {
  const employees = await getEmployees(e.target.value);
  setEmployees(employees);
 };

 //department fetching effect
 useEffect(() => {
  const getDepartments = async () => {
   const departments = await fetchDepartments();
   setDepartments(departments);
  };
  getDepartments();
 }, []);

 // employee fetching effect

 //change handler function
 const handleChange = (e) => {
  const { name, value } = e.target;
  setSalary((prevData) => {
   const updatedData = { ...prevData, [name]: value };

   //net salary calculation
   const basicSalary = parseInt(updatedData.basic_salary) || 0;
   const allowances = parseInt(updatedData.allowances) || 0;
   const deductions = parseInt(updatedData.deductions) || 0;

   updatedData.net_salary = basicSalary + allowances - deductions;
   return updatedData;
  });
 };

 // submit handler function
 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
   const response = await axios.post(
    `http://localhost:5000/api/salary/add`,
    salary,
    {
     headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
     },
    }
   );

   if (response.data.success) {
    navigate('/admin-dashboard/employees');
   } else {
    console.log(response);
   }
  } catch (error) {
   if (error.response && !error.response.data.success) {
    alert(error.response.data.error);
   }
  }
 };

 return (
  <>
   {departments ? (
    <div className='bg-slate-100'>
     <div className='max-w-4xl mx-auto bg-white shadow-md rounded-md mt-10 p-8'>
      <h3 className='text-2xl text-blue-800 font-medium text-center mb-10 mt-5'>
       Add Salary
      </h3>

      <form onSubmit={handleSubmit}>
       <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4'>
        {/* department */}
        <div>
         <label className='block text-primaryText'>Department</label>
         <select
          name='sal_dep'
          onChange={handleDepartment}
          className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600 cursor-pointer bg-slate-100                               '
          required
         >
          <option value=''>Select department</option>
          {departments.map((dep) => (
           <option key={dep._id} value={dep._id}>
            {dep.dep_name}
           </option>
          ))}
         </select>
        </div>

        {/* employee */}
        <div>
         <label className='block text-primaryText'>Department</label>
         <select
          name='sal_emp_id'
          onChange={handleChange}
          className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600 cursor-pointer bg-slate-100'
          required
         >
          <option value=''>Select Employee</option>
          {employees.map((emp) => (
           <option key={emp._id} value={emp._id}>
            {emp.emp_id} - {emp.userId.name}
           </option>
          ))}
         </select>
        </div>

        {/* basic salary */}
        <div>
         <label className='block text-primaryText'>Basic Salary</label>
         <input
          type='number'
          name='basic_salary'
          onChange={handleChange}
          value={salary.basic_salary || ''}
          className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
          required
         />
        </div>

        {/* basic salary */}
        <div>
         <label className='block text-primaryText'>Allowances</label>
         <input
          type='number'
          name='allowances'
          onChange={handleChange}
          value={salary.allowances || ''}
          className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
          required
         />
        </div>

        {/* deduction */}
        <div>
         <label className='block text-primaryText'>Deductions</label>
         <input
          type='number'
          name='deductions'
          onChange={handleChange}
          value={salary.deductions || ''}
          className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
          required
         />
        </div>

        {/* net salary */}
        <div>
         <label className='block text-primaryText'>Net Salary</label>
         <input
          type='number'
          name='net_salary'
          onChange={handleChange}
          value={salary.net_salary || ''}
          className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600 font-bold'
          disabled
         />
        </div>

        {/* pay date */}
        <div>
         <label className='block text-primaryText'>Pay Date</label>
         <input
          type='date'
          name='pay_date'
          onChange={handleChange}
          className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
          required
         />
        </div>
       </div>
       <div className='flex justify-between items-center mt-5 gap-3'>
        <button
         type='submit'
         className='w-1/2 bg-green-700 py-1.5 rounded-md hover:bg-green-600 text-white transition'
        >
         Add Salary
        </button>
        <Link
         to='/admin-dashboard/employees'
         className='bg-red-700 py-1.5 w-1/2 text-center rounded-md text-white hover:bg-red-600 transition'
        >
         Cancel
        </Link>
       </div>
      </form>
     </div>
    </div>
   ) : (
    <div>Loading...</div>
   )}
  </>
 );
};

export default AddSalary;
