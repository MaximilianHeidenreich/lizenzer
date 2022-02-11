"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSession = void 0;
const isSessionValid_1 = require("../lib/isSessionValid");
async function validateSession(req, res) {
    let { token } = req.query;
    if (!token) {
        res.status(400).send("Missing 'token' query parameter!");
        return;
    }
    let check = await (0, isSessionValid_1.isSessionValid)(token.toString());
    return res.status(200).json(check);
}
exports.validateSession = validateSession;
