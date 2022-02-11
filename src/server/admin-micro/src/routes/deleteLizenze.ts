import type { Request, Response } from "express"
const { Deta } = require("deta")

const deta = Deta()
const db = deta.Base("lizenzes")

export async function deleteLizenze(req: Request, res: Response) {
    const { lizenze } = req.params
    if (!lizenze) {
        res.status(400).send("Missing 'lizenze' request param!")
        return
    }

    await db.delete(lizenze)
    res.status(201).send("Done!")
}
