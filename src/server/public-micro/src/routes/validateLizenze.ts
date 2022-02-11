import type { Request, Response } from "express"
import { isLizenzeValid } from "../lib/isLizenzeValid"

export async function validateLizenze(req: Request, res: Response) {
    let { lizenze } = req.query
    if (!lizenze) {
        res.status(400).send("Missing 'lizenze' query parameter!")
        return
    }
    return res.status(200).json(await isLizenzeValid(lizenze.toString()))
}
