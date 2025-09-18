import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { ThreeCircles } from 'react-loader-spinner';

const Settings = () => {
 const navigate = useNavigate();
 const { user } = useAuth();
 const [setting, setSetting] = useState({
  userId: user._id,
  old_padssword: '',
  new_password: '',
  confirm_password: '',
 });

 const [visible, setVisible] = useState({
  old: false,
  new: false,
  confirm: false,
 });

 const [loading, setLoading] = useState(false);

 const handleChange = (e) => {
  const { name, value } = e.target;
  setSetting({ ...setting, [name]: value });
 };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
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
   } finally {
    setLoading(false);
   }
  }
 };

 return (
  <>
   {loading ? (
    //loading spinner
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
    <div className='p-5'>
     <div className='max-w-md mx-auto mt-10 bg-white p-8 rounded-xl shadow-md animate-slideUp'>
      <h2 className='text-2xl text-blue-800  text-center mb-10  text-shadow-2xs font-semibold '>
       Change Password
      </h2>
      <form onSubmit={handleSubmit}>
       {/* old password */}
       <div className='mb-5'>
        <label className='block text-gray-600 font-mono'>Old Password</label>
        <div className='relative flex justify-between items-center gap-2  w-full px-2 py-1.5 border rounded-md focus-within:shadow-md duration-300 focus-within:bg-white focus-within:border focus-within:border-primary-dark'>
         <input
          type={visible.old ? 'text' : 'password'}
          name='old_password'
          onChange={handleChange}
          className='focus:outline-hidden flex-1 bg-transparent text-primary-text     '
          required
         />
         <div
          onClick={() => setVisible({ ...visible, old: !visible.old })}
          className='cursor-pointer text-lg mr-2 text-primary-text hover:text-primary-dark duration-300'
         >
          {visible.old ? <FaRegEye /> : <FaRegEyeSlash />}
         </div>
        </div>
       </div>
       {/* new password */}
       <div className='mb-5'>
        <label className='block text-gray-600 font-mono'>New Password</label>
        <div className='relative flex justify-between items-center gap-2  w-full px-2 py-1.5 border rounded-md focus-within:shadow-md duration-300 focus-within:bg-white focus-within:border focus-within:border-primary-dark'>
         <input
          type={visible.new ? 'text' : 'password'}
          name='new_password'
          onChange={handleChange}
          className='focus:outline-hidden flex-1 bg-transparent text-primary-text '
          required
         />
         <div
          onClick={() => setVisible({ ...visible, new: !visible.new })}
          className='cursor-pointer text-lg mr-2 text-primary-text hover:text-primary-dark duration-300'
         >
          {visible.new ? <FaRegEye /> : <FaRegEyeSlash />}
         </div>
        </div>
       </div>

       {/* confirm password */}
       <div className='mb-5'>
        <label className='block text-gray-600 font-mono'>
         Confirm Password
        </label>
        <div className='relative flex justify-between items-center gap-2  w-full px-2 py-1.5 border rounded-md focus-within:shadow-md duration-300 focus-within:bg-white focus-within:border focus-within:border-primary-dark'>
         <input
          type={visible.confirm ? 'text' : 'password'}
          name='confirm_password'
          onChange={handleChange}
          className='focus:outline-hidden flex-1 bg-transparent text-primary-text '
          required
         />
         <div
          onClick={() => setVisible({ ...visible, confirm: !visible.confirm })}
          className='cursor-pointer text-lg mr-2 text-primary-text hover:text-primary-dark duration-300'
         >
          {visible.confirm ? <FaRegEye /> : <FaRegEyeSlash />}
         </div>
        </div>
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
   )}
  </>
 );
};

// password
{
 /* <div className='relative flex justify-between items-center gap-2 mb-3 md:mb-6 w-full px-2 py-2 border rounded-full focus-within:shadow-md duration-300 focus-within:bg-white'>
 <input
  type={visible ? 'text' : 'password'}
  placeholder='Enter your password ...'
  className=' focus:outline-hidden flex-1 bg-transparent text-primary-text '
  onChange={(e) => setPassword(e.target.value)}
  required
 />
 <div
  onClick={() => setVisible(!visible)}
  className='cursor-pointer text-lg mr-2 text-primary-text hover:text-primary-dark duration-300'
 >
  {visible ? <FaRegEye /> : <FaRegEyeSlash />}
 </div>
</div>; */
}
export default Settings;
