const apiUrl = import.meta.env.VITE_API_URL;

export const API_PATH = {
  AUTH: {
    LOGIN: "/api/login",
    REGISTER: "/api/register",
    VERIFY_EMAIL: "/api/verifyEmail",
    LOGOUT: "/api/logout",
    USER_AVATAR: "/api/user-avatar",
    DELETE_AVATAR: "api/deleteImage",
    UPDATE_USER_DETAIL: (userId) => `/api/${userId}`,
    FORGET_PASSWORD: "/api/forgot-password",
    VERIFY_FORGET_PASSWORD: "/api/verify-forgot-password-otp",
    RESET_PASSWORD: "/api/password/reset",
    UPDATE_PASSWORD: "/api/password/update",
    USER_DETAIL: "/api/userdetail",
  },
  ADDRESS: {
    ADD: "/api/address/add",
  },
   CATEGORY:{
    CREATE_CATEGORY:"/api/category/create",
    UPLOAD_IMAGES:"/api/category/upload",
    GET_CATEGORY_COUNT: "/api/category/get/count",
    GET_SUB_CATEGORY_COUNT:"/api/category/sub/get/count",
    GET_CATEGORIES:"/api/category/",
    GET_CATEGORY_BY_ID:(id)=>`/api/category/get/${id}`,
    DELETE_CATEGORY_IMAGE:"/api/category/deleteImage",
    DELETE_CATEGORY: (id)=>`/api/category/delete/${id}`,
    UPDATE_CATEGORY: (id)=>`/api/category/update/${id}`
  }
};
