import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import {
 columns,
 customTableStyles,
 DepartmentButtons,
} from '../../utils/DepartmentHelper';
import axios from 'axios';
import { ThreeCircles } from 'react-loader-spinner';

const DepartmentList = () => {
 /*holds ist of department data fetched from the database */
 const [departments, setDepartments] = useState([]);

 /* tracks whether the data is currently loading, allowing the component to display a loading indicator */
 const [depLoading, setDepLoading] = useState(false);

 const [filteredDepartments, setFilteredDepartments] = useState([]);

 const onDepartmentDelete = () => {
  fetchDepartments();
 };

 const fetchDepartments = async () => {
  setDepLoading(true);

  try {
   const token =
    localStorage.getItem('token') || sessionStorage.getItem('token');
   const response = await axios.get('http://localhost:5000/api/department', {
    /* get request includes n authorization header with a token retirieved from localstorage,
    to ensure that only authenticated user can access the data.  */
    headers: {
     Authorization: `Bearer ${token}`,
    },
   });
   if (response.data.success) {
    let sno = 1;
    const data = await response.data.departments.map((dep) => ({
     _id: dep._id,
     sno: sno++,
     dep_name: dep.dep_name,
     dep_manager: dep.dep_manager,
     dep_email: dep.dep_email,
     dep_des: dep.dep_des,
     actions: (
      <DepartmentButtons
       DepID={dep._id}
       onDepartmentDelete={onDepartmentDelete}
      />
     ),
    }));
    setDepartments(data);
    setFilteredDepartments(data);
   }
  } catch (error) {
   if (error.response && !error.response.data.success) {
    alert(error.response.data.error);
   }
  } finally {
   setDepLoading(false);
  }
 };
 /* userEffect Hook - used to fecth department dta when the component is mounted. 
    this ensures the data is loaded only once whe the component is rendered */
 useEffect(() => {
  fetchDepartments();
 }, []);

 const filterDepartments = (e) => {
  const records = departments.filter((dep) =>
   dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase())
  );
  setFilteredDepartments(records);
 };

 return (
  //laoding message is displayed while the data is being fetched
  <>
   {depLoading ? (
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
      <h3 className='text-2xl font-semibold text-blue-800 text-shadow-2xs'>
       Manage Departments
      </h3>
     </div>
     <div className='flex justify-between items-center gap-4 mt-5'>
      <input
       type='text'
       placeholder='Search Department  🔍'
       className='px-4 py-0.5  rounded-md border-2 focus:outline-primary-dark focus:outline-1 focus:bg-white duration-300              '
       onChange={filterDepartments}
      />
      <Link
       to='/admin-dashboard/add-department'
       className='px-4 py-1 md:py-2 lg:py-2 font-medium border-2 border-primary-light rounded-md text-primary-text hover:text-white hover:text-shadow-sm hover:shadow-md hover:bg-primary-light transition duration-300 text-center  '
      >
       <span className='hidden md:block lg:block'>Add Department</span>
       <span className='block md:hidden lg:hidden'>Add</span>
      </Link>
     </div>
     <div className='mt-10 shadow-md overflow-x-auto text-primary-text rounded-lg'>
      <DataTable
       columns={columns}
       data={filteredDepartments}
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

export default DepartmentList;
