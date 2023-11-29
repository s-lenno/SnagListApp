// firebase.js
import { initializeApp } from '@react-native-firebase/app';
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc } from '@react-native-firebase/firestore';

const firebaseConfig = {
  // Your Firebase config object
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const addSnagItem = async (data) => {
  try {
    const snagListRef = collection(db, 'snagList');
    await addDoc(snagListRef, data);
  } catch (error) {
    console.error('Error adding snag item:', error);
  }
};

export const updateSnagItem = async (id, data) => {
  try {
    const snagItemRef = doc(db, 'snagList', id);
    await updateDoc(snagItemRef, data);
  } catch (error) {
    console.error('Error updating snag item:', error);
  }
};

export const deleteSnagItem = async (id) => {
  try {
    const snagItemRef = doc(db, 'snagList', id);
    await deleteDoc(snagItemRef);
  } catch (error) {
    console.error('Error deleting snag item:', error);
  }
};
