require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const port = 3500;

const { logger } = require("./middlewares/logger.js");

//Middlewares
app.use(logger)

app.listen(port, () => console.log(`Server is running on ${port}`))