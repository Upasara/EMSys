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
   className='px-4 py-1 bg-primary-dark rounded-sm text-white hover:bg-primary-light'
   onClick={() => handleView(Id)}
  >
   View
  </button>
 );
};
