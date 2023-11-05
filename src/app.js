import { apiCallGet, apiCallPost } from './helper.js';
import { } from '../encrypt.js';

/******************************************************************************
************************************ Login ************************************
******************************************************************************/
const displayName = () => {
    const span = document.getElementById("display-username");
    span.textContent = localStorage.getItem("name");
}
displayName();

const login = () => {
    const loginName = document.getElementById("login-name").value;
    localStorage.setItem("name", loginName);
    displayName();

    const body = {
        "user": loginName
    }

    apiCallPost("createUser", body)
    .then((data) => {
        console.log(data);
        location.reload();
    })
    .catch((error) => console.log(error));
}
document.getElementById("login-button").addEventListener("click", login);
document.getElementById("login-name").addEventListener("keypress", (event) => {
    if (event.key === "Enter") login();
});

/******************************************************************************
********************************* List Users **********************************
******************************************************************************/
const listUsers = () => {
    apiCallGet("getUsers")
    .then((data) => {
        console.log(data)

        for (const user of data["users"]) {
            const displayUsers = document.getElementById("user-list");
            const fragment = document.createDocumentFragment();
            const userDiv = document.createElement("div");
            userDiv.textContent = user;
            fragment.appendChild(userDiv);
            displayUsers.append(fragment);
        }
    })
    .catch((error) => console.log(error));
}
listUsers();

/******************************************************************************
****************************** Manage Sessions ********************************
******************************************************************************/
const displaySessions = () => {
    apiCallGet("getSessions", `user=${localStorage.getItem("name")}`)
    .then((data) => {
        console.log("SESSIONS", data);
        const name = localStorage.getItem("name");

        const sessionReqDiv = document.getElementById("session-requests");

        for (const session of data["sessions"]) {
            const fragment = document.createDocumentFragment();
            const div = document.createElement("div");
            div.textContent = Object.keys(session["users"])[0] + ", " + Object.keys(session["users"])[1]
                + " [" + session["status"] + "]";

            if (session["users"][name]["key"] !== null) {
                div.textContent += " sent by " + name;
            }

            fragment.appendChild(div);
            sessionReqDiv.appendChild(fragment);
        }
    })
    .catch((error) => console.log(error));
}
displaySessions();

const startSession = () => {
    const user1 = localStorage.getItem("name");
    const user2 = document.getElementById("start-session").value;
    if (user2 !== "") {
        const body = {
            user1, 
            user2
        };
        
        apiCallPost("createSession", body)
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
    }
    displaySessions();
}

document.getElementById("start-session-button").addEventListener("click", startSession);
document.getElementById("start-session").addEventListener("keypress", (event) => {
    if (event.key === "Enter") startSession();
});

/******************************************************************************
******************************** Send Messages ********************************
******************************************************************************/
const sendMessage = () => {
    const message = document.getElementById("message-input").value;
    const key = document.getElementById("encryption-key").value;

    // Encrypt the message on the client-side.
    const encrypted = encryptMessage(message, key);
    console.log("client side:", encrypted);
    const body = {
        "sender": localStorage.getItem("name"),
        "receiver": document.getElementById("send-message-to").value,
        "message": encrypted,
    }

    apiCallPost("sendMessage", body)
    .then((data) => {
        console.log(data);
    })
    .catch((error) => console.log(error));
}

document.getElementById("send-message-button").addEventListener("click", sendMessage);
document.getElementById("message-input").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
});

/******************************************************************************
****************************** Receive Messages *******************************
******************************************************************************/
const loadMessages = () => {
    apiCallGet("getMessages", `user=${localStorage.getItem("name")}`)
    .then((data) => {
        for (const message of data["messages"]) {
            const displayMessages = document.getElementById("incoming-messages");
            const fragment = document.createDocumentFragment();
            const msgDiv = document.createElement("div");
            msgDiv.setAttribute("class", "message");
            msgDiv.textContent = "[" + message["sender"] + "] " + message["message"];
            fragment.appendChild(msgDiv);
            displayMessages.appendChild(fragment);
        }

    })
    .catch((error) => console.log(error));
}
loadMessages();

/******************************************************************************
******************************* Cryptography **********************************
******************************************************************************/
const crypto = window.crypto.subtle;

// Generate a key.
const generateKey = async () => {
    return crypto.generateKey({
        name: 'AES-GCM',
        length: 256
    }, true, ['encrypt', 'decrypt']);
}

// Get message encoding.
const encode = (data) => {
    let enc = new TextEncoder();
    return enc.encode(data);
}

// Get message decoding.
const decode = (data) => {
    let dec = new TextDecoder();
    return dec.decode(data);
}

// Convert from binary to Base64 (for sending to server).
const binaryToBase64 = (binaryData) => {
    return window.btoa(String.fromCharCode.apply(null, new Uint8Array(binaryData)));
}

// Encrypt message.
const encryptMessage = async (key, message) => {
    const encoded = encode(message);
    // Initialisation vector counter.
    const iv = window.crypto.getRandomValues(new Uint8Array(16));

    const encryptedMessage = await crypto.encrypt(
        { name: "AES-GCM", iv: iv },
        key,
        encoded
    );

    const encryptedData = {
        encryptedMessage,
        iv
    }

    return encryptedData;
}

// Decrypt message.
const decryptMessage = (key, messageData) => {
    const encryptedMessage = messageData["encryptedMessage"];
    const iv = messageData["iv"];

    return crypto.decrypt({ name: "AES-GCM", iv: iv }, key, encryptedMessage);
}

const key = await generateKey();
const encryptedMessage = await encryptMessage(key, "hello world");
console.log("base64 encoded:", binaryToBase64(encryptedMessage["encryptedMessage"]));
const decryptedMessage = await(decryptMessage(key, encryptedMessage));
console.log("decoded:", decode(decryptedMessage));