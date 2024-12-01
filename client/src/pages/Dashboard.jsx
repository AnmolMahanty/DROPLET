import React from "react";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const [selected, setSelected] = useState("dish");

  const handleDishFootprintClick = () => {
    setSelected("dish");
    navigate("dishCalculator");
  };

  const handleDailyCalculatorClick = () => {
    setSelected("daily");
    navigate("dailyCalculator");
  };

  const handleFarmerCornerClick = () => {
    setSelected("farmer");
    navigate("farmersCorner");
  };

  return (
    <>
      <div className="relative w-full h-16 flex justify-between items-center px-12 border border-black/5 bg-blue-950">
        <div className="flex items-center gap-2 ">
          <svg
            width="26"
            height="26"
            viewBox="0 0 84 84"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.5001 65.988C18.5001 64.6169 19.129 62.5974 22.1603 60.7185C22.8595 60.2771 23.7892 60.4998 24.2306 61.199C24.672 61.8982 24.4493 62.8279 23.7501 63.2693C22.3009 64.1677 21.5118 65.1404 21.5118 65.9998C21.5118 68.7107 29.3126 72.4998 42.0118 72.4998C54.711 72.4998 62.5118 68.7107 62.5118 65.9998C62.5118 65.1404 61.711 64.1717 60.2735 63.2693C59.5743 62.8279 59.3516 61.9099 59.793 61.199C60.2344 60.4998 61.1524 60.2771 61.8633 60.7185C64.8828 62.5974 65.5235 64.6287 65.5235 65.988C65.5235 72.1599 53.4145 75.488 42.0235 75.488C30.6285 75.488 18.5001 72.1599 18.5001 65.988ZM68.9301 52.578C68.1488 52.3085 67.2895 52.7187 67.0199 53.4999C66.7503 54.2812 67.1605 55.1405 67.9418 55.4101C75.8129 58.1718 80.5118 62.1289 80.5118 65.9881C80.5118 72.9881 65.0428 80.4881 42.0118 80.4881C18.9808 80.4881 3.51176 72.9881 3.51176 65.9881C3.51176 62.117 8.21096 58.1678 16.0818 55.4101C16.863 55.1406 17.2732 54.2812 17.0036 53.4999C16.7341 52.7187 15.8747 52.3085 15.0934 52.578C5.69504 55.8788 0.523438 60.6366 0.523438 66C0.523438 75.8086 18.7534 83.5 42.0234 83.5C65.2934 83.5 83.5234 75.8086 83.5234 66C83.5 60.6406 78.321 55.871 68.9301 52.578ZM42.0001 55.4882C42.8282 55.4882 43.5001 54.8164 43.5001 53.9882C43.5001 53.1601 42.8282 52.4882 42.0001 52.4882C35.1095 52.4882 29.5001 46.8788 29.5001 39.9882C29.5001 39.1601 28.8282 38.4882 28.0001 38.4882C27.172 38.4882 26.5001 39.1601 26.5001 39.9882C26.5001 48.539 33.4493 55.4882 42.0001 55.4882ZM18.5001 39.6292C18.5001 29.0902 26.0509 16.0782 40.9301 0.938231C41.4887 0.367921 42.5004 0.367921 43.0707 0.938231C57.9497 16.0712 65.5007 29.0902 65.5007 39.6292C65.5007 52.7892 54.9617 63.5002 42.0007 63.5002C29.0397 63.5002 18.5001 52.7812 18.5001 39.6292ZM21.5001 39.6292C21.5001 51.1412 30.6993 60.5002 42.0001 60.5002C53.3009 60.5002 62.5001 51.1408 62.5001 39.6292C62.5001 30.1487 55.6017 18.2192 42.0001 4.14123C28.3981 18.2112 21.5001 30.1492 21.5001 39.6292Z"
              fill="#ffffff"
            />
          </svg>
          <p className="text-xl font-medium text-white">Droplet</p>
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white/70 text-md w-fit flex justify-between gap-9">
          <div
            className={`cursor-pointer ${
              selected === "dish" ? "text-white" : ""
            }`}
            onClick={handleDishFootprintClick}
          >
            Dish Footprint
          </div>
          <div
            className={`cursor-pointer ${
              selected === "daily" ? "text-white" : ""
            }`}
            onClick={handleDailyCalculatorClick}
          >
            Daily Calculator
          </div>
          <div
            className={`cursor-pointer ${
              selected === "farmer" ? "text-white" : ""
            }`}
            onClick={handleFarmerCornerClick}
          >
            Farmer's Corner
          </div>
        </div>
        <div className="cursor-pointer">
          <svg
            width="26"
            height="26"
            viewBox="0 0 56 56"
            fill="none"
            opacity="0.7"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M28 10C21.4 10 16 15.4 16 22C16 28.6 21.4 34 28 34C34.6 34 40 28.6 40 22C40 15.4 34.6 10 28 10ZM28 30C23.6 30 20 26.4 20 22C20 17.6 23.6 14 28 14C32.4 14 36 17.6 36 22C36 26.4 32.4 30 28 30Z"
              fill="white"
            />
            <path
              d="M28 0C12.5 0 0 12.5 0 28C0 35.6 3.1 42.6 8 47.6C9.2 48.8 10.5 49.9 12 50.9C16.5 54.1 22 55.9 28 55.9C34 55.9 39.5 54 44 50.9C45.4 49.9 46.7 48.8 48 47.6C53 42.5 56 35.6 56 28C56 12.5 43.5 0 28 0ZM28 52C22 52 16.6 49.8 12.4 46.2C13.5 42.6 16.8 40 20.7 40H35.4C39.3 40 42.6 42.6 43.7 46.2C39.4 49.8 34 52 28 52ZM46.7 43C44.6 38.8 40.3 36 35.4 36H20.7C15.7 36 11.4 38.9 9.4 43C6 38.9 4 33.7 4 28C4 14.8 14.8 4 28 4C41.2 4 52 14.8 52 28C52 33.7 50 38.9 46.7 43Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Dashboard;
