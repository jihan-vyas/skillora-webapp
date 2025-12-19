import { SignUp } from "@clerk/clerk-react";
import React from "react";

const Signup = () => {
  return (
    /* 1. Changed h-screen to min-h-screen to allow scrolling if content is tall.
       2. Added py-10 to ensure a gap at the top and bottom so it never touches the edge.
    */
    <div className="flex items-center justify-center min-h-screen bg-primary w-full px-4 py-10">
      
      <div className="w-full max-w-[480px] flex justify-center">
        <SignUp
          routing="path"
          path="/signup"
          signInUrl="/signin"
          afterSignUpUrl="/"
          appearance={{
            elements: {
              rootBox: "w-full flex justify-center",
              card: "w-full shadow-2xl",
              /* The Slight Purple Contrast Button */
              formButtonPrimary: 
                "bg-[#7c3aed] hover:bg-[#6d28d9] text-sm normal-case transition-all border-none",
              footerActionLink: "text-[#7c3aed] hover:text-[#6d28d9]"
            },
          }}
        />
      </div>
    </div>
  );
};

export default Signup;