import { apiCallPost } from "./helper.js";

document.getElementById("message-input").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        console.log(document.getElementById("message-input").value);
        
        const body = {
            "message": document.getElementById("message-input").value
        }

        apiCallPost("encrypt", body)
        .then((data) => {
            console.log(data);
        })
        .catch((error) => console.log(error));
    }
});
