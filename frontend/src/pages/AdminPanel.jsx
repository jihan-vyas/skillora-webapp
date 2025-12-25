import React, { useEffect, useState } from "react";
import { useUser, RedirectToSignIn } from "@clerk/clerk-react";
import axios from "axios";

const AdminPanel = () => {
  const { isSignedIn, user } = useUser();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("courses");

  useEffect(() => {
    if (!isSignedIn || !user) return;

    if (user?.publicMetadata?.role === "admin") {
      axios
        .get("https://skillora-backend-ipwx.onrender.com/api/courses")
        .then((res) => setCourses(res.data))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [isSignedIn, user, loading]);

  if (!isSignedIn) return <RedirectToSignIn />;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        ⏳ Loading Admin Panel...
      </div>
    );
  }

  if (user.publicMetadata?.role !== "admin") {
    return (
      <div className="text-red-600 text-center mt-20 text-xl font-bold">
        ❌ You are not authorized
      </div>
    );
  }

  const handleDelete = async (id) => {
    await axios.delete(`https://skillora-backend-ipwx.onrender.com/api/courses/${id}`);
    setLoading(true);
  };

  return (
    // Stack vertically on mobile, row on desktop
    <div className="flex flex-col md:flex-row min-h-screen bg-primary transition-all duration-300">
      
      {/* Sidebar: Top-nav on mobile, Side-nav on desktop */}
      <aside className="w-full md:w-64 border-b-1 md:border-b-0 md:border-r-1 border-secondary p-4 md:p-6 bg-primary">
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-8 text-black1 text-center md:text-left">
          SkilloraAdmin
        </h2>

        <nav className="flex md:flex-col gap-2 md:space-y-3 font-semibold overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
          <button
            onClick={() => setActive("courses")}
            className={`cursor-pointer whitespace-nowrap md:w-full text-left px-4 py-2 rounded-lg transition-all duration-200 ${
              active === "courses"
                ? "bg-skillora text-black1 shadow-sm"
                : "hover:bg-gray-200 text-black2"
            }`}
          >
            All Courses
          </button>

          <button className="cursor-pointer whitespace-nowrap md:w-full text-left text-black2 px-4 py-2 rounded-lg hover:bg-gray-200 transition-all">
            Users (Soon)
          </button>

          <button className="cursor-pointer whitespace-nowrap md:w-full text-left text-black2 px-4 py-2 rounded-lg hover:bg-gray-200 transition-all">
            Analytics (Soon)
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-hidden">
        {active === "courses" && (
          <div className="transition-opacity duration-500 animate-in fade-in">
            <h1 className="text-2xl md:text-3xl font-bold mb-6">All Courses</h1>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {courses.length === 0 ? (
                <p className="text-gray-500 text-center py-10">
                  No courses available
                </p>
              ) : (
                /* Responsive Table Wrapper */
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse min-w-[500px]">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-4 text-left text-sm md:text-base">Course Title</th>
                        <th className="p-4 text-center text-sm md:text-base">Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {courses.map((c) => (
                        <tr
                          key={c._id}
                          className="border-t hover:bg-gray-50 transition-colors"
                        >
                          <td className="p-4 font-medium text-sm md:text-base">{c.title}</td>
                          <td className="p-4 text-center">
                            <button 
                              onClick={() => handleDelete(c._id)}
                              className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-red-600 hover:bg-red-700 active:scale-90 transition-all shadow-sm"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="20px"
                                viewBox="0 -960 960 960"
                                width="20px"
                                fill="#fff"
                              >
                                <path d="M280-120q-33 0-56.5-23.5T200-200v-520q-17 0-28.5-11.5T160-760q0-17 11.5-28.5T200-800h160q0-17 11.5-28.5T400-840h160q17 0 28.5 11.5T600-800h160q17 0 28.5 11.5T800-760q0 17-11.5 28.5T760-720v520q0 33-23.5 56.5T680-120H280Zm120-160q17 0 28.5-11.5T440-320v-280q0-17-11.5-28.5T400-640q-17 0-28.5 11.5T360-600v280q0 17 11.5 28.5T400-280Zm160 0q17 0 28.5-11.5T600-320v-280q0-17-11.5-28.5T560-640q-17 0-28.5 11.5T520-600v280q0 17 11.5 28.5T560-280Z" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;