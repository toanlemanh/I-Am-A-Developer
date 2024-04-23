import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebaseConfig";

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


//INIT USER
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

// UPDATE MONEY
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




