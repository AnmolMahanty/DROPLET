const express = require('express');
const cors = require('cors');
const dwfRoutes = require('./routes/DWF');
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');
const path = require('path');
const app = express();
const port = 3000;


app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..','client' ,'dist')));

app.use('/dwf',dwfRoutes);
app.use('/api',apiRoutes);
app.use('/auth',authRoutes);
app.use('/database',require('./routes/database'));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});