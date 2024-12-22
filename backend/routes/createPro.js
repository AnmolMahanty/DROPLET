const fs = require('fs');
const path = require('path');
const { fileURLToPath } = require('url');
const { dirname } = require('path');

function checkFileExists(filePath, fileName) {
   if (fs.existsSync(path.join(filePath, fileName))) {
      return filePath;
   } else {
      console.log(`File does not exist: ${path.join(filePath, fileName)}`);
      return null;
   }
}

function getMonthName(monthNumber) {
   const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
   ];
   return months[monthNumber - 1];
}
function createProjectFile(data) {
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
      idealIrr
   } = data;

   const startJulian = dateToJulian(startDate.year, startDate.month, startDate.day);
   const endJulian = dateToJulian(endDate.year, endDate.month, endDate.day);
   const cropStartJulian = dateToJulian(cropStartDate.year, cropStartDate.month, cropStartDate.day);
   const cropEndJulian = dateToJulian(cropEndDate.year, cropEndDate.month, cropEndDate.day);
   const aquaData = path.join(__dirname, '..', 'aquacrop', 'AquaCropV72No02092024', 'DATA')+'\\';
   const myData = path.join(__dirname)+'\\';
   const climateFilePath = checkFileExists(myData, climateFile) || aquaData;
   const temperatureFilePath = checkFileExists(myData, temperatureFile) || aquaData;
   const referenceETFilePath = checkFileExists(myData, referenceETFile) || aquaData;
   const rainFilePath = checkFileExists(myData, rainFile) || aquaData;
   const cropFilePath = checkFileExists(myData, cropFile) || aquaData;
   const idealIrrFilePath = checkFileExists(aquaData, idealIrr) || aquaData;
   console.log("done");

   const content = `\n\t\t${version}       : AquaCrop Version
   ${yearNumber}         : Year number of cultivation (Seeding/planting year)
   ${startJulian}         : First day of simulation period - ${startDate.day} ${getMonthName(startDate.month)} ${startDate.year}
   ${endJulian}         : Last day of simulation period - ${endDate.day} ${getMonthName(endDate.month)} ${endDate.year}
   ${cropStartJulian}         : First day of cropping period - ${cropStartDate.day} ${getMonthName(cropStartDate.month)} ${cropStartDate.year}
   ${cropEndJulian}         : Last day of cropping period - ${cropEndDate.day} ${getMonthName(cropEndDate.month)} ${cropEndDate.year}
-- 1. Climate (CLI) file
   ${climateFile}
   ${myData}
   1.1 Temperature (Tnx or TMP) file
   ${temperatureFile}
   ${myData}
   1.2 Reference ET (ETo) file
   ${referenceETFile}
   ${myData}
   1.3 Rain (PLU) file
   ${rainFile}
   ${myData}
   1.4 Atmospheric CO2 concentration (CO2) file
   ${co2File}
   ${myData}
-- 2. Calendar (CAL) file
   (None)
   (None)
-- 3. Crop (CRO) file
   ${cropFile}
   ${myData}
-- 4. Irrigation management (IRR) file
   ${irrigationFile}
   ${myData}
-- 5. Field management (MAN) file
   (None)
   (None)
-- 6. Soil profile (SOL) file
   ${soilFile}
   ${path.join(__dirname, '..', 'aquacrop', 'AquaCropV72No02092024', 'DATA')}\\
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
   const contentIdeal = `\n\t\t${version}       : AquaCrop Version
   ${yearNumber}         : Year number of cultivation (Seeding/planting year)
   ${startJulian}         : First day of simulation period - ${startDate.day} ${getMonthName(startDate.month)} ${startDate.year}
   ${endJulian}         : Last day of simulation period - ${endDate.day} ${getMonthName(endDate.month)} ${endDate.year}
   ${cropStartJulian}         : First day of cropping period - ${cropStartDate.day} ${getMonthName(cropStartDate.month)} ${cropStartDate.year}
   ${cropEndJulian}         : Last day of cropping period - ${cropEndDate.day} ${getMonthName(cropEndDate.month)} ${cropEndDate.year}
-- 1. Climate (CLI) file
   ${climateFile}
   ${climateFilePath}
   1.1 Temperature (Tnx or TMP) file
   ${temperatureFile}
   ${temperatureFilePath}
   1.2 Reference ET (ETo) file
   ${referenceETFile}
   ${referenceETFilePath}
   1.3 Rain (PLU) file
   ${rainFile}
   ${rainFilePath}
   1.4 Atmospheric CO2 concentration (CO2) file
   ${co2File}
   ${myData}
-- 2. Calendar (CAL) file
   (None)
   (None)
-- 3. Crop (CRO) file
   ${cropFile}
   ${cropFilePath}
-- 4. Irrigation management (IRR) file
   ${idealIrr}
   ${idealIrrFilePath}
-- 5. Field management (MAN) file
   (None)
   (None)
-- 6. Soil profile (SOL) file
   ${soilFile}
   ${path.join(__dirname, '..', 'aquacrop', 'AquaCropV72No02092024', 'DATA')}\\
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

   const filePathActual = path.join(__dirname, '..', 'aquacrop', 'LIST', 'tom.PRO');
   fs.writeFileSync(filePathActual, content);
   const filePathIdeal = path.join(__dirname, '..', 'aquacrop', 'LIST', 'idealPro.PRO');
   fs.writeFileSync(filePathIdeal, contentIdeal);
   console.log(`Project files created`);
}
function dateToJulian(year, month, day) {
   // Custom epoch start date: 1 January 1900
   const epochYear = 1900;
   const epochMonth = 1;
   const epochDay = 1;

   // Calculate the number of days from the epoch to the given date
   const daysFromEpoch = (year - epochYear) * 365 + Math.floor((year - epochYear) / 4) +
      (month - epochMonth) * 30 + day - epochDay;

   return daysFromEpoch;
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

module.exports = {
   createProjectFile, dateToJulian
}