import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import History from "../../utils/History";

// Get user from local storag

const initialState = {
    user: null,
    isAuthenticated: false,
    type: "",
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const register = createAsyncThunk(
    "auth/register",
    async (data, thunkAPI) => {
        try {
            return await authService.register(data);
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

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
    try {
        return await authService.login(data);
    } catch (err) {
        const msg =
            (err.response && err.response.data && err.response.data.message) ||
            err.message ||
            err.toString();

        return thunkAPI.rejectWithValue(msg);
    }
});

export const forgotPass = createAsyncThunk(
    "auth/forgot-password",
    async (email, thunkAPI) => {
        try {
            return await authService.forgotPass(email);
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

export const resetPass = createAsyncThunk(
    "auth/reset-password",
    async (data, thunkAPI) => {
        try {
            const res = await authService.resetPass(data);

            return res;
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

export const updateUser = createAsyncThunk(
    "auth/update",
    async (data, thunkAPI) => {
        try {
            return await authService.updateUser(data);
        } catch (err) {
            if (err.response.status == 401 || err.response.status == 403) {
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

export const changePass = createAsyncThunk(
    "auth/change-password",
    async (data, thunkAPI) => {
        try {
            return await authService.changePass(data);
        } catch (err) {
            if (err.response.status == 401 || err.response.status == 403) {
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

export const changeEmail = createAsyncThunk(
    "auth/change-email",
    async (data, thunkAPI) => {
        try {
            return await authService.changeEmail(data);
        } catch (err) {
            if (err.response.status === 401 || err.response.status == 403) {
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

export const getCurrentUser = createAsyncThunk("auth/me", async (thunkAPI) => {
    try {
        return await authService.getCurrentUser();
    } catch (err) {
        if (err.response.status === 401 || err.response.status == 403) {
            thunkAPI.dispatch(clearUser());
        }
        const msg =
            (err.response && err.response.data && err.response.data.message) ||
            err.message ||
            err.toString();

        return thunkAPI.rejectWithValue(msg);
    }
});

export const updateOptions = createAsyncThunk(
    "auth/update-option",
    async (data, thunkAPI) => {
        try {
            return await authService.updateOptions(data);
        } catch (err) {
            if (err.response.status === 401) {
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

export const resend2fa = createAsyncThunk(
    "auth/resend-2fa",
    async (thunkAPI) => {
        try {
            return await authService.resend2fa();
        } catch (err) {
            if (err.response.status === 401) {
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

export const confirm2fa = createAsyncThunk(
    "auth/confirm-2fa",
    async (data, thunkAPI) => {
        try {
            return await authService.confirm2fa(data);
        } catch (err) {
            if (err.response.status === 401) {
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

export const logout = createAsyncThunk("auth/logout", async () => {
    return await authService.logout();
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = "";
            state.type = "";
        },
        clearUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.type = action.type;
                state.isAuthenticated = true;
                state.user = action.payload.data;
                state.message = action.payload.message;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isAuthenticated = false;
                state.user = null;
                state.type = action.type;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.type = action.type;
                state.isAuthenticated = true;
                if (action.payload.data.is_2fa_enable) {
                    History.navigate("/2fa");
                } else {
                    History.navigate("/2fa/setup");
                }
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(confirm2fa.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(confirm2fa.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.isSuccess = true;
                state.type = action.type;
            })
            .addCase(confirm2fa.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(resend2fa.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(resend2fa.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.type = action.type;
                state.message = action.payload.message;
            })
            .addCase(resend2fa.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateOptions.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateOptions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.type = action.type;
                state.user = action.payload.data;
                state.message = action.payload.message;
            })
            .addCase(updateOptions.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getCurrentUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.type = action.type;
                state.user = action.payload.data;
            })
            .addCase(getCurrentUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.type = action.type;
                state.message = action.payload.message;
                state.user = action.payload.data;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(changePass.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(changePass.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.type = action.type;
                state.message = action.payload.message;
            })
            .addCase(changePass.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(changeEmail.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(changeEmail.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.type = action.type;
                state.message = action.payload.message;
            })
            .addCase(changeEmail.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(forgotPass.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(forgotPass.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.type = action.type;
                state.message =
                    "Instructions to reset your password have been sent to your email";
            })
            .addCase(forgotPass.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(resetPass.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(resetPass.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.type = action.type;
                state.message = "Password reset successful";
            })
            .addCase(resetPass.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset, clearUser } = authSlice.actions;
export default authSlice.reducer;
