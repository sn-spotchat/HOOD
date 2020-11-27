import firebase from 'firebase/app';
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDNe_G-z5EPOI7-t7xjEHhA7Fx8yRGXS74",
    authDomain: "hood-sgtmi.firebaseapp.com",
    databaseURL: "https://hood-sgtmi.firebaseio.com",
    projectId: "hood-sgtmi",
    storageBucket: "hood-sgtmi.appspot.com",
    messagingSenderId: "80145957779",
    appId: "1:80145957779:web:e72842d0c7605211795e66",
    measurementId: "G-TPHYH6LN5T"
  };
  firebase.initializeApp(firebaseConfig);
  
  const database = firebase.database();
  const storage = firebase.storage();
  export { database, storage };