import Course from "../models/Course.js";

// Get all courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();

    res.status(200).json(courses); // directly return all courses
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch courses." });
  }
}; 

// Create a new course
export const createCourse = async (req, res) => {
  try {
    const {
      title,
      description,
      fullDescription,
      duration,
      courseLink,
      isFree,
      tags,
      image,
      createdBy, // { name, avatar }
    } = req.body;

    if (!title || !fullDescription || !image || !createdBy?.name) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newCourse = new Course({
      title,
      description,
      fullDescription,
      duration,
      courseLink,
      isFree,
      tags,
      image,
      createdBy,
    });

    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create course." });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({
      message: "Course deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete course" });
  }
};

export const addComment = async (req, res) => {
  try {
    const { id } = req.params; // course id
    const { text, user } = req.body;

    if (!text || !user?.name || !user?.avatar) {
      return res.status(400).json({ message: "Invalid comment data" });
    }

    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const newComment = {
      user: {
        name: user.name,
        avatar: user.avatar,
      },
      text,
      createdAt: new Date(),
    };

    course.comments.push(newComment);
    await course.save();

    res.status(201).json({
      message: "Comment added successfully",
      comments: course.comments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add comment" });
  }
};

export const toggleLikeCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const alreadyLiked = course.likedBy.includes(userId);

    if (alreadyLiked) {
      // UNLIKE
      course.likedBy = course.likedBy.filter((u) => u !== userId);
      course.likes -= 1;
    } else {
      // LIKE
      course.likedBy.push(userId);
      course.likes += 1;
    }

    await course.save();

    res.status(200).json(course);
  } catch (error) {
    console.error("Like error:", error);
    res.status(500).json({ message: "Failed to like course" });
  }
};

export const getCoursesByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const courses = await Course.find({
      "createdBy.id": userId,
    });

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user courses" });
  }
};

// Update a course
export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      fullDescription,
      duration,
      courseLink,
      isFree,
      tags,
      image,
    } = req.body;

    // Find the course by id
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Update fields if provided
    course.title = title ?? course.title;
    course.description = description ?? course.description;
    course.fullDescription = fullDescription ?? course.fullDescription;
    course.duration = duration ?? course.duration;
    course.courseLink = courseLink ?? course.courseLink;
    course.isFree = isFree ?? course.isFree;
    course.tags = tags ?? course.tags;
    course.image = image ?? course.image;

    console.log("Working API of Edit");

    const updatedCourse = await course.save();

    res.status(200).json(updatedCourse);
  } catch (error) {
    console.error("Update course error:", error);
    res.status(500).json({ message: "Failed to update course" });
  }
};

export const getFavoriteCourses = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find courses where likedBy includes this userId
    const courses = await Course.find({ likedBy: userId });

    res.status(200).json(courses);
  } catch (error) {
    console.error("Failed to fetch favorite courses:", error);
    res.status(500).json({ message: "Failed to fetch favorite courses" });
  }
};


// Get all courses of a user with comments
export const getUserCoursesWithComments = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find courses created by this user
    const courses = await Course.find({ "createdBy.id": userId });

    // Only include title and comments
    const result = courses.map(course => ({
      _id: course._id,
      title: course.title,
      comments: course.comments,
    }));

    res.status(200).json(result);
  } catch (error) {
    console.error("Failed to fetch user courses with comments:", error);
    res.status(500).json({ message: "Failed to fetch courses" });
  }
};


export const deleteComment = async (req, res) => {
  try {
    const { courseId, commentId } = req.params;
    console.log("Deleting comment", commentId, "from course", courseId);

    const course = await Course.findById(courseId);
    if (!course) {
      console.log("Course not found");
      return res.status(404).json({ message: "Course not found" });
    }

    const commentIndex = course.comments.findIndex(
      (c) => c._id.toString() === commentId
    );

    if (commentIndex === -1) {
      console.log("Comment not found");
      return res.status(404).json({ message: "Comment not found" });
    }

    course.comments.splice(commentIndex, 1);
    await course.save();

    res.status(200).json({ message: "Comment deleted successfully", comments: course.comments });
  } catch (error) {
    console.error("Delete comment error:", error);
    res.status(500).json({ message: "Failed to delete comment" });
  }
};
