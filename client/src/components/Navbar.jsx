import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleSignInClick = () => {
    navigate("/signin");
  };
  return (
    <div className="w-full h-16 flex justify-between items-center px-12 border border-black/5">
      <div
        onClick={handleHomeClick}
        className="flex items-center gap-2 cursor-pointer"
      >
        <img src="\src\assets\droplet-logo.svg" alt="droplet-logo" width={26} />
        <p className="text-xl font-medium">Droplet</p>
      </div>

      <div className="flex items-center gap-10">
        <div className="bg-gray-300 p-2 rounded-[100%]">
          <img
            src="\src\assets\language.svg"
            alt="language-selection-icon"
            width={18}
          />
        </div>
        <button
          onClick={handleSignInClick}
          className="flex items-center px-6 py-2 rounded-full bg-[#00A6ff]  hover:bg-[#3ba3db] transition-colors"
        >
          <p className="text-white font-medium text-base">Sign In</p>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
