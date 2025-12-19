import { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "../components/CourseCard";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Explore = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all"); // "all", "free", "paid"

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/courses`);
        const data = res.data;

        if (Array.isArray(data)) {
          setCourses(data);
        } else {
          setCourses([]);
        }
      } catch (error) {
        console.error("Fetch failed:", error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading courses...</p>;
  }

  // Filtered & searched courses
  const filteredCourses = courses.filter((course) => {
    const term = searchTerm.toLowerCase();

    const matchesSearch =
      course.title.toLowerCase().includes(term) ||
      course.createdBy.name.toLowerCase().includes(term) ||
      (course.tags &&
        course.tags.some((tag) => tag.toLowerCase().includes(term)));

    const matchesFilter =
      filterType === "all" ||
      (filterType === "free" && course.isFree) ||
      (filterType === "paid" && !course.isFree);

    return matchesSearch && matchesFilter;
  });

  return (
    /* Added responsive horizontal padding and max-width for large screens */
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-10">
      
      {/* Search & Filter UI - Controlled wrapping for mobile */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center">
        
        {/* Search Box */}
        <div className="relative w-full md:flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="22px"
              viewBox="0 -960 960 960"
              width="22px"
              fill="#9ca3af"
            >
              <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
            </svg>
          </span>

          <input
            type="text"
            placeholder="Search by title, author or tag..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="
              w-full
              pl-11 pr-4 py-2.5
              rounded-xl
              border border-gray-300
              focus:outline-none
              focus:ring-2 focus:ring-skillora
              focus:border-skillora
              transition
              shadow-sm
            "
          />
        </div>

        {/* Filter Dropdown - Full width on small mobile, auto on desktop */}
        <div className="relative w-full md:w-auto">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="
              w-full md:w-auto
              px-4 py-2.5
              rounded-xl
              border border-gray-300
              bg-primary
              cursor-pointer
              focus:outline-none
              focus:ring-2 focus:ring-skillora
              focus:border-skillora
              transition
              shadow-sm
            "
          >
            <option value="all">All Courses</option>
            <option value="free">Free Courses</option>
            <option value="paid">Paid Courses</option>
          </select>
        </div>
      </div>

      {/* Courses Grid - Added 1-column for mobile, 2 for tablet, 3 for desktop, 4 for extra large */}
      {filteredCourses.length === 0 ? (
        <p className="text-center text-gray-500 mt-20">No courses found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-8 justify-items-center">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course._id}
              id={course._id}
              image={course.image}
              title={course.title}
              description={course.description}
              author={course.createdBy.name}
              authorImage={course.createdBy.avatar}
              isFree={course.isFree}
              likes={course.likes}
              tags={course.tags}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Explore;