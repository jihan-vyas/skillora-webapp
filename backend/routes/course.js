import express from "express";
import Course from "../models/Course.js";

const router = express.Router();

// Create new course
router.post("/", async (req, res) => {
  try {
    const course = new Course(req.body); // expects createdBy: {name, avatar}, image, etc.
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create course" });
  }
});

// Get all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch courses" });
  }
});

export default router;
