import fs from 'fs';
import path from 'path';
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export function createProjectFile(data) {
    const {
        version,
        yearNumber,
        startDate,
        endDate,
        cropStartDate,
        cropEndDate,
        climateFile,
        temperatureFile,
        referenceETFile,
        rainFile,
        co2File,
        cropFile,
        irrigationFile,
        soilFile,
    } = data;

    const startJulian = dateToJulian(startDate.year, startDate.month, startDate.day);
    const endJulian = dateToJulian(endDate.year, endDate.month, endDate.day);
    const cropStartJulian = dateToJulian(cropStartDate.year, cropStartDate.month, cropStartDate.day);
    const cropEndJulian = dateToJulian(cropEndDate.year, cropEndDate.month, cropEndDate.day);
    const aquaData = path.join(__dirname, '..', 'aquacrop', 'AquaCropV72No02092024', 'DATA');
    const myData = path.join(__dirname);


    const content = `
    
${version}       : AquaCrop Version
      ${yearNumber}         : Year number of cultivation (Seeding/planting year)
  ${startJulian}         : First day of simulation period - ${startDate.day} ${startDate.month} ${startDate.year}
  ${endJulian}         : Last day of simulation period - ${endDate.day} ${endDate.month} ${endDate.year}
  ${cropStartJulian}         : First day of cropping period - ${cropStartDate.day} ${cropStartDate.month} ${cropStartDate.year}
  ${cropEndJulian}         : Last day of cropping period - ${cropEndDate.day} ${cropEndDate.month} ${cropEndDate.year}
-- 1. Climate (CLI) file
   ${climateFile}
   ${fs.existsSync(path.join(myData, climateFile)) ? myData : aquaData}
   1.1 Temperature (Tnx or TMP) file
   ${temperatureFile}
   ${fs.existsSync(path.join(myData, temperatureFile)) ? myData : aquaData}
   1.2 Reference ET (ETo) file
   ${referenceETFile}
   ${fs.existsSync(path.join(myData, referenceETFile)) ? myData : aquaData}
   1.3 Rain (PLU) file
   ${rainFile}
   ${fs.existsSync(path.join(myData, rainFile)) ? myData : aquaData}
   1.4 Atmospheric CO2 concentration (CO2) file
   ${co2File}
   ${path.join(__dirname, '..', 'aquacrop','AquaCropV72No02092024', 'SIMUL')}
-- 2. Calendar (CAL) file
   (None)
   (None)
-- 3. Crop (CRO) file
   ${cropFile}
   ${fs.existsSync(path.join(myData, cropFile)) ? myData : aquaData}
-- 4. Irrigation management (IRR) file
   ${irrigationFile}
   ${fs.existsSync(path.join(myData, irrigationFile)) ? myData : aquaData}
-- 5. Field management (MAN) file
   (None)
   (None)
-- 6. Soil profile (SOL) file
   ${soilFile}
   ${path.join(__dirname,'..', 'aquacrop','AquaCropV72No02092024', 'DATA')}
-- 7. Groundwater table (GWT) file
   (None)
   (None)
-- 8. Initial conditions (SW0) file
   (None)
   (None)
-- 9. Off-season conditions (OFF) file
   (None)
   (None)
-- 10. Field data (OBS) file
   (None)
   (None)
`;

    const filePath = path.join(__dirname, '..', 'aquacrop', 'LIST', 'tom.PRO');
    fs.writeFileSync(filePath, content.trim());
    console.log(`Project file created at ${filePath}`);
}
export function dateToJulian(year, month, day) {
    if (month <= 2) {
        year -= 1;
        month += 12;
    }

    const A = Math.floor(year / 100);
    const B = 2 - A + Math.floor(A / 4);

    const JD = Math.floor(365.25 * (year + 4716)) +
        Math.floor(30.6001 * (month + 1)) +
        day + B - 1524.5;

    return Math.floor(JD);
}

// Example usage

// const data = {
//     version: '7.2',
//     yearNumber: 1,
//     startDate: { year: 2024, month: 1, day: 22 },
//     endDate: { year: 2024, month: 5, day: 10 },
//     cropStartDate: { year: 2024, month: 1, day: 22 },
//     cropEndDate: { year: 2024, month: 5, day: 10 },
//     climateFile: 'Patancheru.CLI',
//     temperatureFile: 'Patancheru.Tnx',
//     referenceETFile: 'Patancheru.ETO',
//     rainFile: 'Patancheru.PLU',
//     co2File: 'MaunaLoa.CO2',
//     cropFile: 'selectedCrop.CRO',
//     irrigationFile: 'irr1.IRR',
//     soilFile: 'SandyLoam.SOL',
// };
// createProjectFile(data);