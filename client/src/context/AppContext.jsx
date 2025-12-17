import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fetchData } from "../utils/api";
import { API_PATH } from "../utils/apiPath";


export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [openProductDetailModel, setOpenProductDetailModel] = useState(false);
  const [selectedProductCard, setSelectedProductCard] = useState(null);
  const [openCartPanel, setOpenCartPanel] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null)
  const [activeTab, setActiveTab] = useState("account");
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
    openProductDetailModel,
    setOpenProductDetailModel,
    selectedProductCard,
    setSelectedProductCard,
    handleClickOpenProductDetailModel,  
    handleCloseOpenProductDetailModel,
    openCartPanel,setOpenCartPanel,toggleDrawer,
    isLogin,setIsLogin,
    activeTab, setActiveTab, apiUrl,
    alertBox,userData, setUserData
  }

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider;