import React from 'react';

const AddDepartment = () => {
 return (
  <div>
   <h2 className='text-center text-blue-800 text-2xl font-bold mt-5'>
    Add Department
   </h2>
   <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96'>
    <form action='#'>
     {/*department name */}
     <div>
      <label htmlFor='dep_name'>Department Name</label>
      <input type='text' />
     </div>
     {/*department description */}
     <div>
      <label htmlFor='dep_des'>Description</label>
      <textarea name='dep_des'></textarea>
     </div>
     {/*department head */}
     <div>
      <label htmlFor='dep_manager'>Department Manager</label>
      <input type='text' />
     </div>
     {/*department mail */}
     <div>
      <label htmlFor='dep_mail'>Department Email</label>
      <input type='text' />
     </div>
    </form>
   </div>
  </div>
 );
};

export default AddDepartment;
