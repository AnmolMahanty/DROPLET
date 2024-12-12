import { writeFile, writeFileSync } from "fs";
import { read, utils } from "xlsx";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Load crop parameter data from Excel
const filePath = join(__dirname,'..', 'storedData\\CropParameters.xlsx');
console.log('crop excel file read successfully');
const workbook = read(filePath, { type: "file" });
const sheetName = workbook.SheetNames[0];
const cropData = utils.sheet_to_json(workbook.Sheets[sheetName]);

/**
 * Convert frequency input (e.g., "Every 2 Days") to numeric interval.
 * @param {string} frequency - User-selected frequency.
 * @returns {number} Numeric interval in days.
 */
const IRRIGATION_SYSTEM_MAPPING = {
    "Sprinkler Irrigation": {
        code: 1,
        wettedPercentage: 100
    },
    "Surface Irrigation: Basin": {
        code: 2,
        wettedPercentage: 100
    },
    "Surface Irrigation: Border": {
        code: 3,
        wettedPercentage: 100
    },
    "Surface Irrigation: Furrow": {
        code: 4,
        wettedPercentage: 80
    },
    "Drip Irrigation": {
        code: 5,
        wettedPercentage: 30
    }
};

// function parseFrequency(frequency) {
//     const mapping = {
//         "Every 2 Days": 2,
//         "Every 3 Days": 3,
//         "Once a Week": 7,
//     };
//     return mapping[frequency] || 7; // Default to weekly irrigation
// }

/**
 * Generate irrigation schedule based on crop phases and frequency.
 * @param {Object} userInputs - Inputs from the user.
 * @returns {Object} Result with irrigation schedule and details.
 */
export async function generateIrrigationSchedule(jsonData) {
    console.log(jsonData);
    const cropName = jsonData["0"];
    const location = jsonData["1"];
    const sowingDate = jsonData["2"];
    const startDate = jsonData["2"];
    const irrigationSystem = jsonData["3"];
    const farmArea = parseFloat(jsonData["4"]); // Assuming farmArea is a number

    const motorHorsepower = parseFloat(jsonData["5"]); // Assuming motorHorsepower is a number
    const pipeDiameterInches = parseFloat(jsonData["6"]); // Assuming pipeDiameter is a number
    console.log("jsonData:", jsonData);
    const irrigationHoursPerSession = parseFloat(jsonData["7"]);
    if (isNaN(irrigationHoursPerSession)) {
       throw new Error("Invalid irrigation hours per session. Must be a numeric value.");
    }

    const frequencies = [jsonData["8"], jsonData["9"], jsonData["10"]]; // Assuming frequencies are strings
    // Ensure cropData and cropName are defined
    // if (!cropData || !Array.isArray(cropData)) {
    // throw new Error("Invalid crop data. Ensure cropData is an array and properly initialized.");
    // }

    // if (!cropName || typeof cropName !== 'string') {
    //     throw new Error("Invalid crop name. Ensure cropName is a valid string.");
    // }

    // Attempt to find the crop in the database
    const cropInfo = cropData.find(crop => {
        if (!crop || !crop.Crop) {
            console.error("Malformed crop entry:", crop); // Debugging aid
            return false;
        }
        return crop.Crop.toLowerCase() === cropName.toLowerCase();
    });

    // If crop not found, throw an error
    if (!cropInfo) {
        throw new Error(`Crop "${cropName}" not found in the database.`);
    }

    // Proceed with using cropInfo
    console.log("Crop found:", cropInfo);


    const initialDays = cropInfo["Sowing to Emergence (days)"];
    console.log("initial days"+initialDays);
    const growingDays = cropInfo["Sowing to Maximum Canopy (days)"] - initialDays;
    console.log("growingDays days"+growingDays);
    const maturityDays = cropInfo["Sowing to Maturity (days)"] - cropInfo["Sowing to Maximum Canopy (days)"];
    console.log("maturityDays"+maturityDays);
    const totalDays = cropInfo["Sowing to Maturity (days)"];
    console.log("totalDays"+totalDays);

    const initialFrequency = parseFrequency(frequencies.initial);
    const growthFrequency = parseFrequency(frequencies.growth);
    const maturityFrequency = parseFrequency(frequencies.maturity);

    const phaseDetails = [
        { phaseStart: startDate, phaseEnd: addDays(startDate, initialDays), frequency: frequencies[0] },
        { phaseStart: addDays(startDate, initialDays), phaseEnd: addDays(startDate, initialDays + growingDays), frequency: frequencies[1] },
        { phaseStart: addDays(startDate, initialDays + growingDays), phaseEnd: addDays(startDate, initialDays + growingDays + maturityDays), frequency: frequencies[2] }
    ];

    // Convert pipe diameter to meters and calculate flow rate
    const pipeDiameter = pipeDiameterInches * 0.0254;
    const pipeArea = calculatePipeArea(pipeDiameter);
    const waterVelocity = calculateWaterVelocity(motorHorsepower, pipeDiameter);
    const flowRate = calculateFlowRate(pipeArea, waterVelocity);

    // Generate the irrigation schedule
    const schedule = [];
    phaseDetails.forEach(({ phaseStart, phaseEnd, frequency }) => {
        const interval = parseFrequency(frequency);
        const sessionVolumeLiters = flowRate * irrigationHoursPerSession * 3600;
        const sessionDepthMm = (sessionVolumeLiters / farmArea) * 10;

        for (let current = new Date(phaseStart); current <= new Date(phaseEnd); current.setDate(current.getDate() + 1)) {
            const daysElapsed = Math.floor((current - new Date(phaseStart)) / (1000 * 60 * 60 * 24));
            if (daysElapsed % interval === 0) {
                schedule.push({
                    Day: Math.floor((current - new Date(startDate)) / (1000 * 60 * 60 * 24)) + 1,
                    Date: current.toISOString().split('T')[0],
                    Depth_mm: parseFloat(sessionDepthMm.toFixed(2)),
                    ECw_dS_per_m: 1.5
                });
            }
        }
    });

    return {
        message: "Irrigation schedule generated successfully.",
        schedule
    };
}

