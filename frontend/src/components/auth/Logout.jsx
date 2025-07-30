import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        await axios.get("/api/v1/auth/logout", {
          withCredentials: true, // so cookie gets cleared
        });

        dispatch(setUser(null));
        localStorage.clear();

        navigate("/login");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };

    logoutUser();
  }, [dispatch, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <h2 className="text-lg font-semibold">Logging out...</h2>
    </div>
  );
};

export default Logout;
