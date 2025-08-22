import React, { useState } from 'react';
import LoginImage from '/login.png';
import Logo from '/logo.png';
import axios from 'axios';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import { FaArrowRightToBracket } from 'react-icons/fa6';
import { FaRegEye } from 'react-icons/fa';
import { FaRegEyeSlash } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

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
     sessionStorage.removeItem('token'); // Clear session storage if remember me is checked
     localStorage.setItem('token', response.data.token);
    } else {
     localStorage.removeItem('token'); // Clear local storage if remember me is not checked
     sessionStorage.setItem('token', response.data.token);
    }

    if (response.data.user.role === 'admin') {
     navigate('/admin-dashboard');
    } else {
     navigate('/employee-dashboard');
    }
   }
  } catch (error) {
   const eMessage =
    error.response && !error.response.data.success
     ? error.response.data.error
     : 'Server Error';

   toast.error(eMessage);
  }
 };

 return (
  <>
   <div className='flex items-center justify-center min-h-screen bg-slate-100 w-full'>
    <div className='bg-white form-container overflow-hidden flex flex-col md:flex-row  shadow-lg border rounded-lg w-full max-w-(--breakpoint-xl) justify-between'>
     {/* left section */}
     <div className=' form-section w-full md:w-1/2 px-8 md:px-20 py-8 order-2 md:order-1'>
      <div className='logo-wrap flex gap-x-1 items-center'>
       <img className='w-8' src={Logo} alt='' />
       <span className='text-sm text-secondary-dark'>P E Mathew & Company</span>
      </div>
      <h1 className='text-3xl font-semibold mt-10  text-primary-dark text-center'>
       LOGIN
      </h1>

      {/* form content*/}
      <form onSubmit={handleSubmit}>
       {/*Email input */}
       <div className='mb-6 mt-10'>
        <input
         type='email'
         placeholder='Enter your email ...'
         className='w-full px-2 py-2 border rounded-full focus:outline-hidden focus:shadow-md text-primary-text duration-300'
         onChange={(e) => setEmail(e.target.value)}
         required
        />
       </div>
       {/*password input */}
       <div className='relative flex justify-between items-center gap-2 mb-6 w-full px-2 py-2 border rounded-full focus-within:shadow-md duration-300'>
        <input
         type={visible ? 'text' : 'password'}
         placeholder='Enter your password ...'
         className=' focus:outline-hidden flex-1 bg-transparent text-primary-text'
         onChange={(e) => setPassword(e.target.value)}
         required
        />
        <div
         onClick={() => setVisible(!visible)}
         className='cursor-pointer text-lg mr-2 text-primary-text hover:text-primary-dark duration-300'
        >
         {visible ? <FaRegEye /> : <FaRegEyeSlash />}
        </div>
       </div>
       {/*remember me & forgot password*/}
       <div className='mb-5 flex items-end justify-end'>
        <label className='inline-flex items-center text-secondary-dark text-sm'>
         <input
          type='checkbox'
          className='form-checkbox'
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
         />
         <span className='ml-2  '> Remember Me</span>
        </label>
       </div>

       {/*button*/}
       <div className='mt-10'>
        <button
         type='submit'
         className='relative group flex justify-center items-center gap-2 w-full 
         bg-primary-dark text-stone-200 tracking-wide hover:tracking-wider 
         text-lg py-2 rounded-xl hover:shadow-lg hover:text-white duration-300 overflow-hidden'
        >
         <div
          className='h-[100px] w-20 bg-linear-to-r from-white/10 via-white/50 
          to-white-10 absolute -left-28 -rotate-45 blur-xs group-hover:left-[150%] 
          duration-700 group-hover:delay-100'
         ></div>
         Login
         <FaArrowRightToBracket className='group-hover:translate-x-3 duration-300' />
        </button>
       </div>
      </form>
     </div>
     {/* Other session */}
     <div className='logo-section w-full md:w-1/2 bg-[url("/loginbg.jpg")] bg-cover order-1 md:order-2'>
      <div className='image-wrap'>
       <img
        className='mt-5 size-52 md:size-80 mx-auto md:max-w-sm  hover:-translate-y-1 duration-300'
        src={LoginImage}
        alt=''
       />
      </div>
      <div className='bottom-wrap text-center text-white'>
       <h3 className='text-2xl md:text-3xl font-bold mb-3'>EMSys</h3>
       <p className='mb-8 text-sm md:text-base'>
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
