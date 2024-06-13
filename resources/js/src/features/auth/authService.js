import axios from "axios";

const API_URL = "/api";

const register = async (userData) => {
    const res = await axios.post(`${API_URL}/register`, userData);

    return res.data;
};

const getCurrentUser = async () => {
    const res = await axios.get(`${API_URL}/me`);
    return res.data;
};

const updateUser = async (data) => {
    const res = await axios.post(API_URL + "/update", data);
    return res.data;
};

const logout = async () => {
    const res = await axios.post(API_URL + "/logout");
    return res.data;
};

const login = async (userData) => {
    await axios.get(`/sanctum/csrf-cookie`);
    const res = await axios.post(API_URL + "/login", userData);
    return res.data;
};

const confirm2fa = async (data) => {
    const res = await axios.post(`${API_URL}/two-factor-auth/confirm`, data);
    return res.data;
};

const resend2fa = async () => {
    const res = await axios.get(`${API_URL}/two-factor-auth/resend`);
    return res.data;
};

const forgotPass = async (email) => {
    await axios.get(`/sanctum/csrf-cookie`);
    const res = await axios.post(API_URL + "/forgot-password", email);
    return res.data;
};

const resetPass = async (data) => {
    const res = await axios.post(API_URL + "/reset-password", data);
    return res.data;
};

const changePass = async (data) => {
    const res = await axios.put(API_URL + "/change-password", data);
    return res.data;
};

const changeEmail = async (data) => {
    const res = await axios.put(API_URL + "/change-email", data);
    return res.data;
};

const updateOptions = async (data) => {
    const res = await axios.put(API_URL + "/option", data);
    return res.data;
};

const authService = {
    register,
    logout,
    login,
    confirm2fa,
    resend2fa,
    forgotPass,
    updateUser,
    resetPass,
    changePass,
    changeEmail,
    getCurrentUser,
    updateOptions,
};

export default authService;
