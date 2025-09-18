{
 /*PrivateRoutes and RoleBaseRoutes was used to define, in simple words once we login as an admin or employee
    if you open an another tab of the website it will not login as admin or employee. it will redireted to login.
    So to prevent that.(session/token storage)  */
}

import React from 'react';
import { useAuth } from '../context/authContext';
import { Navigate } from 'react-router-dom';
import { ThreeCircles } from 'react-loader-spinner';

const PrivateRoutes = ({ children }) => {
 const { user, loading } = useAuth();
 if (loading) {
  return (
   <div className='flex flex-wrap items-center justify-center bg-black/15 z-50  h-screen'>
    <div className='animate-pulse'>
     <ThreeCircles
      height='50'
      width='50'
      color='#4fa94d'
      outerCircleColor='#b98807'
      middleCircleColor='#b98807'
      innerCircleColor='#b98807'
      ariaLabel='three-circles-loading'
      wrapperStyle={{}}
      wrapperClass=''
      visible={true}
     />
    </div>
   </div>
  );
 }

 return user ? children : <Navigate to='/login' />;
};

export default PrivateRoutes;
