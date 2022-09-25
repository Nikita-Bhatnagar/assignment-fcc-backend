import dotenv from "dotenv";
import connectDB from "./config/db.js";
import courseData from "./data/courses.js";
import Course from "./models/courseModel.js";

dotenv.config();
connectDB();

const insertData = async () => {
  try {
    await Course.deleteMany();
    await Course.insertMany(courseData);
    console.log("Imported");
    process.exit();
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

insertData();
