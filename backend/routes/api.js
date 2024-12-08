const express = require('express');
const router = express.Router();
const { execFile } = require('child_process');
const path = require('path');
const fs = require('fs');

router.post('/farmer', (req, res) => {
  const exePath = path.join(__dirname, '..', 'aquacrop', 'aquacrop.exe');
  const workingDirectory = path.join(__dirname, '..', 'aquacrop');

  console.log(`Executable Path: ${exePath}`);
  console.log(`Working Directory: ${workingDirectory}`);
  console.log(`Current Working Directory: ${process.cwd()}`);

  // Check if the executable file exists
  if (!fs.existsSync(exePath)) {
    console.error(`Executable file not found: ${exePath}`);
    return res.status(404).json({ error: 'Executable file not found' });
  }

  execFile(exePath, { cwd: workingDirectory }, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing file: ${error}`);
      return res.status(500).json({ error: 'Failed to run executable', details: stderr });
    }

    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
    res.json({ message: 'Executable ran successfully', output: stdout });
  });
});

module.exports = router;