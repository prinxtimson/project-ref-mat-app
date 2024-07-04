import axios from "axios";
import { initializeApp } from "firebase/app";
import {
    getMessaging,
    getToken,
    onMessage,
    isSupported,
} from "firebase/messaging";
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_SENDERID,
    appId: import.meta.env.VITE_FIREBASE_APPID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENTID,
};

export const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const getFCMToken = () => {
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
        return;
    } else if (Notification.permission === "granted") {
        return getToken(messaging).then((token) => {
            if (token) {
                axios
                    .post("/fcm-token", { token })
                    .then((res) => console.log(res.data))
                    .catch((err) => console.log(err));
            }
        });
    } else {
        Notification.requestPermission().then(function (permission) {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                return getToken(messaging).then((token) => {
                    if (token) {
                        axios
                            .post("/fcm-token", { token })
                            .then((res) => console.log(res.data))
                            .catch((err) => console.log(err));
                    }
                });
            }
        });
    }
};

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });
