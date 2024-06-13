import axios from "axios";

const API_URL = "/api/chats";

const getChats = async () => {
    const res = await axios.get(API_URL);
    return res.data;
};

const getMyChats = async () => {
    const res = await axios.get(`${API_URL}/my`);
    return res.data;
};

const startChat = async () => {
    const res = await axios.post(`${API_URL}/start`);
    return res.data;
};

const getChat = async (id) => {
    const res = await axios.get(`${API_URL}/get/${id}`);
    return res.data;
};

const archiveChat = async (id) => {
    const res = await axios.get(`${API_URL}/archive/${id}`);
    return res.data;
};

const restoreChat = async (id) => {
    const res = await axios.get(`${API_URL}/restore/${id}`);
    return res.data;
};

const getMessages = async (id) => {
    const res = await axios.get(`${API_URL}/messages/chat/${id}`);
    return res.data;
};

const searchMessages = async (data) => {
    const res = await axios.get(
        `${API_URL}/messages/search/${data.id}?query=${data.query}`
    );
    return res.data;
};

const sendMessage = async (data) => {
    const res = await axios.post(`${API_URL}/messages`, data);
    return res.data;
};

const readMessage = async (id) => {
    const res = await axios.get(`${API_URL}/messages/read/${id}`);
    return res.data;
};

const deleteMessage = async (id) => {
    const res = await axios.delete(`${API_URL}/messages/delete/${id}`);
    return res.data;
};

const deleteChat = async (id) => {
    const res = await axios.delete(`${API_URL}/delete/${id}`);
    return res.data;
};

const chatService = {
    getChats,
    getMyChats,
    startChat,
    getMessages,
    sendMessage,
    readMessage,
    deleteMessage,
    getChat,
    searchMessages,
    archiveChat,
    restoreChat,
    deleteChat,
};

export default chatService;
