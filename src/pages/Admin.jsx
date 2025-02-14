import React from 'react';
import { useAuth } from '../context/authContext';

const Admin = () => {
 const { user } = useAuth();

 return <div>Hello , {user && user.name}</div>;
};

export default Admin;
