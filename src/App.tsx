import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Admin } from "./admin/pages/Admin";
import { MainContent } from "./client/components/MainContent";
import { Login } from "./client/pages/Login";
import { Register } from "./client/pages/Register";
import { Role } from "./model/user";
import { RootState } from "./reducers/combineReducer";

function App() {
  const isLogin = useSelector((state: RootState) => state.user.loggedIn);
  const role = useSelector((state: RootState) => state.user.role);
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {isLogin && role === Role.ADMIN && (
          <Route path="/admin/*" element={<Admin />} />
        )}
        {role !== Role.ADMIN && <Route path="/*" element={<MainContent />} />}
      </Routes>
    </div>
  );
}

export default App;
