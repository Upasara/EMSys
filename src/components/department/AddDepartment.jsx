import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddDepartment = () => {
 const [department, setDepartment] = useState({
  dep_name: '',
  dep_manager: '',
  dep_email: '',
  dep_des: '',
 });

 const navigate = useNavigate();

 const handleChange = (e) => {
  const { name, value } = e.target;
  setDepartment({ ...department, [name]: value });
 };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
   const response = await axios.post(
    'http://localhost:5000/api/department/add',
    department,
    {
     headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
     },
    }
   );
   if (response.data.success) {
    navigate('/admin-dashboard/departments');
   }
  } catch (error) {
   if (error.response && !error.response.data.success) {
    alert(error.reponse.data.error);
   }
  }
 };

 return (
  <div>
   <h2 className='text-center text-blue-800 text-2xl font-bold mt-5'>
    Add Department
   </h2>
   <div className='max-w-lg mx-auto mt-10 bg-white p-8 rounded-md shadow-md '>
    <form onSubmit={handleSubmit}>
     {/*department name */}
     <div className='mb-5'>
      <label htmlFor='dep_name' className='text-primaryText'>
       Department Name
      </label>
      <input
       type='text'
       onChange={handleChange}
       className='mt-1 w-full p-2 border border-primaryLight rounded-md'
       name='dep_name'
       required
      />
     </div>
     {/*department head */}
     <div className='mb-5'>
      <label htmlFor='dep_manager' className='text-primaryText'>
       Department Manager
      </label>
      <input
       type='text'
       onChange={handleChange}
       className='mt-1 w-full p-2 border border-primaryLight rounded-md'
       name='dep_manager'
       required
      />
     </div>
     {/*department mail */}
     <div className='mb-5'>
      <label htmlFor='dep_email' className='text-primaryText'>
       Department Email
      </label>
      <input
       type='text'
       onChange={handleChange}
       className='mt-1 w-full p-2 border border-primaryLight rounded-md'
       name='dep_email'
       required
      />
     </div>
     {/*department description */}
     <div className='mb-5'>
      <label htmlFor='dep_des' className='text-primaryText'>
       Department Description
      </label>
      <textarea
       name='dep_des'
       onChange={handleChange}
       className='mt-1 w-full p-2 border border-primaryLight rounded-md'
      ></textarea>
     </div>
     <button
      type='submit'
      className='w-full text-primaryText bg-primaryLight hover:bg-primaryDark hover:text-white transition font-bold rounded-md py-2'
     >
      Add Department
     </button>
    </form>
   </div>
  </div>
 );
};

export default AddDepartment;
