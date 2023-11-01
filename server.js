import Express from "express";
import cors from "cors";
import { PORT } from "./src/config.js";
import { encryptMessage } from "./encrypt.js";

const app = Express();

app.use(Express.json());
app.use(cors());
// Static files https://expressjs.com/en/starter/static-files.html
app.use(Express.static('dist'));

// Encrypt a message
app.post('/encrypt', (req, res) => {
    const message = req.body.message;
    const key = req.body.key;

    const encrypted = encryptMessage(message, key);
    console.log("ENCRYPTED MESSAGE:", encrypted);
    console.log("MESSAGE:", message);

    res.json({
        message,
        encrypted
    });
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});