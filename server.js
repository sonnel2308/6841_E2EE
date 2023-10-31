import Express from "express";
import cors from "cors";
import { PORT } from "./frontend/src/config.js";
import { encryptMessage } from "./backend/encrypt.js";

const app = Express();

app.use(Express.json());
app.use(cors());
// https://expressjs.com/en/starter/static-files.html
app.use(Express.static('frontend/src'));


app.post('/encrypt', (req, res) => {
    const message = req.body.message;

    const encrypted = encryptMessage(message, "myKey");
    console.log("ENCRYPTED MESSAGE:", encrypted);

    res.json({
        message,
        encrypted
    });
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});