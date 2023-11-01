import { apiCallPost } from './helper.js';
import { encryptMessage } from '../encrypt.js';

document.getElementById("message-input").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        
        const message = document.getElementById("message-input").value;
        const key = document.getElementById("encryption-key").value;

        // Encrypt the message on the client-side.
        const encrypted = encryptMessage(message, key);
        console.log("client side:", encrypted);
        const body = {
            "message": encrypted
        }

        apiCallPost("sendMessage", body)
        .then((data) => {
            console.log(data);
        })
        .catch((error) => console.log(error));
    }
});
