import { access, constants } from 'node:fs/promises';
import fs from 'fs';
import * as url from 'url';

const database = {};
const databaseFilePath = url.fileURLToPath(new URL('../database.json', import.meta.url));
console.log(databaseFilePath);
// Initialise database.json.
const initDatabase = async () => {
    try {
        await access(databaseFilePath, constants.F_OK);
        console.log("Accessing database.json");
        const content = fs.readFileSync(databaseFilePath, 'utf-8');
        const parsedDatabase = JSON.parse(content);
        Object.assign(database, parsedDatabase);
        // console.log("database:", database);
    } catch (error) {
        console.log("Creating database.json");
        database["users"] = [];
        database["messages"] = [];
        // console.log("database:", database);

        fs.writeFileSync(databaseFilePath, JSON.stringify(database, null, 4));
    }
}

// Get all users in the database.
export const getUsers = async () => {
    await initDatabase();
    const users = [];
    for (const user of database["users"]) {
        users.push(user);
    }
    
    return users;
}

// Add user to database.
export const createUser = async (name) => {
    await initDatabase(); 
    if (database["users"].includes(name)) {
        return;
    }
    database["users"].push(name);
    fs.writeFileSync(databaseFilePath, JSON.stringify(database, null, 4));
}

// Send message between two users to database.
export const sendMessage = async (sender, receiver, message) => {
    await initDatabase();
    const msgBody = {
        sender,
        receiver,
        message
    }
    database["messages"].push(msgBody);
    console.log(database);
    fs.writeFileSync(databaseFilePath, JSON.stringify(database, null, 4));
}

// Get messages sent to a user.
export const getMessages = async (user) => {
    await initDatabase();

    const messages = [];
    for (const message of database["messages"]) {
        if (message["receiver"] === user) {
            messages.push(message);
        }
    }

    return messages;
}

// getMessages("bob");
// createUser("alice");
// sendMessage("abc", "xyz", "hi guys");