"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLizenzeValid = void 0;
const { Deta } = require("deta");
const deta = Deta();
const db = deta.Base("lizenzes");
async function isLizenzeValid(lizenze) {
    const lizenzeItem = await db.get(lizenze);
    if (!lizenzeItem) {
        return { valid: false };
    }
    if (lizenzeItem.validUntil !== -1 && Date.now() > lizenzeItem.validUntil) {
        await db.delete(lizenzeItem.key);
        return { valid: false };
    }
    return { valid: true, permissions: lizenzeItem.permissions };
}
exports.isLizenzeValid = isLizenzeValid;
