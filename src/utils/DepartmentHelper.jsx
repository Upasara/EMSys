import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BiSolidEditAlt } from 'react-icons/bi';
import { MdDeleteOutline } from 'react-icons/md';

{
 /* declare columns for the table */
}
export const columns = [
 {
  name: 'S no',
  selector: (row) => row.sno,
  responsive: true,
  width: '80px',
 },
 {
  name: 'Department Name',
  selector: (row) => row.dep_name,
  sortable: true,
  responsive: true,
 },
 {
  name: 'Department Manager',
  selector: (row) => row.dep_manager,
  responsive: true,
 },
 {
  name: 'Department Email',
  selector: (row) => row.dep_email,
  responsive: true,
 },
 {
  name: 'Actions',
  selector: (row) => row.actions,
  responsive: true,
  center: 'true',
 },
];

export const customTableStyles = {
 headCells: {
  style: {
   fontSize: '15px',
   fontWeight: 'bold',
  },
 },
 cells: {
  style: {
   fontSize: '14px',
  },
 },
};
{
 /*Buttons on the Department List table declaration */
}
export const DepartmentButtons = ({ DepID, onDepartmentDelete }) => {
 const navigate = useNavigate();

 const handleDelete = async (id) => {
  const confirm = window.confirm('Do you want to delete this department?');
  if (confirm) {
   try {
    const token =
     localStorage.getItem('token') || sessionStorage.getItem('token');
    const response = await axios.delete(
     `http://localhost:5000/api/department/${id}`,
     {
      /* get request includes n authorization header with a token retirieved from localstorage,
                  to ensure that only authenticated user can access the data.  */
      headers: {
       Authorization: `Bearer ${token}`,
      },
     }
    );
    if (response.data.success) {
     onDepartmentDelete();
    }
   } catch (error) {
    if (error.response && !error.response.data.success) {
     alert(error.response.data.error);
    }
   }
  }
 };

 return (
  <div className='flex gap-2'>
   <button
    className='py-1 px-2 bg-orange-500 text-white rounded-sm'
    onClick={() => navigate(`/admin-dashboard/department/${DepID}`)}
   >
    <BiSolidEditAlt size={20} />
   </button>
   <button
    className='py-1 px-2  bg-red-700 text-white rounded-sm'
    onClick={() => handleDelete(DepID)}
   >
    <MdDeleteOutline size={20} />
   </button>
  </div>
 );
};
