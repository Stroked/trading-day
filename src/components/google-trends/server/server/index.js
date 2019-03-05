const path = require("path");
const express = require("express");
const app = express();
debugger;
const PORT = 8080;

app.use("/public", express.static(path.join(__dirname, "../public")));
app.use("/api", require("./api"));

app.use("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
