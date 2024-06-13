import { configureStore } from "@reduxjs/toolkit";
import auth from "./features/auth/authSlice";
import notification from "./features/notification/notificationSlice";
import chat from "./features/chat/chatSlice";

export const store = configureStore({
    reducer: {
        auth,
        notification,
        chat,
    },
});
