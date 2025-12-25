import { Link } from "react-router-dom";
import Button from "./Button";

export default function Hero() {
  return (
    <section className="w-full py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-10 lg:gap-12">
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left theme-font">
          {/* Scaled text: 3xl for small mobile, 4xl for standard, 6xl for desktop */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl theme-font text-[#babaac] leading-tight ">
            Learn Anything. <br />
            <span className="text-black1 theme-font">Master Everything.</span>
          </h1>

          <p className="text-gray-600 mt-6 text-base md:text-lg max-w-xl mx-auto md:mx-0">
            Discover thousands of free and premium courses created by experts —
            from programming and design to cooking, music, and personal
            development. Upgrade your skills, level up your life.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link to={'/explore'} className="w-full sm:w-auto">
              {/* Added w-full to the button via prop for mobile clickability */}
              <Button text="Explore Courses" className="w-full sm:w-auto justify-center" />
            </Link>
          </div>
        </div>

        {/* Right Image / Illustration */}
        <div className="flex-1 flex justify-center w-full">
          <img
            src="img.png"
            alt="Hero Illustration"
            /* Using max-w-full and aspect-square or specific heights to keep it from breaking layout */
            className="w-full max-w-[320px] sm:max-w-[400px] md:max-w-[450px] h-[250px] sm:h-[300px] md:h-[400px] object-cover drop-shadow-xl rounded-xl transition-all duration-300"
          />
        </div>
      </div>
    </section>
  );
}