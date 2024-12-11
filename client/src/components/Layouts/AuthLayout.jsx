import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material"; 
import { fetchUser } from "../../redux/slices/authSlice";

const AuthLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth, loading } = useSelector((state) => state.user);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (auth) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [auth]);

  if (loading || isAuthenticated === null) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#f4f4f4]">
        <CircularProgress />
      </div>
    );
  }
  if (!auth) {
    navigate("/login");
    return null;
  }

  return <>{children}</>;
};

export default AuthLayout;
