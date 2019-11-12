
importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-messaging.js');


firebase.initializeApp({
    'messagingSenderId': 'AIzaSyBY8_rpkDbgED8K6hcsPg8iOWoml_uad2Y'
});

const messaging = firebase.messaging();