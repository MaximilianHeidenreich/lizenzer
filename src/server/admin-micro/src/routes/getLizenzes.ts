import type { Request, Response } from "express"
const { Deta } = require("deta")

const deta = Deta()
const db = deta.Base("lizenzes")

export async function getLizenzes(req: Request, res: Response) {
    let { query } = req.query

    let result = await db.fetch()

    res.status(200).json(result.items)
}
