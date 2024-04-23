import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebaseConfig";

// Lấy data về (có thể bất kì loại data nào)
export const fetchData = async (userid, collection) => {
    const docRef = doc(db, collection, userid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data().name);
    } else {
        console.log("No such document!");
    }
    return docSnap.data()
}

// Thêm mới 1 document vào 1 custom collection hoặc cũng có thể ghi đè data (not recommended)
export async function postData(userid, collection, data) {
    if (!document) {
        throw new Error("Please provide a document ID for the new document.");
    }

    try {
        await setDoc(doc(db, collection, userid), data);
        console.log("Document written with ID:", document);
    } catch (e) {
        console.error("Error adding document:", e);
    }
}


//INIT USER (Working on it)
export async function initUserData(collection, userid, data) {
    if (!document) {
        throw new Error("Please provide a document ID for the new document.");
    }

    try {
        await setDoc(doc(db, collection, userid), data);
        console.log("Document written with ID:", document);
    } catch (e) {
        console.error("Error adding document:", e);
    }
}


// Working on it
export async function updateStatus(userid, { happiness, health, look }) {
    if (!document) {
        throw new Error("Please provide a document ID for the new document.");
    }

    try {
        await updateDoc(doc(db, 'characters', userid), {
            status: {
                happiness: happiness,
                health: health,
                look: look
            }
        });
        console.log("Document written with ID:", document);
    } catch (e) {
        console.error("Error adding document:", e);
    }
}

// UPDATE MONEY (Working on it)
export async function updateMoney(userid, money) {
    if (!document) {
        throw new Error("Please provide a document ID for the new document.");
    }

    try {
        await updateDoc(doc(db, 'characters', userid), {
            money: money
        });
        console.log("Document written with ID:", document);
    } catch (e) {
        console.error("Error adding document:", e);
    }
}




