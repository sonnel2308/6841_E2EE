For this project I have attempted a development of an end-to-end-encryption chat application, though the final submission is incomplete. 

In this report, I will detail my thought process throughout the development of this application and the security concepts I considered. 

---
# E2EE Application
## Initial Project Scope
My original plan when developing this project was implementing features of the application that would benefit a user concerned about the confidentiality of their conversations. 
This would include allowing users to manage their communication sessions with other users where a Diffie-Hellman key exchange would be performed for a new set of keys each session. Users would therefore have the benefit of _perfect forward secrecy_, where even if an attacker manages to crack the key for a particular session, the contents of the other sessions would not be compromised.
Users would manage their private keys locally for each session in order to decrypt the messages for later viewing and delete or maintain the keys and sessions at will when they are finished with the session.

My initial goal was heavily focused on providing such **features** of the application to end-users, therefore the implementation of the application would have been primarily focused on providing frontend functionality to allow users to view and manage their keys and sessions with other users.

## Final Product
The final product I managed to produce is an incomplete full stack chat application with basic functionalities such as the creation of users and sessions in the client's frontend, and incomplete implementations of key generation and message encryption / decryption in the client's browser.
I used NodeJS, Express and Vanilla JavaScript for the implementation of the application, and Web Crypto API for the implementations of cryptographic functions in the browser.

I did not have enough time to implement the Diffie-Hellman key exchange which was to be performed on the server using the native Crypto library in JavaScript. 

The plan was to implement this on the server-side where the server would generate a public key to send to two users Alice and Bob who wish to establish a session for communication. 
Both clients would receive the server's public key and perform their calculations (the exponentiations) using their private keys and send them to the other user via the server.
This would then generate a shared secret key for Alice and Bob to communicate and encrypt / decrypt their messages with, all while their private keys have not been revealed to the public domain.

As the main focus of the project was the end-to-end-encryption, I did not attempt to implement a secure password management system, which is an obvious security vulnerability of the application, though it is not relevant to the scope of my project.

## Challenges
In this project I only managed to implement a portion of the encryption aspect of the application I originally intended on completing. 

Due to my original scope of the application where my goal was to deliver end-user functionalities of the application I had in mind, I diverted a lot of my focus onto the implementations of application's general functionalities such as allowing users to create and manage sessions with other users which required implementing the user's features in the frontend and then fetching to the server and implementing the backend functions for the server to call and update the database.

On top of the time I spent implementing the application's basic functionalities, I spent an unwise amount of time debugging issues related to the project's setup. In particular, I encountered many issues with the browser-compatibility of the cryptographic libraries I was using in my project. 
I ended up switching between many cryptographic libraries and trying other solutions to make them browser-compatible but they were unsuccessful. Each library I attempted to use also meant I spent a significant amount of time also reading the large amounts of documentation and applying it to my application.

Hence, although the implementations of the encryption protocols and the Diffie-Hellman key exchange should have been my main priority, I was unable to complete this component of the application. 

## Self Reflection
I challenged myself to develop a full stack application along with encryption protocols, however the initial project scope was too large and my unfamiliarity in full stack development (and the problems I would encounter) indicate that I definitely should have ditched the frontend aspect of the project and re-evaluated my goals when I realised I could not find a cryptographic library that was browser-compatible or find an alternate solution for my project. 
I think the application could possibly have been implemented with a terminal interface which would have removed a lot of the project setup issues and allowed me to focus on implementing the encryption aspects of the application.
Looking back on this it should have been reasonable, however I believe I might have experienced a sunk cost fallacy with the amount of time and effort I spent setting up the project and searching for libraries that I could not bring myself to restart the project.

Overall however, I think I at least learned some skills while attempting to implement my application using the multitude of cryptographic libraries I tried, giving me exposure to implementing cryptographic protocols and associated knowledge such as using various encoding formats for key generation and handling binary data.

---
# Security
This report will now discuss concepts I have considered throughout my attempt at developing an E2EE chat application, roughly outlining:
- Security concerns of an E2EE chat application that arise in development
- Choices of encryption algorithms
## Security of E2EE Applications
When developing this project's E2EE chat application, the goal was to deliver an application to the end user with the main purpose of providing secure, confidential communication channels between two users. 
A user would expect the E2EE application to:
- Provide secure, encrypted channels of communication
- Allow only authorised and intended users to view the contents of the channel

These requirements can be satisfied using public key cryptography. 
The Diffie-Hellman key exchange protocol allows two users to establish a shared secret over the public domain which is secure even in the eyes of adversaries due to its mathematical properties using modular arithmetic and exponentiation. 
As a simple example:
>Alice and Bob both have their own private keys $a$ and $b$ respectively.
>They wish to communicate over an encrypted channel, so the server generates and sends a public key $g$ to both clients where all calculations are performed modulo a prime number $n$.
>Alice and Bob perform their exponentiations to the public key with their private keys to generate $g^a$ and $g^b$ respectively and send these values to the other user over the public server.
>Alice now has $g^b$ from Bob and exponentiates it to her private key, and Bob has $g^a$ from Alice and exponentiates it to his private key, thus giving Alice $g^{ba}$ and Bob $g^{ab}$.
>Now, both Alice and Bob have created the key $g^{ab}$, establishing a shared secret between the two without revealing their private keys or the shared secret to the public domain.
>While attackers are able to view $g$, $n$, $g^a$, $g^b$, they are unable to deduce $a$, $b$, or $g^{ab}$ due to the discrete logarithm problem and the "one-way" nature of modular arithmetic. 

Thus, the E2EE application is able to provide a secure, encrypted method of communication between two clients. 

### Weaknesses of the Application
**Authentication**
This approach, however, is still susceptible to man-in-the-middle attacks, and generally does not authenticate the identities of the users from which the messages are sent.
A solution could possibly be implementing a hash signature from each user to confirm their identities when a session is established.

**Key Management**
Furthermore, an issue arises from the storage of the keys generated from each session. If a user is left to handle the storage of their own keys, it leaves them as a vulnerability to the security of the system due to human errors.

A user may store their session keys on a file on their computer. This opens up an opportunity for an attacker to attack the user's devices rather than cracking the relatively secure encrypted messages.

**Endpoints**
To further expand upon the point above, an attacker could simply instead focus on targeting the endpoints of the communication, for instance bugging or physically attack the user's device. 
In this case, the security of the E2EE application is rendered insignificant, and the confidentiality of the user's messages is left up to the security of their devices which opens up another range of possible issues such as password security, operating systems, etc. 


---
# Conclusions
I will now discuss my final thoughts on the approach I have taken in completing this project.