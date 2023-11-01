import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Admin } from "./admin/pages/Admin";
import { AppSnackbar } from "./client/components/AppSnackbar";
import { MainContent } from "./client/components/MainContent";
import { LoadingBackDrop } from "./client/components/common/LoadingBackDrop";
import { ForgotPassword } from "./client/pages/ForgotPassword";
import { Login } from "./client/pages/Login";
import { NotFound } from "./client/pages/NotFound";
import { Register } from "./client/pages/Register";
import { ResetPassword } from "./client/pages/ResetPassword";
import { generateUUID } from "./controllers/utils";
import { Role } from "./model/user";
import { RootState } from "./reducers/combineReducer";

function App() {
  const isLogin = useSelector((state: RootState) => state.user.loggedIn);
  const role = useSelector((state: RootState) => state.user.role);
  const deviceId = localStorage.getItem("deviceId");
  useEffect(() => {
    if (!deviceId) {
      const uuid = generateUUID();
      localStorage.setItem("deviceId", uuid);
    }
  }, [deviceId]);
  return (
    <div>
      <AppSnackbar />
      <LoadingBackDrop />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        {isLogin && role === Role.ADMIN && (
          <Route path="/*" element={<Admin />} />
        )}
        {role !== Role.ADMIN && <Route path="/*" element={<MainContent />} />}
        <Route path="/404" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
