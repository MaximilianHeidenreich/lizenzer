import type { Request, Response } from "express"
import { validateLizenze } from "./routes/validateLizenze"
import { createSession } from "./routes/createSession"
import { validateSession } from "./routes/validateSession"

const express = require("express")
const app = express()
app.use(express.json())

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!")
})

app.get("/api/v1/lizenze/validate", validateLizenze)
app.post("/api/v1/session/create", createSession)
app.get("/api/v1/session/validate", validateSession)

module.exports = app
