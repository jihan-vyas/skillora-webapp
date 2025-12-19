import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./layout/MainLayout";
import Explore from "./pages/Explore";
import CourseDetails from "./pages/CourseDetails";
import AboutContact from "./pages/About&Contact";
import { ClerkProvider } from "@clerk/clerk-react";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import CreateCourse from "./pages/CreateCourse";
import AdminPanel from "./pages/AdminPanel";
import UserDashboard from "./pages/UserDashboard";
import EditCourse from "./pages/EditCourse";

const App = () => {
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about-contact" element={<AboutContact />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/explore/:id" element={<CourseDetails />} />
            <Route path="/dashboard" element={<UserDashboard />} />
          </Route>

          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/create" element={<CreateCourse />} />
          <Route path="/edit-course/:id" element={<EditCourse />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </ClerkProvider>
  );
};

export default App;
