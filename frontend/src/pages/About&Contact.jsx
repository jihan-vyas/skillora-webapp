import React from "react";
import Button from "../Components/Button";
import { useUser } from "@clerk/clerk-react";

const Contact = () => {
  const { user } = useUser();

  return (
    /* Adjusted padding: smaller on mobile (p-4), original on tablet/desktop (md:p-12) */
    <div className="min-h-screen text-black1 p-4 sm:p-6 md:p-12 transition-all duration-300">
      
      <header className="text-center mb-8 md:mb-12">
        {/* Font size scales: text-3xl on mobile, text-5xl on desktop */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold theme-font mb-4">
          Contact Us
        </h1>
        <p className="text-base md:text-lg text-black3 max-w-xl mx-auto px-2">
          Have questions or suggestions? Reach out to us, and we'll get back to
          you as soon as possible!
        </p>
      </header>

      <section className="max-w-3xl mx-auto">
        {/* Form: reduced padding on mobile (p-5), original on desktop (p-8) */}
        <form className="bg-secondary/40 p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-lg space-y-4 md:space-y-6 transition-all">
          <div>
            <label className="block mb-1 md:mb-2 font-semibold text-sm md:text-base" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Your Name"
              className="w-full p-3 rounded-lg border border-[var(--black3)] focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all"
            />
          </div>

          <div>
            <label className="block mb-1 md:mb-2 font-semibold text-sm md:text-base" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Your Email"
              className="w-full p-3 rounded-lg border border-[var(--black3)] focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all"
            />
          </div>

          <div>
            <label className="block mb-1 md:mb-2 font-semibold text-sm md:text-base" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              rows="4"
              md:rows="5"
              placeholder="Your Message"
              className="w-full p-3 rounded-lg border border-[var(--black3)] focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all"
            ></textarea>
          </div>
          
          {/* Button container to ensure it looks good on mobile */}
          <div className="pt-2">
            <Button text="Send Message" className="w-full md:w-auto" />
          </div>
        </form>

        <div className="mt-8 md:mt-12 text-center text-[var(--black3)] text-sm md:text-base">
          <p className="font-medium">Or reach us at:</p>
          <p>Email: support@skillora.com</p>
          <p>Phone: +91 123 456 7890</p>
        </div>
      </section>
    </div>
  );
};

export default Contact;