import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import reportWebVitals from './reportWebVitals';
import firebase from "firebase/app";
import 'firebase/auth'
firebase.initializeApp({
    apiKey: "AIzaSyCwl_lLLNqYs0VAEOKKePZm-XQxeliDuJA",
    authDomain: "medicine-calc.firebaseapp.com",
    databaseURL: "https://medicine-calc.firebaseio.com",
    projectId: "medicine-calc",
    storageBucket: "medicine-calc.appspot.com",
    messagingSenderId: "815717569341",
    appId: "1:815717569341:web:76cdf31c984ba0895eeb54"
})



firebase.auth().onAuthStateChanged(()=>{
    ReactDOM.render(
        //<React.StrictMode>
        <App />
        //</React.StrictMode>
        ,
        document.getElementById('root')
    );
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
