"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLizenze = void 0;
const isLizenzeValid_1 = require("../lib/isLizenzeValid");
async function validateLizenze(req, res) {
    let { lizenze } = req.query;
    if (!lizenze) {
        res.status(400).send("Missing 'lizenze' query parameter!");
        return;
    }
    return res.status(200).json(await (0, isLizenzeValid_1.isLizenzeValid)(lizenze.toString()));
}
exports.validateLizenze = validateLizenze;
