import type { Request, Response } from "express"
import { isSessionValid } from "../lib/isSessionValid"

export async function validateSession(req: Request, res: Response) {
    let { token } = req.query
    if (!token) {
        res.status(400).send("Missing 'token' query parameter!")
        return
    }

    let check = await isSessionValid(token.toString())
    return res.status(200).json(check)
}
