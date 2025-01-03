const express = require('express');
const router = express.Router();
const axios = require('axios');
const { execFile } = require('child_process');
const path = require('path');
const fs = require('fs').promises;
const irrGen = require('../routes/irrigationGenerator');
const { createProjectFile } = require('./createPro');


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
const cityLatLong = {
  "Delhi": { latitude: 28.7041, longitude: 77.1025 },
  "Mumbai": { latitude: 19.0760, longitude: 72.8777 },
  "Lucknow": { latitude: 26.8467, longitude: 80.9462 },
  "Bhopal": { latitude: 23.2599, longitude: 77.4126 },
  "Chennai": { latitude: 13.0827, longitude: 80.2707 },
  "Hyderabad": { latitude: 17.3850, longitude: 78.4867 },
  "Bangalore": { latitude: 12.9716, longitude: 77.5946 },
  "Ahmedabad": { latitude: 23.0225, longitude: 72.5714 },
  "Kolkata": { latitude: 22.5726, longitude: 88.3639 },
  "Pune": { latitude: 18.5204, longitude: 73.8567 },
  "Jaipur": { latitude: 26.9124, longitude: 75.7873 },
  "Patna": { latitude: 25.5941, longitude: 85.1376 },
  "Raipur": { latitude: 21.2514, longitude: 81.6296 },
  "Nagpur": { latitude: 21.1458, longitude: 79.0882 },
  "Surat": { latitude: 21.1702, longitude: 72.8311 },
  "Coimbatore": { latitude: 11.0168, longitude: 76.9558 },
  "Chandigarh": { latitude: 30.7333, longitude: 76.7794 },
  "Guwahati": { latitude: 26.1445, longitude: 91.7362 },
  "Indore": { latitude: 22.7196, longitude: 75.8577 },
  "Ludhiana": { latitude: 30.9000, longitude: 75.8500 },
  "Amritsar": { latitude: 31.6340, longitude: 74.8723 },
  "Vijayawada": { latitude: 16.5062, longitude: 80.6480 },
  "Varanasi": { latitude: 25.3176, longitude: 82.9739 },
  "Kanpur": { latitude: 26.4499, longitude: 80.3319 },
  "Mysore": { latitude: 12.2958, longitude: 76.6394 },
  "Thiruvananthapuram": { latitude: 8.5241, longitude: 76.9366 },
  "Ranchi": { latitude: 23.3441, longitude: 85.3096 },
  "Jodhpur": { latitude: 26.2389, longitude: 73.0243 },
  "Allahabad": { latitude: 25.4358, longitude: 81.8463 },
  "Madurai": { latitude: 9.9252, longitude: 78.1198 },
  "Vellore": { latitude: 12.9165, longitude: 79.1325 },
  "Dharwad": { latitude: 15.4589, longitude: 75.0078 },
  "Puducherry": { latitude: 11.9139, longitude: 79.8145 },
  "Kozhikode": { latitude: 11.2588, longitude: 75.7804 },
  "Jamshedpur": { latitude: 22.8046, longitude: 86.2029 },
  "Dehradun": { latitude: 30.3165, longitude: 78.0322 },
  "Shimla": { latitude: 31.1048, longitude: 77.1734 },
  "Shillong": { latitude: 25.5788, longitude: 91.8933 },
  "Cuttack": { latitude: 20.4625, longitude: 85.8821 },
  "Dibrugarh": { latitude: 27.4728, longitude: 94.9110 },
  "Agartala": { latitude: 23.8315, longitude: 91.2868 },
  "Panaji": { latitude: 15.4909, longitude: 73.8278 },
  "Imphal": { latitude: 24.8170, longitude: 93.9368 },
  "Aizawl": { latitude: 23.7271, longitude: 92.7176 },
  "Itanagar": { latitude: 27.0844, longitude: 93.6053 },
  "Gangtok": { latitude: 27.3389, longitude: 88.6065 },
  "Silchar": { latitude: 24.8333, longitude: 92.7789 },
  "Udaipur": { latitude: 24.5854, longitude: 73.7125 },
  "Bhubaneswar": { latitude: 20.2961, longitude: 85.8245 }
};
router.post('/getData', async (req, res) => {
  try {
    console.log(req.body);

    const jsonData = req.body;
    const location = jsonData.answers[1];
    const cropName = jsonData.answers[0];
    const { latitude, longitude } = cityLatLong[location];
    const climateData = await axios.get(`https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=2023-01-01&end_date=2024-12-01&daily=temperature_2m_max,temperature_2m_min,rain_sum,et0_fao_evapotranspiration&timezone=auto`).catch(err => { console.log("myerror1: " + err.message); });
    //const cityLatLong = {
    // "Mumbai": { latitude: 19.0760, longitude: 72.8777 },
    // "Delhi": { latitude: 28.7041, longitude: 77.1025 },
    // "UP": { latitude: 26.8467, longitude: 80.9462 },
    // "MP": { latitude: 23.2599, longitude: 77.4126 },
    // "Add Sarthak": { latitude: 10.7877, longitude: 79.1384 }
    // const climateData = await axios.get(`https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=2023-01-01&end_date=2024-12-01&daily=temperature_2m_max,temperature_2m_min,rain_sum,et0_fao_evapotranspiration&timezone=auto`).catch(err => { console.log(err); });
    console.log(climateData.status);
    const data = climateData.data;

    // Extract data
    const temperaturesMax = data.daily.temperature_2m_max;
    const temperaturesMin = data.daily.temperature_2m_min;
    const rainSum = data.daily.rain_sum;
    const et0 = data.daily.et0_fao_evapotranspiration;

    // Define file paths
    const cliFilePath = path.join(__dirname, 'dombivli.CLI');
    const pluFilePath = path.join(__dirname, 'dombivli.PLU');
    const tmpFilePath = path.join(__dirname, 'domdbivli.TMP');
    const etoFilePath = path.join(__dirname, 'dombivli.ETo');

    // Write CLI file
    const cliContent = `Patancheru, India 1Jan-31Dec1996 - Data by International Crops Research Institute for the Semi-Arid Tropics (ICRISAT)
 3.0   : AquaCrop Version (January 2009)
domdbivli.TMP\r
dombivli.ETo\r
dombivli.PLU\r
MaunaLoa.CO2\r`;
    fs.writeFile(cliFilePath, cliContent);

    // Write PLU file
    const pluContent = `Patancheru, India 1Jan-31Dec1996 - Data by International Crops Research Institute for the Semi-Arid Tropics (ICRISAT)
     1  : Daily records (1=daily, 2=10-daily and 3=monthly data)
    01  : First day of record (1, 11 or 21 for 10-day or 1 for months)
     1  : First month of record
  1996  : First year of record (1901 if not linked to a specific year)

  Total Rain (mm)
=======================
${rainSum.join('\r\n')}\r\n`;
    fs.writeFile(pluFilePath, pluContent);

    // Write TMP file
    const tmpContent = `Patancheru, India 1Jan-31Dec1996 - Data by International Crops Research Institute for the Semi-Arid Tropics (ICRISAT)
     1  : Daily records (1=daily, 2=10-daily and 3=monthly data)
    01  : First day of record (1, 11 or 21 for 10-day or 1 for months)
     1  : First month of record
  1996  : First year of record (1901 if not linked to a specific year)

  Tmin (C)   TMax (C)      
========================
${temperaturesMin.map((min, index) => `\t${min}\t${temperaturesMax[index]}`).join('\r\n')}\r\n`;
    fs.writeFile(tmpFilePath, tmpContent);

    // Write ETO file
    const etoContent = `Patancheru, India 1Jan-31Dec1996 - Data by International Crops Research Institute for the Semi-Arid Tropics (ICRISAT)
     1  : Daily records (1=daily, 2=10-daily and 3=monthly data)
    01  : First day of record (1, 11 or 21 for 10-day or 1 for months)
     1  : First month of record
  1996  : First year of record (1901 if not linked to a specific year)

  Average ETo (mm/day)
=======================
${et0.join('\r\n')}\r\n`;

    fs.writeFile(etoFilePath, etoContent);
    irrGen.generateIrrigationSchedule(jsonData.answers)
    //.catch(err => { console.log("myerror2: "+err.message); });

    // console.log(cropName.trim().replace(" ", "_"));
    // Define the source and destination paths
    try {
      const sourcePath = path.join(__dirname, '..', 'aquacrop', 'Crops', `${cropName.trim().replace(" ", "_")}.cro`);
      const destinationPath = path.join(__dirname, `selectedCrop.cro`);

      // Copy the .cro file from the crop folder to the current folder
      await fs.copyFile(sourcePath, destinationPath);
    }
    catch (err) {
      console.log("myerror3: " + err.message);
    }
    console.log(`Copied ${cropName}.cro to the current folder`);
    const proData = {
      version: '7.2',
      yearNumber: 1,
      startDate: { year: 1996, month: 1, day: 22 },
      endDate: { year: 1996, month: 5, day: 10 },
      cropStartDate: { year: 1996, month: 1, day: 22 },
      cropEndDate: { year: 1996, month: 5, day: 10 },
      climateFile: 'dombivli.CLI',
      temperatureFile: 'domdbivli.TMP',
      referenceETFile: 'dombivli.ETo',
      rainFile: 'dombivli.PLU',
      co2File: 'MaunaLoa.CO2',
      cropFile: 'selectedCrop.CRO',
      irrigationFile: 'generatedIrr.IRR',
      soilFile: 'SandyLoam.SOL',
      idealIrr: 'irr1.IRR'
    };
    // createProjectFile(proData);


    console.log('Files written successfully');
    try {
      var executeResponse = await axios.post('http://140.245.22.129:3000/api/execute');
      res.status(executeResponse.status).send(executeResponse.data);
    }
    catch (err) {
      console.log(err);
    }
  } catch (error) {
    console.error(`Error fetching JSON file: ${error}`);
    res.status(500).send('Error fetching JSON file');
  }
});

