require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { router: shortUrl } = require("./controllers/shortUrl");
const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.use("/api/shorturl", shortUrl);

mongoose
  .connect(process.env.MONGO_DB_CONNECTION, {
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() =>
    app.listen(port, function () {
      console.log(`Listening on port ${port}`);
    })
  )
  .catch(console.log);
