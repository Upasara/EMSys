import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Admin from './pages/Admin';
import EmployeeDashboard from './pages/EmployeeDashboard.jsx';

function App() {
 return (
  <BrowserRouter>
   <Routes>
    <Route path='/' element={<Navigate to='/admin-dashboard' />}></Route>
    <Route path='/login' element={<Login />}></Route>
    <Route path='/admin-dashboard' element={<Admin />}></Route>
    <Route path='/employee-dashboard' element={<EmployeeDashboard />}></Route>
   </Routes>
  </BrowserRouter>
 );
}

export default App;
