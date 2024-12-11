import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Droplet, Utensils, Camera, Tractor, ChevronRight } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import Chatbot from "@/components/Chatbot";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FeatureCard = ({ icon, title, description }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
  >
    <motion.div
      whileHover={{ rotate: 360 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4"
    >
      {icon}
    </motion.div>
    <h3 className="text-xl font-semibold mb-2 text-blue-900">{title}</h3>
    <p className="text-blue-700">{description}</p>
  </motion.div>
);

const WaterUsageTip = ({ usage }) => {
  const tips = [
    { threshold: 100, text: "Great job! You're using water efficiently." },
    {
      threshold: 200,
      text: "You're doing well, but there's room for improvement.",
    },
    { threshold: 300, text: "Consider ways to reduce your water usage." },
    {
      threshold: Infinity,
      text: "Your water usage is high. Let's find ways to conserve!",
    },
  ];

  const currentTip = tips.find((tip) => usage <= tip.threshold);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-4 p-4 bg-blue-100 rounded-lg text-blue-800"
    >
      <h4 className="font-semibold mb-2">Water Usage Tip:</h4>
      <p>{currentTip.text}</p>
    </motion.div>
  );
};

const Home = () => {
  const [waterUsage, setWaterUsage] = useState(150);
  const waterLevelAnimation = useAnimation();

  const handleSliderChange = (e) => {
    setWaterUsage(parseInt(e.target.value));
  };

  useEffect(() => {
    waterLevelAnimation.start({
      height: `${(waterUsage / 300) * 100}%`,
      transition: { type: "spring", stiffness: 100 },
    });
  }, [waterUsage, waterLevelAnimation]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Navbar />
      <div className="pt-20">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold text-blue-900 mb-6"
          >
            Visualize Your Water Footprint
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-blue-700 mb-8 max-w-2xl"
          >
            Discover the impact of your daily water usage and learn how to
            conserve this precious resource.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-full text-lg hover:bg-blue-700 transition-colors"
          >
            Calculate Your Footprint
          </motion.button>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 w-full max-w-md"
          >
            <h3 className="text-blue-900 text-xl mb-4">
              Daily Water Usage: {waterUsage} Liters
            </h3>
            <input
              type="range"
              min="0"
              max="300"
              value={waterUsage}
              onChange={handleSliderChange}
              className="w-full"
            />
            <div className="relative h-64 mt-4 bg-blue-200 rounded-lg overflow-hidden">
              <motion.div
                animate={waterLevelAnimation}
                className="absolute bottom-0 left-0 right-0 bg-blue-500"
              />
              <Droplet className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-white" />
            </div>
            <WaterUsageTip usage={waterUsage} />
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 md:px-12 bg-white">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-blue-900 text-center mb-12"
          >
            Discover Your Water Impact
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Droplet className="w-6 h-6 text-blue-600" />}
              title="Daily Water Footprint"
              description="Calculate and track your daily water usage to make informed decisions."
            />
            <FeatureCard
              icon={<Utensils className="w-6 h-6 text-blue-600" />}
              title="Food Water Footprint"
              description="Discover the water footprint of any dish or food product with ease."
            />
            <FeatureCard
              icon={<Camera className="w-6 h-6 text-blue-600" />}
              title="Image Recognition"
              description="Upload an image of your meal to instantly calculate its water footprint."
            />
          </div>
        </section>

        {/* Farmers Section */}
        <section className="bg-blue-100 text-blue-900 py-20 px-4 md:px-12">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold mb-6 flex items-center"
            >
              <Tractor className="w-8 h-8 mr-3 text-blue-600" />
              For Farmers
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl mb-8"
            >
              Optimize your farm's water usage with our specialized tools and
              insights. Improve crop yields while conserving water resources.
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-full text-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              Learn More
              <ChevronRight className="ml-2 w-5 h-5" />
            </motion.button>
          </div>
        </section>

        <section className="py-32 bg-blue-50">
          <div className="max-w-[1020px] mx-auto px-4">
            <h2 className="text-3xl font-bold text-blue-900 text-center mb-8">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-semibold text-blue-900 hover:underline">
                  What is Droplet?
                </AccordionTrigger>
                <AccordionContent className="text-blue-700 text-base">
                  Droplet is a comprehensive web application designed to promote
                  water conservation by empowering individuals, communities,
                  farmers, and industries with data and innovative tools to
                  track water usage and adopt water-saving practices.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-semibold text-blue-900 hover:underline">
                  How does the Daily Life Water Footprint Calculator work?
                </AccordionTrigger>
                <AccordionContent className="text-blue-700 text-base">
                  The Daily Life Water Footprint Calculator analyzes your water
                  usage across personal hygiene, food preparation, and household
                  tasks, providing insights to help you reduce waste and
                  conserve water.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-semibold text-blue-900 hover:underline">
                  What is the Food Dishes Water Footprint tool?
                </AccordionTrigger>
                <AccordionContent className="text-blue-700 text-base">
                  This tool evaluates the water impact of various meals, helping
                  you make sustainable dietary choices by highlighting the water
                  footprint of different food items.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-lg font-semibold text-blue-900 hover:underline">
                  How can Droplet help farmers optimize water usage?
                </AccordionTrigger>
                <AccordionContent className="text-blue-700 text-base">
                  Droplet provides farmers with tools to optimize irrigation
                  practices, evaluate crop water requirements, and implement
                  soil management techniques to enhance water efficiency and
                  conserve resources.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-lg font-semibold text-blue-900 hover:underline">
                  What support does Droplet offer for industries?
                </AccordionTrigger>
                <AccordionContent className="text-blue-700 text-base">
                  Droplet offers certification programs that analyze and improve
                  water use efficiency for industries, promoting sustainable
                  practices and helping them meet environmental goals.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger className="text-lg font-semibold text-blue-900 hover:underline">
                  What resources are available in Droplet's blog?
                </AccordionTrigger>
                <AccordionContent className="text-blue-700 text-base">
                  Droplet's blog delivers the latest research, innovative
                  conservation practices, and case studies of successful
                  water-saving initiatives to create an informed and engaged
                  community.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white text-blue-900 py-8 px-4 md:px-12">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center mb-4 md:mb-0"
            >
              <Droplet className="w-6 h-6 text-blue-600 mr-2" />
              <span className="text-xl font-bold">Droplet</span>
            </motion.div>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="hover:text-blue-600"
              >
                About
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="hover:text-blue-600"
              >
                Contact
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="hover:text-blue-600"
              >
                Privacy Policy
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="hover:text-blue-600"
              >
                Terms of Service
              </motion.a>
            </div>
          </div>
        </footer>
      </div>
      <div className="fixed bottom-10 right-10 z-50">
        <Chatbot />
      </div>
    </div>
  );
};

