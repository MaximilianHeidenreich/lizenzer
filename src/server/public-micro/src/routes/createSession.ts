import type { Request, Response } from "express"
import { isLizenzeValid } from "../lib/isLizenzeValid"
const jwt = require("jsonwebtoken")
const { Deta } = require("deta")

const deta = Deta()
const lizenzesDB = deta.Base("lizenzes")
const sessionsDB = deta.Base("sessions")

export async function createSession(req: Request, res: Response) {
    let body
    try {
        body = JSON.parse(req.body)
    } catch (e) {
        res.status(400).send("Invalid request json!")
        return
    }
    const { lizenze } = body
    if (!lizenze) {
        res.status(400).send("Missing 'lizenze' property!")
        return
    }
    if (!isLizenzeValid(lizenze)) {
        res.status(401).send("Invalid lizenze!")
        return
    }

    // Get lizenze record
    const lizenzeItem = await lizenzesDB.get(lizenze)
    if (!lizenzeItem) {
        res.status(500).send("Lizenze seems valid, but could not be found!")
        return
    }

    // Create jwt // TODO!: secret & cert https://github.com/auth0/node-jsonwebtoken#usage
    const token = jwt.sign(
        {
            permissions: lizenzeItem.permissions || [],
        },
        "secret",
        {
            subject: lizenzeItem.key,
            audience: "", // TODO: application identifier
            issuer: "", // TODO: Api identifier
            expiresIn: "2h",
        }
    )

    // Get current session for lizenze
    let currentSessions = await sessionsDB.fetch({ lizenze: lizenzeItem.key })
    currentSessions.items.forEach(async (s: any) => {
        // TODO: await deletion
        await sessionsDB.delete(s.key)
    })

    // Create new session record
    const newSession = {
        token,
        lizenze: lizenzeItem.key,
    }
    await sessionsDB.put(newSession)

    return res.status(200).send(token)
}
