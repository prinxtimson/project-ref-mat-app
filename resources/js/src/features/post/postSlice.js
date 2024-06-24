import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./postService";

const initialState = {
    posts: [],
    post: null,
    type: "",
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const getPosts = createAsyncThunk("post/get", async (args, thunkAPI) => {
    try {
        return await postService.getPosts(args);
    } catch (err) {
        const msg =
            (err.response && err.response.data && err.response.data.message) ||
            err.message ||
            err.toString();

        return thunkAPI.rejectWithValue(msg);
    }
});

export const favoritePost = createAsyncThunk(
    "post/favorite",
    async (args, thunkAPI) => {
        try {
            return await postService.likeDislikePost(args);
        } catch (err) {
            const msg =
                (err.response &&
                    err.response.data &&
                    err.response.data.message) ||
                err.message ||
                err.toString();

            return thunkAPI.rejectWithValue(msg);
        }
    }
);

export const createPost = createAsyncThunk(
    "post/create",
    async (args, thunkAPI) => {
        try {
            return await postService.createPost(args);
        } catch (err) {
            const msg =
                (err.response &&
                    err.response.data &&
                    err.response.data.message) ||
                err.message ||
                err.toString();

            return thunkAPI.rejectWithValue(msg);
        }
    }
);

export const editPost = createAsyncThunk(
    "post/edit",
    async (args, thunkAPI) => {
        try {
            return await postService.editPost(args);
        } catch (err) {
            const msg =
                (err.response &&
                    err.response.data &&
                    err.response.data.message) ||
                err.message ||
                err.toString();

            return thunkAPI.rejectWithValue(msg);
        }
    }
);

export const archivePost = createAsyncThunk(
    "post/archive",
    async (args, thunkAPI) => {
        try {
            return await postService.archivePost(args);
        } catch (err) {
            const msg =
                (err.response &&
                    err.response.data &&
                    err.response.data.message) ||
                err.message ||
                err.toString();

            return thunkAPI.rejectWithValue(msg);
        }
    }
);

export const restorePost = createAsyncThunk(
    "post/restore",
    async (args, thunkAPI) => {
        try {
            return await postService.restorePost(args);
        } catch (err) {
            const msg =
                (err.response &&
                    err.response.data &&
                    err.response.data.message) ||
                err.message ||
                err.toString();

            return thunkAPI.rejectWithValue(msg);
        }
    }
);

export const deletePost = createAsyncThunk(
    "post/delete",
    async (args, thunkAPI) => {
        try {
            return await postService.deletePost(args);
        } catch (err) {
            const msg =
                (err.response &&
                    err.response.data &&
                    err.response.data.message) ||
                err.message ||
                err.toString();

            return thunkAPI.rejectWithValue(msg);
        }
    }
);

export const postSlice = createSlice({
    initialState,
    name: "post",
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
            state.type = "";
        },
        clear: (state) => {
            state.post = null;
            state.posts = [];
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
            state.type = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPosts.pending, (state, action) => {
                state.isLoading = true;
                state.type = action.type;
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.posts = action.payload;
                state.type = action.type;
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.type = action.type;
                state.message = action.payload;
            })
            .addCase(favoritePost.pending, (state, action) => {
                state.isLoading = true;
                state.type = action.type;
            })
            .addCase(favoritePost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                let index = state.posts.findIndex(
                    (item) => item.id === action.payload.id
                );
                state.posts.splice(index, 1, action.payload);
                state.posts = [...state.posts];
                state.type = action.type;
            })
            .addCase(favoritePost.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.type = action.type;
                state.message = action.payload;
            })
            .addCase(createPost.pending, (state, action) => {
                state.isLoading = true;
                state.type = action.type;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                if (action.payload.parent_id) {
                    let index = state.posts.findIndex(
                        (item) => item.id === action.payload.parent_id
                    );
                    let currentPost = state.posts[index];
                    currentPost.replies = [
                        ...currentPost.replies,
                        action.payload,
                    ];
                    state.posts.splice(index, 1, currentPost);
                    state.posts = [...state.posts];
                } else {
                    state.posts = [...state.posts, action.payload];
                }

                state.type = action.type;
                state.message = "Comment added successful!";
            })
            .addCase(createPost.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.type = action.type;
                state.message = action.payload;
            })
            .addCase(editPost.pending, (state, action) => {
                state.isLoading = true;
                state.type = action.type;
            })
            .addCase(editPost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                let index = state.posts.findIndex(
                    (item) => item.id === action.payload.id
                );
                state.posts.splice(index, 1, action.payload);
                state.posts = [...state.posts];
                state.type = action.type;
                state.message = "Comment edited successful!";
            })
            .addCase(editPost.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.type = action.type;
                state.message = action.payload;
            })
            .addCase(archivePost.pending, (state, action) => {
                state.isLoading = true;
                state.type = action.type;
            })
            .addCase(archivePost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                let data = state.posts.filter(
                    (item) => item.id !== action.payload.id
                );
                state.posts = [...data];
                state.type = action.type;
                state.message = "Post archive successful!";
            })
            .addCase(archivePost.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.type = action.type;
                state.message = action.payload;
            })
            .addCase(restorePost.pending, (state, action) => {
                state.isLoading = true;
                state.type = action.type;
            })
            .addCase(restorePost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.posts = [...state.posts, action.payload];
                state.type = action.type;
                state.message = "Comment restored successful!";
            })
            .addCase(restorePost.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.type = action.type;
                state.message = action.payload;
            })
            .addCase(deletePost.pending, (state, action) => {
                state.isLoading = true;
                state.type = action.type;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                let data = state.posts.filter(
                    (item) => item.id !== action.payload.id
                );
                state.posts = [...data];
                state.type = action.type;
                state.message = "Post deleted successful!";
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.type = action.type;
                state.message = action.payload;
            });
    },
});

export const { reset, clear } = postSlice.actions;
export default postSlice.reducer;
