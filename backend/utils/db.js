import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log("mongodb connect successfully");
  } catch (error) {
    console.log(error);
  }
}; 
export default connectDb