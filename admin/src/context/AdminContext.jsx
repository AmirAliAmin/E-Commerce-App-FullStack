import { createContext, forwardRef, useState } from "react";
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import AddProduct from "../pages/Products/AddProduct";
import AddHomeBanner from "../pages/Home/AddHomeBanner";
import AddCategory from "../pages/Category/AddCategory";
import AddSubCategory from "../pages/Category/AddSubCategory";

export const AdminContext = createContext();

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const AdminContextProvider = (props) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const [openFullScreenPanel, setOpenFullScreenPanel] = useState({
    open:false,
    model:''
  });
  

  const value = {
    sidebarOpen,
    setSidebarOpen,
    isLogin,
    setIsLogin,
    openFullScreenPanel,
    setOpenFullScreenPanel,
    Transition,
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
