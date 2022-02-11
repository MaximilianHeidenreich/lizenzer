"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLizenzes = void 0;
const { Deta } = require("deta");
const deta = Deta();
const db = deta.Base("lizenzes");
async function getLizenzes(req, res) {
    let { query } = req.query;
    let result = await db.fetch();
    res.status(200).json(result.items);
}
exports.getLizenzes = getLizenzes;
