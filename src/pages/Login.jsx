import React, { useState } from 'react';
import LoginImage from '../assets/images/login.png';
import { CgProfile } from 'react-icons/cg';
import axios from 'axios';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

//handle login form
const Login = () => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [error, setError] = useState(null);
 const { login } = useAuth();
 const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
   const response = await axios.post('http://localhost:5000/api/auth/login', {
    email,
    password,
   });
   if (response.data.success) {
    login(response.data.user);
    localStorage.setItem('token', response.data.token);
    if (response.data.user.role === 'admin') {
     navigate('/admin-dashboard');
    } else {
     navigate('/employee-dashboard');
    }
   }
  } catch (error) {
   if (error.response && !error.response.data.success) {
    setError(error.response.data.error);
   } else {
    setError('Server Error');
   }
  }
 };

 return (
  <>
   <div className='flex items-center justify-center h-screen bg-slate-100 w-full'>
    <div className='bg-white form-container overflow-hidden flex shadow-lg border rounded-lg w-11/12 max-w-screen-xl justify-between'>
     <div className=' form-section w-1/2 px-24 py-12'>
      <div className='logo-wrap flex justify-left gap-x-1 items-center'>
       <CgProfile className='text-xl text-primaryDark shadow-lg' />
       <span className='text-sm text-secondaryDark'>P E Mathew & Co.</span>
      </div>
      <h1 className='text-2xl font-semibold mt-6  text-primaryDark text-center'>
       LOGIN
      </h1>
      <p className='text-secondaryDark opacity-90 mt-10'>
       Welcome back : Login to your account
      </p>
      {/* form content*/}
      <form onSubmit={handleSubmit}>
       {/*Email input */}
       <div className='mb-6 mt-10'>
        <input
         type='email'
         placeholder='Enter your email ...'
         className='w-full px-2 py-1 border rounded-full'
         onChange={(e) => setEmail(e.target.value)}
         required
        />
       </div>
       {/*password input */}
       <div className='mb-6 '>
        <input
         type='password'
         placeholder='Enter your password ...'
         className='w-full px-2 py-1 border rounded-full'
         onChange={(e) => setPassword(e.target.value)}
         required
        />
       </div>
       {/*remember me & forgot password*/}
       <div className='mb-5 flex items-center justify-between'>
        <label className='inline-flex items-center'>
         <input type='checkbox' className='form-checkbox' />
         <span className='ml-2 text-secondaryDark text-sm '> Remember Me</span>
        </label>
        <a href='#' className='text-primaryDark text-sm'>
         Forgot Password
        </a>
       </div>
       {/*button*/}
       <div className='mt-4'>
        <button
         type='submit'
         className='w-full bg-primaryDark text-white py-2 rounded-md'
        >
         Login
        </button>
       </div>
      </form>
      {/*error message*/}
      {error && <p className='text-red-500 mt-4'>{error}</p>}
     </div>
     <div className='logo-section w-1/2 bg-primaryDark '>
      <div className='image-wrap'>
       <img className=' size-64 mx-auto' src={LoginImage} alt='' />
      </div>
      <div className='bottom-wrap text-center text-white'>
       <h3 className='text-xl font-bold mb-1'>EMSys</h3>
       <p className='mb-8 text-sm'>
        P.E. Mathew & Company - Employee Management System
       </p>
      </div>
      <div className='dots'>
       <div className='dot'></div>
       <div className='dot'></div>
       <div className='dot'></div>
      </div>
     </div>
    </div>
   </div>
  </>
 );
};

export default Login;
