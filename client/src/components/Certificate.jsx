import React from "react";
import { motion } from "framer-motion";

const Certificate = ({ industryName, issueDate, certificateId }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-blue-100 via-white to-indigo-100 p-8 shadow-xl mx-auto rounded-lg border-4 border-blue-300"
      style={{ width: '297mm', height: '210mm', maxWidth: '100%' }} // A4 Landscape size
    >
      {/* Outer decorative border */}
      <div className="border-8 border-double border-amber-400 p-6 rounded-lg h-full flex flex-col justify-between bg-gradient-to-br from-blue-50 to-indigo-50">
        {/* Inner decorative border */}
        <div className="border-2 border-blue-400 p-4 rounded-md h-full flex flex-col relative overflow-hidden">
          {/* Decorative corner elements */}
          <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-amber-500 rounded-tl-lg"></div>
          <div className="absolute top-0 right-0 w-24 h-24 border-t-4 border-r-4 border-amber-500 rounded-tr-lg"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 border-b-4 border-l-4 border-amber-500 rounded-bl-lg"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-amber-500 rounded-br-lg"></div>

          {/* Header Section */}
          <div className="flex justify-between items-center mb-6 relative z-10">
            <img
              src="/placeholder.svg?height=80&width=80"
              alt="Government Logo"
              className="w-20 h-20"
            />
            <div className="text-center">
              <h1 className="text-5xl font-light tracking-wide mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                Water Efficiency Certification
              </h1>
              <p className="text-2xl text-indigo-600 font-light">Ministry of Jal Shakti</p>
            </div>
            <img
              src="/placeholder.svg?height=80&width=80"
              alt="Ministry of Jal Shakti Logo"
              className="w-20 h-20"
            />
          </div>

          {/* Decorative Line */}
          <div className="border-b-2 border-amber-400 w-2/3 mx-auto mb-6"></div>

          {/* Certificate Body */}
          <div className="text-center mb-6 flex-grow relative z-10">
            <p className="text-2xl text-indigo-700 mb-4 font-light">This certificate is awarded to</p>
            <motion.h2 
              className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 text-transparent bg-clip-text"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {industryName}
            </motion.h2>
            <p className="text-xl text-blue-800 max-w-3xl mx-auto leading-relaxed">
              for outstanding achievement in water efficiency, reusability, and sustainability 
              in food and beverage production, demonstrating exceptional commitment to 
              environmental stewardship and resource conservation.
            </p>
          </div>

          {/* Key Details Section */}
          <div className="flex justify-center space-x-16 text-blue-800 mb-6 relative z-10">
            <div className="text-center bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-lg shadow-md border border-amber-200">
              <p className="font-semibold mb-2 text-indigo-800 text-xl">Certificate ID</p>
              <p className="text-2xl text-blue-700">{certificateId}</p>
            </div>
            <div className="text-center bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-lg shadow-md border border-amber-200">
              <p className="font-semibold mb-2 text-indigo-800 text-xl">Issue Date</p>
              <p className="text-2xl text-blue-700">{issueDate}</p>
            </div>
          </div>

          {/* Signatures Section */}
          <div className="flex justify-between mt-6 pt-6 border-t-2 border-amber-400 relative z-10">
            <div className="text-center">
              <p className="text-indigo-700 mb-2 text-xl">Authorized Signature</p>
              <div className="w-40 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 mx-auto mb-2"></div>
              <p className="text-blue-600 text-lg">Ministry of Jal Shakti</p>
            </div>
            <div className="text-center">
              <p className="text-indigo-700 mb-2 text-xl">Industry Representative</p>
              <div className="w-40 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 mx-auto mb-2"></div>
              <p className="text-blue-600 text-lg">{industryName}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
        <img
          src="/placeholder.svg?height=300&width=300"
          alt="Watermark"
          className="w-2/3 h-2/3 object-contain"
        />
      </div>
    </motion.div>
  );
};

export default Certificate;
