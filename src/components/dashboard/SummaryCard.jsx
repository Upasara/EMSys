import React from 'react';

const SummaryCard = ({ icon, text, number, iconColor, textColor }) => {
 return (
  <div className=' border rounded-md py-1 px-3 bg-white '>
   <div className='justify-between items-center flex'>
    <span className={`text-xl font-semibold font-mono`}>{number}</span>
    <span className={`text-xl ${iconColor}`}>{icon}</span>
   </div>
   <div className={` text-xs mt-0 ${textColor}`}>{text}</div>
  </div>
 );
};

export default SummaryCard;
