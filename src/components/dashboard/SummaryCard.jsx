import React from 'react';

const SummaryCard = ({ icon, text, number, iconColor, textColor }) => {
 return (
  <div className='rounded-md flex bg-white shadow-md border border-primaryLight '>
   <div
    className={`text-3xl flex justify-center items-center px-3 ${iconColor}`}
   >
    {icon}
   </div>
   <div className={`pl-4 py-1 ${textColor}`}>
    <p className='text-md'>{text}</p>
    <p className='text-lg font-semibold'>{number}</p>
   </div>
  </div>
 );
};

export default SummaryCard;
