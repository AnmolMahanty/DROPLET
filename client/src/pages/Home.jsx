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
    className="bg-white rounded-lg p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow"
  >
    <motion.div
      whileHover={{ rotate: 360 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full mb-3 sm:mb-4"
    >
      {icon}
    </motion.div>
    <h3 className="text-lg sm:text-xl font-semibold mb-2 text-blue-900">{title}</h3>
    <p className="text-sm sm:text-base text-blue-700">{description}</p>
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
      className="mt-4 p-3 sm:p-4 bg-blue-100 rounded-lg text-blue-800"
    >
      <h4 className="text-sm sm:text-base font-semibold mb-2">Water Usage Tip:</h4>
      <p className="text-sm sm:text-base">{currentTip.text}</p>
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
      <div className="pt-16 sm:pt-20">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] sm:min-h-[calc(100vh-80px)] text-center px-4 sm:px-6">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-6xl font-bold text-blue-900 mb-4 sm:mb-6"
          >
            Visualize Your Water Footprint
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-blue-700 mb-6 sm:mb-8 max-w-2xl px-4"
          >
            Discover the impact of your daily water usage and learn how to
            conserve this precious resource.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white font-semibold py-2.5 sm:py-3 px-6 sm:px-8 rounded-full text-base sm:text-lg hover:bg-blue-700 transition-colors"
          >
            Calculate Your Footprint
          </motion.button>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 sm:mt-12 w-full max-w-md px-4"
          >
            <h3 className="text-blue-900 text-lg sm:text-xl mb-3 sm:mb-4">
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
            <div className="relative h-48 sm:h-64 mt-4 bg-blue-200 rounded-lg overflow-hidden">
              <motion.div
                animate={waterLevelAnimation}
                className="absolute bottom-0 left-0 right-0 bg-blue-500"
              />
              <Droplet className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 text-white" />
            </div>
            <WaterUsageTip usage={waterUsage} />
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-12 bg-white">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl font-bold text-blue-900 text-center mb-8 sm:mb-12"
          >
            Discover Your Water Impact
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mx-auto max-w-6xl">
            <FeatureCard
              icon={<Droplet className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />}
              title="Daily Water Footprint"
              description="Calculate and track your daily water usage to make informed decisions."
            />
            <FeatureCard
              icon={<Utensils className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />}
              title="Food Water Footprint"
              description="Discover the water footprint of any dish or food product with ease."
            />
            <FeatureCard
              icon={<Camera className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />}
              title="Image Recognition"
              description="Upload an image of your meal to instantly calculate its water footprint."
            />
          </div>
        </section>

        {/* Farmers Section */}
        <section className="bg-blue-100 text-blue-900 py-16 sm:py-20 px-4 sm:px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 flex items-center"
            >
              <Tractor className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 text-blue-600" />
              For Farmers
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl mb-6 sm:mb-8"
            >
              Optimize your farm's water usage with our specialized tools and
              insights. Improve crop yields while conserving water resources.
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white font-semibold py-2.5 sm:py-3 px-6 sm:px-8 rounded-full text-base sm:text-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              Learn More
              <ChevronRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
          </div>
        </section>

        <section className="py-24 sm:py-32 bg-blue-50">
          <div className="max-w-[1020px] mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 text-center mb-6 sm:mb-8">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="space-y-2">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-base sm:text-lg font-semibold text-blue-900 hover:underline">
                  What is Droplet?
                </AccordionTrigger>
                <AccordionContent className="text-blue-700 text-sm sm:text-base">
                  Droplet is a comprehensive web application designed to promote
                  water conservation by empowering individuals, communities,
                  farmers, and industries with data and innovative tools to
                  track water usage and adopt water-saving practices.
                </AccordionContent>
              </AccordionItem>
              {/* Other AccordionItems remain the same structure */}
            </Accordion>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white text-blue-900 py-6 sm:py-8 px-4 sm:px-6 md:px-12">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center"
            >
              <Droplet className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mr-2" />
              <span className="text-lg sm:text-xl font-bold">Droplet</span>
            </motion.div>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="text-sm sm:text-base hover:text-blue-600"
              >
                About
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="text-sm sm:text-base hover:text-blue-600"
              >
                Contact
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="text-sm sm:text-base hover:text-blue-600"
              >
                Privacy Policy
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="text-sm sm:text-base hover:text-blue-600"
              >
                Terms of Service
              </motion.a>
            </div>
          </div>
        </footer>
      </div>
      <div className="fixed bottom-6 sm:bottom-10 right-4 sm:right-10 z-50">
        <Chatbot />
      </div>
    </div>
  );
};

export default Home;
