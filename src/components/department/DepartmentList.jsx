import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { columns, DepartmentButtons } from '../../utils/DepartmentHelper';
import axios from 'axios';

const DepartmentList = () => {
 const [departments, setDepartments] = useState([]);
 const [depLoading, setDepLoading] = useState(false);

 useEffect(() => {
  const fetchDepartments = async () => {
   setDepLoading(true);
   try {
    const response = await axios.get('http://localhost:5000/api/department', {
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
      actions: <DepartmentButtons />,
     }));
     setDepartments(data);
    }
   } catch (error) {
    if (error.response && !error.response.data.success) {
     alert(error.response.data.error);
    }
   } finally {
    setDepLoading(false);
   }
  };
  fetchDepartments();
 }, []);

 return (
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
      />
      <Link
       to='/admin-dashboard/add-department'
       className='px-4 py-2 border-2 border-primaryDark rounded-md text-primaryText hover:text-white hover:bg-primaryDark'
      >
       Add New Department
      </Link>
     </div>
     <div>
      <DataTable columns={columns} data={departments} />
     </div>
    </div>
   )}
  </>
 );
};

export default DepartmentList;
