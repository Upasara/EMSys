import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { columns, DepartmentButtons } from '../../utils/DepartmentHelper';
import axios from 'axios';

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
   const response = await axios.get('http://localhost:5000/api/department', {
    /* get request includes n authorization header with a token retirieved from localstorage,
    to ensure that only authenticated user can access the data.  */
    headers: {
     Authorization: `Bearer ${localStorage.getItem('token')}`,
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
    <div>Loading...</div>
   ) : (
    <div className='p-5'>
     <div className='text-center'>
      <h3 className='text-2xl font-bold text-blue-800'>Manage Departments</h3>
     </div>
     <div className='flex justify-between items-center'>
      <input
       type='text'
       placeholder='Search Department'
       className='px-4 py-0.5 border rounded-md'
       onChange={filterDepartments}
      />
      <Link
       to='/admin-dashboard/add-department'
       className='px-4 py-2 border-2 border-primaryDark rounded-md text-primaryText hover:text-white hover:bg-primaryDark'
      >
       Add New Department
      </Link>
     </div>
     <div className='mt-5'>
      <DataTable columns={columns} data={filteredDepartments} pagination />
     </div>
    </div>
   )}
  </>
 );
};

export default DepartmentList;
