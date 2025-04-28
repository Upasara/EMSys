import React from 'react';

const SummaryCard = ({ icon, text, number }) => {
 return (
  <div className='rounded-md flex bg-white shadow-md '>
   <div className='text-3xl flex justify-center items-center  text-primaryDark px-3'>
    {icon}
   </div>
   <div>
    <p>{text}</p>
    <p>{number}</p>
   </div>
  </div>
 );
};

export default SummaryCard;
