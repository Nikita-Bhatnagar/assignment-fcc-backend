import Course from "../models/courseModel.js";
import asyncHandler from "express-async-handler";
export const getCourses = asyncHandler(async (req, res) => {
  const query = Course.find({}).select("-__v");
  const data = await query;
  res.status(200).json({
    length: data.length,
    data,
  });
});
