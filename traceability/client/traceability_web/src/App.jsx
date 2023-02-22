import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Login from "./pages/DangNhap/DangNhap";
import Register from "./pages/DangKy/DangKy";
import TrangChu from "./pages/TrangChu/TrangChu";
import DanhSachSanPham from './pages/DanhSachSanPham/DanhSachSanPham';
import QuyTrinh from './pages/QuyTrinh/QuyTrinh';
import SanPham from "./pages/SanPham/SanPham";
import Layouts from "./components/Layouts";

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/dangky" element={<Register/>}/>

          <Route path="/trangchu" element={<TrangChu/>}/>
          <Route path="/danhsachsanpham" element={<DanhSachSanPham/>}/>
          <Route path="/quytrinh" element={<QuyTrinh/>}/>
          <Route path="/sanpham" element={<SanPham/>}/>

      </Routes>
    </div>
  );
}

export default App;
