/**
 * @author Nisarg Vaghela
 */

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDZx3XlghYLRVCmgTB7WwN-QdWIy0eutFg",
    authDomain: "issuestack.firebaseapp.com",
    projectId: "issuestack",
    storageBucket: "issuestack.appspot.com",
    messagingSenderId: "534434982184",
    appId: "1:534434982184:web:6d149d9eb017903ea8481d",
    measurementId: "G-KPY93T6ZW0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

// upload file to firebase storage
export const uploadFile = async (file) => {
    const path = file.name + "_" + Date.now();
    const storageRef = ref(storage, `tickets/${path}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
        uploadTask.then((snapshot) => {
            console.log('Uploaded a blob or file!');
            getDownloadURL(snapshot.ref).then((downloadURL) => {
                resolve({
                    name: file.name,
                    type: file.type,
                    path: path,
                    url: downloadURL
                });
            });
        });
    });
}