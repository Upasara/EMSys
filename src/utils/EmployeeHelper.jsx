import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const columns = [
 {
  name: 'S no',
  selector: (row) => row.sno,
  responsive: true,
  sortable: true,
  width: '80px',
 },
 {
  name: 'Image',
  selector: (row) => row.profileImage,
  response: true,
  width: '80px',
 },
 {
  name: 'Name',
  selector: (row) => row.name,
  sortable: true,
  responsive: true,
 },
 {
  name: 'Department ',
  selector: (row) => row.dep_name,
  sortable: true,
  responsive: true,
 },
 {
  name: 'Designation',
  selector: (row) => row.emp_designation,
  responsive: true,
 },
 {
  name: 'Actions',
  selector: (row) => row.actions,
  responsive: true,
  center: 'true',
 },
];

export const fetchDepartments = async () => {
 let departments;
 try {
  const response = await axios.get('http://localhost:5000/api/department', {
   /* get request includes n authorization header with a token retirieved from localstorage,
    to ensure that only authenticated user can access the data.  */
   headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
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
  const response = await axios.get(
   `http://localhost:5000/api/employee/department/${id}`,
   {
    headers: {
     Authorization: `Bearer ${localStorage.getItem('token')}`,
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

export const EmployeeButtons = ({ Id }) => {
 const navigate = useNavigate();
 return (
  <div className='flex gap-2'>
   <button
    className='py-1 px-2 bg-green-500 text-white rounded'
    onClick={() => navigate(`/admin-dashboard/employees/${Id}`)}
   >
    View
   </button>
   <button
    className='py-1 px-2  bg-orange-500 text-white rounded'
    onClick={() => navigate(`/admin-dashboard/employees/edit/${Id}`)}
   >
    Edit
   </button>
   <button
    className='py-1 px-2  bg-red-700 text-white rounded'
    onClick={() => navigate(`/admin-dashboard/employee/salary/${Id}`)}
   >
    Salary
   </button>
   <button className='py-1 px-2  bg-red-700 text-white rounded'>Leave</button>
  </div>
 );
};
