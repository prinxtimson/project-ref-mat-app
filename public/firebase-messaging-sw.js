importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
    "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
    apiKey: "AIzaSyAVoEVkkSQeAJk6J_6tK74ySVTZlfPUeS4",
    authDomain: "sparklab-7b0a5.firebaseapp.com",
    projectId: "sparklab-7b0a5",
    storageBucket: "sparklab-7b0a5.appspot.com",
    messagingSenderId: "476562085444",
    appId: "1:476562085444:web:65bf782c67352ac2d2ce11",
    measurementId: "G-JET9WHJJ8Y",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log("Message received.", payload);
    const title = payload.notification.title;
    const options = {
        body: payload.notification.body,
        icon: "/images/logo.png",
    };
    return self.registration.showNotification(title, options);
});

messaging.setBackgroundMessageHandler(function ({
    data: { title, body, icon },
}) {
    return self.registration.showNotification(title, { body, icon });
});

// [END messaging_on_background_message]
