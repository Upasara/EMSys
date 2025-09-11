import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BiSolidEditAlt } from 'react-icons/bi';
import { MdDeleteOutline } from 'react-icons/md';
import toast from 'react-hot-toast';

{
 /* declare columns for the table */
}
export const columns = [
 {
  name: 'S no',
  selector: (row) => row.sno,
  responsive: true,
  width: '80px',
  center: 'true',
 },
 {
  name: 'Name',
  selector: (row) => row.dep_name,
  sortable: true,
  responsive: true,
  center: 'true',
 },
 {
  name: 'Manager',
  selector: (row) => row.dep_manager,
  responsive: true,
  center: 'true',
 },
 {
  name: 'Email',
  selector: (row) => row.dep_email,
  responsive: true,
  center: 'true',
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
  toast((t) => (
   <span>
    Do you want to delete this department?
    <div className='mt-2 flex gap-2 justify-center'>
     <button
      className='group px-2 py-1 bg-red-700 text-white rounded hover:shadow-lg hover:text-shadow-sm cursor-pointer duration-300'
      onClick={async () => {
       try {
        const token =
         localStorage.getItem('token') || sessionStorage.getItem('token');
        const response = await axios.delete(
         `http://localhost:5000/api/department/${id}`,
         {
          headers: {
           Authorization: `Bearer ${token}`,
          },
         }
        );
        if (response.data.success) {
         toast.success('Department deleted successfully');
         onDepartmentDelete();
        }
       } catch (error) {
        if (error.response && !error.response.data.success) {
         toast.error(error.response.data.error);
        }
       }
       toast.dismiss(t.id);
      }}
     >
      Yes
     </button>
     <button
      className='group px-2 py-1 bg-gray-600 text-white rounded hover:shadow-lg hover:text-shadow-sm cursor-pointer duration-300'
      onClick={() => toast.dismiss(t.id)}
     >
      No
     </button>
    </div>
   </span>
  ));
 };

 return (
  <div className='flex gap-2'>
   <button
    className='group py-1 px-2 bg-amber-600 text-white rounded cursor-pointer duration-300'
    onClick={() => navigate(`/admin-dashboard/department/${DepID}`)}
   >
    <BiSolidEditAlt
     size={20}
     className='group-hover:-translate-y-0.5 duration-300'
    />
   </button>
   <button
    className='group py-1 px-2  bg-red-600 text-white rounded cursor-pointer duration-300'
    onClick={() => handleDelete(DepID)}
   >
    <MdDeleteOutline
     size={20}
     className='group-hover:-translate-y-0.5 duration-300'
    />
   </button>
  </div>
 );
};
