const express = require('express');
const router = express.Router();
const axios = require('axios');
const { execFile } = require('child_process');
const path = require('path');
const fs = require('fs').promises;


router.post('/getData', async (req, res) => {
  try {
    const response = await axios.get('https://archive-api.open-meteo.com/v1/archive?latitude=19.2167&longitude=73.0833&start_date=2023-01-01&end_date=2024-12-01&daily=temperature_2m_max,temperature_2m_min,rain_sum,et0_fao_evapotranspiration&timezone=auto');
    const data = response.data;

    // Extract data
    const temperaturesMax = data.daily.temperature_2m_max;
    const temperaturesMin = data.daily.temperature_2m_min;
    const rainSum = data.daily.rain_sum;
    const et0 = data.daily.et0_fao_evapotranspiration;

    // Define file paths
    const cliFilePath = path.join(__dirname, 'dombivli.cli');
    const pluFilePath = path.join(__dirname, 'dombivli.plu');
    const tnxFilePath = path.join(__dirname, 'dombivli.tnx');
    const etoFilePath = path.join(__dirname, 'dombivli.eto');

    // Write CLI file
    const cliContent = `dombivli, India 1Jan2023-1Dec2024 - Data by Open Meteo API
3.0   : AquaCrop Version (January 2009)
dombivli.Tnx
dombivli.ETO
dombivli.PLU
MaunaLoa.CO2`;
    fs.writeFileSync(cliFilePath, cliContent);

    // Write PLU file
    const pluContent = `dombivli, India 1Jan2023-1Dec2024 - Data by Open Meteo API
     1  : Daily records (1=daily, 2=10-daily and 3=monthly data)
    01  : First day of record (1, 11 or 21 for 10-day or 1 for months)
     1  : First month of record
  2023  : First year of record (1901 if not linked to a specific year)

  Total Rain (mm)
=======================
${rainSum.join('\n')}`;
    fs.writeFileSync(pluFilePath, pluContent);

    // Write TNX file
    const tnxContent = `dombivli, India 1Jan2023-1Dec2024 - Data by Open Meteo API
     1  : Daily records (1=daily, 2=10-daily and 3=monthly data)
    01  : First day of record (1, 11 or 21 for 10-day or 1 for months)
     1  : First month of record
  2023  : First year of record (1901 if not linked to a specific year)

  Tmin (C)   TMax (C)      
========================
${temperaturesMin.map((min, index) => `${min}\t${temperaturesMax[index]}`).join('\n')}`;
    fs.writeFileSync(tnxFilePath, tnxContent);

    // Write ETO file
    const etoContent = `dombivli, India 1Jan2023-1Dec2024 - Data by Open Meteo API
     1  : Daily records (1=daily, 2=10-daily and 3=monthly data)
    01  : First day of record (1, 11 or 21 for 10-day or 1 for months)
     1  : First month of record
  2023  : First year of record (1901 if not linked to a specific year)

  Average ETo (mm/day)
=======================
${et0.join('\n')}`;
    fs.writeFileSync(etoFilePath, etoContent);

    res.status(200).send('Files saved successfully');
  } catch (error) {
    res.status(500).send('Error fetching JSON file');
  }
});

//https://archive-api.open-meteo.com/v1/archive?latitude=19.2167&longitude=73.0833&start_date=2023-01-01&end_date=2024-12-01&daily=et0_fao_evapotranspiration&timezone=GMT
//then i want to run the aquacrop model on this json file
//and then return the output of the model to the frontend


router.post('/execute',async (req, res) => {
  const exePath = path.join(__dirname, '..', 'aquacrop', 'aquacrop.exe');
  const workingDirectory = path.join(__dirname, '..', 'aquacrop');
  const outputFilePath = path.join(__dirname, '..', 'aquacrop', 'OUTP', 'tomPROday.OUT');


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
      // Read the output file
      const data = await fs.readFile(outputFilePath, 'utf8');


      // Split the file content into lines
      const lines = data.split('\n');

      // Extract the WPet column values
      const wpetValues = lines.slice(1).map(line => {
        const columns = line.trim().split(/\s+/);
        // for(let i = 0; i < columns.length; i++) {
        //   if(columns[i] === 'WPet') {
        //     console.log(`WPet found at index ${i}`);
        //   }
        // }
        return parseFloat(columns[44]); // Assuming WPet is the 6th last column
      }).filter(value => !isNaN(value));

      // Get the last value from the WPet column
      const lastWpetValue = wpetValues[wpetValues.length - 1];

      res.json({ message: 'Executable ran successfully', output:lastWpetValue });
    } catch (err) {
      console.error(`Error reading output file: ${err}`);
      return res.status(500).json({ error: 'Failed to read output file' });
    }
  });
});

module.exports = router;