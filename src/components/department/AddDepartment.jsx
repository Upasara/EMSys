import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { ThreeCircles } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';

const AddDepartment = () => {
 const [department, setDepartment] = useState({
  dep_name: '',
  dep_manager: '',
  dep_des: '',
 });
 const [depLoading, setDepLoading] = useState(false);

 const navigate = useNavigate();

 const handleChange = (e) => {
  const { name, value } = e.target;
  setDepartment({ ...department, [name]: value });
 };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setDepLoading(true);

  try {
   const token =
    localStorage.getItem('token') || sessionStorage.getItem('token');
   const response = await axios.post(
    'http://localhost:5000/api/department/add',
    department,
    {
     headers: {
      Authorization: `Bearer ${token}`,
     },
    }
   );

   if (response.data.success) {
    toast.success('Department added successfully');
    navigate('/admin-dashboard/departments');
   } else {
    console.log(response);
   }
  } catch (error) {
   if (error.response && !error.response.data.success) {
    toast.error(error.response.data.error);
   }
  } finally {
   setDepLoading(false);
  }
 };

 return (
  <>
   {depLoading ? ( //loading spinner
    <div className='flex flex-wrap items-center justify-center bg-black/15 z-50  h-screen'>
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
    <div className='px-4 py-8'>
     <div className='max-w-lg mx-auto bg-white  p-8 rounded-md '>
      <h3 className='text-2xl text-blue-800  text-center mb-10  text-shadow-2xs font-semibold'>
       Department Register Form
      </h3>
      <form onSubmit={handleSubmit}>
       {/* department name */}
       <div className='mt-5'>
        <label htmlFor='dep_name' className='block text-gray-600 font-mono'>
         Department Name
        </label>
        <input
         type='text'
         name='dep_name'
         onChange={handleChange}
         className='mt-1 w-full py-1.5 px-2 border border-secondary-light rounded-md font-semibold 
         outline-hidden text-primary-text focus:border focus:border-primary-dark focus:shadow-md font-sans  duration-300'
         required
        />
       </div>
       {/* department manage */}
       <div className='mt-5'>
        <label htmlFor='dep_manager' className='block text-gray-600 font-mono'>
         Department Manager
        </label>
        <input
         type='text'
         name='dep_manager'
         onChange={handleChange}
         className='mt-1 w-full py-1.5 px-2 border border-secondary-light rounded-md font-semibold outline-hidden text-primary-text focus:border focus:border-primary-dark focus:shadow-md font-sans  duration-300'
         required
        />
       </div>
       {/* department email */}
       <div className='mt-5'>
        <label htmlFor='dep_email' className='block text-gray-600 font-mono'>
         Department Email
        </label>
        <input
         type='email'
         name='dep_email'
         onChange={handleChange}
         className='mt-1 w-full py-1.5 px-2 border border-secondary-light rounded-md font-semibold outline-hidden text-primary-text focus:border focus:border-primary-dark focus:shadow-md font-sans  duration-300'
         required
        />
       </div>
       {/* department description */}
       <div className='mt-5'>
        <label htmlFor='dep_des' className='block text-gray-600 font-mono'>
         Description
        </label>
        <textarea
         rows='4'
         type='text'
         name='dep_des'
         onChange={handleChange}
         className='mt-1 w-full py-1.5 px-2 border border-secondary-light rounded-md font-semibold outline-hidden text-primary-text focus:border focus:border-primary-dark focus:shadow-md font-sans  duration-300'
        />
       </div>
       <div className='flex justify-between items-center mt-5 gap-3'>
        <button
         type='submit'
         className='w-1/2  py-1.5 rounded-md  font-semibold bg-green-700 
         text-white hover:shadow-lg hover:tracking-wider hover:text-shadow-sm duration-300 '
        >
         <span className='hidden md:block lg:block'>Add Department</span>
         <span className='block md:hidden lg:hidden'>Add</span>
        </button>
        <Link
         to='/admin-dashboard/departments'
         className='py-1.5 w-1/2 text-center rounded-md font-semibold  bg-red-700 
               hover:tracking-wider text-white hover:shadow-lg hover:text-shadow-sm  duration-300'
        >
         Cancel
        </Link>
       </div>
      </form>
     </div>
    </div>
   )}
  </>
 );
};

export default AddDepartment;
