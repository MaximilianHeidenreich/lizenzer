"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateLizenze_1 = require("./routes/validateLizenze");
const createSession_1 = require("./routes/createSession");
const validateSession_1 = require("./routes/validateSession");
const express = require("express");
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.get("/api/v1/lizenze/validate", validateLizenze_1.validateLizenze);
app.post("/api/v1/session/create", createSession_1.createSession);
app.get("/api/v1/session/validate", validateSession_1.validateSession);
module.exports = app;
