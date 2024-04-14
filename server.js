const express = require("express");
const apiRouter = require("./routes/api");

const app = express();
const port = process.env.PORT || 3000;

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
