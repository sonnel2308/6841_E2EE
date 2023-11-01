import { apiCallPost } from "./helper.js";
import { encryptMessage } from "../encrypt.js";

document.getElementById("message-input").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        
        const body = {
            "message": document.getElementById("message-input").value,
            "key": document.getElementById("encryption-key").value
        }

        // console.log(body.message, body.key);
        const encrypted = encryptMessage(body.message, body.key);
        // console.log(encrypted);

        apiCallPost("encrypt", body)
        .then((data) => {
            console.log(data);
        })
        .catch((error) => console.log(error));
    }
});
