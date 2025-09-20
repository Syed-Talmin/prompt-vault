import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios/axios.js";
import { MyContext } from "../config/Context";
const authWrapper = ({ children }) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(MyContext);

  useEffect(() => {
    if (user) {
      return <>{children}</>;
    }
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/auth");
    }

    async function isValidToken() {
      try {
        const res = await api.get("/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data.userDetails);
      } catch (error) {
        localStorage.removeItem("token");
        navigate("/auth");
      }
    }

    isValidToken();
  }, []);

  if (!user) {
    return null;
  }

  return <>{children}</>;
};

export default authWrapper;
