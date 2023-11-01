import { PORT } from './config.js';

export const apiCallPost = (path, body) => {
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:${PORT}/${path}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        mode: "cors"
        })
        .then((response) => response.json())
        .then((data) => {
            data.error ? reject(data.error) : resolve(data);
        });
    })
}
