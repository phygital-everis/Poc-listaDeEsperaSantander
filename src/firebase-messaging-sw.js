
importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-messaging.js');


firebase.initializeApp({
    'messagingSenderId': '1068980037632'
});

const messaging = firebase.messaging();