function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result.toISOString().split('T')[0];
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
    } else if (motorHorsepower <= 50) {
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

function parseFrequency(frequency) {
    const mapping = {
        "Every 2 Days": 2,
        "Every 3 Days": 3,
        "Once a Week": 7
    };
    return mapping[frequency] || 7;
}

// Example usage
const jsonData = {
    "0": "Cabbage",
    "2": "2024-01-01",
    "3": "Sprinkler Irrigation",
    "4": 15000,
    "5": 5,
    "6": 4,
    "7": 4,
    "8": "Every 2 Days",
    "9": "Every 3 Days",
    "10": "Once a Week"
};
const result = generateIrrigationSchedule(jsonData);
console.log(result.schedule);


    // Convert pipe diameter from inches to meters
//     const pipeDiameter = pipeDiameterInches * 0.0254;

//     const pipeArea = calculatePipeArea(pipeDiameter);
//     const waterVelocity = calculateWaterVelocity(motorHorsepower, pipeDiameter);
//     const flowRate = calculateFlowRate(pipeArea, waterVelocity);

//     const totalWaterDepthPerWeek = ((flowRate * irrigationHoursPerSession ) / farmArea) * 1000;

//     const irrigationSchedule = [];
//     let currentDay = 1;

//     while (currentDay <= initialDays) {
//         irrigationSchedule.push({ day: currentDay, depth: (totalWaterDepthPerWeek / 7).toFixed(2), ecw: 1.5 });
//         currentDay += initialFrequency;
//     }

//     while (currentDay <= initialDays + growingDays) {
//         irrigationSchedule.push({ day: currentDay, depth: (totalWaterDepthPerWeek / 7).toFixed(2), ecw: 1.5 });
//         currentDay += growthFrequency;
//     }

//     while (currentDay <= totalDays) {
//         irrigationSchedule.push({ day: currentDay, depth: (totalWaterDepthPerWeek / 7).toFixed(2), ecw: 1.5 });
//         currentDay += maturityFrequency;
//     }
//     const irrigationSystemKey = irrigationSystem.trim();
//     const irrigationSystemParams = IRRIGATION_SYSTEM_MAPPING[irrigationSystemKey];

//     if (!irrigationSystemParams) {
//         throw new Error(`Unsupported irrigation system: ${irrigationSystem}`);
//     }
//     let irrFileContent = `Irrigation schedule for ${cropName} farm(${new Date().toLocaleDateString()}) \n`;
//     irrFileContent += `7.2   : AquaCrop Version(August 2024) \n`;
//     irrFileContent += `${irrigationSystemParams.code}     : ${irrigationSystemKey}\n`;
//     irrFileContent += `${irrigationSystemParams.wettedPercentage}     : Percentage of soil surface wetted by irrigation\n`;
//     irrFileContent += `1     : Irrigation schedule\n`;
//     irrFileContent += `\n`; // Empty line
//     irrFileContent += `Day    Depth(mm)   ECw(dS / m) \n`;
//     irrFileContent += `====================================\n`;

//     irrigationSchedule.forEach(entry => {
//         irrFileContent += `    ${entry.day.toString().padStart(2)}        ${entry.depth.toString().padStart(6)}          ${entry.ecw.toFixed(1)}\n`;
//     });

//     // Save to .irr file
//     const outputPath = join(__dirname, `generatedIrr.irr`);

//     writeFileSync(outputPath, irrFileContent);


//     return {
//         message: "Irrigation schedule generated successfully.",
//         filePath: outputPath,
//         irrigationDetails: irrigationSchedule,
//     };
// }

// function calculatePipeArea(diameter) {
//     return Math.PI * Math.pow(diameter / 2, 2);
// }

// function calculateWaterVelocity(motorHorsepower, pipeDiameter) {
//     const rho = 1000;
//     const g = 9.81;
//     const efficiency = 0.8;

//     let head;
//     if (motorHorsepower <= 3) {
//         head = 15;
//     } else if (motorHorsepower <= 50) {
//         head = 45;
//     } else {
//         throw new Error("Motor HP exceeds typical small/medium pump range.");
//     }

//     const powerWatts = motorHorsepower * 746;

//     const Q = (powerWatts * efficiency) / (rho * g * head);

//     const A = calculatePipeArea(pipeDiameter);

//     const velocity = Q / A;

//     return velocity.toFixed(2);
// }

// function calculateFlowRate(area, velocity) {
//     return area * velocity * 3600;
// }