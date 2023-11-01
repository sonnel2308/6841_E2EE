import { access, constants } from 'node:fs/promises';
import fs from 'fs';

const database = {};

// Initialise database.json.
access("../database.json", constants.F_OK)
.then((data) => {
    console.log("Accessing database.json");
    fs.readFile("../database.json", (error, content) => {
        let data = JSON.parse(content);
        console.log(data);
    });
})
.catch((error) => {
    console.log("Creating database.json");
    database["users"] = [];
    database["messages"] = [];
    console.log(database);

    fs.writeFileSync("../database.json", JSON.stringify(database, null, 4));
});