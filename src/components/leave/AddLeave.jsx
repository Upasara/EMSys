import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddLeave = () => {
 const { user } = useAuth();

 const navigate = useNavigate();

 const [leave, setLeave] = useState({
  userId: user._id,
 });
 // This state will hold the leave duration selection
 const [leaveDuration, setLeaveDuration] = useState('');

 const [numberOfDays, setNumberOfDays] = useState(0);

 const handleChange = (e) => {
  const { name, value } = e.target;
  setLeave((prevState) => ({ ...prevState, [name]: value }));

  if (leaveDuration == 'one' && name == 'start_date') {
   setNumberOfDays(1);
  }

  if (
   leaveDuration == 'multiple' &&
   (name == 'start_date' || name == 'end_date')
  ) {
   const start =
    name == 'start_date' ? new Date(value) : new Date(leave.start_date);
   const end = name == 'end_date' ? new Date(value) : new Date(leave.end_date);

   if (start && end) {
    const difference = (end - start) / (1000 * 60 * 60 * 24) + 1;
    const days = Math.max(1, difference); // Ensure at least 1 day
    setNumberOfDays(days);
   }
  }
 };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
   const token =
    localStorage.getItem('token') || sessionStorage.getItem('token');
   const response = await axios.post(
    'http://localhost:5000/api/leave/add',
    { ...leave, days: numberOfDays },
    {
     headers: {
      Authorization: `Bearer ${token}`,
     },
    }
   );
   if (response.data.success) {
    toast.success('Leave Request Submitted Successfully');
    navigate(`/employee-dashboard/leaves/${user._id}`);
   }
  } catch (error) {
   if (error.response && !error.response.data.success) {
    toast.error(error.response.data.error);
   }
  }
 };

 return (
  <div className='p-5'>
   <div className='max-w-4xl mx-auto mt-0 md:mt-10  bg-white p-8 rounded-md shadow-md'>
    <h2 className='text-2xl text-blue-800  text-center mb-5  text-shadow-2xs font-semibold'>
     Request for a Leave
    </h2>
    <form onSubmit={handleSubmit}>
     <div className='flex flex-col space-y-4'>
      <div>
       <label htmlFor='' className='block text-gray-600 font-mono'>
        Leave Type
       </label>
       <select
        name='leave_type'
        onChange={handleChange}
        className='mt-1 w-full py-1.5 px-2 border border-secondary-light rounded-md font-semibold 
        outline-hidden text-primary-text focus:border focus:border-primary-dark focus:shadow-md   font-sans  duration-300'
        required
       >
        <option value=''>Select Leave Type</option>
        <option value='Sick Leave'>Sick Leave</option>
        <option value='Casual Leave'>Casual Leave</option>
        <option value='Annual Leave'>Annual Leave </option>
       </select>
      </div>
      {/* leave duration radio button */}
      <div className='mt-4'>
       <label className='block text-gray-600 font-mono mb-2'>
        Leave Duration
       </label>
       <div className='flex space-x-4'>
        <label className='inline-flex items-center'>
         <input
          type='radio'
          name='leaveDuration'
          value='one'
          checked={leaveDuration === 'one'}
          onChange={() => setLeaveDuration('one')}
          className='form-radio text-primary-dark'
          required
         />
         <span className='ml-2 font-semibold text-primary-text font-sans '>
          One Day
         </span>
        </label>
        <label className='inline-flex items-center'>
         <input
          type='radio'
          name='leaveDuration'
          value='multiple'
          checked={leaveDuration === 'multiple'}
          onChange={() => setLeaveDuration('multiple')}
          className='form-radio text-primary-dark'
         />
         <span className='ml-2 font-semibold text-primary-text font-sans'>
          More Than One Day
         </span>
        </label>
       </div>
      </div>

      {/* date range according to the radio */}

      {leaveDuration === 'one' && (
       <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
         <label className='block text-gray-600 font-mono'>Date</label>
         <input
          type='date'
          name='start_date'
          onChange={handleChange}
          className='mt-1 w-full py-1.5 px-2 border border-secondary-light rounded-md 
          font-semibold outline-hidden text-primary-text focus:border focus:border-primary-dark focus:shadow-md   font-sans  duration-300'
          required
         />
        </div>
        <div>
         <label className='block text-gray-600 font-mono'>Days</label>
         <input
          type='number'
          name='days'
          value={numberOfDays}
          onChange={handleChange}
          disabled
          className='mt-1 w-full py-1.5 px-2 border border-secondary-light rounded-md font-semibold 
          outline-hidden text-primary-text focus:border focus:border-primary-dark focus:shadow-md   font-sans  duration-300'
         />
        </div>
       </div>
      )}
      {/* ----------------------------------------- */}
      {leaveDuration === 'multiple' && (
       <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div>
         <label className='block text-gray-600 font-mono'>From Date</label>
         <input
          type='date'
          name='start_date'
          onChange={handleChange}
          className='mt-1 w-full py-1.5 px-2 border border-secondary-light rounded-md font-semibold 
          outline-hidden text-primary-text focus:border focus:border-primary-dark focus:shadow-md   font-sans  duration-300'
          required
         />
        </div>
        <div>
         <label className='block text-gray-600 font-mono'>To Date</label>
         <input
          type='date'
          name='end_date'
          onChange={handleChange}
          className='mt-1 w-full py-1.5 px-2 border border-secondary-light rounded-md font-semibold 
          outline-hidden text-primary-text focus:border focus:border-primary-dark focus:shadow-md   font-sans  duration-300'
          required
         />
        </div>
        <div>
         <label className='block text-gray-600 font-mono'>Days</label>
         <input
          type='number'
          name='days'
          value={numberOfDays}
          onChange={handleChange}
          disabled
          className='mt-1 w-full py-1.5 px-2 border border-secondary-light rounded-md font-semibold 
          outline-hidden text-primary-text focus:border focus:border-primary-dark focus:shadow-md   font-sans  duration-300'
         />
        </div>
       </div>
      )}

      {/* description */}
      <div>
       <label className='block text-gray-600 font-mono'>Description</label>
       <textarea
        type='date'
        name='description'
        onChange={handleChange}
        className='mt-1 w-full py-1.5 px-2 border border-secondary-light rounded-md font-semibold 
        outline-hidden text-primary-text focus:border focus:border-primary-dark focus:shadow-md   font-sans  duration-300'
        rows='2'
       ></textarea>
      </div>
     </div>
     <div className='flex justify-between items-center mt-5 gap-3'>
      <button
       type='submit'
       className='w-1/2 py-1.5 rounded-md  font-semibold bg-green-700 
          text-white hover:shadow-lg hover:tracking-wider hover:text-shadow-sm duration-300'
      >
       Submit Leave
      </button>
      <Link
       to={`/employee-dashboard/leaves/${user._id}`}
       className='py-1.5 w-1/2 text-center rounded-md font-semibold  bg-red-700 
          hover:tracking-wider text-white hover:shadow-lg hover:text-shadow-sm  duration-300'
      >
       Cancel
      </Link>
     </div>
    </form>
   </div>
  </div>
 );
};

export default AddLeave;
