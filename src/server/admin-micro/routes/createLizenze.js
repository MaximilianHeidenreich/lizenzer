"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLizenze = void 0;
const uuid_1 = require("uuid");
const { Deta } = require("deta");
const deta = Deta();
const db = deta.Base("lizenzes");
async function createLizenze(req, res) {
    let body;
    try {
        body = JSON.parse(req.body);
    }
    catch (e) {
        res.status(400).send("Invalid request json!");
        return;
    }
    const { owner, validUntil, permissions } = body;
    if (!owner) {
        res.status(400).send("Missing 'owner' property!");
        return;
    }
    if (permissions && !Array.isArray(permissions)) {
        res.status(400).send("Invalid 'permissions' property (Needs to be an array)!");
        return;
    }
    const newLizenze = {
        key: (0, uuid_1.v4)(),
        owner,
        permissions: permissions || [],
        createdAt: Date.now(),
        validUntil: validUntil || -1,
    };
    let insertedLizenze;
    try {
        insertedLizenze = await db.put(newLizenze);
    }
    catch (e) {
        res.status(500).send("Could not save new lizenze!");
        return;
    }
    res.status(201).json(insertedLizenze);
}
exports.createLizenze = createLizenze;
