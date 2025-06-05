import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login'
import Register from './Pages/Register'
import Home from './Pages/Home'
import Admin from './Pages/Admin';

function App() {
  return (
    <Router>
      <Routes> 
          <Route path='/admin' element={<Admin/>}/>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
      </Routes>
    </Router>
  );
}

export default App;
