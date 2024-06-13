import axios from "axios";
import { initializeApp } from "firebase/app";
import {
    getMessaging,
    getToken,
    onMessage,
    isSupported,
} from "firebase/messaging";
const firebaseConfig = {
    apiKey: "AIzaSyAVoEVkkSQeAJk6J_6tK74ySVTZlfPUeS4",
    authDomain: "sparklab-7b0a5.firebaseapp.com",
    projectId: "sparklab-7b0a5",
    storageBucket: "sparklab-7b0a5.appspot.com",
    messagingSenderId: "476562085444",
    appId: "1:476562085444:web:65bf782c67352ac2d2ce11",
    measurementId: "G-JET9WHJJ8Y",
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
