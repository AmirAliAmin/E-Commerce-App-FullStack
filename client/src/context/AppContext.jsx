import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fetchData, postData } from "../utils/api";
import { API_PATH } from "../utils/apiPath";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [openProductDetailModel, setOpenProductDetailModel] = useState(false);
  const [selectedProductCard, setSelectedProductCard] = useState(null);
  const [openCartPanel, setOpenCartPanel] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState("account");
  const [categoryData, setCategoryData] = useState(null);
  const [cartData, setCartData] = useState([]);
  const [isAdded, setIsAdded] = useState(false);
  const [address, setAddress] = useState([]);
  const [searchData, setSearchData] = useState([])
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  // Fixed function names (removed typos)
  const handleClickOpenProductDetailModel = (card) => {
    setSelectedProductCard(card);
    setOpenProductDetailModel(true);
  };

  const toggleDrawer = (newOpen) => {
    setOpenCartPanel(newOpen);
  };
  const handleCloseOpenProductDetailModel = () => {
    setOpenProductDetailModel(false);
    setSelectedProductCard(null);
  };

  const alertBox = (msg, type) => {
    if (type === "success") {
      toast.success(msg);
    }
    if (type === "error") {
      toast.error(msg);
    }
  };

  const addtoCart = (product, userId, quantity = 1) => {
    if (!userId) {
      alertBox("You are not logged in", "error");
      return;
    }

    const data = {
      productTitle: product?.name,
      images: product?.images?.[0],
      rating: product?.rating || 0,
      price: product?.price,
      quantity,
      subTotal: product?.price * quantity,
      productId: product?._id,
      countInStock: product?.countInStock,
      userId,
    };

    postData(API_PATH.CART.ADD_TO_CART, data)
      .then((res) => {
        if (res?.error === false) {
          // setCartData(res?.data)
          alertBox(res?.message || "Added to cart", "success");
          fetchData(API_PATH.CART.GET_CART_DATA).then((res) => {
            if (res?.error === false) {
              setCartData(res?.data);

              console.log(res?.data);
              alertBox();
            }
          });
        } else {
          alertBox(res?.message, "error");
        }
      })
      .catch((err) => {
        alertBox(
          err?.response?.data?.message || "Something went wrong",
          "error"
        );
      });
  };

  const getCartData = () => {
    fetchData(API_PATH.CART.GET_CART_DATA).then((res) => {
      if (res?.error === false) {
        setCartData(res?.data);
        alertBox();
      }
    });
  };

  const logout = () => {
    fetchData(API_PATH.AUTH.LOGOUT).then((res) => {
      console.log(res);
      if (res?.success === true) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setUserData();
        setCartData([]);
        setIsLogin(false);
        navigate("/");
      }
    });
  };
  const getAddress = () => {
        fetchData(API_PATH.ADDRESS.GET).then((res) => {
          if (res?.error === false) {
            setAddress(res?.data)
            alertBox();
            console.log(res?.data)
          }
        });
      };
  useEffect(() => {
    fetchData(API_PATH.CATEGORY.GET_CATEGORIES).then((res) => {
      setCategoryData(res.data);
    });
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token !== undefined && token !== null && token !== "") {
      setIsLogin(true);
      fetchData(API_PATH.AUTH.USER_DETAIL).then((res) => {
        setUserData(res.data);
        if (res?.res?.data?.error === true) {
          if (res?.res?.data?.message === "You have not login") {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");

            alertBox("You are not login", "error");
            setIsLogin(false);
          }
        }
      });
      getCartData();
       getAddress();
    } else {
      setIsLogin(false);
    }
  }, [isLogin]);

  const value = {
    openProductDetailModel,
    setOpenProductDetailModel,
    selectedProductCard,
    setSelectedProductCard,
    handleClickOpenProductDetailModel,
    handleCloseOpenProductDetailModel,
    openCartPanel,
    setOpenCartPanel,
    toggleDrawer,
    isLogin,
    setIsLogin,
    activeTab,
    setActiveTab,
    apiUrl,
    alertBox,
    userData,
    setUserData,
    logout,
    categoryData,
    addtoCart,
    cartData,
    setCartData,
    isAdded,
    setIsAdded,
    getCartData,
    address, setAddress,getAddress,
    searchData, setSearchData
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
