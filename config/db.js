import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
    });
    console.log("Database connected");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

export default connectDB;
