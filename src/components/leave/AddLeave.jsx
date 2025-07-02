import React from 'react';

const AddLeave = () => {
 const handleChange = (e) => {};
 return (
  <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
   <h2 className='text-2xl font-bold mb-6'>Request for a Leave</h2>
   <form action='#'>
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
     <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      {/* from date */}
      <div>
       <label className='block text-sm font-medium text-gray-700'>
        From Date
       </label>
       <input
        type='date'
        name='start_date'
        className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
        required
       />
      </div>
     </div>
    </div>
   </form>
  </div>
 );
};

export default AddLeave;
