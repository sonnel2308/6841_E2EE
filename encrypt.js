import Crypto from 'crypto-js';

export const encryptMessage = (message, key) => {
    return Crypto.AES.encrypt(message, key).toString();
}

export const decryptMessage = (message, key) => {
    return Crypto.AES.decrypt(message, key).toString(CryptoJS.enc.Utf8);
}