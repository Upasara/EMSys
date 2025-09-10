import { MdMenu } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export const columns = [
 {
  name: 'SNO',
  selector: (row) => row.sno,
  width: '70px',
  center: 'true',
 },
 {
  name: 'Emp ID',
  selector: (row) => row.employeeId,
  center: 'true',
 },
 {
  name: 'Name',
  selector: (row) => row.name,
  center: 'true',
 },
 {
  name: 'Department',
  selector: (row) => row.dep_name,
  center: 'true',
 },
 {
  name: 'Leave Type',
  selector: (row) => row.leave_type,
  center: 'true',
 },

 { name: 'Days', selector: (row) => row.days, center: 'true' },
 {
  name: 'Status',
  selector: (row) => row.status,
  center: 'true',
  sortable: true,
  cell: (row) => {
   let colorClass = '';
   if (row.status === 'Approved') {
    colorClass = 'bg-green-100 text-green-800';
   } else if (row.status === 'Rejected') {
    colorClass = 'bg-red-100 text-red-800';
   } else if (row.status === 'Pending') {
    colorClass = 'bg-yellow-100 text-yellow-800';
   }
   return <span className={colorClass}>{row.status}</span>;
  },
 },
 {
  name: 'Action',
  selector: (row) => row.actions,
  center: 'true',
 },
];

export const customTableStyles = {
 headCells: {
  style: {
   fontSize: '15px',
   fontWeight: 'bold',
   fontColor: '#FFFFFF',
  },
 },
 cells: {
  style: {
   fontSize: '14px',
  },
 },
};

export const LeaveButton = ({ Id }) => {
 const navigate = useNavigate();

 const handleView = (id) => {
  navigate(`/admin-dashboard/leaves/${id}`);
 };

 return (
  <button
   className='group py-1 px-2 bg-emerald-600 text-white rounded cursor-pointer'
   onClick={() => handleView(Id)}
  >
   <MdMenu size={20} className={'group-hover:-translate-y-0.5 duration-300'} />
  </button>
 );
};
