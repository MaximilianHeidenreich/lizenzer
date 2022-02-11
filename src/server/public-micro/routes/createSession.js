"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSession = void 0;
const isLizenzeValid_1 = require("../lib/isLizenzeValid");
const jwt = require("jsonwebtoken");
const { Deta } = require("deta");
const deta = Deta();
const lizenzesDB = deta.Base("lizenzes");
const sessionsDB = deta.Base("sessions");
async function createSession(req, res) {
    let body;
    try {
        body = JSON.parse(req.body);
    }
    catch (e) {
        res.status(400).send("Invalid request json!");
        return;
    }
    const { lizenze } = body;
    if (!lizenze) {
        res.status(400).send("Missing 'lizenze' property!");
        return;
    }
    if (!(0, isLizenzeValid_1.isLizenzeValid)(lizenze)) {
        res.status(401).send("Invalid lizenze!");
        return;
    }
    const lizenzeItem = await lizenzesDB.get(lizenze);
    if (!lizenzeItem) {
        res.status(500).send("Lizenze seems valid, but could not be found!");
        return;
    }
    const token = jwt.sign({
        permissions: lizenzeItem.permissions || [],
    }, "secret", {
        subject: lizenzeItem.key,
        audience: "",
        issuer: "",
        expiresIn: "2h",
    });
    let currentSessions = await sessionsDB.fetch({ lizenze: lizenzeItem.key });
    currentSessions.items.forEach(async (s) => {
        await sessionsDB.delete(s.key);
    });
    const newSession = {
        token,
        lizenze: lizenzeItem.key,
    };
    await sessionsDB.put(newSession);
    return res.status(200).send(token);
}
exports.createSession = createSession;
