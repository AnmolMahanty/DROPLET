import Navbar from "../components/Navbar";
import { useRef } from "react";
import { useTranslation } from 'react-i18next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import droplet_video from "../assets/Droplet_video.mp4";
import Assistant from "../components/Assistant";
import { useNavigate } from "react-router-dom";
import about from "../assets/about.jpg";
import Feature1 from "../assets/Feature1.png";
import Feature2 from "../assets/Feature2.png";
import Feature3 from "../assets/Feature3.png";

const Home = () => {
  const { t, i18n } = useTranslation();
  const aboutRef = useRef(null);

  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate("/signin");
  };
  const handleIndustryClick = () => {
    navigate("/landing");
  };
  const features = [
    {
      title: "Farmer's Corner",
      description:
        "Connect with local farmers, learn sustainable practices, and support your community's agriculture.",
      image: Feature1,
    },
    {
      title: "Food Calculator",
      description:
        "Calculate the environmental impact of your meals and discover eco-friendly alternatives.",
      image: Feature2,
    },
    {
      title: "Daily Footprint",
      description:
        "Track your daily carbon footprint and get personalized tips to reduce your environmental impact.",
      image: Feature3,
    },
  ];

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-[url('./assets/Background1.png')] bg-cover bg-center"></div>
      <div className="relative z-10 ">
        <Navbar />
        {/* Hero section */}
        <div className="relative flex flex-col items-center justify-center md:py-20 px-4 md:px-40 gap-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-blue-950 mb-4">
            {t('home.home1')}
          </h1>
          <p className="text-center text-lg md:text-xl mb-6 max-w-2xl">
            {t('home.home2')}
          </p>
          <div className="flex gap-3 mb-8">
            <Button
              className="bg-[#00A6ff] hover:bg-[#3ba3db] transition-colors rounded-full hover:scale-[97%] w-32 text-white"
              onClick={handleSignInClick}
            >
              {t('home.home3')}
            </Button>
            <Button
              className="font-semibold bg-transparent text-[#00A6ff] hover:bg-transparent border-2 border-[#00A6ff] rounded-full hover:scale-[97%] w-32"
              onClick={() => {
                aboutRef.current?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {t('home.home4')}
            </Button>
          </div>
          <div className="w-full max-w-4xl">
            <video
              autoPlay={true}
              loop={true}
              muted={true}
              className="w-full h-full object-cover border rounded-lg shadow-lg"
            >
              <source src={droplet_video} type="video/mp4" />
              {t('home.home5')}
            </video>
          </div>
        </div>

        {/* About section */}
        <div ref={aboutRef}>
          <div className="w-full px-4 md:px-40 py-20 bg-gradient-to-br from-blue-100/50 to-white/40">
            <div className="container flex flex-col md:flex-row items-center mx-auto gap-8">
              <div className="md:w-1/2 mb-8 md:mb-0 pr-0 md:pr-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-950">
                  {t('home.home6')}
                </h2>
                <p className="text-lg mb-4 leading-relaxed">
                  {t('home.home7')}
                </p>
                <p className="text-lg leading-relaxed">
                  {t('home.home8')}
                </p>
              </div>
              <div className="md:w-1/2">
                <img
                  src={about}
                  alt="Droplet Project"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Features section */}
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-blue-950 mb-12">
              Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <Card className="overflow-hidden h-full transition-transform duration-300 hover:scale-105">
                <img
                  src={Feature1}
                  alt="Farmer's Corner"
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                />
                <div className="">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-blue-950">
                      {t('home.home30')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      {t('home.home31')}
                    </p>
                  </CardContent>
                </div>
              </Card>
              <Card className="overflow-hidden h-full transition-transform duration-300 hover:scale-105">
                <img
                  src={Feature2}
                  alt="Food Calculator"
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                />
                <div className="">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-blue-950">
                      {t('home.home32')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      {t('home.home33')}
                    </p>
                  </CardContent>
                </div>
              </Card>
              <Card className="overflow-hidden h-full transition-transform duration-300 hover:scale-105">
                <img
                  src={Feature3}
                  alt="Daily Footprint"
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                />
                <div className="">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-blue-950">
                      {t('home.home34')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      {t('home.home35')}
                    </p>
                  </CardContent>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Industry section */}
        <div className="w-full flex flex-col items-center justify-center px-4 md:px-40 py-20 bg-gradient-to-br from-blue-100/50 to-white/40">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-950">
            {t('home.home9')}
          </h2>
          <p className="text-lg md:text-xl mb-8 text-center max-w-2xl">
            {t('home.home10')}
          </p>
          <Button
            className="bg-[#00A6ff] hover:bg-[#3ba3db] transition-colors rounded-full hover:scale-[97%] w-40 text-white text-lg"
            onClick={handleIndustryClick}
          >
            {t('home.home11')}
          </Button>
        </div>

        {/* FAQ section */}
        <div className="w-full px-4 md:px-40 py-20">
          <h2 className="text-center text-3xl md:text-4xl font-bold mb-10 text-blue-950">
            {t('home.home12')}
          </h2>
          <Accordion
            type="single"
            collapsible
            className="w-full max-w-3xl mx-auto"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="hover:no-underline text-base">
                {t('home.home13')}
              </AccordionTrigger>
              <AccordionContent className="text-black/85">
                {t('home.home14')}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="hover:no-underline text-base">
                {t('home.home15')}
              </AccordionTrigger>
              <AccordionContent className="text-black/85">
                {t('home.home16')}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="hover:no-underline text-base">
                {t('home.home17')}
              </AccordionTrigger>
              <AccordionContent className="text-black/85">
                {t('home.home18')}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="hover:no-underline text-base">
                {t('home.home19')}
              </AccordionTrigger>
              <AccordionContent className="text-black/85">
                {t('home.home20')}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger className="hover:no-underline text-base">
                {t('home.home21')}
              </AccordionTrigger>
              <AccordionContent className="text-black/85">
                {t('home.home22')}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger className="hover:no-underline text-base">
                {t('home.home23')}
              </AccordionTrigger>
              <AccordionContent className="text-black/85">
                {t('home.home24')}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7">
              <AccordionTrigger className="hover:no-underline text-base">
                {t('home.home25')}
              </AccordionTrigger>
              <AccordionContent className="text-black/85">
                {t('home.home26')}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-8">
              <AccordionTrigger className="hover:no-underline text-base">
                {t('home.home27')}
              </AccordionTrigger>
              <AccordionContent className="text-black/85">
                {t('home.home28')}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Footer section */}
        <footer className="flex items-center justify-between w-full bg-white/50 border-t py-5 px-40">
          <div className="flex items-center gap-2">
            <svg
              width="21"
              height="21"
              viewBox="0 0 84 84"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.5001 65.988C18.5001 64.6169 19.129 62.5974 22.1603 60.7185C22.8595 60.2771 23.7892 60.4998 24.2306 61.199C24.672 61.8982 24.4493 62.8279 23.7501 63.2693C22.3009 64.1677 21.5118 65.1404 21.5118 65.9998C21.5118 68.7107 29.3126 72.4998 42.0118 72.4998C54.711 72.4998 62.5118 68.7107 62.5118 65.9998C62.5118 65.1404 61.711 64.1717 60.2735 63.2693C59.5743 62.8279 59.3516 61.9099 59.793 61.199C60.2344 60.4998 61.1524 60.2771 61.8633 60.7185C64.8828 62.5974 65.5235 64.6287 65.5235 65.988C65.5235 72.1599 53.4145 75.488 42.0235 75.488C30.6285 75.488 18.5001 72.1599 18.5001 65.988ZM68.9301 52.578C68.1488 52.3085 67.2895 52.7187 67.0199 53.4999C66.7503 54.2812 67.1605 55.1405 67.9418 55.4101C75.8129 58.1718 80.5118 62.1289 80.5118 65.9881C80.5118 72.9881 65.0428 80.4881 42.0118 80.4881C18.9808 80.4881 3.51176 72.9881 3.51176 65.9881C3.51176 62.117 8.21096 58.1678 16.0818 55.4101C16.863 55.1406 17.2732 54.2812 17.0036 53.4999C16.7341 52.7187 15.8747 52.3085 15.0934 52.578C5.69504 55.8788 0.523438 60.6366 0.523438 66C0.523438 75.8086 18.7534 83.5 42.0234 83.5C65.2934 83.5 83.5234 75.8086 83.5234 66C83.5 60.6406 78.321 55.871 68.9301 52.578ZM42.0001 55.4882C42.8282 55.4882 43.5001 54.8164 43.5001 53.9882C43.5001 53.1601 42.8282 52.4882 42.0001 52.4882C35.1095 52.4882 29.5001 46.8788 29.5001 39.9882C29.5001 39.1601 28.8282 38.4882 28.0001 38.4882C27.172 38.4882 26.5001 39.1601 26.5001 39.9882C26.5001 48.539 33.4493 55.4882 42.0001 55.4882ZM18.5001 39.6292C18.5001 29.0902 26.0509 16.0782 40.9301 0.938231C41.4887 0.367921 42.5004 0.367921 43.0707 0.938231C57.9497 16.0712 65.5007 29.0902 65.5007 39.6292C65.5007 52.7892 54.9617 63.5002 42.0007 63.5002C29.0397 63.5002 18.5001 52.7812 18.5001 39.6292ZM21.5001 39.6292C21.5001 51.1412 30.6993 60.5002 42.0001 60.5002C53.3009 60.5002 62.5001 51.1408 62.5001 39.6292C62.5001 30.1487 55.6017 18.2192 42.0001 4.14123C28.3981 18.2112 21.5001 30.1492 21.5001 39.6292Z"
                fill="#00000080"
              />
            </svg>
            <p className="text-base font-medium text-black/50">{t('title.title1')}</p>
          </div>
          <p className="text-base font-medium text-black/50">
            {t('home.home29')}
          </p>
        </footer>
      </div>
      <div className="fixed bottom-6 sm:bottom-10 right-4 sm:right-10 z-50">
        <Assistant />
      </div>
    </div>
  );
};

export default Home;
