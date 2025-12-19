import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { IoNotifications } from "react-icons/io5";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IoPersonCircleOutline } from "react-icons/io5";

import { MdLogout } from "react-icons/md";
import Divider from '@mui/material/Divider';
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 2,
    top: 3,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: "0 4px",
  },
}));


function Header() {
  const navigate = useNavigate()
  const [anchorMyAcc, setAnchorMyAcc] = useState(null);
  const {sidebarOpen,setSidebarOpen, isLogin,setIsLogin,logout,userData} = useContext(AdminContext)
  const open = Boolean(anchorMyAcc);
  const handleClickMyAcc = (event) => {
    setAnchorMyAcc(event.currentTarget);
  };
  const handleCloseMyAcc = () => {
    setAnchorMyAcc(null);
  };
  return (
    <header className={`w-full h-auto py-2 transition-all ${sidebarOpen===true? "lg:pl-45 xl:pl-57" :"pl-2"} pr-10 bg-[#ffff] shadow-md flex items-center justify-between`}>
      <div>
        <Button className="w-10! h-10! min-w-10! rounded-full! " onClick={()=>setSidebarOpen(!sidebarOpen)}>
          <HiOutlineMenuAlt2 className="text-[22px] text-black" />
        </Button>
      </div>
      <div className="w-[40%]  flex items-center justify-end gap-4">
        <IconButton aria-label="cart">
          <StyledBadge badgeContent={4} color="secondary">
            <IoNotifications />
          </StyledBadge>
        </IconButton>
        {
            isLogin === true ?
            <div className="relative">
          <div
            className="rounded-full w-7.5 h-7.5 min-w-7.5 overflow-hidden cursor-pointer"
            onClick={handleClickMyAcc}
          >
            <img
              src={userData?.avatar}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          
          <Menu
            anchorEl={anchorMyAcc}
            id="account-menu"
            open={open}
            onClose={handleCloseMyAcc}
            onClick={handleCloseMyAcc}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleCloseMyAcc}>
              <div className="">
                <div className="flex items-center gap-1">
                  <div className="rounded-full w-7.5 h-7.5 min-w-7.5 overflow-hidden cursor-pointer">
                    <img
                      src={userData?.avatar}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h1 className="text-xs font-bold">{userData?.name}</h1>
                    <p className="text-[8px] text-gray-400 font-light">{userData?.email}</p>
                  </div>
                </div>
              </div>
            </MenuItem>
             <Divider />
            <MenuItem onClick={()=>navigate("/admin-profile")}>
              <IoPersonCircleOutline/>Profile
            </MenuItem>
            <MenuItem onClick={logout}>                   
              <MdLogout/>Sign Out
            </MenuItem>
          </Menu>
        </div>:
        <button onClick={()=>{setIsLogin(false), navigate('/login')}} className="text-white bg-primary py-1 px-5 rounded-full hover:text-primary hover:border hover:border-primary hover:bg-white cursor-pointer ">
          Sign In
        </button>
          }
        
      </div>
    </header>
  );
}

export default Header;
