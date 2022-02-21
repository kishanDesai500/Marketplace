const express = require("express");
const app = express();
const userRouter = require("./router/userRouter");
// const router = express.Router();

var bodyParser = require("body-parser");
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static("public"));

app.use("/app", userRouter);

const port = process.env.PORT || 3060;

app.listen(port, () => console.log(`listnig on port ${port}......`));

module.exports = app;