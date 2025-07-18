import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import axios from 'axios';

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
   const response = await axios.post(
    'http://localhost:5000/api/leave/add',
    { ...leave, days: numberOfDays },
    {
     headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
     },
    }
   );
   if (response.data.success) {
    navigate('/employee-dashboard/leaves');
   }
  } catch (error) {
   if (error.response && !error.response.data.success) {
    alert(error.response.data.error);
   }
  }
 };

 return (
  <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
   <h2 className='text-2xl font-bold mb-6'>Request for a Leave</h2>
   <form onSubmit={handleSubmit}>
    <div className='flex flex-col space-y-4'>
     <div>
      <label htmlFor='' className='block text-sm font-medium text-gray-700'>
       Leave Type
      </label>
      <select
       name='leave_type'
       onChange={handleChange}
       className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
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
      <label className='block text-sm font-medium text-gray-700 mb-2'>
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
         className='form-radio text-primaryDark'
         required
        />
        <span className='ml-2'>One Day</span>
       </label>
       <label className='inline-flex items-center'>
        <input
         type='radio'
         name='leaveDuration'
         value='multiple'
         checked={leaveDuration === 'multiple'}
         onChange={() => setLeaveDuration('multiple')}
         className='form-radio text-primaryDark'
        />
        <span className='ml-2'>More Than One Day</span>
       </label>
      </div>
     </div>

     {/* date range according to the radio */}

     {leaveDuration === 'one' && (
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
       <div>
        <label className='block text-sm font-medium text-gray-700'>Date</label>
        <input
         type='date'
         name='start_date'
         onChange={handleChange}
         className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
         required
        />
       </div>
       <div>
        <label className='block text-sm font-medium text-gray-700'>Days</label>
        <input
         type='number'
         name='days'
         value={numberOfDays}
         onChange={handleChange}
         disabled
         className='mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-100'
        />
       </div>
      </div>
     )}
     {/* ----------------------------------------- */}
     {leaveDuration === 'multiple' && (
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
       <div>
        <label className='block text-sm font-medium text-gray-700'>
         From Date
        </label>
        <input
         type='date'
         name='start_date'
         onChange={handleChange}
         className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
         required
        />
       </div>
       <div>
        <label className='block text-sm font-medium text-gray-700'>
         To Date
        </label>
        <input
         type='date'
         name='end_date'
         onChange={handleChange}
         className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
         required
        />
       </div>
       <div>
        <label className='block text-sm font-medium text-gray-700'>Days</label>
        <input
         type='number'
         name='days'
         value={numberOfDays}
         onChange={handleChange}
         disabled
         className='mt-1 p-2 block w-full border border-gray-300 rounded-md bg-gray-100'
        />
       </div>
      </div>
     )}

     {/* description */}
     <div>
      <label className='block text-sm font-medium text-gray-700'>
       Description
      </label>
      <textarea
       type='date'
       name='description'
       onChange={handleChange}
       className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
       rows='2'
       required
      ></textarea>
     </div>
    </div>
    <div className='flex justify-between items-center mt-5 gap-3'>
     <button
      type='submit'
      className='w-1/2 bg-green-700 py-1.5 rounded-md hover:bg-green-600 text-white transition'
     >
      Submit Leave
     </button>
     <Link
      to='/employee-dashboard/leaves'
      className='bg-red-700 py-1.5 w-1/2 text-center rounded-md text-white hover:bg-red-600 transition'
     >
      Cancel
     </Link>
    </div>
   </form>
  </div>
 );
};

export default AddLeave;
