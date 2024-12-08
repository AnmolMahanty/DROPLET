import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import axios from "axios";

const FarmerCalculator = () => {
  const [farmer, setFarmer] = useState([]);
  useEffect(() => {
    axios.post('http://localhost:5000/api/farmer')
      .then(response => {
        // setQuestionnaire(response.data);

        console.log(response);
        setFarmer(response.data);
      });
  }, []);
  return (
    <>
      <p>{farmer.message}</p>
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] text-black">
        FarmerCalculator
      </div>

    </>
  );
};

export default FarmerCalculator;
