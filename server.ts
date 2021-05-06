import { config } from "dotenv";
import express from "express";
import cors from "cors";
import { connect } from "mongoose";
import bodyParser from "body-parser";
import { router as shortUrl } from "./controllers/shortUrl";

config();

const app = express();

const port = process.env.PORT || 3000;

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", (req, res) => res.sendFile(process.cwd() + "/views/index.html"));

app.use("/api/shorturl", shortUrl);

if (process.env.MONGO_DB_CONNECTION) {
  connect(process.env.MONGO_DB_CONNECTION, {
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
} else {
  throw new Error("You have to provide MONGO_DB_CONNECTION string");
}
