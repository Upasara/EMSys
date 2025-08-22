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
  travelling: 0,
  over_time: 0,
  other_allowances: 0,
  epf8: 0,
  epf12: 0,
  etf3: 0,
  staff_loan: 0,
  stamp_duty: 0,
  festival_advance: 0,
  deductions: 0,
  no_pay_days: 0,
  no_pay_amount: 0,
  tax: 0,
  gross_salary_epf: 0,
  gross_salary: 0,
  total_deductions: 0,
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

 //change handler function
 const handleChange = (e) => {
  const { name, value } = e.target;
  setSalary((prevData) => {
   const updatedData = { ...prevData, [name]: value };

   //gross salary calculation
   const basicSalary = parseFloat(updatedData.basic_salary) || 0;
   const allowances = parseFloat(updatedData.allowances) || 0;
   const travelling = parseFloat(updatedData.travelling) || 0;
   const overTime = parseFloat(updatedData.over_time) || 0;
   const otherAllowances = parseFloat(updatedData.other_allowances) || 0;

   // total deductions
   const deductions = parseFloat(updatedData.deductions) || 0;
   const staffLoan = parseFloat(updatedData.staff_loan) || 0;
   const stampDuty = parseFloat(updatedData.stamp_duty) || 0;
   const festivalAdvance = parseFloat(updatedData.festival_advance) || 0;
   const noPayDays = parseFloat(updatedData.no_pay_days) || 0;
   const tax = parseFloat(updatedData.tax) || 0;

   let noPayAmount = 0;
   let newBasicSalary = basicSalary;

   if (noPayDays > 0) {
    noPayAmount = parseFloat(
     ((basicSalary + allowances) / 30) * noPayDays
    ).toFixed(2);
    newBasicSalary = basicSalary - (basicSalary / 30) * noPayDays;
   }

   const epf8 = parseFloat((newBasicSalary * 0.08).toFixed(2));
   const epf12 = parseFloat((newBasicSalary * 0.12).toFixed(2));
   const etf3 = parseFloat((newBasicSalary * 0.03).toFixed(2));

   const gross_salary_epf = parseFloat(newBasicSalary).toFixed(2);

   // Calculate Gross Salary
   const grossSalary =
    basicSalary +
    allowances +
    travelling +
    overTime +
    otherAllowances -
    noPayAmount;

   const totalDeductions =
    epf8 + deductions + staffLoan + stampDuty + festivalAdvance + tax;

   const netSalary = grossSalary - totalDeductions;

   return {
    ...updatedData,
    epf8,
    epf12,
    etf3,
    gross_salary_epf: gross_salary_epf,
    gross_salary: grossSalary,
    total_deductions: totalDeductions,
    net_salary: netSalary,
    no_pay_amount: noPayAmount,
   };
  });
 };

 const handleEmployeeChange = (e) => {
  const selectedEmployeeId = e.target.value;

  const selectedEmployee = employees.find(
   (emp) => emp._id === selectedEmployeeId
  );

  if (selectedEmployee) {
   setSalary((prevData) => {
    const basicSalary = parseFloat(selectedEmployee.emp_salary || 0);
    const allowances = parseFloat(selectedEmployee.emp_allowance || 0);
    const staffLoan = parseFloat(selectedEmployee.staff_loan || 0);
    const stampDuty = parseFloat(selectedEmployee.stamp_duty || 0);
    const festivalAdvance = parseFloat(selectedEmployee.festival_advance || 0);
    const epf8 = basicSalary * 0.08; // Assuming EPF 8% is calculated from basic salary
    const epf12 = basicSalary * 0.12; // Assuming EPF 12% is calculated from basic salary
    const etf3 = basicSalary * 0.03; // Assuming ETF 3% is calculated from basic salary

    const grossSalary = basicSalary + allowances;
    const totalDeductions = epf8 + staffLoan + stampDuty;

    return {
     ...prevData,
     sal_emp_id: selectedEmployeeId,
     basic_salary: basicSalary,
     allowances: allowances,
     staff_loan: staffLoan,
     stamp_duty: stampDuty,
     festival_advance: festivalAdvance,
     epf8: epf8,
     gross_salary_epf: grossSalary,
     gross_salary: grossSalary,
     total_deductions: totalDeductions,
     net_salary: grossSalary - totalDeductions,
     epf12: epf12,
     etf3: etf3,
    };
   });
  }
 };
 // submit handler function
 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
   const token =
    localStorage.getItem('token') || sessionStorage.getItem('token');
   const response = await axios.post(
    `http://localhost:5000/api/salary/add`,
    salary,
    {
     headers: {
      Authorization: `Bearer ${token}`,
     },
    }
   );

   if (response.data.success) {
    // navigate('/admin-dashboard/employees');
    window.location.reload();
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
     <div className='mr-10 mt-7 flex justify-end'>
      <Link
       to='/admin-dashboard/salary/export'
       className='bg-green-700 text-white p-3 hover:bg-green-600 transition rounded-md '
      >
       Export Salary
      </Link>
     </div>
     <div className='max-w-4xl mx-auto bg-white shadow-lg rounded-md mt-7 p-8 '>
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
         <label className='block text-primaryText'>Employee</label>
         <select
          name='sal_emp_id'
          onChange={handleEmployeeChange}
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

        {/* pay date */}
        <div>
         <label className='block text-primaryText'>Pay Date</label>
         <input
          type='month'
          name='pay_date'
          onChange={handleChange}
          className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
          required
         />
        </div>
       </div>
       <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 p-10  rounded-2xl shadow-md mt-5'>
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

        {/* no pay */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4  rounded-2xl '>
         <div>
          <label className='block text-primaryText'>No Pay Days</label>
          <input
           type='number'
           name='no_pay_days'
           onChange={handleChange}
           value={salary.no_pay_days || ''}
           className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
          />
         </div>
         <div>
          <label className='block text-primaryText'>No Pay Amount</label>
          <input
           type='number'
           name='no_pay_amount'
           onChange={handleChange}
           value={salary.no_pay_amount || ''}
           className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
          />
         </div>
        </div>

        {/* allowances */}
        <div>
         <label className='block text-primaryText'>Traveling Allowances</label>
         <input
          type='number'
          name='allowances'
          onChange={handleChange}
          value={salary.allowances || ''}
          className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
         />
        </div>

        {/* staff loan */}
        <div>
         <label className='block text-primaryText'>Staff Loan</label>
         <input
          type='number'
          name='staff_loan'
          onChange={handleChange}
          value={salary.staff_loan || ''}
          className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
         />
        </div>

        {/* travelling */}
        <div>
         <label className='block text-primaryText'>
          Travelling Reimbursment
         </label>
         <input
          type='number'
          name='travelling'
          onChange={handleChange}
          value={salary.travelling || ''}
          className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
         />
        </div>

        {/* festival advance */}
        <div>
         <label className='block text-primaryText'>Festival Advance</label>
         <input
          type='number'
          name='festival_advance'
          onChange={handleChange}
          value={salary.festival_advance || ''}
          className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
         />
        </div>

        {/* overtime */}
        <div>
         <label className='block text-primaryText'>Overtime</label>
         <input
          type='number'
          name='over_time'
          onChange={handleChange}
          value={salary.over_time || ''}
          className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
         />
        </div>

        {/* deduction */}
        <div>
         <label className='block text-primaryText'>Other Deductions</label>
         <input
          type='number'
          name='deductions'
          onChange={handleChange}
          value={salary.deductions || ''}
          className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
         />
        </div>

        {/* other allowances */}
        <div>
         <label className='block text-primaryText'>Other Allowances</label>
         <input
          type='number'
          name='other_allowances'
          onChange={handleChange}
          value={salary.other_allowances || ''}
          className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
         />
        </div>

        {/* EPF 8% */}
        <div>
         <label className='block text-primaryText'>EPF 8%</label>
         <input
          type='number'
          name='epf8'
          onChange={handleChange}
          value={salary.epf8 || ''}
          className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
         />
        </div>

        {/* empty */}
        <div></div>

        {/* stamp duty */}
        <div>
         <label className='block text-primaryText'>Stamp Duty</label>
         <input
          type='number'
          name='stamp_duty'
          onChange={handleChange}
          value={salary.stamp_duty || ''}
          className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
         />
        </div>

        {/* gross salary (EPF) */}
        <div>
         <label className='block text-primaryText font-medium'>
          Gross Salary (EPF)
         </label>
         <input
          type='number'
          name='gross_salary_epf'
          onChange={handleChange}
          value={salary.gross_salary_epf || ''}
          className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600 font-medium'
          disabled
         />
        </div>

        {/* tax */}
        <div>
         <label className='block text-primaryText'>Tax</label>
         <input
          type='number'
          name='tax'
          onChange={handleChange}
          value={salary.tax || ''}
          className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
         />
        </div>

        {/* gross salary */}
        <div>
         <label className='block text-primaryText font-medium'>
          Gross Salary
         </label>
         <input
          type='number'
          name='gross_salary'
          onChange={handleChange}
          value={salary.gross_salary || ''}
          className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600 font-medium'
          disabled
         />
        </div>

        {/* total deduction */}
        <div>
         <label className='block text-primaryText font-medium'>
          Total Deductions
         </label>
         <input
          type='number'
          name='total_deductions'
          onChange={handleChange}
          value={salary.total_deductions || ''}
          className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600 font-medium'
          disabled
         />
        </div>
       </div>

       <div className='mt-8'>
        {/* net salary */}
        <div>
         <label className='block text-primaryText text-xl font-medium'>
          Net Salary
         </label>
         <input
          type='number'
          name='net_salary'
          onChange={handleChange}
          value={salary.net_salary || ''}
          className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600 font-semibold'
          disabled
         />
        </div>
       </div>
       <div className='flex justify-between items-center mt-8 gap-3'>
        <button
         type='submit'
         className='w-1/2 bg-green-700 py-1.5 rounded-md hover:bg-green-600 text-white transition'
        >
         Add Salary
        </button>
        <Link
         to='#'
         onClick={(e) => {
          e.preventDefault();
          window.location.reload();
         }}
         className='bg-red-700 py-1.5 w-1/2 text-center rounded-md text-white hover:bg-red-600 transition'
        >
         Cancel
        </Link>
       </div>
      </form>
      <div className='grid grid-cols-1 md:grid-cols-2 mt-10'>
       <div className='text-center text-gray-600'>EPF 12% - {salary.epf12}</div>
       <div className='text-center text-gray-600'>ETF 3% - {salary.etf3}</div>
      </div>
     </div>
    </div>
   ) : (
    <div>Loading...</div>
   )}
  </>
 );
};

export default AddSalary;
