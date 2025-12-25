import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import CourseCard from "../Components/CourseCard";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const UserDashboard = () => {
  const { user, isLoaded } = useUser();
  const [activeTab, setActiveTab] = useState("courses");

  if (!isLoaded) return <p>Loading profile...</p>;
  if (!user) return <p>Please login</p>;

  return (
    <div>
      {/* Profile Header */}
      <div className="px-8 py-10 flex items-center gap-6">
        <img
          src={user.imageUrl}
          alt="Profile"
          className="w-24 h-24 rounded-full border"
        />

        <div>
          <h2 className="text-xl font-semibold">{user.fullName}</h2>
          <p className="text-gray-600">
            {user.primaryEmailAddress?.emailAddress}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-8 border-b border-gray-200 py-3 flex gap-6 mb-10">
        <Tab
          label="My Courses"
          active={activeTab === "courses"}
          onClick={() => setActiveTab("courses")}
        />
        <Tab
          label="Favorite"
          active={activeTab === "favorite"}
          onClick={() => setActiveTab("favorite")}
        />
        <Tab
          label="Comments"
          active={activeTab === "comments"}
          onClick={() => setActiveTab("comments")}
        />
      </div>

      {/* Content */}
      <div className="px-8">
        {activeTab === "courses" && <MyCourses userId={user.id} />}
        {activeTab === "comments" && <Comments userId={user.id} />}
        {activeTab === "favorite" && <Favorite userId={user.id} />}
      </div>
    </div>
  );
};

export default UserDashboard;

/* ---------------- Tab ---------------- */

const Tab = ({ label, active, onClick }) => (
  <span
    onClick={onClick}
    className={`cursor-pointer pb-2 font-medium transition
      ${
        active
          ? "text-pink-300 border-b-2 border-pink-300"
          : "text-gray-600 hover:text-pink-300"
      }`}
  >
    {label}
  </span>
);

/* ---------------- My Courses ---------------- */

const MyCourses = ({ userId }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/courses/user/${userId}`)
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .finally(() => setLoading(false));
  }, [userId, courses]);

  if (loading) return <p>Loading courses...</p>;

  if (courses.length === 0)
    return <p className="text-skillora-500">No courses created yet.</p>;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <div key={course._id}>
          <CourseCard
            profile={true}
            key={course._id}
            id={course._id}
            image={course.image}
            title={course.title}
            description={course.description}
            author={course.createdBy.name} // Updated to use name
            authorImage={course.createdBy.avatar} // Updated to use avatar URL
            isFree={course.isFree}
            likes={course.likes}
          />
        </div>
      ))}
    </div>
  );
};

/* ---------------- Favorite Courses ---------------- */

const Favorite = ({ userId }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/courses/favorites/${userId}`
        );
        setCourses(res.data);
      } catch (err) {
        console.error(
          "Failed to fetch favorites:",
          err.response?.data || err.message
        );
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchFavorites();
  }, [userId]);

  if (loading) return <p>Loading favorites...</p>;
  if (courses.length === 0)
    return <p className="text-skillora-500">No favorite courses yet.</p>;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <div key={course._id}>
          <CourseCard
            key={course._id}
            id={course._id}
            image={course.image}
            title={course.title}
            description={course.description}
            author={course.createdBy.name} // Updated to use name
            authorImage={course.createdBy.avatar} // Updated to use avatar URL
            isFree={course.isFree}
            likes={course.likes}
          />
        </div>
      ))}
    </div>
  );
};

/* ---------------- Comments ---------------- */

const Comments = ({ userId }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDeleteComment = async (courseId, commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?"))
      return;

    try {
      const res = await axios.delete(
        `${API_URL}/api/courses/${courseId}/comment/${commentId}`
      );

      // Update local state after deletion
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course._id === courseId
            ? {
                ...course,
                comments: course.comments.filter((c) => c._id !== commentId),
              }
            : course
        )
      );
    } catch (err) {
      console.error(
        "Delete comment failed:",
        err.response?.data || err.message
      );
      alert(
        `Failed to delete comment: ${
          err.response?.data?.message || err.message
        }`
      );
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/courses/user/${userId}/comments`
        );
        setCourses(res.data);
      } catch (err) {
        console.error(
          "Failed to fetch comments:",
          err.response?.data || err.message
        );
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchComments();
  }, [userId]);

  if (loading) return <p>Loading comments...</p>;

  if (courses.length === 0)
    return <p className="text-skillora-500">No courses or comments yet.</p>;

  return (
    <div className="space-y-6">
      {courses.map((course) => (
        <div key={course._id} className="border p-4 rounded-lg">
          <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
          {course.comments.length === 0 ? (
            <p className="text-gray-400 text-sm">No comments yet.</p>
          ) : (
            <div className="space-y-2">
              {course.comments.map((c) => (
                <div key={c._id} className="border p-2 rounded">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm">{c.text}</p>
                      <span className="text-xs text-gray-400">
                        {new Date(c.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <span
                      onClick={() => handleDeleteComment(course._id, c._id)}
                      className="cursor-pointer flex items-center mr-3 justify-center h-8 w-8 rounded-full bg-red-600"
                    >
                      {/* Trash Icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#fff"
                      >
                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520q-17 0-28.5-11.5T160-760q0-17 11.5-28.5T200-800h160q0-17 11.5-28.5T400-840h160q17 0 28.5 11.5T600-800h160q17 0 28.5 11.5T800-760q0 17-11.5 28.5T760-720v520q0 33-23.5 56.5T680-120H280Zm120-160q17 0 28.5-11.5T440-320v-280q0-17-11.5-28.5T400-640q-17 0-28.5 11.5T360-600v280q0 17 11.5 28.5T400-280Zm160 0q17 0 28.5-11.5T600-320v-280q0-17-11.5-28.5T560-640q-17 0-28.5 11.5T520-600v280q0 17 11.5 28.5T560-280Z" />
                      </svg>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
