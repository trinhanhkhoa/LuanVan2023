import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import DangNhap from "./pages/DangNhap/DangNhap";
import DangKy from "./pages/DangKy/DangKy";
import TrangChu from "./pages/TrangChu/TrangChu";
import ListOfProducts from './pages/ListOfProducts/ListOfProducts';
import QuyTrinh from './pages/QuyTrinh/QuyTrinh';
import SanPham from "./pages/SanPham/SanPham";
import TaoQR from "./pages/TaoQR/TaoQR";
import CapNhatSanPham from "./pages/CapNhatSanPham/CapNhatSanPham";
import Layouts from "./components/Layouts";

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<DangNhap/>}/>
          <Route path="/dangky" element={<DangKy/>}/>

          <Route path="/trangchu" element={<TrangChu/>}/>
          <Route path="/list" element={<ListOfProducts/>}/>
          <Route path="/quytrinh" element={<QuyTrinh/>}/>
          <Route path="/sanpham" element={<SanPham/>}/>
          
          <Route path="/taoqr" element={<TaoQR/>}/>
          <Route path="/capnhatsanpham" element={<CapNhatSanPham/>}/>

      </Routes>
    </div>
  );
}

export default App;
