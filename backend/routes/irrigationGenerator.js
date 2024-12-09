const fs = require("fs");
const xlsx = require("xlsx");
const path = require("path");

// Load crop parameter data from Excel
const excelFilePath = path.join(__dirname, "Crop Parameters (1).xlsx"); // Replace with the actual filename
const workbook = xlsx.readFile(excelFilePath);
const sheetName = workbook.SheetNames[0];
const cropData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

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

/**
 * Generate irrigation schedule based on crop phases and frequency.
 * @param {Object} userInputs - Inputs from the user.
 * @returns {Object} Result with irrigation schedule and details.
 */
function generateIrrigationSchedule(userInputs) {
    const {
        farmArea, // In m²
        irrigationSystem,
        motorHorsepower,
        pipeDiameter, // In meters
        waterVelocity, // In m/s
        irrigationHoursPerSession,
        irrigationSessionsPerWeek,
        cropName,
        sowingDate,
        frequencies, // Irrigation frequencies for each phase
    } = userInputs;

    // Find the crop data
    const cropInfo = cropData.find(crop => crop.Crop.toLowerCase() === cropName.toLowerCase());
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
        console.log("ini"+currentDay);
        irrigationSchedule.push({ day: currentDay, depth: (totalWaterDepthPerWeek / 7).toFixed(2), ecw: 1.5 });
        currentDay += initialFrequency;
    }

    // Add growth phase irrigation days
    while (currentDay <= initialDays + growingDays) {
        console.log("grow"+currentDay);
        irrigationSchedule.push({ day: currentDay, depth: (totalWaterDepthPerWeek / 7).toFixed(2), ecw: 1.5 });
        currentDay += growthFrequency;
    }

    // Add maturity phase irrigation days
    while (currentDay <= totalDays) {
        console.log("total"+currentDay);
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
    const outputPath = path.join(__dirname, `${cropName}_irrigation.irr`);
    fs.writeFileSync(outputPath, irrFileContent);

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

// Example usage
const userInputs = {
    farmArea: 10000, // m² (1 hectare)
    irrigationSystem: "Drip Irrigation",
    motorHorsepower: 5,
    pipeDiameter: 0.2, // meters (10 cm)
    waterVelocity: 2, // m/s
    irrigationHoursPerSession: 5,
    irrigationSessionsPerWeek: 2,
    cropName: "Cabbage",
    sowingDate: "2024-12-10",
    frequencies: {
        initial: "Every 2 Days",
        growth: "Every 3 Days",
        maturity: "Once a Week",
    },
};

try {
    const result = generateIrrigationSchedule(userInputs);
    console.log(result.message);
    console.log("File Path:", result.filePath);
    console.log("Irrigation Details:", result.irrigationDetails);
} catch (error) {
    console.error("Error:", error.message);
}
