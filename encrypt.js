import Crypto from 'crypto-js';

export const encryptMessage = (message, key) => {
    return Crypto.AES.encrypt(message, key).toString();
}