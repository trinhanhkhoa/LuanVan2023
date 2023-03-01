import './App.css';
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Home/Home";


function App() {
  return (
    <div className="App">
       <Routes>
          <Route path="/" element={<SignIn/>}/>
          <Route path="/signup" element={<SignUp/>}/>

          <Route path="/home" element={<Home/>}/>
          {/* <Route path="/list" element={<List/>}/> */}
          {/* <Route path="/process" element={<Process/>}/> */}
          {/* <Route path="/product" element={<Product/>}/> */}
          
          {/* <Route path="/createQR" element={<CreateQR/>}/> */}
          {/* <Route path="/updateproduct" element={<UpdateProduct/>}/> */}

      </Routes>
    </div>
  );
}

export default App;
