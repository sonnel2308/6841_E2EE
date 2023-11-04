import { apiCallPost } from './helper.js';
import { encryptMessage } from '../encrypt.js';

// Login
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
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
}
document.getElementById("login-button").addEventListener("click", login);
document.getElementById("login-name").addEventListener("keypress", (event) => {
    if (event.key === "Enter") login();
});

// Send Messages
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

