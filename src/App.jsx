import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Admin from './pages/Admin';
import EmployeeDashboard from './pages/EmployeeDashboard.jsx';
import PrivateRoutes from './utils/PrivateRoutes.jsx';
import RoleBaseRoutes from './utils/RoleBaseRoutes.jsx';
import AdminSummary from './components/dashboard/AdminSummary.jsx';
import DepartmentList from './components/department/DepartmentList.jsx';
import AddDepartment from './components/department/AddDepartment.jsx';
import EditDepartment from './components/department/EditDepartment.jsx';
import EmployeeList from './components/employee/EmployeeList.jsx';
import AddEmployee from './components/employee/AddEmployee.jsx';
import ViewEmployee from './components/employee/ViewEmployee.jsx';
import EditEmployee from './components/employee/EditEmployee.jsx';

function App() {
 return (
  <BrowserRouter>
   <Routes>
    <Route path='/' element={<Navigate to='/admin-dashboard' />}></Route>
    <Route path='/login' element={<Login />}></Route>

    {/*Private routes for Admin Dashboard */}
    <Route
     path='/admin-dashboard'
     element={
      <PrivateRoutes>
       <RoleBaseRoutes requiredRole={['admin']}>
        <Admin />
       </RoleBaseRoutes>
      </PrivateRoutes>
     }
    >
     <Route index element={<AdminSummary />}></Route>
     {/*Department list route */}
     <Route
      path='/admin-dashboard/departments'
      element={<DepartmentList />}
     ></Route>

     {/*Add department route */}
     <Route
      path='/admin-dashboard/add-department'
      element={<AddDepartment />}
     ></Route>

     {/*Edit department route */}
     <Route
      path='/admin-dashboard/department/:id'
      element={<EditDepartment />}
     ></Route>

     {/*Employee List route */}
     <Route
      path='/admin-dashboard/employees'
      element={<EmployeeList />}
     ></Route>
     {/*Employee List route */}
     <Route
      path='/admin-dashboard/add-employee'
      element={<AddEmployee />}
     ></Route>
     {/* View Employee route */}
     <Route
      path='/admin-dashboard/employees/:id'
      element={<ViewEmployee />}
     ></Route>
     {/* Edit Employee route */}
     <Route
      path='/admin-dashboard/employees/edit/:id'
      element={<EditEmployee />}
     ></Route>
    </Route>
    {/*End of Admin Dashboard route */}

    {/*Private routes for Employee Dashboard */}
    <Route path='/employee-dashboard' element={<EmployeeDashboard />}></Route>
   </Routes>
  </BrowserRouter>
 );
}

export default App;
