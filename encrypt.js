import { createDiffieHellman } from 'crypto';

// Generate value of `g` for Alice and Bob to exponentiate
// with their privatekeys.
export const generateServerKey = () => {
    const serverDH = createDiffieHellman(2048);
    const serverPublicKey = serverDH.generateKeys('base64');
    
    return serverPublicKey;
}

generateServerKey();