import axios from "axios";

const API_URL = "/api";

const sendAccountCode = async (data) => {
    await axios.get(`/sanctum/csrf-cookie`);
    const res = await axios.post(`${API_URL}/email/send`, data);

    return res.data;
};

const createAccount = async (data) => {
    const res = await axios.post(`${API_URL}/email/create`, data);
    return res.data;
};

const getUsers = async () => {
    const res = await axios.get(`${API_URL}/users`);
    return res.data;
};

const getUsersByRoles = async (args) => {
    const res = await axios.get(`${API_URL}/users/roles/${args}`);
    return res.data;
};

const getTeamPerformance = async () => {
    const res = await axios.get(`${API_URL}/users/performance`);
    return res.data;
};

const getUsersByRolesByPage = async (data) => {
    const res = await axios.get(
        `${API_URL}/users/roles/${data.role}?page=${data.page}`
    );
    return res.data;
};

const getUser = async (id) => {
    const res = await axios.get(`${API_URL}/users/show/${id}`);
    return res.data;
};

const createUser = async (data) => {
    const res = await axios.post(`${API_URL}/users/register`, data);
    return res.data;
};

const editUser = async (data) => {
    const res = await axios.put(`${API_URL}/users/update/${data.id}`, data);
    return res.data;
};

const getAdminUsers = async () => {
    const res = await axios.get(`${API_URL}/users/admin`);
    return res.data;
};

const getUsersByPage = async (page) => {
    const res = await axios.get(`${API_URL}/users?page=${page}`);
    return res.data;
};

const searchUsers = async (query) => {
    const res = await axios.get(`${API_URL}/users/search?query=${query}`);
    return res.data;
};

const editUserRole = async (data) => {
    const res = await axios.put(`${API_URL}/users/role/${data.id}`, data);
    return res.data;
};

const suspendUser = async (id) => {
    const res = await axios.delete(`${API_URL}/users/deactivate/${id}`);
    return res.data;
};

const unsuspendUser = async (id) => {
    const res = await axios.put(`${API_URL}/users/activate/${id}`);
    return res.data;
};

const deleteUser = async (id) => {
    const res = await axios.delete(`${API_URL}/users/remove/${id}`);
    return res.data;
};

const userService = {
    sendAccountCode,
    createAccount,
    getUsers,
    getUsersByRoles,
    getUsersByRolesByPage,
    getTeamPerformance,
    getUser,
    getUsersByPage,
    searchUsers,
    editUserRole,
    getAdminUsers,
    createUser,
    editUser,
    suspendUser,
    unsuspendUser,
    deleteUser,
};

export default userService;
