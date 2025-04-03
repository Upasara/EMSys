import React from 'react';
import { useAuth } from '../context/authContext';
import AdminSidebar from '../components/dashboard/AdminSidebar';

const Admin = () => {
 const { user } = useAuth();

 return (
  <div>
   <AdminSidebar />
  </div>
 );
};

export default Admin;
