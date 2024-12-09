import { writeFileSync } from "fs";
import { readFile, utils } from "xlsx";
import { join } from "path";

// Load crop parameter data from Excel
const excelFilePath = join(__dirname, "CropParameters.xlsx"); // Replace with the actual filename
const workbook = readFile(excelFilePath);
const sheetName = workbook.SheetNames[0];
const cropData = utils.sheet_to_json(workbook.Sheets[sheetName]);

/**
 * Convert frequency input (e.g., "Every 2 Days") to numeric interval.
 * @param {string} frequency - User-selected frequency.
 * @returns {number} Numeric interval in days.
 */
function parseFrequency(frequency) {
    const mapping = {
        "Every 2 Days": 2,
        "Every 3 Days": 3,
        "Once a Week": 7,
    };
    return mapping[frequency] || 7; // Default to weekly irrigation
}
// {
//   "answers": {
//       "0": "eggplant",
//       "1": "Mumbai",
//       "2": "2024-12-11",
//       "3": "Drip Irrigation",
//       "4": "456",
//       "5": "Borewell",
//       "6": "4",
//       "7": "4",
//       "8": "5",
//       "9": "4",
//       "10": "Every 2 Days",
//       "11": "Every 3 Days",
//       "12": "Once a Week",
//       "13": "Yes"
//   },
//   "timestamp": "2024-12-09T18:53:35.869Z"
// }
/**
 * Generate irrigation schedule based on crop phases and frequency.
 * @param {Object} userInputs - Inputs from the user.
 * @returns {Object} Result with irrigation schedule and details.
 */
export function generateIrrigationSchedule(userInputs) {
      const cropName = jsonData["0"];
  const location = jsonData["1"];
  const sowingDate = jsonData["2"];
  const irrigationSystem = jsonData["3"];
  const farmArea = parseFloat(jsonData["4"]); // Assuming farmArea is a number
  const waterSource = jsonData["5"];
  const motorHorsepower = parseFloat(jsonData["6"]); // Assuming motorHorsepower is a number
  const pipeDiameter = parseFloat(jsonData["7"]); // Assuming pipeDiameter is a number

  const irrigationHoursPerSession = parseFloat(jsonData["8"]); // Assuming irrigationHoursPerSession is a number
  const irrigationSessionsPerWeek = parseFloat(jsonData["9"]); // Assuming irrigationSessionsPerWeek is a number
  const frequencies = [jsonData["10"], jsonData["11"], jsonData["12"]]; // Assuming frequencies are strings

    // Find the crop data
    const cropInfo = cropData.find(crop => crop.Crop.toLowerCase() === cropName.trim().toLowerCase());
    if (!cropInfo) throw new Error("Crop not found in database.");

    // Crop phases in days
    const initialDays = cropInfo["Sowing to Emergence (days)"];
    const growingDays = cropInfo["Sowing to Maximum Canopy (days)"] - initialDays;
    const maturityDays = cropInfo["Sowing to Maturity (days)"] - cropInfo["Sowing to Maximum Canopy (days)"];
    const totalDays = cropInfo["Sowing to Maturity (days)"];

    // Parse irrigation frequencies
    const initialFrequency = parseFrequency(frequencies.initial);
    const growthFrequency = parseFrequency(frequencies.growth);
    const maturityFrequency = parseFrequency(frequencies.maturity);

    // Calculate flow rate
    const pipeArea = calculatePipeArea(pipeDiameter);
    const flowRate = calculateFlowRate(pipeArea, waterVelocity);

    // Total weekly water volume and depth
    const totalWaterDepthPerWeek = ((flowRate * irrigationHoursPerSession * irrigationSessionsPerWeek) / farmArea) * 1000;

    // Generate irrigation days for each phase
    const irrigationSchedule = [];
    let currentDay = 1;

    // Add initial phase irrigation days
    while (currentDay <= initialDays) {
        irrigationSchedule.push({ day: currentDay, depth: (totalWaterDepthPerWeek / 7).toFixed(2), ecw: 1.5 });
        currentDay += initialFrequency;
    }

    // Add growth phase irrigation days
    while (currentDay <= initialDays + growingDays) {
        irrigationSchedule.push({ day: currentDay, depth: (totalWaterDepthPerWeek / 7).toFixed(2), ecw: 1.5 });
        currentDay += growthFrequency;
    }

    // Add maturity phase irrigation days
    while (currentDay <= totalDays) {
        irrigationSchedule.push({ day: currentDay, depth: (totalWaterDepthPerWeek / 7).toFixed(2), ecw: 1.5 });
        currentDay += maturityFrequency;
    }

    // Create .irr file content
    let irrFileContent = `7.2   : AquaCrop Version (August 2024)\n`;
    irrFileContent += `4     : Surface irrigation: Furrow\n`;
    irrFileContent += `90     : Percentage of soil surface wetted by irrigation\n`;
    irrFileContent += `1     : Irrigation schedule\n`;
    irrFileContent += `   -9 : Day 1 is first day of growing period\n`;
    irrFileContent += `   Day    Depth (mm)   ECw (dS/m)\n`;
    irrFileContent += `====================================\n`;

    irrigationSchedule.forEach(entry => {
        irrFileContent += `    ${entry.day.toString().padStart(2)}        ${entry.depth.toString().padStart(6)}          ${entry.ecw.toFixed(1)}\n`;
    });

    // Save to .irr file
    const outputPath = join(__dirname, `${cropName}_irrigation.irr`);
    writeFileSync(outputPath, irrFileContent);

    return {
        message: "Irrigation schedule generated successfully.",
        filePath: outputPath,
        irrigationDetails: irrigationSchedule,
    };
}

/**
 * Calculate cross-sectional area of the pipe.
 * @param {number} diameter - Pipe diameter in meters.
 * @returns {number} Cross-sectional area in m².
 */
function calculatePipeArea(diameter) {
    return Math.PI * Math.pow(diameter / 2, 2);
}

/**
 * Calculate flow rate based on motor and pipe specifications.
 * @param {number} area - Cross-sectional area of the pipe in m².
 * @param {number} velocity - Water velocity in m/s.
 * @returns {number} Flow rate in m³/hour.
 */
function calculateFlowRate(area, velocity) {
    return area * velocity * 3600; // Convert seconds to hours
}

// // Example usage
// const userInputs = {
//     farmArea: 10000, // m² (1 hectare)
//     irrigationSystem: "Drip Irrigation",
//     motorHorsepower: 5,
//     pipeDiameter: 0.2, // meters (10 cm)
//     waterVelocity: 2, // m/s
//     irrigationHoursPerSession: 5,
//     irrigationSessionsPerWeek: 2,
//     cropName: "Cabbage",
//     sowingDate: "2024-12-10",
//     frequencies: {
//         initial: "Every 2 Days",
//         growth: "Every 3 Days",
//         maturity: "Once a Week",
//     },
// };

// try {
//     const result = generateIrrigationSchedule(userInputs);
//     console.log(result.message);
//     console.log("File Path:", result.filePath);
//     console.log("Irrigation Details:", result.irrigationDetails);
// } catch (error) {
//     console.error("Error:", error.message);
// }
