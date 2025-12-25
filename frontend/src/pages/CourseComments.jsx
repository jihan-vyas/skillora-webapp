import { useState, useEffect } from "react";
import axios from "axios";



const CourseComments = ({ userId }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`https://skillora-backend-ipwx.onrender.com/api/courses/user/${userId}/comments`);
        setCourses(res.data);
      } catch (err) {
        console.error("Failed to fetch comments:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchComments();
  }, [userId]);

  if (loading) return <p className="text-center py-4">Loading courses and comments...</p>;

  if (courses.length === 0)
    return <p className="text-skillora-500 text-center py-4">No courses or comments yet.</p>;

  return (
    /* space-y-4 on mobile, space-y-6 on desktop */
    <div className="space-y-4 md:space-y-6 transition-all duration-300">
      {courses.map((course) => (
        <div key={course._id} className="border-2 border-secondary/30 p-4 md:p-6 rounded-xl hover:shadow-md transition-shadow bg-white/50">
          {/* Title scales from text-base to text-lg */}
          <h3 className="font-bold text-base md:text-lg mb-3 text-black1">{course.title}</h3>
          
          {course.comments.length === 0 ? (
            <p className="text-gray-400 text-sm italic">No comments yet.</p>
          ) : (
            <div className="space-y-3">
              {course.comments.map((c, i) => (
                <div 
                  key={i} 
                  className="bg-white border border-gray-100 p-3 rounded-lg shadow-sm hover:border-skillora transition-colors duration-200"
                >
                  {/* Comment text: slightly smaller on mobile for better fit */}
                  <p className="text-sm md:text-base text-black2 leading-relaxed mb-1">
                    {c.text}
                  </p>
                  <div className="flex justify-end">
                    <span className="text-[10px] md:text-xs font-medium text-gray-400">
                      {new Date(c.createdAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
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

export default CourseComments;