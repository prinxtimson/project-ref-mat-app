import axios from "axios";

const API_URL = "/api/messages";

const getChats = async () => {
    const res = await axios.get(API_URL);
    return res.data;
};

const archiveChat = async (id) => {
    const res = await axios.put(`${API_URL}/archive/${id}`);
    return res.data;
};

const restoreChat = async (id) => {
    const res = await axios.put(`${API_URL}/restore/${id}`);
    return res.data;
};

const sendMessage = async (data) => {
    const res = await axios.post(`${API_URL}`, data);
    return res.data;
};

const readMessage = async () => {
    const res = await axios.get(`${API_URL}/read`);
    return res.data;
};

const deleteChat = async (id) => {
    const res = await axios.delete(`${API_URL}/delete/${id}`);
    return res.data;
};

const chatService = {
    getChats,
    sendMessage,
    readMessage,
    archiveChat,
    restoreChat,
    deleteChat,
};

export default chatService;