export default Home;

// import React, { useState } from "react";
// import Navbar from "../components/Navbar";
// import { Droplet, Utensils, Camera, Tractor, ChevronRight } from "lucide-react";
// import { motion } from "framer-motion";

// const FeatureCard = ({ icon, title, description }) => (
//   <motion.div
//     whileHover={{ scale: 1.05 }}
//     className="bg-white/10 backdrop-blur-md rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
//   >
//     <motion.div
//       whileHover={{ rotate: 360 }}
//       transition={{ duration: 0.5 }}
//       className="flex items-center justify-center w-12 h-12 bg-blue-400/20 rounded-full mb-4"
//     >
//       {icon}
//     </motion.div>
//     <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
//     <p className="text-blue-100">{description}</p>
//   </motion.div>
// );

// const Home = () => {
//   const [waterUsage, setWaterUsage] = useState(150);

//   const handleSliderChange = (e) => {
//     setWaterUsage(e.target.value);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500">
//       <Navbar />
//       <div className="pt-20">
//         {/* Hero Section */}
//         <section className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center px-4">
//           <motion.h1
//             initial={{ opacity: 0, y: -50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="text-4xl md:text-6xl font-bold text-white mb-6"
//           >
//             Visualize Your Water Footprint
//           </motion.h1>
//           <motion.p
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="text-xl text-blue-100 mb-8 max-w-2xl"
//           >
//             Discover the impact of your daily water usage and learn how to
//             conserve this precious resource.
//           </motion.p>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="bg-blue-400 text-white font-semibold py-3 px-8 rounded-full text-lg hover:bg-blue-500 transition-colors"
//           >
//             Calculate Your Footprint
//           </motion.button>
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.5, delay: 0.4 }}
//             className="mt-12 w-full max-w-md"
//           >
//             <h3 className="text-white text-xl mb-4">
//               Daily Water Usage: {waterUsage} Liters
//             </h3>
//             <input
//               type="range"
//               min="0"
//               max="300"
//               value={waterUsage}
//               onChange={handleSliderChange}
//               className="w-full"
//             />
//             <div className="relative h-64 mt-4 bg-blue-900/50 rounded-lg overflow-hidden">
//               <motion.div
//                 animate={{ height: `${(waterUsage / 300) * 100}%` }}
//                 transition={{ type: "spring", stiffness: 100 }}
//                 className="absolute bottom-0 left-0 right-0 bg-blue-400"
//               />
//               <Droplet className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-white" />
//             </div>
//           </motion.div>
//         </section>

