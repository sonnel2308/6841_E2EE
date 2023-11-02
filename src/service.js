import { access, constants } from 'node:fs/promises';
import fs from 'fs';

const database = {};

// Initialise database.json.
const initDatabase = async () => {
    try {
        await access("../database.json", constants.F_OK);
        console.log("Accessing database.json");
        const content = fs.readFileSync("../database.json", 'utf-8');
        const parsedDatabase = JSON.parse(content);
        Object.assign(database, parsedDatabase);
        // console.log("database:", database);
    } catch (error) {
        console.log("Creating database.json");
        database["users"] = [];
        database["messages"] = [];
        // console.log("database:", database);

        fs.writeFileSync("../database.json", JSON.stringify(database, null, 4));
    }
}

// Add user to database.
export const createUser = async (name) => {
    await initDatabase();
    if (database["users"].includes(name)) {
        console.log(name, "already exists");
        throw new Error(name, "already exists");
    }
    database["users"].push(name);
    fs.writeFileSync("../database.json", JSON.stringify(database, null, 4));
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
    fs.writeFileSync("../database.json", JSON.stringify(database, null, 4));
}

createUser("abcasd");
// sendMessage("abc", "xyz", "hi guys");