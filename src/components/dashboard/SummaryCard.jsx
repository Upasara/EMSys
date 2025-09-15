import React from 'react';

const SummaryCard = ({ icon, text, number, iconColor, textColor }) => {
 return (
  <div className=' border rounded-md py-1.5 px-3 bg-white '>
   <div className='justify-between items-center flex'>
    <span className={`text-2xl font-semibold font-mono`}>{number}</span>
    <span className={`text-2xl ${iconColor}`}>{icon}</span>
   </div>
   <div className={` text-sm mt-1 ${textColor}`}>{text}</div>
  </div>
 );
};

export default SummaryCard;
