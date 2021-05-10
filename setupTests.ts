import { MongoMemoryServer } from "mongodb-memory-server";
import { connectToDb } from "./serverFactory";
import { Mongoose } from "mongoose";

const mongod = new MongoMemoryServer();
let mongooseConnection: Mongoose;

beforeAll(async () => {
  await mongod
    .start()
    .then(() => mongod.getUri())
    .then(connectToDb)
    .then((mongoose) => {
      mongooseConnection = mongoose;
    });
});

afterAll(async () => {
  mongooseConnection?.disconnect();
  await mongod.stop();
});
