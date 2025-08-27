import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const columns = [
 {
  name: 'S no',
  selector: (row) => row.sno,

  width: '80px',
 },
 {
  name: 'Image',
  selector: (row) => row.profileImage,

  width: '80px',
 },
 {
  name: 'Name',
  selector: (row) => row.name,
  sortable: true,

  width: '200px',
 },
 {
  name: 'Department ',
  selector: (row) => row.dep_name,
  sortable: true,

  width: '150px',
 },
 {
  name: 'Designation',
  selector: (row) => row.emp_designation,

  width: '150px',
 },
 {
  name: 'Actions',
  selector: (row) => row.actions,

  center: 'true',
 },
];

export const conditionalRowStyles = [
 {
  when: (row) => !row.isActive, // Apply style when isActive is false
  style: {
   opacity: 0.5,
  },
 },
];

export const fetchDepartments = async () => {
 let departments;
 try {
  const token =
   localStorage.getItem('token') || sessionStorage.getItem('token');
  const response = await axios.get('http://localhost:5000/api/department', {
   /* get request includes n authorization header with a token retirieved from localstorage,
    to ensure that only authenticated user can access the data.  */
   headers: {
    Authorization: `Bearer ${token}`,
   },
  });
  if (response.data.success) {
   departments = response.data.departments;
  }
 } catch (error) {
  if (error.response && !error.response.data.success) {
   alert(error.response.data.error);
  }
 }
 return departments;
};

//employees for salary and leave management
export const getEmployees = async (id) => {
 let employees;
 try {
  const token =
   localStorage.getItem('token') || sessionStorage.getItem('token');
  const response = await axios.get(
   `http://localhost:5000/api/employee/department/${id}`,
   {
    headers: {
     Authorization: `Bearer ${token}`,
    },
   }
  );
  if (response.data.success) {
   console.log(response.data);
   employees = response.data.employees;
  }
 } catch (error) {
  if (error.response && !error.response.data.success) {
   alert(error.response.data.error);
  }
 }
 return employees;
};

export const fetchActiveStatus = async (id) => {
 let isActive = true; // default value
 try {
  const token =
   localStorage.getItem('token') || sessionStorage.getItem('token');
  const response = await axios.get(`http://localhost:5000/api/employee/${id}`, {
   headers: {
    Authorization: `Bearer ${token}`, // get request includes n authorization header with a token retirieved from localstorage,
   },
  });
  if (response.data.success) {
   isActive = response.data.employee.isActive;
   console.log(isActive); // return employee active status
  }
 } catch (error) {
  if (error.response && !error.response.data.success) {
   alert(error.response.data.error);
  }
 }
 return isActive;
};

export const EmployeeButtons = ({ Id }) => {
 const navigate = useNavigate();
 const [isActive, setIsActive] = useState(true);
 const [isLoading, setIsLoading] = useState(false);

 //  fetch employee active status from database
 useEffect(() => {
  const fetchEmployeeStatus = async () => {
   try {
    const token =
     localStorage.getItem('token') || sessionStorage.getItem('token');
    const response = await axios.get(
     `http://localhost:5000/api/employee/${Id}`,
     {
      headers: {
       Authorization: `Bearer ${token}`,
      },
     }
    );
    if (response.data.success) {
     setIsActive(response.data.employee.isActive);
    }
   } catch (error) {
    alert('Error fetching employee status. Please try again.');
   }
  };
  fetchEmployeeStatus();
 }, [Id]);

 const handleToggleStatus = async () => {
  try {
   setIsLoading(true);
   const token =
    localStorage.getItem('token') || sessionStorage.getItem('token');
   const endpoint = isActive
    ? `http://localhost:5000/api/employee/deactivate/${Id}`
    : `http://localhost:5000/api/employee/activate/${Id}`;

   const response = await axios.put(endpoint, null, {
    headers: {
     Authorization: `Bearer ${token}`,
    },
   });
   if (response.data.success) {
    alert(
     isActive
      ? 'Employee deactivated successfully'
      : 'Employee activated successfully'
    );
    setIsActive(!isActive);
   }
  } catch (error) {
   console.error(
    isActive ? 'Error deactivating employee:' : 'Error activating employee:',
    error
   );
   alert(
    isActive
     ? 'Error deactivating employee. Please try again.'
     : 'Error activating employee. Please try again.'
   );
  } finally {
   setIsLoading(false);
  }
 };

 return (
  <div className='flex gap-2 items-center'>
   {/* view button */}
   <button
    className={`py-1 px-2 bg-green-500 text-white rounded ${
     !isActive || isLoading ? 'cursor-not-allowed' : ''
    }`}
    onClick={() => navigate(`/admin-dashboard/employees/${Id}`)}
    disabled={!isActive || isLoading}
   >
    View
   </button>
   {/* edit button */}
   <button
    className={`py-1 px-2 bg-orange-600 text-white rounded ${
     !isActive || isLoading ? 'cursor-not-allowed' : ''
    }`}
    onClick={() => navigate(`/admin-dashboard/employees/edit/${Id}`)}
    disabled={!isActive || isLoading}
   >
    Edit
   </button>
   {/* salary button */}
   <button
    className={`py-1 px-2 bg-blue-600 text-white rounded ${
     !isActive || isLoading ? 'cursor-not-allowed' : ''
    }`}
    onClick={() => navigate(`/admin-dashboard/employee/salary/${Id}`)}
    disabled={!isActive || isLoading}
   >
    Salary
   </button>
   {/* leave button */}
   <button
    className={`py-1 px-2 bg-red-600 text-white rounded ${
     !isActive || isLoading ? 'cursor-not-allowed' : ''
    }`}
    onClick={() => navigate(`/admin-dashboard/employees/leaves/${Id}`)}
    disabled={!isActive || isLoading}
   >
    Leave
   </button>
   {/* toggle switch */}
   <label className='flex items-center cursor-pointer'>
    <div className='relative'>
     <input
      type='checkbox'
      checked={isActive}
      onChange={handleToggleStatus}
      disabled={isLoading}
      className='sr-only'
     />
     <div
      className={`block w-10 h-6 rounded-full ${
       isActive ? 'bg-green-500' : 'bg-gray-300'
      }`}
     ></div>
     <div
      className={`dot absolute left-1 top-1 w-4 h-4 rounded-full transition ${
       isActive ? 'bg-white translate-x-4' : 'bg-gray-500'
      }`}
     ></div>
    </div>
   </label>
  </div>
 );
};
