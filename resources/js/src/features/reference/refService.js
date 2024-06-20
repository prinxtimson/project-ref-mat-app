import axios from "axios";

const API_URL = "/api/reference";

const getMyReferences = async () => {
    const res = await axios.get(`${API_URL}/my`);
    return res.data;
};

const requestReference = async (data) => {
    const res = await axios.post(API_URL, data);
    return res.data;
};

const cancelReference = async (data) => {
    const res = await axios.put(`${API_URL}/cancel`, data);
    return res.data;
};

const uploadSuccessStory = async (data) => {
    const res = await axios.post(`${API_URL}/upload`, data);
    return res.data;
};

const refService = {
    getMyReferences,
    requestReference,
    cancelReference,
    uploadSuccessStory,
};

export default refService;
