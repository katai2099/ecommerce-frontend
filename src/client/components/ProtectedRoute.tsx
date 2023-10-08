import { useSelector } from "react-redux";
import { Navigate, RouteProps } from "react-router-dom";
import { RootState } from "../../reducers/combineReducer";

export const ProtectedRoute = ({ element }: RouteProps) => {
  const isLogin = useSelector((state: RootState) => state.user.loggedIn);

  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }

  return <div>{element}</div>;
};
