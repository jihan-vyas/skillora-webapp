import express from "express";
import {
  addComment,
  createCourse,
  deleteComment,
  deleteCourse,
  getAllCourses,
  getCoursesByUser,
  getFavoriteCourses,
  getUserCoursesWithComments,
  toggleLikeCourse,
  updateCourse,
} from "../controllers/courseController.js";
const router = express.Router();

router.get("/", getAllCourses);
router.post("/", createCourse);
router.delete("/:id", deleteCourse);
router.post("/:id/comment", addComment);
router.post("/:id/like", toggleLikeCourse);
router.get("/user/:userId", getCoursesByUser);
router.put("/:id", updateCourse);
router.get("/favorites/:userId", getFavoriteCourses);

router.get("/user/:userId/comments", getUserCoursesWithComments);
// Delete a comment
router.delete("/:courseId/comment/:commentId", deleteComment);

export default router;
