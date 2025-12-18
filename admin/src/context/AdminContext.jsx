import { createContext, forwardRef, useState } from "react";
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import AddProduct from "../pages/Products/AddProduct";
import AddHomeBanner from "../pages/Home/AddHomeBanner";
import AddCategory from "../pages/Category/AddCategory";
import AddSubCategory from "../pages/Category/AddSubCategory";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { fetchData } from "../../../client/src/utils/api";
import { API_PATH } from "../../../client/src/utils/apiPath";
import {useNavigate} from 'react-router-dom'

export const AdminContext = createContext();

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const AdminContextProvider = (props) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
   const [userData, setUserData] = useState(null)
   const navigate = useNavigate()
  const [openFullScreenPanel, setOpenFullScreenPanel] = useState({
    open:false,
    model:''
  });
  
   const alertBox = (msg,type)=>{
  if (type === "success") {
    toast.success(msg)
  }
  if (type === "error") {
    toast.error(msg)
  }
}
 const logout = ()=>{
    fetchData(API_PATH.AUTH.LOGOUT).then((res)=>{
      console.log(res);
      if (res?.success === true) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setIsLogin(false);
        navigate("/login")
      }
    })
  }
 useEffect(() => {
    const token = localStorage.getItem("accessToken")
    if (token !== undefined && token !== null && token !== "") {
    setIsLogin(true);
    fetchData(API_PATH.AUTH.USER_DETAIL).then((res)=>{
      setUserData(res.data)
    })
  }else{
    setIsLogin(false)
  }
}, [isLogin])

  const value = {
    sidebarOpen,
    setSidebarOpen,
    isLogin,
    setIsLogin,
    openFullScreenPanel,
    setOpenFullScreenPanel,
    Transition,
    alertBox,
    logout
  };
  return (
    <AdminContext.Provider value={value}>
        <Dialog
        fullScreen
        open={openFullScreenPanel.open}
        onClose={()=>setOpenFullScreenPanel({
        open:false,
        })}
        slots={{
          transition: Transition,
        }}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={()=>setOpenFullScreenPanel({
                open:false,
              })}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {openFullScreenPanel.model}
            </Typography>
          </Toolbar>
        </AppBar>
        {
          openFullScreenPanel?.model === "Add Product"&&(
            <AddProduct/>
          )
        }
        {
          openFullScreenPanel?.model === "Add Home Banners Slide" && (
            <AddHomeBanner/>
          )
        }
        {
          openFullScreenPanel?.model === "Add Category" && (
            <AddCategory/>
          )
        }
        {
          openFullScreenPanel?.model === "Add Sub Category" && (
            <AddSubCategory/>
          )
        }
      </Dialog>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
