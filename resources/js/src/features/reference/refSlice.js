import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import refService from "./refService";
import History from "../../utils/History";

const initialState = {
    refs: [],
    ref: null,
    type: "",
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const getMyReferences = createAsyncThunk(
    "ref/get-my-ref",
    async (args, thunkAPI) => {
        try {
            return await refService.getMyReferences();
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

export const requestReference = createAsyncThunk(
    "ref/request-ref",
    async (args, thunkAPI) => {
        try {
            return await refService.requestReference(args);
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

export const cancelReference = createAsyncThunk(
    "ref/cancel-ref",
    async (args, thunkAPI) => {
        try {
            return await refService.cancelReference(args);
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

export const uploadSuccessStory = createAsyncThunk(
    "ref/upload-success-story",
    async (args, thunkAPI) => {
        try {
            return await refService.uploadSuccessStory(args);
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

export const refSlice = createSlice({
    initialState,
    name: "ref",
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
            state.type = "";
        },
        clear: (state) => {
            state.ref = null;
            state.refs = [];
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
            state.type = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMyReferences.pending, (state, action) => {
                state.isLoading = true;
                state.type = action.type;
            })
            .addCase(getMyReferences.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.refs = action.payload;
                state.type = action.type;
            })
            .addCase(getMyReferences.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.type = action.type;
                state.message = action.payload;
            })
            .addCase(cancelReference.pending, (state, action) => {
                state.isLoading = true;
                state.type = action.type;
            })
            .addCase(cancelReference.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;
                state.type = action.type;
            })
            .addCase(cancelReference.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.type = action.type;
                state.message = action.payload;
            })
            .addCase(requestReference.pending, (state, action) => {
                state.isLoading = true;
                state.type = action.type;
            })
            .addCase(requestReference.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload.message;
                state.ref = action.payload.data;
                state.type = action.type;
                History.navigate("ref-letter");
            })
            .addCase(requestReference.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.type = action.type;
                state.message = action.payload;
            })
            .addCase(uploadSuccessStory.pending, (state, action) => {
                state.isLoading = true;
                state.type = action.type;
            })
            .addCase(uploadSuccessStory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = "File uploaded successful";
                state.type = action.type;
            })
            .addCase(uploadSuccessStory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.type = action.type;
                state.message = action.payload;
            });
    },
});

export const { reset, clear } = refSlice.actions;
export default refSlice.reducer;
