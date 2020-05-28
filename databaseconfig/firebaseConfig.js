import * as firebase from 'firebase';
import firestore from 'firebase/firestore';


var firebaseConfig = {
    apiKey: "AIzaSyA3UGIMqtCklODwfUajkc_bW39DEfQZoJI",
    authDomain: "clinic-enrollment.firebaseapp.com",
    databaseURL: "https://clinic-enrollment.firebaseio.com",
    projectId: "clinic-enrollment",
    storageBucket: "clinic-enrollment.appspot.com",
    messagingSenderId: "519658787313",
    appId: "1:519658787313:web:3b564e4ffd25d3564ab450"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
 
  firebase.firestore();
  
 export default firebase;
