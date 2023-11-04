/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = crypto;

/***/ }),

/***/ "./encrypt.js":
/*!********************!*\
  !*** ./encrypt.js ***!
  \********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   decryptMessage: () => (/* binding */ decryptMessage),\n/* harmony export */   encryptMessage: () => (/* binding */ encryptMessage),\n/* harmony export */   generateKeyPair: () => (/* binding */ generateKeyPair)\n/* harmony export */ });\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! crypto */ \"crypto\");\n\n\nconst MODULUS_LENGTH = 2048;\n\nconst generateKeyPair = (passphrase) => {\n    const keys = crypto__WEBPACK_IMPORTED_MODULE_0__.generateKeyPairSync(\"rsa\", {\n        modulusLength: MODULUS_LENGTH,\n        publicKeyEncoding: {\n            type: \"spki\",\n            format: \"pem\"\n        },\n        privateKeyEncoding: {\n            type: \"pkcs8\",\n            format: \"pem\",\n            cipher: \"aes-256-cbc\",\n            passphrase\n        }\n    });\n\n    return keys;\n}\n\nconst encryptMessage = (message, key) => {\n    // return crypto.AES.encrypt(message, key).toString();\n    return message;\n}\n\nconst decryptMessage = (message, key) => {\n    // return crypto.AES.decrypt(message, key).toString(CryptoJS.enc.Utf8);\n    return message;\n}\n\n//# sourceURL=webpack://6841_e2ee/./encrypt.js?");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _helper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helper.js */ \"./src/helper.js\");\n/* harmony import */ var _encrypt_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../encrypt.js */ \"./encrypt.js\");\n\n\n\n/******************************************************************************\n************************************ Login ************************************\n******************************************************************************/\nconst displayName = () => {\n    const span = document.getElementById(\"display-username\");\n    span.textContent = localStorage.getItem(\"name\");\n}\ndisplayName();\n\nconst login = () => {\n    const loginName = document.getElementById(\"login-name\").value;\n    localStorage.setItem(\"name\", loginName);\n    displayName();\n\n    const body = {\n        \"user\": loginName\n    }\n\n    ;(0,_helper_js__WEBPACK_IMPORTED_MODULE_0__.apiCallPost)(\"createUser\", body)\n    .then((data) => {\n        console.log(data);\n\n        \n\n        location.reload();\n    })\n    .catch((error) => console.log(error));\n}\ndocument.getElementById(\"login-button\").addEventListener(\"click\", login);\ndocument.getElementById(\"login-name\").addEventListener(\"keypress\", (event) => {\n    if (event.key === \"Enter\") login();\n});\n\n/******************************************************************************\n********************************* List Users **********************************\n******************************************************************************/\nconst listUsers = () => {\n    (0,_helper_js__WEBPACK_IMPORTED_MODULE_0__.apiCallGet)(\"getUsers\")\n    .then((data) => {\n        console.log(data)\n\n        for (const user of data[\"users\"]) {\n            const displayUsers = document.getElementById(\"user-list\");\n            const fragment = document.createDocumentFragment();\n            const userDiv = document.createElement(\"div\");\n            userDiv.textContent = user;\n            fragment.appendChild(userDiv);\n            displayUsers.append(fragment);\n        }\n    })\n    .catch((error) => console.log(error));\n}\nlistUsers();\n\n/******************************************************************************\n******************************** Send Messages ********************************\n******************************************************************************/\nconst sendMessage = () => {\n    const message = document.getElementById(\"message-input\").value;\n    const key = document.getElementById(\"encryption-key\").value;\n\n    // Encrypt the message on the client-side.\n    const encrypted = (0,_encrypt_js__WEBPACK_IMPORTED_MODULE_1__.encryptMessage)(message, key);\n    console.log(\"client side:\", encrypted);\n    const body = {\n        \"sender\": localStorage.getItem(\"name\"),\n        \"receiver\": document.getElementById(\"send-message-to\").value,\n        \"message\": encrypted,\n    }\n\n    ;(0,_helper_js__WEBPACK_IMPORTED_MODULE_0__.apiCallPost)(\"sendMessage\", body)\n    .then((data) => {\n        console.log(data);\n    })\n    .catch((error) => console.log(error));\n}\n\ndocument.getElementById(\"send-message-button\").addEventListener(\"click\", sendMessage);\ndocument.getElementById(\"message-input\").addEventListener(\"keypress\", (event) => {\n    if (event.key === \"Enter\") {\n        sendMessage();\n    }\n});\n\n/******************************************************************************\n****************************** Receive Messages *******************************\n******************************************************************************/\nconst loadMessages = () => {\n    (0,_helper_js__WEBPACK_IMPORTED_MODULE_0__.apiCallGet)(\"getMessages\", `user=${localStorage.getItem(\"name\")}`)\n    .then((data) => {\n        console.log(data);\n\n        for (const message of data[\"messages\"]) {\n            const displayMessages = document.getElementById(\"incoming-messages\");\n            const fragment = document.createDocumentFragment();\n            const msgDiv = document.createElement(\"div\");\n            msgDiv.setAttribute(\"class\", \"message\");\n            msgDiv.textContent = \"[\" + message[\"sender\"] + \"] \" + message[\"message\"];\n            fragment.appendChild(msgDiv);\n            displayMessages.appendChild(fragment);\n        }\n\n    })\n    .catch((error) => console.log(error));\n}\n\nloadMessages();\n\n//# sourceURL=webpack://6841_e2ee/./src/app.js?");

/***/ }),

/***/ "./src/config.js":
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   PORT: () => (/* binding */ PORT)\n/* harmony export */ });\nconst PORT = 3000;\n\n//# sourceURL=webpack://6841_e2ee/./src/config.js?");

/***/ }),

/***/ "./src/helper.js":
/*!***********************!*\
  !*** ./src/helper.js ***!
  \***********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   apiCallGet: () => (/* binding */ apiCallGet),\n/* harmony export */   apiCallPost: () => (/* binding */ apiCallPost)\n/* harmony export */ });\n/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config.js */ \"./src/config.js\");\n\n\nconst apiCallPost = (path, body) => {\n    return new Promise((resolve, reject) => {\n        fetch(`http://localhost:${_config_js__WEBPACK_IMPORTED_MODULE_0__.PORT}/${path}`, {\n        method: \"POST\",\n        headers: {\n            \"Content-Type\": \"application/json\",\n        },\n        body: JSON.stringify(body),\n        mode: \"cors\"\n        })\n        .then((response) => response.json())\n        .then((data) => {\n            data.error ? reject(data.error) : resolve(data);\n        });\n    })\n}\n\nconst apiCallGet = (path, queryString) => {\n    return new Promise((resolve, reject) => {\n        fetch(`http://localhost:${_config_js__WEBPACK_IMPORTED_MODULE_0__.PORT}/${path}?${queryString}`, {\n            method: 'GET',\n            headers: {\n                \"Content-Type\": \"application/json\"\n            },\n            mode: \"cors\"\n        })\n        .then((response) => response.json())\n        .then((data) => {\n            data.error ? reject(data.error) : resolve(data);\n        });\n    })\n}\n\n//# sourceURL=webpack://6841_e2ee/./src/helper.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.js");
/******/ 	
/******/ })()
;