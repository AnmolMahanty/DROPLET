import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import axios from "axios";
import { Combobox } from "@/components/ui/combobox";

const FarmerCalculator = () => {
  const [farmer, setFarmer] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');

  // useEffect(() => {
   

  // }, []);
  const handleComboBox = (value) => {setSelectedValue(value);};
  const handleLatLong = async (value) => {
    if (selectedValue) {
      const [latitude, longitude] = selectedValue
        .replace('{', '')
        .replace('}', '')
        .replace('°',"")
        .split(',')
        .map(coord => coord.trim().split(' ')[0]);
      console.log(latitude, longitude);
      await axios.post('http://140.245.22.129:3000/api/getData', { lat: latitude, long: longitude })
        .then(response => {
          // setQuestionnaire(response.data);

          console.log(response);
          setFarmer(response.data);
        });
    }
    
  };
  return (
    <>
      <p>{farmer.output}</p>
      <Combobox onChange={handleComboBox} />
      <button onClick={handleLatLong}>Click me</button>
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] text-black">
        FarmerCalculator
      </div>

    </>
  );
};

export default FarmerCalculator;
