import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
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
        <p className="text-xl font-medium">{t('title.title1')}</p>
      </div>

      <div className="flex items-center gap-10">
      <div className="flex space-x-2">
          <select
            onChange={(e) => changeLanguage(e.target.value)}
            className="px-3 py-1 rounded bg-gray-700 text-white hover:bg-gray-600"
          >
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
            <option value="mr">मराठी</option>
          </select>
        </div>
        <button
          onClick={handleSignInClick}
          className="flex items-center px-6 py-2 rounded-full bg-[#00A6ff]  hover:bg-[#3ba3db] transition-colors"
        >
          <p className="text-white font-medium text-base">{t('navbar.navbar1')}</p>
        </button>
      </div>
    </div>
  );
};

export default Navbar;