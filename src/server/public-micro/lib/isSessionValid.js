"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSessionValid = void 0;
const jwt = require("jsonwebtoken");
const { Deta } = require("deta");
const deta = Deta();
const sessionsDB = deta.Base("sessions");
async function isSessionValid(token) {
    const sessionItem = await sessionsDB.fetch({ token });
    if (sessionItem.count <= 0) {
        return { valid: false };
    }
    let payload;
    try {
        payload = jwt.verify(token, "secret");
    }
    catch (e) {
        if (e.name === "TokenExpiredError") {
            await sessionsDB.delete(sessionItem.key);
            return { valid: false, err: `Token expired at ${e.expiredAt}` };
        }
        else if (e.name === "JsonWebTokenError") {
            return { valid: false, err: e.message };
        }
        else if (e.name === "NotBeforeError") {
            return { valid: false, err: `Token not active until ${e.date}` };
        }
    }
    return { valid: true, payload };
}
exports.isSessionValid = isSessionValid;
