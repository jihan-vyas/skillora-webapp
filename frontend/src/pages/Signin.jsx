import { SignIn } from "@clerk/clerk-react";
import React from "react";

const Signin = () => {
  return (
    /* Added min-h-screen and py-10 to prevent touching the top/bottom */
    <div className="flex items-center justify-center min-h-screen bg-primary w-full px-4 py-10">
      
      <div className="w-full max-w-[480px] flex justify-center">
        <SignIn
          routing="path"
          path="/signin"
          signUpUrl="/signup"
          afterSignUpUrl="/"
          appearance={{
            elements: {
              // Makes the card responsive
              rootBox: "w-full flex justify-center",
              card: "w-full shadow-2xl",
              /* The Slight Purple Contrast Button to match Sign Up */
              formButtonPrimary: 
                "bg-[#7c3aed] hover:bg-[#6d28d9] text-sm normal-case transition-all border-none",
              footerActionLink: "text-[#7c3aed] hover:text-[#6d28d9]",
              // Matches the "Sign in with..." button hover states
              socialButtonsBlockButton: "hover:bg-slate-50 transition-all",
            },
          }}
        />
      </div>
    </div>
  );
};

export default Signin;