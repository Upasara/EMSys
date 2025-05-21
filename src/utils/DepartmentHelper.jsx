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

export const DepartmentButtons = () => {
 return (
  <div>
   <button>Edit</button>
   <button>Remove</button>
  </div>
 );
};
