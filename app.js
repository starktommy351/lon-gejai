import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// !!! আপনার Firebase Console থেকে পাওয়া তথ্য এখানে বসান !!!
const firebaseConfig = {
    apiKey: "আপনার_API_KEY",
    authDomain: "আপনার_PROJECT.firebaseapp.com",
    projectId: "আপনার_PROJECT_ID",
    storageBucket: "আপনার_PROJECT.appspot.com",
    messagingSenderId: "আপনার_SENDER_ID",
    appId: "আপনার_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const colRef = collection(db, "messages");

const input = document.getElementById('msgInput');
const btn = document.getElementById('sendBtn');
const chatBox = document.getElementById('chat-box');

// মেসেজ পাঠানো
btn.onclick = async () => {
    if (input.value.trim() !== "") {
        await addDoc(colRef, {
            text: input.value,
            createdAt: serverTimestamp()
        });
        input.value = "";
    }
};

// রিয়েল-টাইম আপডেট
const q = query(colRef, orderBy("createdAt", "asc"));
onSnapshot(q, (snapshot) => {
    chatBox.innerHTML = "";
    snapshot.docs.forEach(doc => {
        const div = document.createElement('div');
        div.className = 'message-bubble';
        div.textContent = doc.data().text;
        chatBox.appendChild(div);
    });
    chatBox.scrollTop = chatBox.scrollHeight;
});
