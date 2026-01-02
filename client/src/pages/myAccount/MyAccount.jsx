import React, { useContext, useEffect, useState } from "react";
import { IoMdCloudUpload, IoMdEye, IoMdEyeOff } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { IoBagHandleSharp, IoClose } from "react-icons/io5";
import { FaThList } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { GoTriangleDown } from "react-icons/go";
import { assets } from "../../assets/assets";
import { FaAngleDown } from "react-icons/fa6";
import { AppContext } from "../../context/AppContext";
import Badge from "../../components/badge";
import { useNavigate } from "react-router-dom";
import { API_PATH } from "../../utils/apiPath";
import { fetchData, putData, uploadImage } from "../../utils/api";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import AddAddress from "./AddAddress";

function MyAccount() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [showPass3, setShowPass3] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showChangePass, setShowChangePass] = useState(false);
  const [addressPanel, setAddressPanel] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [formField, setFormField] = useState({
    name: "",
    number: "",
  });
  const [changePassword, setChangePassword] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const {
    activeTab,
    setActiveTab,
    userData,
    setUserData,
    logout,
    alertBox,
    address,
    getAddress,
  } = useContext(AppContext);
  const history = useNavigate();

  // Dummy order data
  const orders = [
    {
      orderId: "ORD123456",
      paymentId: "PAY987654",
      product: "Women Wide Jeans",
      name: "Amir Ali Amin",
      phone: "9876543210",
      address: "Street 12, Karachi",
      pincode: "75400",
      total: "$120",
      email: "aliaminamir@gmail.com",
      userId: "USR001",
      status: "pending",
      date: "2024-10-05",
    },
  ];
  const getInitials = (fullName) => {
    if (!fullName) return "";
    const words = fullName.split(" ");
    let initials = "";

    for (let i = 0; i < Math.min(words.length, 2); i++) {
      initials += words[i][0];
    }

    return initials.toUpperCase();
  };

  const onChangeFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (
      !["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
        file.type
      )
    ) {
      alertBox("Please select JPG, JPEG, PNG or WEBP image", "error");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("avatar", file);

      const res = await uploadImage(API_PATH.AUTH.USER_AVATAR, formData);

      if (res) {
        setUserData((prev) => ({
          ...prev,
          avatar: res.avatar,
        }));

        alertBox("Profile picture updated", "success");
      } else {
        alertBox("Upload failed", "error");
      }
    } catch (err) {
      console.log(err);
      alertBox("Something went wrong", "error");
    } finally {
      setUploading(false);
    }
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormField(() => {
      return {
        ...formField,
        [name]: value,
      };
    });
  };
  const onChangePasswordInput = (e) => {
    const { name, value } = e.target;
    setChangePassword(() => {
      return {
        ...changePassword,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const valideValue = Object.values(formField).every(
      (el) => el.trim() !== ""
    );
    if (!valideValue) {
      alertBox("All fields from My Profile are required", "error");
      return;
    }

    setIsLoading(true);

    try {
      const res = await putData(
        API_PATH.AUTH.UPDATE_USER_DETAIL(userData?._id),
        {
          name: formField.name,
          mobile: formField.number,
        }
      );

      if (res?.success) {
        setUserData((prev) => ({
          ...prev,
          name: formField.name,
          mobile: formField.number,
        }));

        alertBox("Profile updated successfully", "success");
      }
    } catch (error) {
      alertBox("Something went wrong", "error");
    } finally {
      setIsLoading(false);
    }
  };
  const handleSubmitPass = async (e) => {
    e.preventDefault();

    const valideValue = Object.values(changePassword).every(
      (el) => el.trim() !== ""
    );
    if (!valideValue) {
      alertBox("All fields from Change Password are required", "error");
      return;
    }
    if (
      changePassword.newPassword.trim() !==
      changePassword.confirmPassword.trim()
    ) {
      alertBox("Password and Confirm Password must be same", "error");
      return;
    }

    if (!userData.email) {
      alertBox("User email not found.", "error");
      return;
    }

    setIsLoading2(true);

    try {
      const res = await putData(API_PATH.AUTH.UPDATE_PASSWORD, {
        email: userData.email,
        password: changePassword.newPassword,
        confirmPassword: changePassword.confirmPassword,
        oldPassword: changePassword.oldPassword,
      });

      if (!res?.error) {
        alertBox(res.message, "success");
        setIsLoading2(false);
      } else {
        alertBox(res.message, "error");
      }
    } catch (error) {
      alertBox("Something went wrong", "error");
    } finally {
      setIsLoading2(false);
    }
  };

  //  const getAddress = () => {
  //     fetchData(API_PATH.ADDRESS.GET).then((res) => {
  //       if (res?.error === false) {
  //         setAddress(res?.data)
  //         alertBox();
  //         console.log(address)
  //       }
  //     });
  //   };
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      history("/");
    }
    getAddress();
  }, []);
  useEffect(() => {
    if (userData) {
      setFormField({
        name: userData?.name ?? "",
        number: userData?.mobile ? String(userData.mobile) : "",
      });
      setChangePassword({
        email: userData.email,
      });
    }
  }, [userData]);

  useEffect(() => {
    fetchData(API_PATH.ORDER.GET_ORDER).then((res) => {
      if (res?.error === false) {
        setOrderData(res?.data);
      }
    });
  }, []);

   useEffect(() => {
     window.scrollTo(0, 0);
    }, [])
  return (
    <section className="py- w-full">
      <div className="container flex gap-5">
        <div className="col1 md:w-[20%]">
          <div className="card bg-white shadow-lg rounded-md hidden md:block ">
            <div className="w-full p-3 flex items-center justify-center flex-col">
              <div className="w-25 h-25 bg-purple-500 rounded-full text-xl font-bold text-white flex items-center justify-center relative group overflow-hidden">
                {uploading === true ? (
                  <div className=" animate-spin w-10 h-10 border-3 border-white border-solid rounded-full border-t-transparent"></div>
                ) : userData?.avatar ? (
                  <img
                    src={userData.avatar}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  getInitials(userData?.name || "")
                )}
                <div className="overlay w-full h-full absolute top-0 left-0 z-50 bg-[#0000006f] overflow-hidden rounded-full opacity-0 group-hover:opacity-100 cursor-pointer items-center justify-center flex ">
                  <IoMdCloudUpload />
                  <input
                    type="file"
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer overflow-hidden"
                    accept="image/*"
                    onChange={(e) => onChangeFile(e, API_PATH.AUTH.USER_AVATAR)}
                  />
                </div>
              </div>
              <h1>{userData?.name}</h1>
              <h6 className="text-gray-600 text-xs">{userData?.email}</h6>
            </div>
            <ul className="py-3">
              <li
                className={`w-full flex items-center px-2 gap-2 link hover:bg-gray-200 py-2 mb-1 ${
                  activeTab === "account"
                    ? "bg-white text-black shadow-xl border-l-4 border-primary"
                    : "text-gray-700"
                }`}
                onClick={() => setActiveTab("account")}
              >
                <FaRegUserCircle />
                User Profile
              </li>
              <li
                className={`w-full flex items-center  px-2 gap-2 link hover:bg-gray-200 py-2 mb-1 ${
                  activeTab === "list"
                    ? "bg-white text-black shadow-xl border-l-4 border-primary"
                    : "text-gray-700"
                }`}
                onClick={() => setActiveTab("list")}
              >
                <FaThList />
                My List
              </li>
              <li
                className={`w-full flex items-center px-2 gap-2 link hover:bg-gray-200 py-2 mb-1 ${
                  activeTab === "order"
                    ? "bg-white text-black shadow-xl border-l-4 border-primary"
                    : "text-gray-700"
                }`}
                onClick={() => setActiveTab("order")}
              >
                <IoBagHandleSharp />
                My Order
              </li>
              <li
                onClick={logout}
                className="w-full flex items-center px-2  gap-2 link hover:bg-gray-300 py-2 mb-1"
              >
                <HiOutlineLogout />
                Logout
              </li>
            </ul>
          </div>
        </div>
        <div className="col2 w-full md:w-[80%] lg:w-[70%]">
          <div className=" ">
            {activeTab === "account" && (
              <div className="">
                <div className="card bg-white p-5 shadow-lg rounded-md mb-3">
                  <div className="flex items-center justify-between pb-3">
                    <h2 className="">MY Profile</h2>
                    <p
                      className="text-primary cursor-pointer"
                      onClick={() => setShowChangePass(!showChangePass)}
                    >
                      Change Password
                    </p>
                  </div>
                  <hr className="text-gray-300" />

                  <form className="py-5" onSubmit={handleSubmit}>
                    <div className="flex items-center gap-5 flex-wrap">
                      <div className="w-full flex items-center gap-5">
                        <div className="w-[50%]">
                          <label htmlFor="fullName">
                            <input
                              type="text"
                              name="name"
                              value={formField.name}
                              disabled={isLoading === true ? true : false}
                              onChange={onChangeInput}
                              placeholder={"Full Name"}
                              className="border border-gray-500 outline-0 py-2 px-2 w-full"
                            />
                          </label>
                        </div>
                        <div className="w-[50%]">
                          <PhoneInput
                            defaultCountry="pk"
                            value={formField.number}
                            disabled={isLoading}
                            onChange={(value) =>
                              setFormField((prev) => ({
                                ...prev,
                                number: value || "",
                              }))
                            }
                            className="border border-gray-500 outline-0 py-2 px-2 w-full"
                          />
                        </div>
                      </div>
                      <div className="w-full">
                        <label htmlFor="email">
                          <input
                            type="email"
                            placeholder={userData?.email || "Your Email"}
                            disabled
                            className="border border-gray-500 text-gray-500 outline-0 py-2 px-2 w-full"
                          />
                        </label>
                      </div>
                    </div>
                    <br />
                    <div className="flex items-center gap-5">
                      <button
                        type="submit"
                        className="py-2 px-5 cursor-pointer bg-primary text-white w-[100px]"
                      >
                        {isLoading === true ? (
                          <div className=" animate-spin w-5 h-5 border-3 border-primary border-solid rounded-full border-t-transparent"></div>
                        ) : (
                          "Save"
                        )}
                      </button>
                      <button
                        type="button"
                        className="py-2 px-5 border border-primary text-primary cursor-pointer w-[100px]"
                        onClick={() =>
                          setFormField({
                            name: userData.name || "",
                            number: userData.mobile || "",
                          })
                        }
                      >
                        Cancel
                      </button>
                    </div>
                  </form>

                  <div
                    className="flex items-center justify-center p-5 border border-dashed border-gray-500 bg-[#f1faff] hover:bg-[#eee9e9] my-3 cursor-pointer"
                    onClick={() => setAddressPanel(!addressPanel)}
                  >
                    <span className="text-[14px] font-medium">Add Address</span>
                  </div>
                  {addressPanel && (
                    <div
                      className="fixed bg-[#00000080] w-full h-full  z-500 inset-0 border text-white flex justify-center"
                      onClick={() => setAddressPanel(false)}
                    >
                      <AddAddress setAddressPanel={setAddressPanel} />
                    </div>
                  )}
                  <h1>My Address</h1>
                  <hr className="mb-4 text-gray-300" />
                  <div className="bg-[#f1faff] hover:bg-[#eee9e9] w-full py-2 border border-gray-300 text-gray-600 flex justify-center">
                    {address.map((adrr) => (
                      <div key={adrr._id}>
                        <p>
                          {adrr?.address_line},{adrr.city},{adrr.state},
                          {adrr.country}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                {showChangePass && (
                  <div className="card bg-white p-5 shadow-lg rounded-md">
                    <h2 className="pb-3">Change Password</h2>
                    <hr className="text-gray-300" />

                    <form className="py-5" onSubmit={handleSubmitPass}>
                      <div className="flex items-center gap-5 flex-wrap">
                        <div className="w-full flex items-center flex-wrap gap-5">
                          <div className="w-[92%] relative">
                            <label htmlFor="oldPassword">
                              <input
                                type={showPass ? "text" : "password"}
                                name="oldPassword"
                                value={changePassword.oldPassword}
                                disabled={isLoading2 === true ? true : false}
                                onChange={onChangePasswordInput}
                                placeholder={"Old Password"}
                                className="border border-gray-500 outline-0 py-2 px-2 w-full"
                              />
                            </label>
                            <div
                              className="absolute right-2 top-4 cursor-pointer"
                              onClick={() => setShowPass(!showPass)}
                            >
                              {showPass ? <IoMdEye /> : <IoMdEyeOff />}
                            </div>
                          </div>
                          <div className="w-[45%] relative">
                            <label htmlFor="newPassword">
                              <input
                                type={showPass2 ? "text" : "password"}
                                name="newPassword"
                                value={changePassword.newPassword}
                                disabled={isLoading2 === true ? true : false}
                                onChange={onChangePasswordInput}
                                placeholder={"New Password"}
                                className="border border-gray-500 outline-0 py-2 px-2 w-full"
                              />
                            </label>
                            <div
                              className="absolute right-2 top-4 cursor-pointer"
                              onClick={() => setShowPass2(!showPass2)}
                            >
                              {showPass2 ? <IoMdEye /> : <IoMdEyeOff />}
                            </div>
                          </div>
                          <div className="w-[45%] relative">
                            <label htmlFor="confirmPassword">
                              <input
                                type={showPass3 ? "text" : "password"}
                                name="confirmPassword"
                                value={changePassword.confirmPassword}
                                disabled={isLoading2 === true ? true : false}
                                onChange={onChangePasswordInput}
                                placeholder={"Confirm Password"}
                                className="border border-gray-500 outline-0 py-2 px-2 w-full"
                              />
                            </label>
                            <div
                              className="absolute right-2 top-4 cursor-pointer"
                              onClick={() => setShowPass3(!showPass3)}
                            >
                              {showPass3 ? <IoMdEye /> : <IoMdEyeOff />}
                            </div>
                          </div>
                        </div>
                      </div>
                      <br />
                      <div className="flex items-center gap-5">
                        <button
                          type="submit"
                          className="py-2 px-5 cursor-pointer bg-primary text-white w-[100px]"
                        >
                          {isLoading === true ? (
                            <div className=" animate-spin w-5 h-5 border-3 border-primary border-solid rounded-full border-t-transparent"></div>
                          ) : (
                            "Save"
                          )}
                        </button>
                        <button
                          type="button"
                          className="py-2 px-5 border border-primary text-primary cursor-pointer w-[100px]"
                          onClick={() =>
                            setChangePassword({
                              oldPassword: "",
                              newPassword: "",
                            })
                          }
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}
            {activeTab === "list" && (
              <div className="card bg-white p-5 shadow-lg rounded-md">
                <h2 className="pb-3">MY Product List</h2>
                <hr className="text-gray-300" />
                <div className="w-full p-3 flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.1)]">
                  <div className="w-[15%] rounded-md overflow-hidden">
                    <img src={assets.FashionImage1} alt="" />
                  </div>
                  <div className="w-[85%] relative">
                    <IoClose className="cursor-pointer absolute top-0 right-0 link text-[22px]" />
                    <span className="text-[13px]">Flying Machine</span>
                    <h3 className="text-[15px] link">Women Wide Jeans</h3>

                    <div className="flex items-center gap-4 mt-2">
                      <span className="flex items-center justify-center bg-[#f1f1f1] text-[12px] font-semibold py-1 px-2 rounded-md cursor-pointer">
                        Size: S <GoTriangleDown />
                      </span>
                      <span className="flex items-center justify-center bg-[#f1f1f1] text-[12px] font-semibold py-1 px-2 rounded-md cursor-pointer">
                        Qyt: 1 <GoTriangleDown />
                      </span>
                    </div>

                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-black text-[14px] font-semibold">
                        $30
                      </span>
                      <span className="line-through text-gray-500 text-[14px] font-medium">
                        $85
                      </span>
                      <span className="text-primary text-[14px] font-semibold">
                        55% OFF
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-full p-3 flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.1)]">
                  <div className="w-[15%] rounded-md overflow-hidden">
                    <img src={assets.FashionImage1} alt="" />
                  </div>
                  <div className="w-[85%] relative">
                    <IoClose className="cursor-pointer absolute top-0 right-0 link text-[22px]" />
                    <span className="text-[13px]">Flying Machine</span>
                    <h3 className="text-[15px] link">Women Wide Jeans</h3>

                    <div className="flex items-center gap-4 mt-2">
                      <span className="flex items-center justify-center bg-[#f1f1f1] text-[12px] font-semibold py-1 px-2 rounded-md cursor-pointer">
                        Size: S <GoTriangleDown />
                      </span>
                      <span className="flex items-center justify-center bg-[#f1f1f1] text-[12px] font-semibold py-1 px-2 rounded-md cursor-pointer">
                        Qyt: 1 <GoTriangleDown />
                      </span>
                    </div>

                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-black text-[14px] font-semibold">
                        $30
                      </span>
                      <span className="line-through text-gray-500 text-[14px] font-medium">
                        $85
                      </span>
                      <span className="text-primary text-[14px] font-semibold">
                        55% OFF
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-full p-3 flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.1)]">
                  <div className="w-[15%] rounded-md overflow-hidden">
                    <img src={assets.FashionImage1} alt="" />
                  </div>
                  <div className="w-[85%] relative">
                    <IoClose className="cursor-pointer absolute top-0 right-0 link text-[22px]" />
                    <span className="text-[13px]">Flying Machine</span>
                    <h3 className="text-[15px] link">Women Wide Jeans</h3>

                    <div className="flex items-center gap-4 mt-2">
                      <span className="flex items-center justify-center bg-[#f1f1f1] text-[12px] font-semibold py-1 px-2 rounded-md cursor-pointer">
                        Size: S <GoTriangleDown />
                      </span>
                      <span className="flex items-center justify-center bg-[#f1f1f1] text-[12px] font-semibold py-1 px-2 rounded-md cursor-pointer">
                        Qyt: 1 <GoTriangleDown />
                      </span>
                    </div>

                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-black text-[14px] font-semibold">
                        $30
                      </span>
                      <span className="line-through text-gray-500 text-[14px] font-medium">
                        $85
                      </span>
                      <span className="text-primary text-[14px] font-semibold">
                        55% OFF
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "order" && (
              <div className="card bg-white p-5 shadow-lg rounded-md">
                <h2 className="pb-3">Order</h2>
                <hr className="text-gray-300" />
                <div className="relative overflow-x-auto mt-5 no-scroll">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                      <tr>
                        <th
                          scope="col"
                          className="px-3 py-3 flex items-center justify-center"
                        >
                          {" "}
                          <p className="w-[35px] h-[35px] min-w-[35px] rounded-full text-center flex items-center justify-center">
                            <FaAngleDown />
                          </p>
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          order id
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          payment id
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          product{" "}
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          Phone Number
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          Adress
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          Pincode
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          Total Amount
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          User Id
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          order Status
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderData?.map((item, index) => (
                        <tr
                          key={item?._id}
                          className="bg-white border-b border-gray-200"
                        >
                          <td className="px-3 py-4 text-center">{index + 1}</td>

                          {/* Order ID */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item?._id}
                          </td>

                          {/* Payment ID */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item?.paymentId}
                          </td>

                          {/* Products */}
                          <td className="px-6 py-4  overflow-auto whitespace-nowrap flex">
                            {item?.product.map((p) => (
                              <div key={p._id} className="text-sm">
                                {p.productTitle}{p.quantity} ,
                              </div>
                            ))}
                          </td>

                          {/* Customer Name (from userId populate OR fallback) */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.userId?.name || "N/A"}
                          </td>

                          {/* Phone */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.delivery_address?.mobile}
                          </td>

                          {/* Address */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.delivery_address?.address_line},
                            {item.delivery_address?.city}
                          </td>

                          {/* Pincode */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.delivery_address?.pincode}
                          </td>

                          {/* Total Amount */}
                          <td className="px-6 py-4 whitespace-nowrap font-bold">
                            Rs. {item.totalAmt}
                          </td>

                          {/* Email */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.userId?.email || "N/A"}
                          </td>

                          {/* User ID */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.userId?._id || item.userId}
                          </td>

                          {/* Order Status */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge status={item.order_Status} />
                          </td>

                          {/* Date */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            {new Date(item.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MyAccount;
