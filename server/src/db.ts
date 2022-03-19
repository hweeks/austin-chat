import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongo_instance;
let mongoose_connection: typeof mongoose;

export const start_db = async () => {
  if (!mongo_instance) mongo_instance = await MongoMemoryServer.create();
  const uri = mongo_instance.getUri();
  return {
    uri,
    instance: mongo_instance,
  };
};

export const stop_db = async () => {
  if (mongo_instance) await mongo_instance.stop();
  if (mongoose_connection) await mongoose_connection.disconnect();
};

export const connect_to_db = async () => {
  const { uri } = await start_db();
  if (!mongoose_connection) mongoose_connection = await mongoose.connect(uri);
  return mongoose_connection;
};
