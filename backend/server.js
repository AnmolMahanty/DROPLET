const express = require('express');
const cors = require('cors');
const dwfRoutes = require('./routes/DWF');
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use('/dwf',dwfRoutes);
app.use('/api',apiRoutes);
app.use('/auth',authRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});