import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fetchData } from "../utils/api";
import { API_PATH } from "../utils/apiPath";
import { useNavigate } from "react-router-dom";



export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [openProductDetailModel, setOpenProductDetailModel] = useState(false);
  const [selectedProductCard, setSelectedProductCard] = useState(null);
  const [openCartPanel, setOpenCartPanel] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null)
  const [activeTab, setActiveTab] = useState("account");
  const navigate = useNavigate()
  const apiUrl = import.meta.env.VITE_API_URL;

  // Fixed function names (removed typos)
  const handleClickOpenProductDetailModel = (card) => {
    setSelectedProductCard(card);
    setOpenProductDetailModel(true);
  }


  const toggleDrawer = (newOpen)=>{
    setOpenCartPanel(newOpen)
  }
  const handleCloseOpenProductDetailModel = () => {
    setOpenProductDetailModel(false);
    setSelectedProductCard(null);
  }

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
        navigate("/")
      }
    })
  }
 useEffect(() => {
    const token = localStorage.getItem("accessToken")
    if (token !== undefined && token !== null && token !== "") {
    setIsLogin(true);
    fetchData(API_PATH.AUTH.USER_DETAIL).then((res)=>{
      setUserData(res.data)
      if (res?.res?.data?.error === true) {
        if (res?.res?.data?.message==="You have not login") {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");

          alertBox("You are not login", "error");
          setIsLogin(false)
        }
      }
    })
  }else{
    setIsLogin(false)
  }
}, [isLogin])


  const value = {
    openProductDetailModel,
    setOpenProductDetailModel,
    selectedProductCard,
    setSelectedProductCard,
    handleClickOpenProductDetailModel,  
    handleCloseOpenProductDetailModel,
    openCartPanel,setOpenCartPanel,toggleDrawer,
    isLogin,setIsLogin,
    activeTab, setActiveTab, apiUrl,
    alertBox,userData, setUserData,
    logout
  }

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider;