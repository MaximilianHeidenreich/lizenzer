import type { Request, Response } from "express"
const cors = require("cors")
import { getLizenzes } from "./routes/getLizenzes"
import { createLizenze } from "./routes/createLizenze"
import { deleteLizenze } from "./routes/deleteLizenze"
import { updateLizenze } from "./routes/updateLizenze"

const express = require("express")
const app = express()
app.use(cors())
app.use(express.json())

app.get("/", (req: Request, res: Response) => {
    res.send("Dashboard") // TODO!: Dashboard
})

app.get("/api/v1/lizenzes/get", getLizenzes)
app.post("/api/v1/lizenze/create", createLizenze)
app.delete("/api/v1/lizenze/delete/:lizenze", cors(), deleteLizenze)
app.patch("/api/v1/lizenze/update/:lizenze", cors(), updateLizenze)

module.exports = app
