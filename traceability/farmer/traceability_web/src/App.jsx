import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from 'react';
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
import ProcessDetail from "./pages/ProcessDetail/ProcessDetail";
import CreateProcess from "./pages/CreateProcess/CreateProcess";
import UpdateProcess from "./pages/UpdateProcess/UpdateProcess";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer/Footer";
import UserInfo from "./pages/UserInfo/UserInfo";


function App() {
  const isSignedIn = window.localStorage.getItem("signedIn");
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes >
            <Route path="/" element={isSignedIn == "true" ? <Home/> : <SignIn/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/userinfo" element={<UserInfo/>}/>

            {/* <Route path="/" element={<Home/>}/>  */}
            <Route path="/list" element={<List/>}/>

            <Route path="/product" element={<Product/>}/>          
            <Route path="/createQR" element={<CreateQR/>}/>
            <Route path="/updateproduct" element={<UpdateProduct/>}/>

            <Route path="/process" element={<Process/>}/>
            <Route path="/createprocess" element={<CreateProcess/>}/>
            <Route path="/processdetail" element={<ProcessDetail/>}/>
            <Route path="/updateprocess" element={<UpdateProcess/>}/>

        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
