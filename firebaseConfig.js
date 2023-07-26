import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAiu6kOnzqw4nsenq0KsQhgWb3FdyoDf5w",
  authDomain: "personal-app-16754.firebaseapp.com",
  databaseURL: "https://personal-app-16754-default-rtdb.firebaseio.com",
  projectId: "personal-app-16754",
  storageBucket: "personal-app-16754.appspot.com",
  messagingSenderId: "577776518669",
  appId: "1:577776518669:web:bdd61ea29b45aa98b07744",
  measurementId: "G-C61KRSK8QG",
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

function writeUserData(userId, name, email) {
  const db = getDatabase(app);
  set(ref(db, "users/" + userId), {
    username: name,
    email: email,
  });
}
writeUserData("1", "putra", "jajs");
