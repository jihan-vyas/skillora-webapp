import { Instagram, Youtube, Linkedin, Twitter, Menu, X } from "lucide-react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../Components/Button";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";

const MainLayout = () => {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Helper to close sidebar when clicking a link
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="bg-primary min-h-screen px-4 py-6 md:px-8 lg:px-12 lg:py-8 transition-all duration-300 relative overflow-x-hidden">
      
      {/* Header */}
      <header className="flex items-center justify-between border-3 border-secondary rounded-xl px-4 py-4 md:px-8 transition-all duration-300 bg-primary z-50 relative">
        
        {/* Logo */}
        <div className="text-3xl font-black text-black1">
          <Link to={"/"} onClick={closeSidebar}>
            <img src="/Skillora.svg" className="h-5 md:h-6 w-auto cursor-pointer" />
          </Link>
        </div>

        {/* Desktop Navigation (Hidden on Mobile) */}
        <nav className="hidden md:flex items-center gap-8 font-semibold text-lg">
          <Link to={"/"} className="hover:text-secondary transition">Home</Link>
          <Link to={"/explore"} className="hover:text-secondary transition">Explore</Link>
          <Link to={"/about-contact"} className="hover:text-secondary transition">About & Contact</Link>
          <SignedIn>
            <Link to={"/dashboard"} className="hover:text-secondary transition">My Profile</Link>
          </SignedIn>
        </nav>

        {/* Action Buttons & Hamburger */}
        <div className="flex items-center gap-3 md:gap-4">
          <SignedIn>
            <div className="hidden sm:flex items-center gap-3">
               <Link to={"/create"}>
                 <Button text="Create" plus />
               </Link>
            </div>
            <div className="scale-110 md:scale-125 flex items-center justify-center">
              <UserButton afterSignOutUrl="/">
                <UserButton.MenuItems>
                  <UserButton.Action label="Dashboard" onClick={() => navigate("/dashboard")} />
                </UserButton.MenuItems>
              </UserButton>
            </div>
          </SignedIn>

          <SignedOut>
            <div className="hidden sm:block">
              <Link to={"/signup"}>
                <Button text="Signup" />
              </Link>
            </div>
          </SignedOut>

          {/* Hamburger Menu Button (Mobile Only) */}
          <button 
            onClick={toggleSidebar}
            className="md:hidden p-2 text-secondary focus:outline-none z-50"
          >
            {isSidebarOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeSidebar}
      />

      {/* Mobile Sidebar Content */}
      <aside 
        className={`fixed  top-0 right-0 h-full w-full bg-primary border-l-3 border-secondary z-40 transform transition-transform duration-300 ease-in-out md:hidden ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-6 p-8 mt-24 font-bold text-xl">
          <Link to={"/"} onClick={closeSidebar} className="hover:text-secondary transition">Home</Link>
          <Link to={"/explore"} onClick={closeSidebar} className="hover:text-secondary transition">Explore</Link>
          <Link to={"/about-contact"} onClick={closeSidebar} className="hover:text-secondary transition">About & Contact</Link>
          <SignedIn>
            <Link to={"/dashboard"} onClick={closeSidebar} className="hover:text-secondary transition">My Profile</Link>
            <Link to={"/create"} onClick={closeSidebar} className="mt-4">
               <Button text="Create" plus />
            </Link>
          </SignedIn>
          <SignedOut>
            <Link to={"/signup"} onClick={closeSidebar} className="mt-4">
              <Button text="Signup" />
            </Link>
          </SignedOut>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="transition-all duration-300 min-h-[60vh]">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-4 items-center justify-between border-3 border-secondary rounded-xl px-4 py-6 md:px-8 mt-8 transition-all duration-300">
        <div className="text-4xl md:text-5xl theme-font">Skillora.</div>
        <p className="text-center text-sm md:text-base max-w-md">
          Empowering learners with high-quality courses from creators worldwide.
        </p>
        <div className="flex items-center gap-4">
          {[Instagram, Youtube, Linkedin, Twitter].map((Icon, index) => (
            <a key={index} href="#" className="p-2 rounded-full hover:bg-gray-800 hover:text-white transition-colors">
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;