import axios from "axios";

const API_URL = "/api/posts";

const getPosts = async () => {
    const res = await axios.get(API_URL);
    return res.data;
};

const likeDislikePost = async (id) => {
    const res = await axios.get(`${API_URL}/${id}/favorite`);
    return res.data;
};

const createPost = async (data) => {
    const res = await axios.post(API_URL, data);
    return res.data;
};

const editPost = async (data) => {
    const res = await axios.put(`${API_URL}/${data.id}/update`, data);
    return res.data;
};

const archivePost = async (id) => {
    const res = await axios.put(`${API_URL}/${id}/archive`);
    return res.data;
};

const restorePost = async (id) => {
    const res = await axios.put(`${API_URL}/${id}/restore`);
    return res.data;
};

const deletePost = async (id) => {
    const res = await axios.delete(`${API_URL}/${id}/delete`);
    return res.data;
};

const postService = {
    getPosts,
    likeDislikePost,
    createPost,
    editPost,
    archivePost,
    restorePost,
    deletePost,
};

export default postService;
