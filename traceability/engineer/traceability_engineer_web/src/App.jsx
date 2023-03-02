import './App.css';
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Home/Home";
import CreateProcess from './pages/CreateProcess/CreateProcess';
import List from './pages/List/List';
import Process from './pages/Process/Process';
import UpdateProcess from './pages/UpdateProcess/UpdateProcess';


function App() {
  return (
    <div className="App">
       <Routes>
          <Route path="/" element={<SignIn/>}/>
          <Route path="/signup" element={<SignUp/>}/>

          <Route path="/home" element={<Home/>}/>
          <Route path="/list" element={<List/>}/>
          <Route path="/process" element={<Process/>}/>
          
          <Route path="/createprocess" element={<CreateProcess/>}/>
          {/* <Route path="/updateprocess" element={<UpdateProcess/>}/> */}

      </Routes>
    </div>
  );
}

export default App;
