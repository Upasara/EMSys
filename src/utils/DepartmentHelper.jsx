import { useNavigate } from 'react-router-dom';

{
 /* declare columns for the table */
}
export const columns = [
 {
  name: 'S no',
  selector: (row) => row.sno,
 },
 {
  name: 'Department Name',
  selector: (row) => row.dep_name,
 },
 {
  name: 'Department Manager',
  selector: (row) => row.dep_manager,
 },
 {
  name: 'Department Email',
  selector: (row) => row.dep_email,
 },
 {
  name: 'Actions',
  selector: (row) => row.actions,
 },
];

{
 /*Buttons on the Department List table declaration */
}
export const DepartmentButtons = ({ DepID }) => {
 const navigate = useNavigate();
 return (
  <div className='flex gap-2'>
   <button
    className='py-1 px-2 bg-orange-500 text-white rounded'
    onClick={() => navigate(`/admin-dashboard/department/${DepID}`)}
   >
    Edit
   </button>
   <button className='py-1 px-2  bg-red-700 text-white rounded'>Remove</button>
  </div>
 );
};
