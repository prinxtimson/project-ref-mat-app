import { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import { Provider } from "react-redux";

import "primereact/resources/themes/soho-light/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons

import { store } from "./store";
import { getCurrentUser, logout } from "./features/auth/authSlice";
import {
    getMyChats,
    onMessageRead,
    onNewMessage,
} from "./features/chat/chatSlice";
import {
    getNotification,
    onNewNotification,
} from "./features/notification/notificationSlice";

//import { onMessageListener } from "./firebase";

import GuestRoute from "./utils/GuestRoute";
import AuthRoute from "./utils/AuthRoute";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import TwoFactorAuthPage from "./pages/auth/TwoFactorAuthPage";
import DashboardHomePage from "./pages/dashboard/HomePage";
import ProfilePage from "./pages/dashboard/ProfilePage";
import NotificationPage from "./pages/dashboard/NotificationPage";
import TwoFactorAuthSetupPage from "./pages/auth/TwoFactorAuthSetupPage";
import NavigateSetter from "./utils/NavigateSetter";
import ChangePasswordPage from "./pages/dashboard/ChangePasswordPage";
import SearchPage from "./pages/dashboard/SearchPage";
import RequestReferencePage from "./pages/dashboard/RequestReferencePage";
import CancelReferencePage from "./pages/dashboard/CancelReferencePage";
import ReferenceTrackingPage from "./pages/dashboard/ReferenceTrackingPage";
import DataDeletionPage from "./pages/dashboard/DataDeletionPage";
import DataAccessRequestPage from "./pages/dashboard/DataAccessRequestPage";

const App = () => {
    const [user, setUser] = useState(store.getState().auth.user);
    //const [chats, setChats] = useState(store.getState().chat.chats);

    useEffect(() => {
        store.dispatch(getCurrentUser());
        store.dispatch(getNotification());
    }, []);

    // useEffect(() => {
    //     if (user) {
    //         reset();

    //         window.Echo.private(`App.Models.User.${user.id}`).notification(
    //             (notification) => {
    //                 console.log(notification.type);
    //                 store.dispatch(onNewNotification(notification));
    //             }
    //         );

    //         onMessageListener().then((payload) => {
    //             store.dispatch(getMyChats());
    //             const title = payload.notification.title;
    //             const options = {
    //                 body: payload.notification.body,
    //                 icon: "/images/cct_logo.png",
    //             };
    //             new Notification(title, options);
    //         });
    //     }
    // }, [user]);

    // useEffect(() => {
    //     chats.map((chat) =>
    //         window.Echo.channel(chat.id)
    //             .listen("NewMessage", (e) => {
    //                 store.dispatch(onNewMessage(e.message));
    //             })
    //             .listen("MessageRead", (e) => {
    //                 store.dispatch(onMessageRead(e.chat));
    //             })
    //     );
    // }, [chats]);

    store.subscribe(() => {
        setUser(store.getState().auth.user);
    });

    return (
        <Provider store={store}>
            <BrowserRouter>
                <NavigateSetter />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route
                        path="/login"
                        element={
                            <GuestRoute>
                                <LoginPage />
                            </GuestRoute>
                        }
                    />
                    <Route path="/2fa" element={<TwoFactorAuthPage />} />
                    <Route
                        path="/2fa/setup"
                        element={<TwoFactorAuthSetupPage />}
                    />
                    <Route path="/password">
                        <Route
                            path="forgot"
                            element={
                                <GuestRoute>
                                    <ForgotPasswordPage />
                                </GuestRoute>
                            }
                        />
                        <Route
                            path="reset/:token"
                            element={
                                <GuestRoute>
                                    <ResetPasswordPage />
                                </GuestRoute>
                            }
                        />
                    </Route>
                    <Route
                        path="profile"
                        element={
                            <AuthRoute>
                                <ProfilePage />
                            </AuthRoute>
                        }
                    />
                    <Route
                        path="request-reference"
                        element={
                            <AuthRoute>
                                <RequestReferencePage />
                            </AuthRoute>
                        }
                    />
                    <Route
                        path="cancel-reference"
                        element={
                            <AuthRoute>
                                <CancelReferencePage />
                            </AuthRoute>
                        }
                    />
                    <Route
                        path="reference-tracking"
                        element={
                            <AuthRoute>
                                <ReferenceTrackingPage />
                            </AuthRoute>
                        }
                    />
                    <Route
                        path="data-deletion"
                        element={
                            <AuthRoute>
                                <DataDeletionPage />
                            </AuthRoute>
                        }
                    />
                    <Route
                        path="data-access"
                        element={
                            <AuthRoute>
                                <DataAccessRequestPage />
                            </AuthRoute>
                        }
                    />
                    <Route
                        path="change-password"
                        element={
                            <AuthRoute>
                                <ChangePasswordPage />
                            </AuthRoute>
                        }
                    />
                    <Route
                        path="notifications"
                        element={
                            <AuthRoute>
                                <NotificationPage />
                            </AuthRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </Provider>
    );
};

export default App;

if (document.getElementById("root")) {
    const Index = ReactDOM.createRoot(document.getElementById("root"));
    const value = {
        ripple: true,
    };

    Index.render(
        <PrimeReactProvider value={value}>
            <App />
        </PrimeReactProvider>
    );
}
