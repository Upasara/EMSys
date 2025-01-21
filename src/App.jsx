import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Admin from './pages/Admin';

function App() {
 return (
  <BrowserRouter>
   <Routes>
    <Route path="/" element={<Navigate to="/admin-dashboard" />}></Route>
    <Route path="/login" element={<Login />}></Route>
    <Route path="/admin-dashboard" element={<Admin />}></Route>
   </Routes>
  </BrowserRouter>
 );
}

export default App;
