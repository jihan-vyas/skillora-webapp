import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    image: String,
    title: { type: String, required: true },
    description: String,
    fullDescription: String,
    createdBy: {
      name: { type: String, required: true },
      avatar: { type: String },
      id: { type: String, required: true },   
    },
    isFree: Boolean,
    likes: { type: Number, default: 0 },
    likedBy: [String],
    duration: String,
    courseLink: String,
    tags: [String],

    comments: [
      {
        user: {
          name: { type: String, required: true },
          avatar: { type: String },
        },
        text: { type: String, required: true },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
