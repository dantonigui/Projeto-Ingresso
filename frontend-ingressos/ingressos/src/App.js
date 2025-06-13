import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login'
import Register from './Pages/Register'
import Home from './Pages/Home'
import Admin from './Pages/AdminPanel';
import AdminLogin from './Pages/AdminLogin';

function App() {
  return (
    <Router>
      <Routes> 
          <Route path='/adminpanel' element={<Admin/>}/>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/admin' element={<AdminLogin/>}/>
      </Routes>
    </Router>
  );
}

export default App;
