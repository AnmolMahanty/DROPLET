const { generateIrrigationSchedule } = require("./irrigationGenerator");
const axios =require("axios")

const userInputs = {
    "0": "eggplant",
          "1": "Mumbai",
          "2": "2024-12-11",
          "3": "Drip Irrigation",
          "4": "10000",
          "5": "5",
          "6": "3",
          "7": "6",
          "8": "Every 2 Days",
          "9": "Every 3 Days",
          "10": "Once a Week",
    };


async function runTest()
{
    try {
        const result = await axios.get("http://140.245.22.129:3000/api/testIrri");
        console.log(result.message);
        console.log("File Path:", result.filePath);
        console.log("Irrigation Details:", result.irrigationDetails);
    } catch (error) {
        console.error("Error:", error.message);
    }
    
}
runTest();