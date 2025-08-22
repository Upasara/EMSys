import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import axios from 'axios';

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
   setError('Passwords do not match');
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
     navigate('/admin-dashboard');
    } else {
     navigate('/employee-dashboard');
    }
   } catch (error) {
    if (error.response && !error.response.data.success) {
     setError(error.response.data.error);
    }
   }
  }
 };

 return (
  <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96'>
   <h2 className='text-2xl font-bold mb-6 '>Change Password</h2>
   <p className='text-red-500'>{error}</p>
   <form onSubmit={handleSubmit}>
    {/* old password */}
    <div>
     <label className='text-sm font-medium text-gray-700'>Old Password</label>
     <input
      type='password'
      name='old_password'
      onChange={handleChange}
      className='mt-1 w-full p-2 border border-gray-300 rounded-md'
      required
     />
    </div>
    {/* new password */}
    <div>
     <label className='text-sm font-medium text-gray-700'>New Password</label>
     <input
      type='password'
      name='new_password'
      onChange={handleChange}
      className='mt-1 w-full p-2 border border-gray-300 rounded-md'
      required
     />
    </div>

    {/* confirm password */}
    <div>
     <label className='text-sm font-medium text-gray-700'>
      Confirm Password
     </label>
     <input
      type='password'
      name='confirm_password'
      onChange={handleChange}
      className='mt-1 w-full p-2 border border-gray-300 rounded-md'
      required
     />
    </div>
    <div className='mt-6'>
     <button
      type='submit'
      className='w-full border-2 border-primary-dark hover:bg-primary-dark transition rounded-md  text-primary-dark hover:text-white py-1 font-semibold'
     >
      Change Password
     </button>
    </div>
   </form>
  </div>
 );
};

export default Settings;
