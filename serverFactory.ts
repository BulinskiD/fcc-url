import { RequestHandlerParams } from "express-serve-static-core";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { connect, Mongoose } from "mongoose";

export const appFactory = (
  routes: { path: string; handlers: RequestHandlerParams[] }[]
) => {
  const app = express();
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(bodyParser.json());
  app.use(cors());

  app.use("/public", express.static(`${process.cwd()}/public`));

  app.get("/", (req, res) => res.sendFile(process.cwd() + "/views/index.html"));

  routes.forEach(({ path, handlers }) => {
    app.use(path, ...handlers);
  });
  return app;
};

export const connectToDb = (connectionUri: string): Promise<Mongoose> => {
  if (connectionUri) {
    return connect(connectionUri, {
      useFindAndModify: false,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } else {
    throw new Error("You have to provide MONGO_DB_CONNECTION string");
  }
};
