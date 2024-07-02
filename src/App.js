import {BrowserRouter, Routes, Route} from "react-router-dom"
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Users from "./pages/Users";
import Pengajuan from "./pages/Pengajuan";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import AddPengajuan from "./pages/AddPengajuan";
import EditPengajuan from "./pages/EditPengajuan";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/users" element={<Users />}/>
          <Route path="/users/add" element={<AddUser />}/>
          <Route path="/users/edit/:id" element={<EditUser />}/>
          <Route path="/pengajuan" element={<Pengajuan />}/>
          <Route path="/pengajuan/add" element={<AddPengajuan />}/>
          <Route path="/pengajuan/edit/:id" element={<EditPengajuan />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
