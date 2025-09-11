import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const Settings = () => {
 const navigate = useNavigate();
 const { user } = useAuth();
 const [setting, setSetting] = useState({
  userId: user._id,
  old_padssword: '',
  new_password: '',
  confirm_password: '',
 });

 const [error, setError] = useState(null);

 const handleChange = (e) => {
  const { name, value } = e.target;
  setSetting({ ...setting, [name]: value });
 };

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (setting.new_password !== setting.confirm_password) {
   toast.error("New and confirm password doesn't match !");
  } else {
   try {
    const token =
     localStorage.getItem('token') || sessionStorage.getItem('token');
    const response = await axios.put(
     'http://localhost:5000/api/setting/change-password',
     setting,
     {
      headers: {
       Authorization: `Bearer ${token}`,
      },
     }
    );
    if (response.data.success && user.role === 'admin') {
     toast.success(response.data.message);
     navigate('/admin-dashboard');
    } else {
     toast.success(response.data.message);
     navigate('/employee-dashboard');
    }
   } catch (error) {
    if (error.response && !error.response.data.success) {
     toast.error(error.response.data.error);
    }
   }
  }
 };

 return (
  <div className='p-5'>
   <div className='max-w-md mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
    <h2 className='text-2xl text-blue-800  text-center mb-10  text-shadow-2xs font-semibold '>
     Change Password
    </h2>
    <form onSubmit={handleSubmit}>
     {/* old password */}
     <div className='mb-5'>
      <label className='block text-gray-600 font-mono'>Old Password</label>
      <input
       type='password'
       name='old_password'
       onChange={handleChange}
       className='mt-1 w-full py-1.5 px-2 border border-secondary-light rounded-md font-semibold outline-hidden text-primary-text focus:border focus:border-primary-dark focus:shadow-md font-sans  duration-300'
       required
      />
     </div>
     {/* new password */}
     <div className='mb-5'>
      <label className='block text-gray-600 font-mono'>New Password</label>
      <input
       type='password'
       name='new_password'
       onChange={handleChange}
       className='mt-1 w-full py-1.5 px-2 border border-secondary-light rounded-md font-semibold outline-hidden text-primary-text focus:border focus:border-primary-dark focus:shadow-md font-sans  duration-300'
       required
      />
     </div>

     {/* confirm password */}
     <div className='mb-5'>
      <label className='block text-gray-600 font-mono'>Confirm Password</label>
      <input
       type='password'
       name='confirm_password'
       onChange={handleChange}
       className='mt-1 w-full py-1.5 px-2 border border-secondary-light rounded-md font-semibold outline-hidden text-primary-text focus:border focus:border-primary-dark focus:shadow-md font-sans  duration-300'
       required
      />
     </div>
     <div className='mt-6'>
      <button
       type='submit'
       className='w-full py-1.5 rounded-md  font-semibold bg-green-700 text-lg text-white hover:shadow-lg hover:tracking-wider hover:text-shadow-sm duration-300'
      >
       Change Password
      </button>
     </div>
    </form>
   </div>
  </div>
 );
};

export default Settings;
