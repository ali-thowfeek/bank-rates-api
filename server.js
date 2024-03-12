const express = require("express");
const scrapeRoute = require("./routes/scrape");

const app = express();
const port = process.env.PORT || 3000;

app.use("/api/scrape", scrapeRoute);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
