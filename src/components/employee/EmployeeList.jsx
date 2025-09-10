import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
 columns,
 conditionalRowStyles,
 EmployeeButtons,
 customTableStyles,
} from '../../utils/EmployeeHelper';
import DataTable from 'react-data-table-component';
import { ThreeCircles } from 'react-loader-spinner';

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
    <div className='p-5 '>
     <div className='text-center'>
      <h3 className='text-2xl font-semibold text-blue-800 text-shadow-2xs '>
       Manage Employees
      </h3>
     </div>
     <div className='flex justify-between items-center gap-4 mt-5'>
      {/* search bar */}
      <input
       type='text'
       placeholder='Search Employee  🔍'
       className='px-4 py-0.5  rounded-md border-2 focus:outline-primary-dark focus:outline-1 focus:bg-white duration-300 '
       onChange={handleFilter}
      />
      <Link
       to='/admin-dashboard/add-employee'
       className='px-4 py-1 md:py-2 lg:py-2 font-medium border-2 border-primary-light rounded-md text-primary-text hover:text-white hover:text-shadow-sm hover:shadow-md hover:bg-primary-light  transition-all duration-300 text-center '
      >
       <span className='hidden md:block lg:block'>Add Employee</span>
       <span className='block md:hidden lg:hidden'>Add</span>
      </Link>
     </div>
     <div className='mt-10 shadow-md overflow-x-auto text-primary-text rounded-lg'>
      <DataTable
       columns={columns}
       data={fileredEmployee}
       conditionalRowStyles={conditionalRowStyles}
       customStyles={customTableStyles}
       pagination
       highlightOnHover
       responsive
       fixedHeader
      />
     </div>
    </div>
   )}
  </>
 );
};

export default EmployeeList;
