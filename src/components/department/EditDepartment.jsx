import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

const EditDepartment = () => {
 const { id } = useParams();
 const [department, setDepartment] = useState([]);
 const [depLoading, setDepLoading] = useState(false);
 const navigate = useNavigate();

 useEffect(() => {
  const fetchDepartments = async () => {
   setDepLoading(true);

   try {
    const token =
     localStorage.getItem('token') || sessionStorage.getItem('token');
    const response = await axios.get(
     `http://localhost:5000/api/department/${id}`,
     {
      /* get request includes n authorization header with a token retirieved from localstorage,
          to ensure that only authenticated user can access the data.  */
      headers: {
       Authorization: `Bearer ${token}`,
      },
     }
    );
    if (response.data.success) {
     setDepartment(response.data.department);
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

 const handleChange = (e) => {
  const { name, value } = e.target;
  setDepartment({ ...department, [name]: value });
 };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
   const token =
    localStorage.getItem('token') || sessionStorage.getItem('token');
   const response = await axios.put(
    `http://localhost:5000/api/department/${id}`,
    department,
    {
     headers: {
      Authorization: `Bearer ${token}`,
     },
    }
   );

   if (response.data.success) {
    navigate('/admin-dashboard/departments');
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
   {depLoading ? (
    <div>Loading...</div>
   ) : (
    <div className='max-w-lg mx-auto bg-white mt-10 p-8 rounded-md '>
     <h3 className='text-2xl text-center text-blue-800 font-medium'>
      Edit Department
     </h3>
     {/* Form start */}
     <form onSubmit={handleSubmit}>
      <div className='mt-5'>
       <label htmlFor='dep_name' className='text-primary-text'>
        Department Name
       </label>
       <input
        type='text'
        name='dep_name'
        onChange={handleChange}
        value={department.dep_name}
        className='mt-1 w-full p-2 border border-primary-light rounded-md outline-hidden'
        required
       />
      </div>
      <div className='mt-3'>
       <label htmlFor='dep_manager' className='text-primary-text'>
        Department Manager
       </label>
       <input
        type='text'
        name='dep_manager'
        onChange={handleChange}
        value={department.dep_manager}
        className='mt-1 w-full p-2 border border-primary-light rounded-md outline-hidden'
        required
       />
      </div>
      <div className='mt-3'>
       <label htmlFor='dep_email' className='text-primary-text'>
        Department Email
       </label>
       <input
        type='email'
        name='dep_email'
        onChange={handleChange}
        value={department.dep_email}
        className='mt-1 w-full p-2 border border-primary-light rounded-md outline-hidden'
        required
       />
      </div>
      <div className='mt-3'>
       <label htmlFor='dep_des' className='block text-primary-text'>
        Description
       </label>
       <textarea
        rows='4'
        type='text'
        name='dep_des'
        onChange={handleChange}
        value={department.dep_des}
        className='mt-1 block p-2 w-full border border-primary-light rounded-md outline-hidden'
       />
      </div>
      <div className='flex justify-between items-center mt-5 gap-3'>
       <button
        type='submit'
        className='w-1/2 bg-orange-500 py-1.5 rounded-md hover:bg-primary-light text-white'
       >
        Edit Department
       </button>
       <Link
        to='/admin-dashboard/departments'
        className='bg-red-700 py-1.5 w-1/2 text-center rounded-md text-white hover:bg-red-600'
       >
        Cancel
       </Link>
      </div>
     </form>
    </div>
   )}
  </>
 );
};

export default EditDepartment;
