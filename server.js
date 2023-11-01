import Express from 'express';
import cors from 'cors';
import { PORT } from './src/config.js';

const app = Express();

app.use(Express.json());
app.use(cors());
// Static files https://expressjs.com/en/starter/static-files.html
app.use(Express.static('dist'));

// Send a message.
app.post('/sendMessage', (req, res) => {
    const message = req.body.message;

    res.json({
        message
    });
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});