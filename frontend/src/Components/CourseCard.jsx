import axios from "axios";
import { Link } from "react-router-dom";

export default function CourseCard({
  id,
  image,
  title,
  description,
  author,
  authorImage,
  isFree = false,
  likes = 0,
  profile = false,
}) {
  const handleDelete = async (id) => {
    await axios.delete(`https://skillora-backend-ipwx.onrender.com/api/courses/${id}`);
  };

  return (
    <div className="mx-auto w-full max-w-[340px]">
      <Link to={`/explore/${id}`}>
        <div className="w-full cursor-pointer rounded-3xl shadow-sm border-2 border-secondary p-3 select-none hover:scale-95 transition-all duration-200">
          {/* Course Thumbnail */}
          <div className="relative">
            <img
              src={image}
              alt={title}
              className="w-full h-40 sm:h-48 object-cover rounded-2xl"
            />

            {/* Free / Paid Label - Keeping your original color logic */}
            <span
              className={`absolute top-3 left-3 text-xs sm:text-sm font-semibold px-4 py-1 rounded-full
          ${isFree ? "bg-black text-white" : "bg-primary text-black1"}`}
            >
              {isFree ? "Free" : "Paid"}
            </span>
          </div>

          {/* Title */}
          <h2 className="mt-3 px-3 text-base sm:text-lg font-semibold text-black1 leading-snug line-clamp-2">
            {title}
          </h2>

          {/* Description */}
          <p className="text-xs sm:text-sm px-3 text-black3 mt-1 line-clamp-2">
            {description}
          </p>

          {/* Author Section */}
          <div className="flex items-center justify-between px-3 mt-2">
            <div className="flex items-center gap-2 mt-3">
              <img
                src={authorImage}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover"
                alt={author}
              />
              <span className="text-xs sm:text-sm text-gray-700">{author}</span>
            </div>

            {/* Likes */}
            <div className="flex items-center gap-1 mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 -960 960 960"
                width="20px"
                fill="#111"
              >
                <path d="M480-147q-14 0-28.5-5T426-168l-69-63q-106-97-191.5-192.5T80-634q0-94 63-157t157-63q53 0 100 22.5t80 61.5q33-39 80-61.5T660-854q94 0 157 63t63 157q0 115-85 211T602-230l-68 62q-11 11-25.5 16t-28.5 5Zm-38-543q-29-41-62-62.5T300-774q-60 0-100 40t-40 100q0 52 37 110.5T285.5-410q51.5 55 106 103t88.5 79q34-31 88.5-79t106-103Q726-465 763-523.5T800-634q0-60-40-100t-100-40q-47 0-80 21.5T518-690q-7 10-17 15t-21 5q-11 0-21-5t-17-15Zm38 189Z" />
              </svg>
              <span className="text-gray-700 text-xs sm:text-sm">{likes} likes</span>
            </div>
          </div>
        </div>
      </Link>

      {/* Profile Actions - Keeping your original BG colors */}
      {profile && (
        <div className="flex items-center justify-end gap-2 px-5 py-3">
          <span
            onClick={() => handleDelete(id)}
            className="cursor-pointer flex items-center justify-center h-8 w-8 rounded-full bg-red-600"
          >
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
          <Link to={`/edit-course/${id}`}>
            <span className="cursor-pointer flex items-center justify-center h-8 w-8 rounded-full bg-skillora">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#111"
              >
                <path d="M160-120q-17 0-28.5-11.5T120-160v-97q0-16 6-30.5t17-25.5l505-504q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L313-143q-11 11-25.5 17t-30.5 6h-97Zm544-528 56-56-56-56-56 56 56 56Z" />
              </svg>
            </span>
          </Link>
        </div>
      )}
    </div>
  );
}