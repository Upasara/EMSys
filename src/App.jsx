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
import AddSalary from './components/salary/AddSalary.jsx';
import ViewSalary from './components/salary/ViewSalary.jsx';
import EmployeeSummaryCard from './components/EmployeeDashboard/EmployeeSummaryCard.jsx';
import LeaveList from './components/leave/LeaveList.jsx';
import AddLeave from './components/leave/AddLeave.jsx';
import PaymentSlip from './components/salary/PaymentSlip.jsx';
import PrintableView from './components/salary/PrintableView.jsx';
import Settings from './components/EmployeeDashboard/Settings.jsx';
import LeaveTable from './components/leave/LeaveTable.jsx';

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

     {/* Employee salary route */}
     <Route
      path='/admin-dashboard/employee/salary/:id'
      element={<ViewSalary />}
     ></Route>

     {/* Add salary route */}
     <Route path='/admin-dashboard/salary/add' element={<AddSalary />}></Route>

     {/* view salary route */}
     <Route
      path='/admin-dashboard/salary/view/:id'
      element={<PaymentSlip />}
     ></Route>
     {/* view leave route */}
     <Route path='/admin-dashboard/leaves' element={<LeaveTable />}></Route>
     <Route path='/admin-dashboard/leaves/:id' element={<LeaveTable />}></Route>
    </Route>
    {/*End of Admin Dashboard route */}

    <Route path='/salary/view/:id' element={<PrintableView />}></Route>

    {/*Private routes for Employee Dashboard */}
    <Route
     path='/employee-dashboard'
     element={
      <PrivateRoutes>
       <RoleBaseRoutes requiredRole={['admin', 'employee']}>
        <EmployeeDashboard />
       </RoleBaseRoutes>
      </PrivateRoutes>
     }
    >
     <Route index element={<EmployeeSummaryCard />}></Route>

     {/* employee profile route */}
     <Route
      path='/employee-dashboard/profile/:id'
      element={<ViewEmployee />}
     ></Route>

     {/* employee leave route */}
     <Route path='/employee-dashboard/leaves' element={<LeaveList />}></Route>

     {/* employee leave route */}
     <Route path='/employee-dashboard/add-leave' element={<AddLeave />}></Route>

     {/* employee salary route */}
     <Route
      path='/employee-dashboard/salary/:id'
      element={<ViewSalary />}
     ></Route>

     {/* employee settings route */}
     <Route path='/employee-dashboard/setting' element={<Settings />}></Route>
    </Route>
   </Routes>
  </BrowserRouter>
 );
}

export default App;
