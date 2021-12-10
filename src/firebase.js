import { initializeApp } from 'firebase/app';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    getDoc,
    doc,
    updateDoc,
    deleteDoc,
    query,
    orderBy,
    limit,
    where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FB_API_KEY,
    authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FB_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FB_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FB_APP_ID,
};

initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// Firebase Firestore

// Doors Collection
const doorsCollectionRef = collection(db, 'doors');

export async function getAllDoors() {
    const snapshot = await getDocs(doorsCollectionRef);
    const doors = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    return doors;
}

export async function getDoorById(id) {
    const docRef = doc(db, 'doors', id);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
        return { ...snapshot.data(), id: snapshot.id };
    } else {
        throw new Error(`Item with id ${id} not found!`);
    }
}

export async function getLatestDoors(count) {
    const q = query(doorsCollectionRef, orderBy('title', 'asc'), limit(count));
    const snapshot = await getDocs(q);
    const doors = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    return doors;
}

export function createDoor(data) {
    return addDoc(doorsCollectionRef, data);
}

export function updateDoor(id, data) {
    const docRef = doc(db, 'doors', id);
    return updateDoc(docRef, data);
}

export function deleteDoor(id) {
    const docRef = doc(db, 'doors', id);
    deleteDoc(docRef).then(console.log).catch(console.log);
}

// Orders Collection
const ordersCollectionRef = collection(db, 'orders');

export async function getAllOrders() {
    const snapshot = await getDocs(ordersCollectionRef);
    const orders = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    return orders;
}

export function createOrder(data) {
    return addDoc(ordersCollectionRef, data);
}

export async function getUserOrders(userId) {
    const q = query(ordersCollectionRef, where('customerId', '==', userId));
    const snapshot = await getDocs(q);
    const userOrders = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
    }));
    console.log(userOrders);
    return userOrders;
}

// Firebase Authentication
export function register(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
}

export function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
    return signOut(auth);
}

export function useAuth() {
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user?.email === 'admin@test.com') {
                user.isAdmin = true;
            }
            setCurrentUser(user);
        });
        return unsubscribe;
    }, []);

    return currentUser;
}
