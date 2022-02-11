import type { Request, Response } from "express"
import { v4 as uuidv4 } from "uuid"
const { Deta } = require("deta")

const deta = Deta()
const db = deta.Base("lizenzes")

export async function createLizenze(req: Request, res: Response) {
    let body
    try {
        body = JSON.parse(req.body)
    } catch (e) {
        res.status(400).send("Invalid request json!")
        return
    }
    const { owner, validUntil, permissions } = body

    if (!owner) {
        res.status(400).send("Missing 'owner' property!")
        return
    }
    if (permissions && !Array.isArray(permissions)) {
        res.status(400).send(
            "Invalid 'permissions' property (Needs to be an array)!"
        )
        return
    }

    const newLizenze = {
        key: uuidv4(),
        owner,
        permissions: permissions || [], // Custom permission associated with the key
        createdAt: Date.now(),
        validUntil: validUntil || -1, // Infinite if no value is provided
    }

    let insertedLizenze
    try {
        insertedLizenze = await db.put(newLizenze)
    } catch (e) {
        res.status(500).send("Could not save new lizenze!")
        return
    }
    res.status(201).json(insertedLizenze)
}
