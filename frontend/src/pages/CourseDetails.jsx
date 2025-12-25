import { Link, redirect, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { SignedIn, useUser } from "@clerk/clerk-react";
import axios from "axios";

const CourseDetails = () => {
  const { id } = useParams();
  const { user, isSignedIn } = useUser();
  const [course, setCourse] = useState(null);
  const [relatedCourses, setRelatedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("https://skillora-backend-ipwx.onrender.com/api/courses");
        const data = await res.json();
        const selectedCourse = data.find((c) => c._id === id);
        setCourse(selectedCourse || null);
        const related = data.filter((c) => c._id !== id).slice(0, 3);
        setRelatedCourses(related);
      } catch (err) {
        console.error(err);
        setCourse(null);
        setRelatedCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [id, commentText]);

  const handleAddComment = async () => {
    if (!commentText.trim()) navigate('/signup');
    await axios.post(
      `https://skillora-backend-ipwx.onrender.com/api/courses/${course._id}/comment`,
      {
        text: commentText,
        user: {
          name: `${user.firstName} ${user.lastName}`,
          avatar: user.imageUrl,
        },
      }
    );
    setCommentText("");
  };

  const handleShare = async () => {
    const shareData = {
      title: course.title,
      text: course.shortDescription || "Check out this awesome course!",
      url: window.location.href,
    };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch (err) { console.log(err); }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard 📋");
    }
  };

  const handleLike = async () => {
    if (!isSignedIn) navigate('/signup');
    const res = await axios.post(
      `https://skillora-backend-ipwx.onrender.com/api/courses/${course._id}/like`,
      { userId: user.id }
    );
    setCourse(res.data);
  };

  if (loading) return <h1 className="p-10 text-3xl text-center">Loading Courses... ⏳</h1>;
  if (!course) return <h1 className="p-10 text-3xl text-center">Course Not Found 😢</h1>;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* LEFT COLUMN */}
        <div className="lg:w-2/3 flex flex-col gap-5">
          <div className="relative">
            <img
              src={course.image}
              className="w-full h-64 md:h-96 object-cover rounded-3xl"
              alt={course.title}
            />
            {/* FIXED BADGE: Added w-fit and flex-center to prevent widening */}
            <div className="absolute bottom-5 right-5 flex items-center justify-center">
               <span className={`px-5 py-1 rounded-full text-base md:text-lg font-bold w-fit text-center shadow-lg ${
                  course.isFree ? "bg-black text-white" : "bg-green-200 text-black"
                }`}>
                {course.isFree ? "Free" : "Paid"}
              </span>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold">{course.title}</h1>

          {/* Author & Stats - Added flex-wrap for mobile */}
          <div className="flex flex-wrap items-center justify-between py-2 border-y border-secondary gap-4">
            <div className="flex items-center gap-3">
              <img
                src={course.createdBy.avatar}
                className="w-12 h-12 md:w-14 md:h-14 rounded-full"
                alt={course.createdBy.name}
              />
              <div>
                <p className="text-base md:text-lg font-semibold">{course.createdBy.name}</p>
                <p className="text-sm text-gray-500">{course.duration}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <span
                onClick={handleLike}
                className="px-4 md:px-5 py-2 flex gap-1 items-center justify-center cursor-pointer rounded-full bg-skillora font-medium text-sm md:text-base transition-all active:scale-95"
              >
                {course.likedBy.includes(user?.id) ? (
                   <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EA3323"><path d="M480-147q-14 0-28.5-5T426-168l-69-63q-106-97-191.5-192.5T80-634q0-94 63-157t157-63q53 0 100 22.5t80 61.5q33-39 80-61.5T660-854q94 0 157 63t63 157q0 115-85 211T602-230l-68 62q-11 11-25.5 16t-28.5 5Z" /></svg>
                ) : (
                   <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-147q-14 0-28.5-5T426-168l-69-63q-106-97-191.5-192.5T80-634q0-94 63-157t157-63q53 0 100 22.5t80 61.5q33-39 80-61.5T660-854q94 0 157 63t63 157q0 115-85 211T602-230l-68 62q-11 11-25.5 16t-28.5 5Zm-38-543q-29-41-62-62.5T300-774q-60 0-100 40t-40 100q0 52 37 110.5T285.5-410q51.5 55 106 103t88.5 79q34-31 88.5-79t106-103Q726-465 763-523.5T800-634q0-60-40-100t-100-40q-47 0-80 21.5T518-690q-7 10-17 15t-21 5q-11 0-21-5t-17-15Zm38 189Z" /></svg>
                )}
                {course.likes || 0}
              </span>

              <span
                onClick={handleShare}
                className="px-4 md:px-5 py-2 flex gap-1 items-center justify-center cursor-pointer rounded-full bg-skillora font-medium text-sm md:text-base transition-all active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#111"><path d="M680-80q-50 0-85-35t-35-85q0-6 3-28L282-392q-16 15-37 23.5t-45 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q24 0 45 8.5t37 23.5l281-164q-2-7-2.5-13.5T560-760q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-24 0-45-8.5T598-672L317-508q2 7 2.5 13.5t.5 14.5q0 8-.5 14.5T317-452l281 164q16-15 37-23.5t45-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Z" /></svg>
              </span>
            </div>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold">Course Description</h2>
            <p className="text-base md:text-lg text-gray-700 whitespace-pre-wrap mt-2">
              {course.fullDescription}
            </p>
          </div>

          <a
            href={course.courseLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white px-6 md:px-8 py-3 md:py-4 rounded-xl w-full md:w-fit font-semibold text-center"
          >
            Go To Course 🔗
          </a>

          <div className="mt-8 md:mt-12">
            <h2 className="text-xl font-bold mb-4">
              Comments ({course.comments?.length || 0})
            </h2>

            <SignedIn>
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <input
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  type="text"
                  placeholder="Write a comment..."
                  className="w-full border px-4 py-3 rounded-xl focus:ring-2 focus:ring-black outline-none transition"
                />
                <button
                  onClick={handleAddComment}
                  className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition font-bold"
                >
                  Post
                </button>
              </div>
            </SignedIn>

            <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
              {course.comments && course.comments.length > 0 ? (
                course.comments.map((comment, index) => (
                  <div key={index} className="border-b pb-3 flex gap-3">
                    <img
                      src={comment.user.avatar}
                      alt={comment.user.name}
                      className="w-10 h-10 rounded-full flex-shrink-0"
                    />
                    <div>
                      <p className="font-semibold text-sm">{comment.user.name}</p>
                      <p className="text-gray-700 text-sm md:text-base">{comment.text}</p>
                      <p className="text-[10px] md:text-xs text-gray-400 mt-1">
                        {new Date(comment.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No comments yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:w-1/3 pt-4 lg:pt-0">
          <h2 className="text-2xl font-bold mb-4">More Related Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-6">
            {relatedCourses.length > 0 ? (
              relatedCourses.map((relatedCourse) => (
                <Link to={`/explore/${relatedCourse._id}`} key={relatedCourse._id}>
                  <div className="border p-4 rounded-xl shadow-sm hover:shadow-lg transition cursor-pointer bg-white">
                    <div className="flex gap-4 items-center">
                      <img
                        src={relatedCourse.image}
                        className="h-16 w-16 md:h-20 md:w-20 object-cover rounded-lg"
                        alt={relatedCourse.title}
                      />
                      <div className="min-w-0">
                        <h3 className="font-semibold text-sm md:text-base line-clamp-2">
                          {relatedCourse.title}
                        </h3>
                        <p className="text-xs text-gray-500">{relatedCourse.createdBy.name}</p>
                        <p className="text-[10px] md:text-xs font-medium">{relatedCourse.duration}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-gray-500">No related courses</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;