import Course from "../models/courseModel.js";
export const getCourses = async (req, res) => {
  const data = await Course.find({});
  res.status(200).json({
    length: data.length,
    data,
  });
};
