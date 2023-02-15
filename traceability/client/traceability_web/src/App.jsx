import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import './App.css';
import Login from './components/login/Login';
import Register from './components/register/Register';

function App() {
  return (
    <>
      <Login/>
    </>
    // <div className="App">
    //   <h3>Main page</h3>

    //   <BrowserRouter>
    //     <Routes>
    //       <Route path='/' element={<Login/>}/>
    //       {/* <Link to='/Register'>Move to Register</Link> */}
    //       <Route path='/Register' element={<Register/>}/>
    //       {/* <Link to='/Register'>Move to Register</Link> */}
    //     </Routes>
    //   </BrowserRouter>
    // </div>
  );
}

export default App;
