import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const EditCourse = () => {
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [courseLink, setCourseLink] = useState("");
  const [isFree, setIsFree] = useState(true);
  const [tags, setTags] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isSignedIn) navigate("/signin");
  }, [isSignedIn, navigate]);

  useEffect(() => {
    if (!id) return;

    const fetchCourse = async () => {
      try {
        const res = await fetch(`${API_URL}/api/courses`);
        const data = await res.json();

        const selectedCourse = data.find((c) => c._id === id);
        if (selectedCourse) {
          setTitle(selectedCourse.title);
          setDescription(selectedCourse.description || "");
          setFullDescription(selectedCourse.fullDescription || "");
          setDuration(selectedCourse.duration || "");
          setCourseLink(selectedCourse.courseLink || "");
          setIsFree(selectedCourse.isFree ?? true);
          setTags(selectedCourse.tags?.join(",") || "");
          setImage(selectedCourse.image || "");
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchCourse();
  }, [id]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return alert("No file selected!");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "skillora_courses");
    formData.append("folder", "courses");

    try {
      setUploading(true);
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dbtcckshe/image/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setImage(res.data.secure_url);
    } catch (err) {
      console.error("Cloudinary Upload Error:", err.response?.data || err.message);
      alert("Image upload failed!");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !fullDescription || !image) {
      return alert("Please fill all required fields");
    }

    const updatedCourse = {
      title,
      description,
      fullDescription,
      duration,
      courseLink,
      isFree,
      tags: tags.split(",").map((t) => t.trim()),
      image,
    };

    try {
      setLoading(true);
      const res = await axios.put(
        `${API_URL}/api/courses/${id}`,
        updatedCourse
      );
      alert("Course Updated Successfully!");
      navigate("/"); 
    } catch (err) {
      console.error("Update error:", err.response?.data || err.message);
      alert(`Failed to update course: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    /* Changed px-30 to responsive px-4 md:px-20 lg:px-40 to prevent mobile squashing */
    <div className="px-4 md:px-20 lg:px-40 pt-10 bg-primary min-h-screen pb-10">
      <h1 className="text-2xl md:text-3xl font-medium mb-6 flex flex-wrap gap-3 items-center">
        Edit Course Details{" "}
        <img src="/Skillora.svg" className="h-6 w-auto cursor-pointer" alt="Skillora" />
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <input
          type="text"
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-b-1 p-3 outline-none bg-transparent"
          required
        />
        <input
          type="text"
          placeholder="Short Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border-b-1 p-3 outline-none bg-transparent"
        />
        <textarea
          placeholder="Full Description"
          value={fullDescription}
          onChange={(e) => setFullDescription(e.target.value)}
          className="border-b-1 p-3 outline-none bg-transparent min-h-[120px]"
          required
        />
        <input
          type="text"
          placeholder="Course Duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="border-b-1 p-3 outline-none bg-transparent"
        />
        <input
          type="url"
          placeholder="Course Link"
          value={courseLink}
          onChange={(e) => setCourseLink(e.target.value)}
          className="border-b-1 p-3 outline-none bg-transparent"
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="border-b-1 p-3 outline-none bg-transparent"
        />

        <div className="flex items-center gap-2 py-2">
          <input
            type="checkbox"
            id="isFree"
            className="w-4 h-4 cursor-pointer"
            checked={isFree}
            onChange={(e) => setIsFree(e.target.checked)}
          />
          <label htmlFor="isFree" className="cursor-pointer select-none font-medium">Free Course?</label>
        </div>

        <div className="flex flex-col gap-3 py-2">
          <label className="font-medium">Update Thumbnail:</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload} 
            className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800"
          />
          {uploading && <p className="text-gray-500 text-sm italic">Uploading image...</p>}
          {image && (
            <div className="mt-2">
              <p className="text-xs text-gray-500 mb-1">Preview:</p>
              <img
                src={image}
                alt="Course"
                className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-lg border-2 border-secondary"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading || uploading}
          className="bg-black text-white p-4 rounded-lg hover:bg-gray-800 transition font-bold mt-4 disabled:bg-gray-400"
        >
          {loading ? "Updating..." : "Update Course"}
        </button>
      </form>
    </div>
  );
};

export default EditCourse;