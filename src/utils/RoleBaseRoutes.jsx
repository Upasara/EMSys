{
 /*PrivateRoutes and RoleBaseRoutes was used to define, in simple words once we login as an admin or employee
       if you open an another tab of the website it will not login as admin or employee. it will redireted to login.
       So to prevent that.  */
}

import React from 'react';
import { useAuth } from '../context/authContext';
import { Navigate } from 'react-router-dom';

const RoleBaseRoutes = ({ children, requiredRole }) => {
 const { user, loading } = useAuth();

 if (loading) {
  return <div>Loading...</div>;
 }

 if (!requiredRole.includes(user.role)) {
  <Navigate to='/unauthorized' />;
 }

 return user ? children : <Navigate to='/login' />;
};

export default RoleBaseRoutes;
