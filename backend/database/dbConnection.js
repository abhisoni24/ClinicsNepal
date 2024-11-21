import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      dbName: "clinicsnepal",
    })
    .then(() => {
      console.log("Database connected");
    })
    .catch((error) => {
      console.log(`Some error occured ${error}`);
    });
};
