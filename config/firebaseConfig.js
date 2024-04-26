import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAb-ikC6OtN_mah2Z1_BKu-bPYKEPdWn2w",
    authDomain: "fb-login-demo-93174.firebaseapp.com",
    databaseURL: "https://fb-login-demo-93174-default-rtdb.firebaseio.com",
    projectId: "fb-login-demo-93174",
    storageBucket: "fb-login-demo-93174.appspot.com",
    messagingSenderId: "900653425411",
    appId: "1:900653425411:web:bde83da043bbd7457f7f36"
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
