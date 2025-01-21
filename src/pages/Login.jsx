import axios from 'axios';
import React, { useState } from 'react';
import LoginImage from '../assets/images/login.png';
import { CgProfile } from 'react-icons/cg';

//handle login form
const Login = () => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
   const response = await axios.post('http://localhost:5000/api/auth /login', {
    email,
    password,
   });
   console.log(response);
  } catch (error) {
   console.log(error);
  }
 };

 return (
  <>
   <div className='flex items-center justify-center h-screen bg-slate-50 w-full'>
    <div className='form-container overflow-hidden flex shadow-lg border rounded-lg w-11/12 max-w-screen-xl justify-between'>
     <div className='form-section w-1/2 px-24 py-12'>
      {/* form content*/}
      <div className='logo-wrap flex justify-left gap-x-1 items-center'>
       <CgProfile className='text-2xl text-primaryDark' />
       <span>P E Mathew & Co.</span>
      </div>
      <h1 className='text-3xl font-semibold mt-6 opacity-80 text-secondaryDark'>
       Log in to the Account
      </h1>
     </div>
     <div className='logo-section w-1/2 bg-primaryLight '>
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
