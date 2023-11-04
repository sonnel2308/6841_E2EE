import crypto from 'crypto';

const MODULUS_LENGTH = 2048;

export const generateKeyPair = (passphrase) => {
    const keys = crypto.generateKeyPairSync("rsa", {
        modulusLength: MODULUS_LENGTH,
        publicKeyEncoding: {
            type: "spki",
            format: "pem"
        },
        privateKeyEncoding: {
            type: "pkcs8",
            format: "pem",
            cipher: "aes-256-cbc",
            passphrase
        }
    });

    return keys;
}

export const encryptMessage = (message, key) => {
    // return crypto.AES.encrypt(message, key).toString();
    return message;
}

export const decryptMessage = (message, key) => {
    // return crypto.AES.decrypt(message, key).toString(CryptoJS.enc.Utf8);
    return message;
}