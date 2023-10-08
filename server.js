require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const emailRouter = require("./emaiRroutes");
app.use("email", emailRouter)

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
