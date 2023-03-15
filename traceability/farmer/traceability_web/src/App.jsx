import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import "./App.css";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Home/Home";
import List from "./pages/List/List";
import Process from "./pages/Process/Process";
import Product from "./pages/Product/Product";
import CreateQR from "./pages/CreateQR/CreateQR";
import UpdateProduct from "./pages/UpdateProduct/UpdateProduct";
import WithNav from "./components/WithNav";
import ProcessDetail from "./pages/ProcessDetail/ProcessDetail";
import CreateProcess from "./pages/CreateProcess/CreateProcess";
import UpdateProcess from "./pages/UpdateProcess/UpdateProcess";
import UserInfo from "./pages/UserInfo/UserInfo";

function App() {
  const isSignedIn = window.localStorage.getItem("signedIn");

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={isSignedIn == "true" ? <Home /> : <SignIn />}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<WithNav />}>
            <Route path="/home" element={<Home />} />
            <Route path="/list" element={<List />} />
            <Route path="/userinfo" element={<UserInfo />} />

            <Route path="/product" element={<Product />} />
            <Route path="/createQR" element={<CreateQR />} />
            <Route path="/updateproduct" element={<UpdateProduct />} />

            <Route path="/process" element={<Process />} />
            <Route path="/createprocess" element={<CreateProcess />} />
            <Route path="/processdetail" element={<ProcessDetail />} />
            <Route path="/updateprocess" element={<UpdateProcess />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
