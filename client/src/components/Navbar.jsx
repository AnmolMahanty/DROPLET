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

      <div className="flex items-center gap-6">
        <div className="bg-gray-200 p-2 rounded-[100%]">
          <img
            src="\src\assets\language.svg"
            alt="language-selection-icon"
            width={18}
          />
        </div>
        <button
          onClick={handleSignInClick}
          className="flex items-center px-6 py-2 rounded-full bg-[#00A6ff] hover:bg-[#3ba3db] transition-colors"
        >
          <p className="text-white font-medium text-base">Sign In</p>
        </button>
      </div>
    </div>
  );
};

export default Navbar;

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { Droplet, Globe, Menu } from "lucide-react";
// import { motion } from "framer-motion";

// const Navbar = () => {
//   const navigate = useNavigate();

//   const handleHomeClick = () => {
//     navigate("/");
//   };

//   const handleSignInClick = () => {
//     navigate("/signin");
//   };

//   return (
//     <motion.div
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       transition={{ type: "spring", stiffness: 100 }}
//       className="w-full h-20 flex justify-between items-center px-6 md:px-12 bg-white shadow-md fixed top-0 left-0 z-50"
//     >
//       <motion.div
//         whileHover={{ scale: 1.05 }}
//         onClick={handleHomeClick}
//         className="flex items-center gap-2 cursor-pointer"
//       >
//         <Droplet className="w-8 h-8 text-blue-600" />
//         <p className="text-2xl font-bold text-blue-900">Droplet</p>
//       </motion.div>

//       <div className="flex items-center gap-6">
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           className="text-blue-900 hover:text-blue-700 transition-colors hidden md:block"
//         >
//           For Farmers
//         </motion.button>
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           className="text-blue-900 hover:text-blue-700 transition-colors hidden md:block"
//         >
//           About Us
//         </motion.button>
//         <motion.div
//           whileHover={{ scale: 1.1, rotate: 180 }}
//           transition={{ type: "spring", stiffness: 300 }}
//           className="bg-blue-100 p-2 rounded-full"
//         >
//           <Globe className="w-5 h-5 text-blue-600" />
//         </motion.div>
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={handleSignInClick}
//           className="flex items-center px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors"
//         >
//           <p className="text-white font-medium text-base">Sign In</p>
//         </motion.button>
//         <motion.button
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//           className="md:hidden"
//         >
//           <Menu className="w-6 h-6 text-blue-900" />
//         </motion.button>
//       </div>
//     </motion.div>
//   );
// };

// export default Navbar;
