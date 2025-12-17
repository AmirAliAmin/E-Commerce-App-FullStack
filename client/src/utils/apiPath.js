const apiUrl = import.meta.env.VITE_API_URL;

export const API_PATH = {
    AUTH:{
        LOGIN:"/api/login",
        REGISTER:"/api/register",
        VERIFY_EMAIL:"/api/verifyEmail",
        LOGOUT:"/api/logout",
        USER_AVATAR:"/api/user-avatar",
        DELETE_AVATAR:"api/deleteImage",
        UPDATE_USER_DETAIL:(userId)=>`/api/${userId}`,
        FORGET_PASSWORD:"/api/forgot-password",
        VERIFY_FORGET_PASSWORD:"/api/verify-forgot-password-otp",
        RESET_PASSWORD:"/api/password/reset",
        USER_DETAIL:"/api/userdetail"
    },
}