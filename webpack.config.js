import path from "path";
import * as url from "url";
import { createRequire } from 'node:module';

export default {
    entry: "./src/app.js",
    output: {
        filename: "main.js",
        path: path.resolve(url.fileURLToPath(new URL('.', import.meta.url)), "dist")
    },
    mode: "development",
    target: "node",
    externals: {
        crypto: 'crypto'
    }
}