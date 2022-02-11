import type { Request, Response } from "express"
const { Deta } = require("deta")

const deta = Deta()
const db = deta.Base("lizenzes")

export async function updateLizenze(req: Request, res: Response) {
    const { lizenze } = req.params
    if (!lizenze) {
        res.status(400).send("Missing 'lizenze' request param!")
        return
    }

    let body
    try {
        body = JSON.parse(req.body)
    } catch (e) {
        res.status(400).send("Invalid request json!")
        return
    }
    const { owner, validUntil, permissions } = body

    let updates: {
        owner?: string
        validUntil?: number
        permissions?: string[]
    } = {}
    if (owner) updates["owner"] = owner
    if (validUntil) updates["validUntil"] = validUntil
    if (permissions) {
        if (!Array.isArray(permissions)) {
            res.status(400).send(
                "Invalid 'permissions' property (Needs to be an array)!"
            )
            return
        }
        updates["permissions"] = permissions
    }
    await db.update(updates, lizenze)

    res.status(200).send("Done!")
}
