import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase} from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBehvmXg4RPEHPw2RZ-nN0PmXUGSYzzr-4",
    authDomain: "brew-crew-7b2c8.firebaseapp.com",
    projectId: "brew-crew-7b2c8",
    storageBucket: "brew-crew-7b2c8.appspot.com",
    messagingSenderId: "479996779422",
    appId: "1:479996779422:web:ad4628bd886d67ebf2d48f"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const database = getDatabase(app);