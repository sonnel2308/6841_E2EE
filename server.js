import Express from 'express';
import cors from 'cors';
import { PORT } from './src/config.js';
import { 
    createUser, getUsers,
    sendMessage, getMessages,
    createSession, getSessions } from './src/service.js';

const app = Express();

app.use(Express.json());
app.use(cors());
app.use(Express.static('dist'));

// Create a user.
app.post('/createUser', (req, res) => {
    const user = req.body.user;

    createUser(user);

    res.json({
        user
    });
});

// Create a session.
app.post('/createSession', async (req, res) => {
    const user1 = req.body.user1;
    const user2 = req.body.user2;

    const session = await createSession(user1, user2);

    res.json({
        session
    });
});

// Get user's sessions.
app.get('/getSessions', async (req, res) => {
    const user = req.query.user;
    const sessions = await getSessions(user);

    res.json({
        sessions
    });
});

// Send a message.
app.post('/sendMessage', (req, res) => {
    const sender = req.body.sender;
    const receiver = req.body.receiver;
    const message = req.body.message;

    sendMessage(sender, receiver, message);

    res.json({
        message
    });
});

// Get messages.
app.get('/getMessages', async (req, res) => {
    const user = req.query.user;
    const messages = await getMessages(user);

    res.json({
        messages
    });
});

// Get users.
app.get('/getUsers', async (req, res) => {
    const users = await getUsers();

    res.json({
        users
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});