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

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _helper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helper.js */ \"./src/helper.js\");\n\n// import { } from '../encrypt.js';\n\n/******************************************************************************\n************************************ Login ************************************\n******************************************************************************/\nconst displayName = () => {\n    const span = document.getElementById(\"display-username\");\n    span.textContent = localStorage.getItem(\"name\");\n}\ndisplayName();\n\nconst login = () => {\n    const loginName = document.getElementById(\"login-name\").value;\n    localStorage.setItem(\"name\", loginName);\n    displayName();\n\n    const body = {\n        \"user\": loginName\n    }\n\n    ;(0,_helper_js__WEBPACK_IMPORTED_MODULE_0__.apiCallPost)(\"createUser\", body)\n    .then((data) => {\n        console.log(data);\n        location.reload();\n    })\n    .catch((error) => console.log(error));\n}\ndocument.getElementById(\"login-button\").addEventListener(\"click\", login);\ndocument.getElementById(\"login-name\").addEventListener(\"keypress\", (event) => {\n    if (event.key === \"Enter\") login();\n});\n\n/******************************************************************************\n********************************* List Users **********************************\n******************************************************************************/\nconst listUsers = () => {\n    (0,_helper_js__WEBPACK_IMPORTED_MODULE_0__.apiCallGet)(\"getUsers\")\n    .then((data) => {\n        console.log(data)\n\n        for (const user of data[\"users\"]) {\n            const displayUsers = document.getElementById(\"user-list\");\n            const fragment = document.createDocumentFragment();\n            const userDiv = document.createElement(\"div\");\n            userDiv.textContent = user;\n            fragment.appendChild(userDiv);\n            displayUsers.append(fragment);\n        }\n    })\n    .catch((error) => console.log(error));\n}\nlistUsers();\n\n/******************************************************************************\n****************************** Manage Sessions ********************************\n******************************************************************************/\nconst displaySessions = () => {\n    (0,_helper_js__WEBPACK_IMPORTED_MODULE_0__.apiCallGet)(\"getSessions\", `user=${localStorage.getItem(\"name\")}`)\n    .then((data) => {\n        console.log(\"SESSIONS\", data);\n        const name = localStorage.getItem(\"name\");\n\n        const sessionReqDiv = document.getElementById(\"session-requests\");\n\n        for (const session of data[\"sessions\"]) {\n            const fragment = document.createDocumentFragment();\n            const div = document.createElement(\"div\");\n            div.textContent = Object.keys(session[\"users\"])[0] + \", \" + Object.keys(session[\"users\"])[1]\n                + \" [\" + session[\"status\"] + \"]\";\n\n            fragment.appendChild(div);\n            sessionReqDiv.appendChild(fragment);\n        }\n    })\n    .catch((error) => console.log(error));\n}\ndisplaySessions();\n\nconst startSession = () => {\n    const user1 = localStorage.getItem(\"name\");\n    const user2 = document.getElementById(\"start-session\").value;\n    if (user2 !== \"\") {\n        const body = {\n            user1,\n            user2\n        };\n        \n        (0,_helper_js__WEBPACK_IMPORTED_MODULE_0__.apiCallPost)(\"createSession\", body)\n        .then((data) => console.log(data))\n        .catch((error) => console.log(error));\n    }\n    displaySessions();\n}\n\ndocument.getElementById(\"start-session-button\").addEventListener(\"click\", startSession);\ndocument.getElementById(\"start-session\").addEventListener(\"keypress\", (event) => {\n    if (event.key === \"Enter\") startSession();\n});\n\n/******************************************************************************\n******************************** Send Messages ********************************\n******************************************************************************/\nconst sendMessage = () => {\n    const message = document.getElementById(\"message-input\").value;\n    const key = document.getElementById(\"encryption-key\").value;\n\n    // Encrypt the message on the client-side.\n    const encrypted = encryptMessage(message, key);\n    console.log(\"client side:\", encrypted);\n    const body = {\n        \"sender\": localStorage.getItem(\"name\"),\n        \"receiver\": document.getElementById(\"send-message-to\").value,\n        \"message\": encrypted,\n    }\n\n    ;(0,_helper_js__WEBPACK_IMPORTED_MODULE_0__.apiCallPost)(\"sendMessage\", body)\n    .then((data) => {\n        console.log(data);\n    })\n    .catch((error) => console.log(error));\n}\n\ndocument.getElementById(\"send-message-button\").addEventListener(\"click\", sendMessage);\ndocument.getElementById(\"message-input\").addEventListener(\"keypress\", (event) => {\n    if (event.key === \"Enter\") {\n        sendMessage();\n    }\n});\n\n/******************************************************************************\n****************************** Receive Messages *******************************\n******************************************************************************/\nconst loadMessages = () => {\n    (0,_helper_js__WEBPACK_IMPORTED_MODULE_0__.apiCallGet)(\"getMessages\", `user=${localStorage.getItem(\"name\")}`)\n    .then((data) => {\n        for (const message of data[\"messages\"]) {\n            const displayMessages = document.getElementById(\"incoming-messages\");\n            const fragment = document.createDocumentFragment();\n            const msgDiv = document.createElement(\"div\");\n            msgDiv.setAttribute(\"class\", \"message\");\n            msgDiv.textContent = \"[\" + message[\"sender\"] + \"] \" + message[\"message\"];\n            fragment.appendChild(msgDiv);\n            displayMessages.appendChild(fragment);\n        }\n\n    })\n    .catch((error) => console.log(error));\n}\nloadMessages();\n\n/******************************************************************************\n******************************* Cryptography **********************************\n******************************************************************************/\nconst crypto = window.crypto.subtle;\n\n// Generate a key.\nconst generateKey = async () => {\n    return crypto.generateKey({\n        name: 'AES-GCM',\n        length: 256\n    }, true, ['encrypt', 'decrypt']);\n}\n\n// Get message encoding.\nconst encode = (data) => {\n    let enc = new TextEncoder();\n    return enc.encode(data);\n}\n\n// Get message decoding.\nconst decode = (data) => {\n    let dec = new TextDecoder();\n    return dec.decode(data);\n}\n\n// Convert from binary to Base64 (for sending to server).\nconst binaryToBase64 = (binaryData) => {\n    return window.btoa(String.fromCharCode.apply(null, new Uint8Array(binaryData)));\n}\n\n// Encrypt message.\nconst encryptMessage = async (key, message) => {\n    const encoded = encode(message);\n    // Initialisation vector counter.\n    const iv = window.crypto.getRandomValues(new Uint8Array(16));\n\n    const encryptedMessage = await crypto.encrypt(\n        { name: \"AES-GCM\", iv: iv },\n        key,\n        encoded\n    );\n\n    const encryptedData = {\n        encryptedMessage,\n        iv\n    }\n\n    return encryptedData;\n}\n\n// Decrypt message.\nconst decryptMessage = (key, messageData) => {\n    const encryptedMessage = messageData[\"encryptedMessage\"];\n    const iv = messageData[\"iv\"];\n\n    return crypto.decrypt({ name: \"AES-GCM\", iv: iv }, key, encryptedMessage);\n}\n\nconst key = await generateKey();\nconsole.log(key);\nconst encryptedMessage = await encryptMessage(key, \"hello world\");\nconsole.log(\"base64 encoded:\", binaryToBase64(encryptedMessage[\"encryptedMessage\"]));\nconst decryptedMessage = await(decryptMessage(key, encryptedMessage));\nconsole.log(\"decoded:\", decode(decryptedMessage));\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);\n\n//# sourceURL=webpack://6841_e2ee/./src/app.js?");

/***/ }),

/***/ "./src/config.js":
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   PORT: () => (/* binding */ PORT)\n/* harmony export */ });\nconst PORT = 3001;\n\n//# sourceURL=webpack://6841_e2ee/./src/config.js?");

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
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 		var resolveQueue = (queue) => {
/******/ 			if(queue && queue.d < 1) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					var obj = {};
/******/ 					obj[webpackQueues] = (fn) => (fn(queue));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackQueues] = x => {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			var queue;
/******/ 			hasAwait && ((queue = []).d = -1);
/******/ 			var depQueues = new Set();
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 			module.exports = promise;
/******/ 			body((deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = () => (currentDeps.map((d) => {
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				var promise = new Promise((resolve) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 					currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 			queue && queue.d < 0 && (queue.d = 0);
/******/ 		};
/******/ 	})();
/******/ 	
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