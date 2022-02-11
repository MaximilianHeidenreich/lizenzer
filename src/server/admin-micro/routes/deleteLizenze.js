"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLizenze = void 0;
const { Deta } = require("deta");
const deta = Deta();
const db = deta.Base("lizenzes");
async function deleteLizenze(req, res) {
    const { lizenze } = req.params;
    if (!lizenze) {
        res.status(400).send("Missing 'lizenze' request param!");
        return;
    }
    await db.delete(lizenze);
    res.status(201).send("Done!");
}
exports.deleteLizenze = deleteLizenze;
