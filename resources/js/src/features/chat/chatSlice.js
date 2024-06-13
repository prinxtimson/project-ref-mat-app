import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import chatService from "./chatService";

const initialState = {
    chats: [],
    chat: null,
    messages: [],
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

export const getMyChats = createAsyncThunk(
    "chat/my",
    async (args, thunkAPI) => {
        try {
            return await chatService.getMyChats();
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

export const startChat = createAsyncThunk(
    "chat/start",
    async (args, thunkAPI) => {
        try {
            return await chatService.startChat();
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

export const getChat = createAsyncThunk(
    "chat/get-single",
    async (args, thunkAPI) => {
        try {
            return await chatService.getChat(args);
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

export const getMessages = createAsyncThunk(
    "chat/get-messages",
    async (args, thunkAPI) => {
        try {
            return await chatService.getMessages(args);
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

export const searchMessages = createAsyncThunk(
    "chat/search-messages",
    async (args, thunkAPI) => {
        try {
            return await chatService.searchMessages(args);
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
            const result = await chatService.sendMessage(args);
            thunkAPI.dispatch(getMyChats());
            return result;
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
            return await chatService.readMessage(args);
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

export const deleteMessage = createAsyncThunk(
    "chat/delete-message",
    async (args, thunkAPI) => {
        try {
            return await chatService.deleteMessage(args);
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
            state.chat = null;
            state.chats = [];
            state.messages = [];
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
            state.type = "";
        },
        selectChat: (state, action) => {
            state.chat = action.payload;
            state.type = action.type;
        },
        onNewMessage: (state, action) => {
            if (state.messages[0]?.chat_id === action.payload.chat_id) {
                let index = state.messages.findIndex(
                    (item) => item.id === action.payload.id
                );
                if (index > -1) {
                    state.messages.splice(index, 1, action.payload);
                    state.messages = [...state.messages];
                } else {
                    state.messages = [...state.messages, action.payload];
                }
            }
        },
        onMessageRead: (state, action) => {
            if (state.messages[0]?.chat_id === action.payload.id) {
                state.messages = action.payload.messages;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getChat.pending, (state, action) => {
                state.isLoading = true;
                state.type = action.type;
            })
            .addCase(getChat.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.chat = action.payload;
                state.type = action.type;
            })
            .addCase(getChat.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.type = action.type;
                state.message = action.payload;
            })
            .addCase(startChat.pending, (state, action) => {
                state.isLoading = true;
                state.type = action.type;
            })
            .addCase(startChat.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.chat = action.payload;
                state.type = action.type;
            })
            .addCase(startChat.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.type = action.type;
                state.message = action.payload;
            })
            .addCase(getChats.pending, (state, action) => {
                state.isLoading = true;
                state.type = action.type;
            })
            .addCase(getChats.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.chats = action.payload;
                state.type = action.type;
            })
            .addCase(getChats.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.type = action.type;
                state.message = action.payload;
            })
            .addCase(getMyChats.pending, (state, action) => {
                state.isLoading = true;
                state.type = action.type;
            })
            .addCase(getMyChats.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.chats = action.payload;
                state.type = action.type;
            })
            .addCase(getMyChats.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.type = action.type;
                state.message = action.payload;
            })
            .addCase(getMessages.pending, (state, action) => {
                state.isLoading = true;
                state.type = action.type;
            })
            .addCase(getMessages.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.messages = action.payload;
                state.type = action.type;
            })
            .addCase(getMessages.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.type = action.type;
                state.message = action.payload;
            })
            .addCase(searchMessages.pending, (state, action) => {
                state.isLoading = true;
                state.type = action.type;
            })
            .addCase(searchMessages.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.messages = action.payload;
                state.type = action.type;
            })
            .addCase(searchMessages.rejected, (state, action) => {
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

                let index = state.messages.findIndex(
                    (item) => item.id === action.payload.id
                );
                if (index > -1) {
                    state.messages.splice(index, 1, action.payload);
                    state.messages = [...state.messages];
                } else {
                    state.messages = [...state.messages, action.payload];
                }

                state.type = action.type;
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
            .addCase(deleteMessage.pending, (state, action) => {
                state.isLoading = true;
                state.type = action.type;
            })
            .addCase(deleteMessage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                let data = state.messages.filter(
                    (item) => item.id !== action.payload.id
                );
                state.messages = data;
                state.type = action.type;
            })
            .addCase(deleteMessage.rejected, (state, action) => {
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
                let data = state.chats.filter(
                    (item) => item.id !== action.payload.id
                );
                state.chats = data;
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
                let data = state.chats.filter(
                    (item) => item.id !== action.payload.id
                );
                state.chats = data;
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
                state.chats = [...state.chats, action.payload];
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

export const { reset, clear, onNewMessage, onMessageRead, selectChat } =
    chatSlice.actions;
export default chatSlice.reducer;
