import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import chatService from "./chatService";

const initialState = {
    chat_messages: [],
    type: "",
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const getChats = createAsyncThunk("chat/get", async (args, thunkAPI) => {
    try {
        return await chatService.getChats();
    } catch (err) {
        const msg =
            (err.response && err.response.data && err.response.data.message) ||
            err.message ||
            err.toString();

        return thunkAPI.rejectWithValue(msg);
    }
});

export const archiveChat = createAsyncThunk(
    "chat/archive",
    async (args, thunkAPI) => {
        try {
            return await chatService.archiveChat(args);
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

export const restoreChat = createAsyncThunk(
    "chat/restore",
    async (args, thunkAPI) => {
        try {
            return await chatService.restoreChat(args);
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

export const deleteChat = createAsyncThunk(
    "chat/delete",
    async (args, thunkAPI) => {
        try {
            return await chatService.deleteChat(args);
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

export const sendMessage = createAsyncThunk(
    "chat/send-message",
    async (args, thunkAPI) => {
        try {
            return await chatService.sendMessage(args);
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

export const readMessage = createAsyncThunk(
    "chat/read-message",
    async (args, thunkAPI) => {
        try {
            return await chatService.readMessage();
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

export const chatSlice = createSlice({
    initialState,
    name: "chat",
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
            state.type = "";
        },
        clear: (state) => {
            state.chat_messages = [];
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
            state.type = "";
        },
        onNewMessage: (state, action) => {
            let index = state.chat_messages.findIndex(
                (item) => item.id === action.payload.id
            );
            if (index > -1) {
                state.chat_messages.splice(index, 1, action.payload);
                state.chat_messages = [...state.chat_messages];
            } else {
                state.chat_messages = [...state.chat_messages, action.payload];
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getChats.pending, (state, action) => {
                state.isLoading = true;
                state.type = action.type;
            })
            .addCase(getChats.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.chat_messages = action.payload;
                state.type = action.type;
            })
            .addCase(getChats.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.type = action.type;
                state.message = action.payload;
            })
            .addCase(sendMessage.pending, (state, action) => {
                state.isLoading = true;
                state.type = action.type;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.type = action.type;
                let index = state.chat_messages.findIndex(
                    (item) => item.id === action.payload.id
                );
                if (index > -1) {
                    state.chat_messages.splice(index, 1, action.payload);
                    state.chat_messages = [...state.chat_messages];
                } else {
                    state.chat_messages = [
                        ...state.chat_messages,
                        action.payload,
                    ];
                }
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.type = action.type;
                state.message = action.payload;
            })
            .addCase(readMessage.pending, (state, action) => {
                state.type = action.type;
            })
            .addCase(readMessage.fulfilled, (state, action) => {
                state.type = action.type;
            })
            .addCase(readMessage.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.type = action.type;
                state.message = action.payload;
            })
            .addCase(deleteChat.pending, (state, action) => {
                state.isLoading = true;
                state.type = action.type;
            })
            .addCase(deleteChat.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                let data = state.chat_messages.filter(
                    (item) => item.id !== action.payload.id
                );
                state.chat_messages = data;
                state.type = action.type;
            })
            .addCase(deleteChat.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.type = action.type;
                state.message = action.payload;
            })
            .addCase(archiveChat.pending, (state, action) => {
                state.isLoading = true;
                state.type = action.type;
            })
            .addCase(archiveChat.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                let data = state.chat_messages.filter(
                    (item) => item.id !== action.payload.id
                );
                state.chat_messages = data;
                state.type = action.type;
            })
            .addCase(archiveChat.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.type = action.type;
                state.message = action.payload;
            })
            .addCase(restoreChat.pending, (state, action) => {
                state.isLoading = true;
                state.type = action.type;
            })
            .addCase(restoreChat.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.type = action.type;
            })
            .addCase(restoreChat.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.type = action.type;
                state.message = action.payload;
            });
    },
});

export const { reset, clear, onNewMessage } = chatSlice.actions;
export default chatSlice.reducer;
