import { Route, Routes } from "react-router-dom";
import { Admin } from "./admin/pages/Admin";
import { MainContent } from "./client/components/MainContent";
import { Login } from "./client/pages/Login";
import { Register } from "./client/pages/Register";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin/*" element={<Admin />} />
      <Route path="/*" element={<MainContent />} />
    </Routes>
  );
}

export default App;
