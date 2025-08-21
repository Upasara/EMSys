import React, { useState } from 'react';
import LoginImage from '../assets/images/login.png';
import Logo from '../assets/images/logo.png';
import axios from 'axios';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import { FaArrowRightToBracket } from 'react-icons/fa6';
import { FaRegEye } from 'react-icons/fa';
import { FaRegEyeSlash } from 'react-icons/fa';

//handle login form
const Login = () => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [rememberMe, setRememberMe] = useState(false);
 const [error, setError] = useState(null);
 const [visible, setVisible] = useState(false);
 const { login } = useAuth();
 const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
   const response = await axios.post('http://localhost:5000/api/auth/login', {
    email,
    password,
    rememberMe,
   });
   if (response.data.success) {
    login(response.data.user);

    if (rememberMe) {
     localStorage.setItem('token', response.data.token);
    } else {
     sessionStorage.setItem('token', response.data.token);
    }

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
       <img className='w-8' src={Logo} alt='' />
       <span className='text-sm text-secondaryDark'>P E Mathew & Company</span>
      </div>
      <h1 className='text-3xl font-semibold mt-6  text-primaryDark text-center'>
       LOGIN
      </h1>

      {/* form content*/}
      <form onSubmit={handleSubmit}>
       {/*Email input */}
       <div className='mb-6 mt-10'>
        <input
         type='email'
         placeholder='Enter your email ...'
         className='w-full px-2 py-2 border rounded-full focus:outline-none focus:shadow-md text-primaryText'
         onChange={(e) => setEmail(e.target.value)}
         required
        />
       </div>
       {/*password input */}
       <div className='relative flex justify-between items-center gap-2 mb-6 w-full px-2 py-2 border rounded-full focus-within:shadow-md '>
        <input
         type={visible ? 'text' : 'password'}
         placeholder='Enter your password ...'
         className=' focus:outline-none flex-1 bg-transparent text-primaryText'
         onChange={(e) => setPassword(e.target.value)}
         required
        />
        <div
         onClick={() => setVisible(!visible)}
         className='cursor-pointer text-lg mr-2 text-primaryText hover:text-primaryDark duration-300'
        >
         {visible ? <FaRegEye /> : <FaRegEyeSlash />}
        </div>
       </div>
       {/*remember me & forgot password*/}
       <div className='mb-5 flex items-end justify-end'>
        <label className='inline-flex items-center'>
         <input
          type='checkbox'
          className='form-checkbox'
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
         />
         <span className='ml-2 text-secondaryDark text-sm '> Remember Me</span>
        </label>
       </div>
       {/*button*/}
       <div className='mt-10'>
        <button
         type='submit'
         className='relative group flex justify-center items-center gap-2 w-full bg-primaryDark text-stone-200 tracking-wide 
         hover:tracking-widest text-lg py-2 rounded-xl hover:shadow-lg hover:text-white duration-300 overflow-hidden'
        >
         <div
          className='h-[100px] w-20 bg-gradient-to-r from-white/10 via-white/50 to-white-10 absolute -left-28 -rotate-45 
            blur-sm group-hover:left-[150%] duration-700 group-hover:delay-100'
         ></div>
         Login
         <FaArrowRightToBracket className='group-hover:translate-x-0 duration-300' />
        </button>
       </div>
      </form>
      {/*error message*/}
      {error && <p className='text-red-500 mt-4'>{error}</p>}
     </div>
     {/* Other session */}
     <div className='logo-section w-1/2 bg-primaryDark '>
      <div className='image-wrap'>
       <img
        className='mt-5 size-80 mx-auto  hover:-translate-y-2 duration-300'
        src={LoginImage}
        alt=''
       />
      </div>
      <div className='bottom-wrap text-center text-white'>
       <h3 className='text-3xl font-bold mb-3'>EMSys</h3>
       <p className='mb-8 text-md'>
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
