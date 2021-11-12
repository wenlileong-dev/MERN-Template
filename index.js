const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("./models/db");
const secretRouter = require("./routes/secretRouter");
const userRouter = require("./routes/userRouter");
const { secretRoute } = require("./controllers/secretController");

let port = process.env.PORT || 5000;

const app = express();

app.use(cors({ credentials: true, origin: process.env.FRONT_END_URL }));
app.use(cookieParser());
app.use(express.json({ urlencoded: true }));
app.use(express.static(path.resolve(__dirname, "./client/build")));

app.use("/api", secretRouter);
app.use("/api/user", userRouter);

app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.listen(port, () => {
  console.log(`The server is runnning at port ${port}`);
});
