import { config } from "dotenv";
import { connect } from "mongoose";
import { router as shortUrl } from "./controllers/shortUrl";
import { appFactory, connectToDb } from "./serverFactory";

config();

const port = process.env.PORT || 3000;

const app = appFactory([{ path: "/api/shorturl", handlers: [shortUrl] }]);

connectToDb(process.env.MONGO_DB_CONNECTION ?? "").then(() =>
  app.listen(port, function () {
    console.log(`Listening on port ${port}`);
  })
);
