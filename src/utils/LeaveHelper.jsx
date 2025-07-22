import { useNavigate } from 'react-router-dom';

export const columns = [
 {
  name: 'SNO',
  selector: (row) => row.sno,
  width: '70px',
 },
 {
  name: 'Emp ID',
  selector: (row) => row.employeeId,
  width: '120px',
 },
 {
  name: 'Name',
  selector: (row) => row.name,
  width: '120px',
 },
 {
  name: 'Department',
  selector: (row) => row.dep_name,
  width: '140px',
 },
 {
  name: 'Leave Type',
  selector: (row) => row.leave_type,
  width: '140px',
 },

 { name: 'Days', selector: (row) => row.days, width: '120px' },
 {
  name: 'Status',
  selector: (row) => row.status,
 },
 {
  name: 'Action',
  selector: (row) => row.actions,
 },
];

export const LeaveButton = ({ Id }) => {
 const navigate = useNavigate();

 const handleView = (id) => {
  navigate(`/admin-dashboard/leave/${id}`);
 };

 return (
  <button
   className='px-4 py-1 bg-primaryDark rounded text-white hover:bg-primaryLight'
   onClick={() => handleView(Id)}
  >
   View
  </button>
 );
};
