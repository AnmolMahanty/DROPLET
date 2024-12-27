const fs = require("fs");
const xlsx = require("xlsx");
const path = require("path");

// Load crop parameter data from Excel
const filePath = path.join(__dirname, "..", "storedData", "CropParameters.xlsx");
const workbook = xlsx.read(filePath, { type: "file" });
const sheetName = workbook.SheetNames[0];
const cropData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
function parseFrequency(frequency) {
  const mapping = {
    "Every 2 Days": 2,
    "Every 3 Days": 3,
    "Once a Week": 7,
  };
  return mapping[frequency] || 7; // Default to weekly irrigation
}
/**
 * Get irrigation type details based on user input.
 * @param {string} irrigationType - User-selected irrigation type.
 * @returns {Object} Irrigation type details.
 */
function getIrrigationTypeDetails(irrigationType) {
  const irrigationMapping = {
    "Sprinkler Irrigation": {
      typeCode: "1     : Sprinkler irrigation",
      wettedPercentage: "100    : Percentage of soil surface wetted by irrigation",
    },
    "Surface Irrigation: Basin": {
      typeCode: "2     : Surface irrigation: Basin",
      wettedPercentage: "100    : Percentage of soil surface wetted by irrigation",
    },
    "Surface Irrigation: Border": {
      typeCode: "3     : Surface irrigation: Border",
      wettedPercentage: "100    : Percentage of soil surface wetted by irrigation",
    },
    "Surface Irrigation: Furrow": {
      typeCode: "4     : Surface irrigation: Furrow",
      wettedPercentage: "90     : Percentage of soil surface wetted by irrigation",
    },
    "Drip Irrigation": {
      typeCode: "5     : Drip irrigation",
      wettedPercentage: "30     : Percentage of soil surface wetted by irrigation",
    },
  };
  return irrigationMapping[irrigationType] || irrigationMapping["Surface Irrigation: Furrow"];
}
/**
 * Generate irrigation schedule based on crop phases and frequency.
 * @param {Object} jsonData - Inputs from the user.
 * @returns {Object} Result with irrigation schedule and details.
 */
async function generateIrrigationSchedule(jsonData) {
  const cropName = jsonData["0"];
  const sowingDate = jsonData["2"];
  const irrigationType = jsonData["3"];
  const farmArea = parseFloat(jsonData["4"]); // Area in square meters
  const motorHorsepower = parseFloat(jsonData["5"]); // Motor power in HP
  const pipeDiameterInches = parseFloat(jsonData["6"]); // Pipe diameter in inches
  const irrigationHoursPerSession = parseFloat(jsonData["7"]); // Hours per session
  const frequencies = [jsonData["9"], jsonData["10"], jsonData["11"]]; // Phase frequencies
  const cropInfo = cropData.find(
    (crop) => crop.Crop.toLowerCase() === cropName.toLowerCase()
  );
  if (!cropInfo) throw new Error("Crop not found in database.");
  const initialDays = cropInfo["Sowing to Emergence (days)"];
  const growingDays =
    cropInfo["Sowing to Maximum Canopy (days)"] - initialDays;
  const maturityDays =
    cropInfo["Sowing to Maturity (days)"] - cropInfo["Sowing to Maximum Canopy (days)"];
  const totalDays = cropInfo["Sowing to Maturity (days)"];
  const initialFrequency = parseFrequency(frequencies[0]);
  const growthFrequency = parseFrequency(frequencies[1]);
  const maturityFrequency = parseFrequency(frequencies[2]);
  // Convert pipe diameter to meters and calculate flow rate
  const pipeDiameter = pipeDiameterInches * 0.0254;
  const pipeArea = calculatePipeArea(pipeDiameter);
  const waterVelocity = calculateWaterVelocity(motorHorsepower, pipeDiameter);
  const flowRate = calculateFlowRate(pipeArea, waterVelocity);
  console.log("Flow rate (liters/second):", flowRate);
  
  // Generate the irrigation schedule
  const irrigationSchedule = [];
  let currentDay = 1;
  function addSchedule(phaseDays, frequency) {
    for (let day = 1; day <= phaseDays; day++) {
      if (day % frequency === 0) {
        const sessionVolumeLiters = flowRate * irrigationHoursPerSession; // Convert hours to seconds
        
        console.log("Session volume (liters):", sessionVolumeLiters);
        const sessionDepthMm = (sessionVolumeLiters / farmArea) * 10; // Depth in mm
        console.log("Session depth (mm):", sessionDepthMm);
        irrigationSchedule.push({
          day: currentDay,
          depth: parseFloat(sessionDepthMm.toFixed(2)),
          ecw: 1.5,
        });
      }
      currentDay++;
    }
  }
  addSchedule(initialDays, initialFrequency);
  addSchedule(growingDays, growthFrequency);
  addSchedule(maturityDays, maturityFrequency);
  // Get irrigation type details
  const irrigationDetails = getIrrigationTypeDetails(irrigationType);
  // Generate .irr file content
  let irrFileContent = `Irrigation schedule for ${cropName} farm (${new Date().toLocaleDateString()})\n`;
  irrFileContent += `7.2   : AquaCrop Version(August 2024)\n`;
  irrFileContent += `${irrigationDetails.typeCode}\n`;
  irrFileContent += `${irrigationDetails.wettedPercentage}\n`;
  irrFileContent += `1     : Irrigation schedule\n\n`;
  irrFileContent += `Day    Depth(mm)   ECw(dS / m)\n`;
  irrFileContent += `====================================\n`;
  irrigationSchedule.forEach((entry) => {
    irrFileContent += `    ${entry.day.toString().padStart(2)}        ${entry.depth.toString().padStart(6)}          ${entry.ecw.toFixed(1)}\n`;
  });
  // Save to .irr file
  const outputPath = path.join(__dirname, `generatedIrr.irr`);
  fs.writeFileSync(outputPath, irrFileContent);
  return {
    message: "Irrigation schedule generated successfully.",
    totalDays: totalDays,
    filePath: outputPath,
    irrigationDetails: irrigationSchedule,
  };
}

function calculatePipeArea(diameter) {
  return Math.PI * Math.pow(diameter / 2, 2);
}

function calculateWaterVelocity(motorHorsepower, pipeDiameter) {
  const rho = 1000;
  const g = 9.81;
  const efficiency = 0.8;
  let head;
  if (motorHorsepower <= 3) {
    head = 15;
  } else if (motorHorsepower <= 10) {
    head = 45;
  } else {
    throw new Error("Motor HP exceeds typical small/medium pump range.");
  }
  const powerWatts = motorHorsepower * 746;
  const Q = (powerWatts * efficiency) / (rho * g * head);
  const A = calculatePipeArea(pipeDiameter);
  return Q / A;
}

function calculateFlowRate(area, velocity) {
  return area * velocity * 3600;
}

module.exports = {
  generateIrrigationSchedule,
};