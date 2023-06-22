import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import React, { useState } from "react";
import "./App.css";
import Home from "./pages/farmer/Home/Home";
import List from "./pages/farmer/List/List";
import Process from "./pages/farmer/Process/Process";
import Product from "./pages/farmer/Product/Product";
import CreateQR from "./pages/farmer/CreateQR/CreateQR";
import UpdateProduct from "./pages/farmer/UpdateProduct/UpdateProduct";
import WithNav from "./components/WithNav";
import ProcessDetail from "./pages/farmer/ProcessDetail/ProcessDetail";
import UserInfo from "./pages/farmer/UserInfo/UserInfo";
import EnHome from "./pages/engineer/EnHome/EnHome";
import EnCreateProcess from "./pages/engineer/EnCreateProcess/EnCreateProcess";
import ListOfProcesses from "./pages/engineer/ListOfProcesses/ListOfProcesses";
import EnProcess from "./pages/engineer/EnProcess/EnProcess";
import EnUpdateProcess from "./pages/engineer/EnUpdateProcess/EnUpdateProcess";
import EnManageAccounts from "./pages/engineer/EnManageAccounts/EnManageAccounts";
import EnUserAccount from "./pages/engineer/EnUserAccount/EnUserAccount";
import Login from "./components/Login";
import Register from "./components/Register";
import ProductTracking from "./pages/farmer/ProductTracking/ProductTracking";
import TrackingForm from "./pages/farmer/TrackingForm/TrackingForm";
import MultiStepForm from "./components/test";
import History from "./pages/farmer/History/History";
import YourComponent from "./components/test";



function App() {
  const isSignedIn = window.localStorage.getItem("signedIn");

  return (
    // <YourComponent/>
    // <MultiStepForm/>


    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={isSignedIn == true ? <EnHome /> : <Login />}
          />
          <Route path="/signup" element={<Register />} />
          <Route element={<WithNav />}>
            <Route path="/home" element={<Home />} />
            <Route path="/enhome" element={<EnHome />} />
            <Route path="/list" element={<List />} />
            <Route path="/profile" element={<UserInfo />} />

            <Route path="/product/:id" element={<Product />} />
            <Route path="/createqr" element={<CreateQR />} />
            <Route path="/updateproduct/:id" element={<UpdateProduct />} />
            <Route path="/history" element={<History />} />

            <Route path="/process" element={<Process />} />
            <Route path="/processdetail/:id" element={<ProcessDetail />} />
            <Route path="/producttracking/:id" element={<ProductTracking />} />

            <Route path="/encreateprocess" element={<EnCreateProcess />} />
            <Route path="/listofprocesses" element={<ListOfProcesses />} />
            <Route path="/enprocess/:id" element={<EnProcess />} />
            <Route path="/enupdateprocess/:id" element={<EnUpdateProcess />} />
            <Route path="/enmanageaccounts" element={<EnManageAccounts />} />
            <Route path="/enuseraccount/:id" element={<EnUserAccount />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  
  );
}

export default App;