//https://archive-api.open-meteo.com/v1/archive?latitude=19.2167&longitude=73.0833&start_date=2023-01-01&end_date=2024-12-01&daily=et0_fao_evapotranspiration&timezone=GMT
//then i want to run the aquacrop model on this json file
//and then return the output of the model to the frontend


router.post('/execute', async (req, res) => {
  // axios.post('http://140.245.22.129:3000/api/getData').then{

  console.log('Executing model');
  const exePath = path.join(__dirname, '..', 'aquacrop', 'aquacrop.exe');
  const workingDirectory = path.join(__dirname, '..', 'aquacrop');
  const actualFootprintFile = path.join(__dirname, '..', 'aquacrop', 'OUTP', 'tomPROday.OUT');
  const ideaFootprintFile = path.join(__dirname, '..', 'aquacrop', 'OUTP', 'idealProPROday.OUT');
  const actualYeildFile = path.join(__dirname, '..', 'aquacrop', 'OUTP', 'tomPROharvests.OUT');
  const idealYeildFile = path.join(__dirname, '..', 'aquacrop', 'OUTP', 'idealProPROharvests.OUT');
  const actualIrrigationFile = path.join(__dirname, '..', 'aquacrop', 'OUTP', 'tomPROirrInfo.OUT');
  const idealIrrigationFile = path.join(__dirname, '..', 'aquacrop', 'OUTP', 'idealProPROirrInfo.OUT');


  // Check if the executable file exists
  try {
    await fs.access(exePath);

  } catch (err) {
    console.error(`Executable file not found: ${exePath}`);
    return res.status(404).json({ error: 'Executable file not found' });
  }

  execFile(exePath, { cwd: workingDirectory }, async (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing file: ${error}`);
      return res.status(500).json({ error: 'Failed to run executable', details: stderr });
    }

    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
    // Read the output file
    try {
      const resultJson = {};
      let i = 0;
      // Read the output file
      for (const filePath of [actualFootprintFile, ideaFootprintFile]) {

        const data = await fs.readFile(filePath, 'utf8');

        // Split the file content into lines
        const lines = data.split('\n');

        // Extract the WPet column values
        const wpetValues = lines.slice(1).map(line => {
          const columns = line.trim().split(/\s+/);
          for(let i = 0; i < columns.length; i++) {
            if(columns[i] === 'CC') {
              console.log(`CC found at index ${i}`);
            }
          }
          return parseFloat(columns[44]); // Assuming WPet is the 6th last column
        }).filter(value => !isNaN(value));
        const ccValues = lines.slice(1).map(line => {
          const columns = line.trim().split(/\s+/);
          
          return parseFloat(columns[30]); // Assuming WPet is the 6th last column
        }).filter(value => !isNaN(value));

        // Get the last value from the WPet column
        const lastWpetValue = wpetValues[wpetValues.length - 1];
        const footprint = 1000 / lastWpetValue;
        resultJson[i++] = footprint;
        resultJson[i++] = ccValues;

      }
      console.log("waterFootprint written successfully");

      for (const filePath of[actualYeildFile, idealYeildFile]) {

        const data = await fs.readFile(filePath, 'utf8');

        // Split the file content into lines
        const lines = data.split('\n');

        // Extract the WPet column values
        const yeildValue = lines.slice(3).map(line => {
          const columns = line.trim().split(/\s+/);
          return parseFloat(columns[columns.length - 3]); // 3rd last column
        }).filter(value => !isNaN(value)).pop();


        // Get the last value from the WPet column

        resultJson[i++] = yeildValue;

      }
      console.log("yeild written successfully");
      for (const filePath of [actualIrrigationFile, idealIrrigationFile]) {
        const data = await fs.readFile(filePath, 'utf8');
        const lines = data.split('\n');
        //0 1 3 5
        const irrigationTable = lines.slice(2).map(line => {
          const columns = line.trim().split(/\s+/);
          return {
            day: columns[0],
            month: columns[1],
            dap: columns[3],
            irri: columns[5]
          };
        }).filter(row => !isNaN(row.day) && !isNaN(row.month) && !isNaN(row.dap) && !isNaN(row.irri));
        resultJson[i++] = irrigationTable;
        
      }
      console.log("irrigation table written successfully");
      console.log(resultJson);
      res.json(resultJson);


      // res.json({ message: 'Executable ran successfully', output: lastWpetValue });
    } catch (err) {
      console.error(`Error reading output file: ${err}`);
      return res.status(500).json({ error: 'Failed to read output file' });
    }

  });
  // }
});

module.exports = router;