//         {/* Features Section */}
//         <section className="py-20 px-4 md:px-12">
//           <motion.h2
//             initial={{ opacity: 0, y: 50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="text-3xl font-bold text-white text-center mb-12"
//           >
//             Discover Your Water Impact
//           </motion.h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             <FeatureCard
//               icon={<Droplet className="w-6 h-6 text-blue-400" />}
//               title="Daily Water Footprint"
//               description="Calculate and track your daily water usage to make informed decisions."
//             />
//             <FeatureCard
//               icon={<Utensils className="w-6 h-6 text-blue-400" />}
//               title="Food Water Footprint"
//               description="Discover the water footprint of any dish or food product with ease."
//             />
//             <FeatureCard
//               icon={<Camera className="w-6 h-6 text-blue-400" />}
//               title="Image Recognition"
//               description="Upload an image of your meal to instantly calculate its water footprint."
//             />
//           </div>
//         </section>

//         {/* Farmers Section */}
//         <section className="bg-blue-900/50 backdrop-blur-md text-white py-20 px-4 md:px-12">
//           <div className="max-w-4xl mx-auto">
//             <motion.h2
//               initial={{ opacity: 0, x: -50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.5 }}
//               className="text-3xl font-bold mb-6 flex items-center"
//             >
//               <Tractor className="w-8 h-8 mr-3 text-blue-400" />
//               For Farmers
//             </motion.h2>
//             <motion.p
//               initial={{ opacity: 0, x: 50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//               className="text-xl mb-8"
//             >
//               Optimize your farm's water usage with our specialized tools and
//               insights. Improve crop yields while conserving water resources.
//             </motion.p>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="bg-blue-400 text-white font-semibold py-3 px-8 rounded-full text-lg hover:bg-blue-500 transition-colors flex items-center"
//             >
//               Learn More
//               <ChevronRight className="ml-2 w-5 h-5" />
//             </motion.button>
//           </div>
//         </section>

//         {/* Footer */}
//         <footer className="bg-blue-900/30 backdrop-blur-md text-white py-8 px-4 md:px-12">
//           <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               className="flex items-center mb-4 md:mb-0"
//             >
//               <Droplet className="w-6 h-6 text-blue-400 mr-2" />
//               <span className="text-xl font-bold">Droplet</span>
//             </motion.div>
//             <div className="flex flex-wrap justify-center gap-4">
//               <motion.a
//                 whileHover={{ scale: 1.1 }}
//                 href="#"
//                 className="hover:text-blue-400"
//               >
//                 About
//               </motion.a>
//               <motion.a
//                 whileHover={{ scale: 1.1 }}
//                 href="#"
//                 className="hover:text-blue-400"
//               >
//                 Contact
//               </motion.a>
//               <motion.a
//                 whileHover={{ scale: 1.1 }}
//                 href="#"
//                 className="hover:text-blue-400"
//               >
//                 Privacy Policy
//               </motion.a>
//               <motion.a
//                 whileHover={{ scale: 1.1 }}
//                 href="#"
//                 className="hover:text-blue-400"
//               >
//                 Terms of Service
//               </motion.a>
//             </div>
//           </div>
//         </footer>
//       </div>
//     </div>
//   );
// };

// export default Home;
