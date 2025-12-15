import { createContext, forwardRef, useState } from "react";
import Slide from '@mui/material/Slide';


export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const [openFullScreenPanel, setOpenFullScreenPanel] = useState(false);
  
  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const handleClickOpenFullScreenPanel = () => {
    setOpenFullScreenPanel(true);
  };

  const handleCloseFullScreenPanel = () => {
    setOpenFullScreenPanel(false);
  };

  const value = {
    sidebarOpen,
    setSidebarOpen,
    isLogin,
    setIsLogin,
    openFullScreenPanel,
    setOpenFullScreenPanel,
    Transition,
    handleClickOpenFullScreenPanel,handleCloseFullScreenPanel
  };
  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
