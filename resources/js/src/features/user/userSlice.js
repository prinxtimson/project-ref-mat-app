import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";
import { clearUser } from "../auth/authSlice";

const initialState = {
    users: null,
    user: null,
    performance: [],
    type: "",
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const getUsers = createAsyncThunk("user/get", async (args, thunkAPI) => {
    try {
        return await userService.getUsers();
    } catch (err) {
        if (err.response.status == 401) {
            thunkAPI.dispatch(clearUser());
        }
        const msg =
            (err.response && err.response.data && err.response.data.message) ||
            err.message ||
            err.toString();

        return thunkAPI.rejectWithValue(msg);
    }
});

export const getUsersByRoles = createAsyncThunk(
    "user/get-role-users",
    async (args, thunkAPI) => {
        try {
            return await userService.getUsersByRoles(args);
        } catch (err) {
            if (err.response.status == 401) {
                thunkAPI.dispatch(clearUser());
            }
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

export const getUsersByRolesByPage = createAsyncThunk(
    "user/get-role-users-by-page",
    async (args, thunkAPI) => {
        try {
            return await userService.getUsersByRolesByPage(args);
        } catch (err) {
            if (err.response.status == 401) {
                thunkAPI.dispatch(clearUser());
            }
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

export const getUsersByPage = createAsyncThunk(
    "user/get-by-page",
    async (page, thunkAPI) => {
        try {
            return await userService.getUsersByPage(page);
        } catch (err) {
            if (err.response.status == 401) {
                thunkAPI.dispatch(clearUser());
            }
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

export const getTeamPerformance = createAsyncThunk(
    "user/get-team-performance",
    async (args, thunkAPI) => {
        try {
            return await userService.getTeamPerformance();
        } catch (err) {
            if (err.response.status == 401) {
                thunkAPI.dispatch(clearUser());
            }
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

export const searchUsers = createAsyncThunk(
    "user/search",
    async (query, thunkAPI) => {
        try {
            return await userService.searchUsers(query);
        } catch (err) {
            if (err.response.status == 401) {
                thunkAPI.dispatch(clearUser());
            }
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

export const getUser = createAsyncThunk(
    "user/get-single",
    async (args, thunkAPI) => {
        try {
            return await userService.getUser(args);
        } catch (err) {
            if (err.response.status == 401) {
                thunkAPI.dispatch(clearUser());
            }
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

export const createUser = createAsyncThunk(
    "user/new",
    async (args, thunkAPI) => {
        try {
            return await userService.createUser(args);
        } catch (err) {
            if (err.response.status == 401) {
                thunkAPI.dispatch(clearUser());
            }
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

export const editUser = createAsyncThunk(
    "user/edit",
    async (args, thunkAPI) => {
        try {
            return await userService.editUser(args);
        } catch (err) {
            if (err.response.status == 401) {
                thunkAPI.dispatch(clearUser());
            }
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

export const deleteUser = createAsyncThunk(
    "user/delete",
    async (args, thunkAPI) => {
        try {
            return await userService.deleteUser(args);
        } catch (err) {
            if (err.response.status == 401) {
                thunkAPI.dispatch(clearUser());
            }
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

export const suspendUser = createAsyncThunk(
    "user/suspend",
    async (args, thunkAPI) => {
        try {
            return await userService.suspendUser(args);
        } catch (err) {
            if (err.response.status == 401) {
                thunkAPI.dispatch(clearUser());
            }
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

export const unsuspendUser = createAsyncThunk(
    "user/unsuspend",
    async (args, thunkAPI) => {
        try {
            return await userService.unsuspendUser(args);
        } catch (err) {
            if (err.response.status == 401) {
                thunkAPI.dispatch(clearUser());
            }
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

export const sendAccountCode = createAsyncThunk(
    "user/email-send-token",
    async (data, thunkAPI) => {
        try {
            return await userService.sendAccountCode(data);
        } catch (err) {
            if (err.response.status == 401) {
                thunkAPI.dispatch(clearUser());
            }
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

export const createAccount = createAsyncThunk(
    "user/create-account",
    async (data, thunkAPI) => {
        try {
            return await userService.createAccount(data);
        } catch (err) {
            if (err.response.status == 401) {
                thunkAPI.dispatch(clearUser());
            }
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

export const editUserRole = createAsyncThunk(
    "user/edit-user-role",
    async (data, thunkAPI) => {
        try {
            return await userService.editUserRole(data);
        } catch (err) {
            if (err.response.status == 401) {
                thunkAPI.dispatch(clearUser());
            }
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

export const userSlice = createSlice({
    initialState,
    name: "user",
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
            state.type = "";
        },
        clear: (state) => {
            state.user = null;
            state.users = null;
            state.performance = [];
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
            state.type = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.type = action.type;
                state.users = action.payload;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getUsersByRoles.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUsersByRoles.fulfilled, (state, action) => {
                state.isLoading = false;
                state.type = action.type;
                state.users = action.payload;
            })
            .addCase(getUsersByRoles.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getUsersByRolesByPage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUsersByRolesByPage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.type = action.type;
                state.users = action.payload;
            })
            .addCase(getUsersByRolesByPage.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.type = action.type;
                state.user = action.payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.type = action.type;
                state.isSuccess = true;
                state.user = action.payload;
                state.message = "Account created successful";
            })
            .addCase(createUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(editUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(editUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.type = action.type;
                state.isSuccess = true;
                state.user = action.payload;
                state.message = "User update successful";
            })
            .addCase(editUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.type = action.type;
                let data = state.users.data.filter(
                    (item) => item.id !== action.payload.id
                );
                state.users = { ...state.users, data };
                state.message = "Account deleted successfull";
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(suspendUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(suspendUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.type = action.type;
                state.user = action.payload;
                state.message = "Account Deactivated successful";
            })
            .addCase(suspendUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            .addCase(unsuspendUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.type = action.type;

                state.user = action.payload;
                state.message = "Account activated successful";
            })
            .addCase(unsuspendUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getTeamPerformance.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTeamPerformance.fulfilled, (state, action) => {
                state.isLoading = false;
                state.type = action.type;
                state.performance = action.payload;
            })
            .addCase(getTeamPerformance.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(searchUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(searchUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.type = action.type;
                state.users.data = action.payload;
                state.users.total = action.payload.length;
            })
            .addCase(searchUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getUsersByPage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUsersByPage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.type = action.type;
                state.users = action.payload;
            })
            .addCase(getUsersByPage.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(sendAccountCode.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(sendAccountCode.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.type = action.type;
                state.message = action.payload.message;
            })
            .addCase(sendAccountCode.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(editUserRole.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(editUserRole.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.type = action.type;
                state.message = "assign role successful";
                state.user = action.payload;
                let index = state.users.data.findIndex(
                    (item) => item.id === action.payload.id
                );
                state.users.data.splice(index, 1, action.payload);
                state.users = { ...state.users };
            })
            .addCase(editUserRole.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createAccount.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createAccount.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.type = action.type;
                state.message = action.payload.message;
                state.user = action.payload.data;
            })
            .addCase(createAccount.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset, clear } = userSlice.actions;
export default userSlice.reducer;
