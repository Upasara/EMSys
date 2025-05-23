import React from 'react';

const AddEmployee = () => {
 return (
  <div className='max-w-4xl mx-auto bg-white shadow-md rounded-md mt-10 p-8'>
   <h3 className='text-2xl text-blue-800 font-medium text-center mb-5'>
    Add New Employee
   </h3>
   <form>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4'>
     {/* full name */}
     <div>
      <label className='block text-primaryText'>Full Name</label>
      <textarea
       type='text'
       name='emp_fullname'
       className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
       required
       rows='2'
      />
     </div>

     {/* address */}
     <div>
      <label className='block text-primaryText'>Permanant Address</label>
      <textarea
       type='text'
       name='emp_name'
       className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
       rows='2'
       required
      />
     </div>

     {/* name with initials*/}
     <div>
      <label className='block text-primaryText'>Name with Initials</label>
      <input
       type='text'
       name='emp_name'
       className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
       required
      />
     </div>

     {/* DOB */}
     <div>
      <label className='block text-primaryText'>Date of Birth</label>
      <input
       type='text'
       name='emp_name'
       className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
       required
      />
     </div>

     {/* phone number */}
     <div>
      <label className='block text-primaryText'>Phone Number</label>
      <input
       type='email'
       name='emp_name'
       className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
       required
      />
     </div>

     {/* phone number */}
     <div>
      <label className='block text-primaryText'>Phone Number</label>
      <input
       type='email'
       name='emp_name'
       className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
       required
      />
     </div>

     {/* email */}
     <div>
      <label className='block text-primaryText'>E-mail</label>
      <input
       type='email'
       name='emp_name'
       className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
       required
      />
     </div>

     {/* employee ID */}
     <div>
      <label className='block text-primaryText'>Employee ID</label>
      <input
       type='text'
       name='emp_name'
       className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
       required
      />
     </div>

     {/* gender */}
     <div>
      <label className='block text-primaryText'>Gender</label>
      <select
       name='emp_gender'
       className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
      >
       <option value=''>Select Gender</option>
       <option value='male'>Male</option>
       <option value='female'>Female</option>
       <option value='other'>Other</option>
      </select>
     </div>

     {/* marital status */}
     <div>
      <label className='block text-primaryText'>Marital Status</label>
      <select
       name='emp_gender'
       className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
      >
       <option value=''>Select Marital Status</option>
       <option value='single'>Single</option>
       <option value='married'>Married</option>
      </select>
     </div>

     {/* designation */}
     <div>
      <label className='block text-primaryText'>Designation</label>
      <input
       type='text'
       name='emp_name'
       className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
       required
      />
     </div>

     {/* department */}
     <div>
      <label className='block text-primaryText'>Department</label>
      <select
       name='emp_gender'
       className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
      >
       <option value=''>Select Marital Status</option>
      </select>
     </div>

     {/* start date */}
     <div>
      <label className='block text-primaryText'>Start Date</label>
      <input
       type='text'
       name='emp_name'
       className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
       required
      />
     </div>

     {/* salary */}
     <div>
      <label className='block text-primaryText'>Salary</label>
      <input
       type='text'
       name='emp_name'
       className='mt-1 w-full p-1 border border-primaryLight rounded-md outline-none text-gray-600'
       required
      />
     </div>
    </div>
   </form>
  </div>
 );
};

export default AddEmployee;
