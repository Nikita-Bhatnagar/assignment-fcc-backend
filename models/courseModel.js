import mongoose from "mongoose";

const courseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Course must ahve a name"],
    },
    duration: {
      type: Number,
      required: [true, "Course must have a duration"],
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
