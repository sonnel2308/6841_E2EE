// import crypto from 'crypto';
import forge from 'node-forge';

const rsa = forge.pki.rsa;

export const generateKeyPair = () => {
    const keys = rsa.generateKeyPair({bits: 2048, workers: 2});
    return {
        publicKey: keys.publicKey,
        privateKey: keys.privateKey
    };
}

export const encryptMessage = (message, key) => {
    // return crypto.AES.encrypt(message, key).toString();
    return message;
}

export const decryptMessage = (message, key) => {
    // return crypto.AES.decrypt(message, key).toString(CryptoJS.enc.Utf8);
    return message;
}
console.log(generateKeyPair());