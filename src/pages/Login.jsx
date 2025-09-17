import React, { useState } from 'react';
import LoginImage from '/login.png';
import Logo from '/logo.png';
import axios from 'axios';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import { FaArrowRightToBracket } from 'react-icons/fa6';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { ThreeCircles } from 'react-loader-spinner';

//handle login form
const Login = () => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [rememberMe, setRememberMe] = useState(false);
 const [visible, setVisible] = useState(false);
 const [loading, setLoading] = useState(false);
 const { login } = useAuth();
 const navigate = useNavigate();

 const handleSubmit = async (event) => {
  event.preventDefault();
  setLoading(true);
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

    setTimeout(() => {
     if (response.data.user.role === 'admin') {
      toast.success('Welcome Admin !', {
       position: 'top-center',
       icon: '🛡️',
      });
      navigate('/admin-dashboard');
     } else {
      toast.success('Welcome Employee !', {
       position: 'top-center',
       icon: '🧑‍🔧',
      });
      navigate('/employee-dashboard');
     }
     setLoading(false);
    }, 2000);
   }
  } catch (error) {
   setLoading(false);
   const eMessage =
    error.response && !error.response.data.success
     ? error.response.data.error
     : 'Server Error';

   toast.error(eMessage, {
    duration: 4000,
   });
  }
 };

 return (
  <div className='p-4 flex items-center justify-center min-h-screen bg-slate-100 bg-[url(/loginBg8.png)] bg-cover w-full'>
   {loading && ( // Loading Spinner
    <div className='fixed inset-0 flex flex-col items-center justify-center bg-black/80 z-50 gap-3'>
     <img src={Logo} alt='' className='w-24 a animate-pulse' />

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
   )}
   <div
    className=' form-container overflow-hidden flex flex-col md:flex-row  shadow-lg  rounded-xl  w-full max-w-(--breakpoint-xl) justify-between 
   bg-white/20 backdrop-blur-[2px]  border border-white/10  before:rounded-2xl before:border before:border-white/20'
   >
    {/* left section */}
    <div className=' form-section w-full md:w-1/2 px-8 md:px-20 py-8 order-2 md:order-1  '>
     <div className='logo-wrap hidden md:flex gap-x-1 items-center '>
      <img className='w-6 md:w-8' src={Logo} alt='' />
      <span className='text-sm  text-secondary-dark'>P E Mathew & Company</span>
     </div>
     <h1 className='text-2xl md:text-3xl font-semibold mt-0 md:mt-10  text-primary-dark text-center'>
      LOGIN
     </h1>

     {/* form content*/}
     <form onSubmit={handleSubmit}>
      {/*Email input */}
      <div className='mb-6 mt-5 md:mt-10'>
       <input
        type='email'
        placeholder='Enter your email ...'
        className='w-full px-2 py-2 border rounded-full focus:outline-hidden focus:shadow-md text-primary-text duration-300 focus:bg-white'
        onChange={(e) => setEmail(e.target.value)}
        required
       />
      </div>
      {/*password input */}
      <div className='relative flex justify-between items-center gap-2 mb-3 md:mb-6 w-full px-2 py-2 border rounded-full focus-within:shadow-md duration-300 focus-within:bg-white'>
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
      </div>
      {/*remember me & forgot password*/}
      <div className=' flex items-end justify-end'>
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
      <div className='mt-6 md:mt-10'>
       <button
        type='submit'
        className='relative group flex justify-center items-center gap-2 w-full 
         bg-primary-dark/80 text-stone-200  tracking-wide hover:tracking-wider 
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
    <div className='logo-section w-full md:w-1/2 bg-[url("/loginbg.jpg")] bg-cover order-1 md:order-2 '>
     <div className='image-wrap'>
      <img
       className='mt-5 size-40 md:size-80 mx-auto md:max-w-sm  hover:-translate-y-1 duration-300 '
       src={LoginImage}
       alt=''
      />
     </div>
     <div className='bottom-wrap text-center text-white'>
      <h3 className='text-2xl md:text-3xl font-bold mb-3 text-shadow-sm'>
       EMSys
      </h3>
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
 );
};

export default Login;
