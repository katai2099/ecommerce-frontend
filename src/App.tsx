import { Route, Routes } from "react-router-dom";
import { Admin } from "./admin/pages/Admin";
import { MainContent } from "./client/components/MainContent";
import { SignIn } from "./client/pages/SignIn";
import { SignUp } from "./client/pages/SignUp";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/admin/*" element={<Admin />} />
      <Route path="/*" element={<MainContent />} />
    </Routes>
  );
}

export default App;
