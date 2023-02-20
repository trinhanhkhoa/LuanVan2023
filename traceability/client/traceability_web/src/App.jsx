import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Login from "./pages/DangNhap/DangNhap";
import Register from "./pages/Register/DangKy";
import HomeScreen from "./pages/TrangChu/TrangChu";
import Navbar from "./components/Navbar";
import Sidebar from "./components/SidebarData";
import ProductScreen from './pages/SanPham/SanPham';
import Layouts from "./components/Layouts";

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/dangky" element={<Register/>}/>

          <Route path="/trangchu" element={<HomeScreen/>}/>
          <Route path="/sanpham" element={<ProductScreen/>}/>
      </Routes>
    </div>
  );
}

export default App;
