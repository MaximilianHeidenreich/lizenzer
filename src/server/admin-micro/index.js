"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cors = require("cors");
const getLizenzes_1 = require("./routes/getLizenzes");
const createLizenze_1 = require("./routes/createLizenze");
const deleteLizenze_1 = require("./routes/deleteLizenze");
const updateLizenze_1 = require("./routes/updateLizenze");
const express = require("express");
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Dashboard");
});
app.get("/api/v1/lizenzes/get", getLizenzes_1.getLizenzes);
app.post("/api/v1/lizenze/create", createLizenze_1.createLizenze);
app.delete("/api/v1/lizenze/delete/:lizenze", cors(), deleteLizenze_1.deleteLizenze);
app.patch("/api/v1/lizenze/update/:lizenze", cors(), updateLizenze_1.updateLizenze);
module.exports = app;
