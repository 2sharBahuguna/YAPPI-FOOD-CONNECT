import mongoose from "mongoose";

export const connectDB = async (mongo_uri) => {
  await mongoose.connect(mongo_uri).then(() => console.log("Connected to db"));
};
