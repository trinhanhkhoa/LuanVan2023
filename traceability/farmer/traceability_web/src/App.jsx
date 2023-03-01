import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Home/Home";
import List from './pages/List/List';
import Process from './pages/Process/Process';
import Product from "./pages/Product/Product";
import CreateQR from "./pages/CreateQR/CreateQR";
import UpdateProduct from "./pages/UpdateProduct/UpdateProduct";
import Layouts from "./components/Layouts";

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<SignIn/>}/>
          <Route path="/signup" element={<SignUp/>}/>

          <Route path="/home" element={<Home/>}/>
          <Route path="/list" element={<List/>}/>
          <Route path="/process" element={<Process/>}/>
          <Route path="/product" element={<Product/>}/>
          
          <Route path="/createQR" element={<CreateQR/>}/>
          <Route path="/updateproduct" element={<UpdateProduct/>}/>

      </Routes>
    </div>
  );
}

export default App;
