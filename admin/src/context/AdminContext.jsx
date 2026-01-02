import { createContext, forwardRef, useState } from "react";
import Slide from "@mui/material/Slide";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";

import toast from "react-hot-toast";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_PATH } from "../utils/apiPath";
import { fetchData } from "../utils/api";


export const AdminContext = createContext();

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const AdminContextProvider = (props) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [openFullScreenPanel, setOpenFullScreenPanel] = useState({
    open: false,
    model: "",
    id: "",
  });
  const [categoryData, setCategoryData] = useState(null);
  const [productData, setProductData] = useState([]);

  const alertBox = (msg, type) => {
    if (type === "success") {
      toast.success(msg);
    }
    if (type === "error") {
      toast.error(msg);
    }
  };
  const logout = () => {
    fetchData(API_PATH.AUTH.LOGOUT).then((res) => {
      console.log(res);
      if (res?.success === true) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setIsLogin(false);
        navigate("/login");
      }
    });
  };
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token !== undefined && token !== null && token !== "") {
      setIsLogin(true);
      fetchData(API_PATH.CATEGORY.GET_CATEGORIES).then((res) => {
        setCategoryData(res.data);
      });
      fetchData(API_PATH.AUTH.USER_DETAIL).then((res) => {
        
        if (res?.data?.error === true) {
          if (res?.data?.message === "You have not login") {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");

            alertBox("You are not login", "error");
            setIsLogin(false);
            navigate("/login");
            return ;
          }
        }
        setUserData(res.data);
      });
    } else {
      setIsLogin(false);
    }
  }, [isLogin]);

  const value = {
    sidebarOpen,
    setSidebarOpen,
    isLogin,
    setIsLogin,
    openFullScreenPanel,
    setOpenFullScreenPanel,
    Transition,
    alertBox,
    logout,
    userData,
    setUserData,
    categoryData,setCategoryData,
    navigate,
    productData, setProductData
  };
  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
